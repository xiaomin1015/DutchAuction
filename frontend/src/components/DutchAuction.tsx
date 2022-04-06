import { useWeb3React } from '@web3-react/core';
import {BigNumber, Contract, ethers, Signer} from 'ethers';
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';
import DutchAuctionArtifact from '../artifacts/contracts/DutchAuction.sol/DutchAuction.json';
import { Provider } from '../utils/provider';
import { SectionDivider } from './SectionDivider';

const StyledDeployContractButton = styled.button`
  width: 180px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
  place-self: center;
`;

const StyledGreetingDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 135px 2.7fr 1fr;
  grid-gap: 10px;
  place-self: center;
  align-items: center;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 0.4rem 0.6rem;
  line-height: 2fr;
`;

const StyledButton = styled.button`
  width: 150px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
`;

export function DutchAuction(): ReactElement {
  const context = useWeb3React<Provider>();
  const { library, active } = context;

  const [signer, setSigner] = useState<Signer>();
  const [auction, setAuction] = useState<Contract>();
  const [contractAddr, setContractAddr] = useState<string>('');
  const [reservePriceInput, setReservePriceInput] = useState<string>('0');
  const [judgeAddressInput, setJudgeAddressInput] = useState<string>('0x0000000000000000000000000000000000000000');
  const [numBlocksAuctionOpen, setNumBlocksAuctionOpenInput] = useState<string>('0');
  const [offerPriceDecrement, setOfferPriceDecrementInput] = useState<string>('0');

  const [findContractByAddress, setFindContractByAddress] = useState<string>('0');
  const [auctionFound, setAuctionFound] = useState<Contract>();
  const [auctionFoundAddr, setAuctionFoundAddr] = useState<string>();

  const [priceToBid, setPriceToBid] = useState<string>();
  const [seeInfoResult, setSeeInfoResult] = useState<boolean>(false);

  const [auctionFoundHasJudge, setAuctionFoundHasJudge] = useState<boolean>();
  const [auctionFoundReceivingBid, setAuctionFoundReceivingBid] = useState<boolean>();
  const [auctionFoundIsFinalized, setAuctionFoundIsFinalized] = useState<boolean>();
  const [auctionFoundCurrentPrice, setAuctionFoundCurrentPrice] = useState<string>();
  const [bidSucceed, setBidSucceed] = useState<boolean>(false);

  useEffect((): void => {
    if (!library) {
      setSigner(undefined);
      return;
    }
    setSigner(library.getSigner());
  }, [library]);

  function handleJudgeAddressChange(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setJudgeAddressInput(event.target.value);
  }
  function handleReservePriceChange(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setReservePriceInput(event.target.value);
  }
  function handleNumBlocksAuctionOpenChange(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setNumBlocksAuctionOpenInput(event.target.value);
  }
  function handleOfferPriceDecrementChange(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setOfferPriceDecrementInput(event.target.value);
  }

  function handleFindContractByAddress(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setFindContractByAddress(event.target.value);
  }

  function handlePriceToBid(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setPriceToBid(event.target.value);
  }

  function handleDeployContract(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // only deploy the DutchAuction contract one time, when a signer is defined
    if (auction || !signer) {return;}
    async function deployGreeterContract(signer: Signer): Promise<void> {
      const DutchAuction = new ethers.ContractFactory(
        DutchAuctionArtifact.abi,
        DutchAuctionArtifact.bytecode,
        signer
      );
      try {
        const auction = await DutchAuction.deploy(reservePriceInput, judgeAddressInput, numBlocksAuctionOpen, offerPriceDecrement);
        await auction.deployed();
        setAuction(auction);
        window.alert(`Congratulation, you just setup a dutch auction! \n\nIt deployed to: ${auction.address}`);
        setContractAddr(auction.address);
      } catch (error: any) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }
    deployGreeterContract(signer);
  }

  function handleFindContract(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    if(!findContractByAddress) {
      window.alert(`please input the contract address you are looking for`);
      return;
    }
    async function submitFinding(): Promise<void> {
      const DutchAuction = new ethers.ContractFactory(
          DutchAuctionArtifact.abi,
          DutchAuctionArtifact.bytecode,
          signer
      );
      try {
        const auctionToFound = DutchAuction.attach(findContractByAddress);
        if(auctionToFound) {
          setAuctionFound(auctionToFound);
          setAuctionFoundAddr(auctionToFound.address);
          window.alert(`Success!`);
        }
      } catch (error: any) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }
    submitFinding();
  }

  function handleBid(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    if(!auctionFound) {
      window.alert('Undefined Contract');
      return;
    }
    async function submitBid(auctionFound: Contract): Promise<void> {
      try {
        const setBidTxn = await auctionFound.bid({value: priceToBid});
        const receipt = await setBidTxn.wait();
        const data = receipt.logs[0].data;
        const [ succeed, addr, depositAmount,] = ethers.utils.defaultAbiCoder.decode(
            ['bool','address' ,'uint256',], data
        )
        if(succeed) {
          setBidSucceed(true);
          if(auctionFoundHasJudge) {
            alert(`Congratulation!\n your bid of ${depositAmount.toString()} succeeded `);
          } else {
            alert(`Congratulation!\n your bid of ${depositAmount.toString()} succeeded \n the Ether sent to seller directly`);
          }
        } else {
          alert(`failed to bid !! \n the amount of ${priceToBid}sent back to you`);
        }

      } catch (error: any) {
        window.alert(
            'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }
    submitBid(auctionFound);
  }

  function seeInfo(event: MouseEvent<HTMLButtonElement>): void {
    if(!auctionFound) {
      window.alert('Undefined Contract');
      return;
    }
    event.preventDefault();
    async function submitSeeInfo(auctionFound: Contract): Promise<void> {
      try {
        const setBidTxn = await auctionFound.seeInfo();
        const receipt = await setBidTxn.wait();
        const data = receipt.logs[0].data;
        const [ hasJudge, receivingBid, isFinalized, price] = ethers.utils.defaultAbiCoder.decode(
            ['bool' ,'bool' ,'bool' ,'uint256',], data
        )
        setAuctionFoundHasJudge(hasJudge);
        setAuctionFoundReceivingBid(receivingBid);
        setAuctionFoundIsFinalized(isFinalized);
        setAuctionFoundCurrentPrice(price.toString());
        setSeeInfoResult(true);
        alert(`Update contract info, current price is: ${price}`);
      } catch (error: any) {
        window.alert(
            'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }
    submitSeeInfo(auctionFound);
  }

  function handleFinalize(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    if(!bidSucceed) {
      window.alert('you cannot finalize this auction!');
      return;
    }
    if(!auctionFound) {
      window.alert('auction is not available');
      return;
    }
    async function submitFinalize(auctionFound: Contract): Promise<void> {
      try {
        const setBidTxn = await auctionFound.finalize();
        const receipt = await setBidTxn.wait();
        const data = receipt.logs[0].data;
        const [ succeed, addr] = ethers.utils.defaultAbiCoder.decode(
            ['bool','address' ], data)
        if(succeed) {
          if(auctionFoundHasJudge) {
            alert(`Well done!, your just finalize this auction and the seller get the Ether`);
          } else {
            alert(`Well done!, your just finalize this auction`);
          }
        } else {
          alert(`Oops, something going wrong`);
        }
      } catch (error: any) {
        window.alert(
            'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }
    submitFinalize(auctionFound);
  }

  return (
    <>
      <StyledGreetingDiv>
        <StyledLabel htmlFor="reservePriceInput">reserve price *</StyledLabel>
        <StyledInput
            id="reservePriceInput"
            type="text"
            onChange={handleReservePriceChange}
            placeholder={'please indicate the reserve price for your item>'}
            style={{ fontStyle:'italic' }}
            required></StyledInput>
        <div></div>

        <StyledLabel htmlFor="judgeAddressInput"> judge address</StyledLabel>
        <StyledInput
            id="judgeAddressInput"
            type="text"
            onChange={handleJudgeAddressChange}
            placeholder={'Optional! if not specified, no judge will intervene on this auction'}
            style={{ fontStyle:'italic' }}
        ></StyledInput>
        <div></div>

        <StyledLabel htmlFor="numBlocksAuctionOpen">block number auction open *</StyledLabel>
        <StyledInput
            id="numBlocksAuctionOpen"
            type="text"
            onChange={handleNumBlocksAuctionOpenChange}
            placeholder={'please indicate the number of block you want it opened for'}
            style={{ fontStyle:'italic' }}
            required></StyledInput>
        <div></div>

        <StyledLabel htmlFor="offerPriceDecrement">offer price decrement *</StyledLabel>
        <StyledInput
            id="offerPriceDecrement"
            type="text"
            onChange={handleOfferPriceDecrementChange}
            placeholder={'please indicate the decrement for each block'}
            style={{ fontStyle:'italic' }}
            required></StyledInput>
        <StyledDeployContractButton
          style={{
            cursor: !active || auction ? 'not-allowed' : 'pointer',
            borderColor: !active || auction ? 'unset' : 'blue'
          }}
          onClick={handleDeployContract}
        >Deploy Auction Contract</StyledDeployContractButton>
        {auction && <>
          <StyledLabel>Contract addr</StyledLabel>
          <div>
            {contractAddr ? (
                contractAddr
            ) : (
                <em>{`<Contract not yet deployed>`}</em>
            )}
          </div>
        </>}
      </StyledGreetingDiv>

      <SectionDivider />

    <StyledGreetingDiv>
      <StyledLabel htmlFor="findContractByAddress">contract address*</StyledLabel>
      <StyledInput
          id="findContractByAddress"
          type="text"
          onChange={handleFindContractByAddress}
          placeholder={'please input the address'}
          style={{ fontStyle:'italic' }}
          required></StyledInput>
      <StyledDeployContractButton
          disabled={!active}
          style={{
            cursor: !active || auction ? 'not-allowed' : 'pointer',
            borderColor: !active || auction ? 'unset' : 'blue'
          }}
          onClick={handleFindContract}
      >Find the Contract</StyledDeployContractButton>
    </StyledGreetingDiv>

      <SectionDivider />

    <StyledGreetingDiv>
      {auctionFound && <div>
        <StyledLabel>Find contract in: {auctionFoundAddr} </StyledLabel>

        <div>
          <StyledButton
               onClick={seeInfo}
          >see info of it: </StyledButton>
          {seeInfoResult &&<div>
            <div>
              <StyledLabel>{auctionFoundHasJudge ? (
                  'has a judge') : ('no judge')}</StyledLabel>
            </div>
            <div>
              <StyledLabel>{auctionFoundReceivingBid ? (
                  'receiving bid') : ('no more bid!!')}</StyledLabel>
            </div>
            <div>
              <StyledLabel>{auctionFoundIsFinalized ? (
                  'finalized!!') : ('not finalized yet')}</StyledLabel>
            </div>
            <div>current price: {auctionFoundCurrentPrice}</div>

          </div>}
        </div>
        </div> }

        <SectionDivider />

      {auctionFound && !auctionFoundIsFinalized && auctionFoundReceivingBid &&<div>
        <div>please make sure you have connected to metaMask with your account before bidding</div>
        <StyledLabel htmlFor="priceToBid">bid price* </StyledLabel>
        <StyledInput
            id="priceToBid"
            type="text"
            onChange={handlePriceToBid}
            placeholder={'please input the price'}
            required></StyledInput>
        <StyledButton
            onClick={handleBid}
        >Submit</StyledButton>
      </div>}

      {bidSucceed &&<div>
        <StyledLabel >you can finalize this auction after received the item </StyledLabel>
        <StyledButton
            onClick={handleFinalize}
        >finalize</StyledButton>
      </div>}

    </StyledGreetingDiv>
    </>
  );
}
