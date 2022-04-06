// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract DutchAuction {
    address[] public bidders;
    mapping(address => uint256) public addressToAmountBid;
    address public owner;
    address public winner;
    address public judge;
    uint256 initialPrice;
    uint256 reservePrice;
    uint256 numBlocksAuctionOpen;
    uint256 offerPriceDecrement;
    uint256 blockNub;
    uint256 blockCount;
    bool isFinalized;
    bool acceptBid;
    mapping(address => uint256) refunds;

    event BidEvent(bool succeed, address bidder, uint value);
    event BidFailed(bool succeed, address bidder, uint value);
    event Info(bool hasJudge, bool isReceivingBid, bool isFinalized, uint256 price);
    event FinalizeEvent(bool succeed, address winnerOrJudge);

    constructor(
        uint256 _reservePrice,
        address _judgeAddress,
        uint256 _numBlocksAuctionOpen,
        uint256 _offerPriceDecrement
    ) public {
        require(_offerPriceDecrement > 0, "invalid");
        require(_numBlocksAuctionOpen > 0, "invalid");
        owner = msg.sender;
        reservePrice = _reservePrice;
        numBlocksAuctionOpen = _numBlocksAuctionOpen;
        offerPriceDecrement = _offerPriceDecrement;
        initialPrice = reservePrice + numBlocksAuctionOpen * offerPriceDecrement;
        blockNub = block.number;
        blockCount = 0;
        judge = _judgeAddress;
        isFinalized = false;
        acceptBid = true;
    }

    modifier stillAcceptBid() {
        require(blockCount < numBlocksAuctionOpen, "Exceed Maximum block number");
        require(winner == address(0), "already has a winner");
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "you are not the judge");
        _;
    }
    modifier onlyJudge() {
        require(msg.sender == judge, "you can't call this");
        _;
    }
    modifier notFinalized() {
        require(isFinalized == false, "It's finalized already");
        _;
    }

    modifier onlyWinnerOrJudge() {
        require(
            msg.sender == judge || msg.sender == winner,
            "you aren't winner or judge"
        );
        _;
    }

    modifier hasWinner() {
        require(winner != address(0), "still have no winner yet");
        _;
    }

    modifier onlyEOA() {
        require(msg.sender == tx.origin, "Must use EOA");
        _;
    }

    function seeInfo() public{
        uint256 price = getPrice();
        emit Info(judge != address(0), acceptBid, isFinalized, price - offerPriceDecrement);
    }

    function bid()
        public
        payable
        notFinalized
        stillAcceptBid
        onlyEOA
        returns (address)
    {
        uint256 currentPrice = getPrice();
        require(msg.value >= currentPrice, "Ether less than current price ");
        if (judge == address(0)) {
            (bool success, ) = owner.call{value: currentPrice}("");
            require(success, "Failed to send Ether");
            uint256 refund = msg.value - currentPrice;
            if (refund > 0) {
                msg.sender.call{value: refund}("");
            }
        }
        uint256 refund = msg.value - currentPrice;
        if (refund > 0) {
            msg.sender.call{value: refund}("");
        }
        refunds[msg.sender] = currentPrice;
        winner = msg.sender;
        acceptBid = false;
        emit BidEvent(true, msg.sender, currentPrice);
        return msg.sender;
    }

    function getPrice()
        public
        view
        notFinalized
        returns (uint256)
    {
        return initialPrice - (block.number - blockNub) * offerPriceDecrement ;
    }

    function finalize() public onlyWinnerOrJudge notFinalized hasWinner {
        isFinalized = true;
        if(judge != address(0)) {
            uint256 pay = refunds[winner];
            refunds[winner] = 0;
            (bool success, ) = owner.call{value: pay}("");
            require(success, "Failed to send Ether");
        }

        emit FinalizeEvent(true, msg.sender);
    }

    function refund() public onlyJudge notFinalized {
        uint256 refund = refunds[msg.sender];
        refunds[msg.sender] = 0;
        (bool success, ) = winner.call{value: refund}("");
        require(success, "Failed to refund");
        isFinalized = true;
    }

    //for testing framework
    function nop() public notFinalized returns (bool) {
        return true;
    }
}
