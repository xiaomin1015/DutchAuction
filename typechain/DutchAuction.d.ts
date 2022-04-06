/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface DutchAuctionInterface extends ethers.utils.Interface {
  functions: {
    "addressToAmountBid(address)": FunctionFragment;
    "bid()": FunctionFragment;
    "bidders(uint256)": FunctionFragment;
    "finalize()": FunctionFragment;
    "getPrice()": FunctionFragment;
    "judge()": FunctionFragment;
    "nop()": FunctionFragment;
    "owner()": FunctionFragment;
    "refund()": FunctionFragment;
    "seeInfo()": FunctionFragment;
    "winner()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addressToAmountBid",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "bid", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "bidders",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "finalize", values?: undefined): string;
  encodeFunctionData(functionFragment: "getPrice", values?: undefined): string;
  encodeFunctionData(functionFragment: "judge", values?: undefined): string;
  encodeFunctionData(functionFragment: "nop", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "refund", values?: undefined): string;
  encodeFunctionData(functionFragment: "seeInfo", values?: undefined): string;
  encodeFunctionData(functionFragment: "winner", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "addressToAmountBid",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "bid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bidders", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "finalize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "judge", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nop", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "refund", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "seeInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "winner", data: BytesLike): Result;

  events: {
    "BidEvent(bool,address,uint256)": EventFragment;
    "BidFailed(bool,address,uint256)": EventFragment;
    "FinalizeEvent(bool,address)": EventFragment;
    "Info(bool,bool,bool,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BidEvent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BidFailed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FinalizeEvent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Info"): EventFragment;
}

export type BidEventEvent = TypedEvent<
  [boolean, string, BigNumber] & {
    succeed: boolean;
    bidder: string;
    value: BigNumber;
  }
>;

export type BidFailedEvent = TypedEvent<
  [boolean, string, BigNumber] & {
    succeed: boolean;
    bidder: string;
    value: BigNumber;
  }
>;

export type FinalizeEventEvent = TypedEvent<
  [boolean, string] & { succeed: boolean; winnerOrJudge: string }
>;

export type InfoEvent = TypedEvent<
  [boolean, boolean, boolean, BigNumber] & {
    hasJudge: boolean;
    isReceivingBid: boolean;
    isFinalized: boolean;
    price: BigNumber;
  }
>;

export class DutchAuction extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: DutchAuctionInterface;

  functions: {
    addressToAmountBid(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    bid(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    bidders(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    finalize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    judge(overrides?: CallOverrides): Promise<[string]>;

    nop(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    refund(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    seeInfo(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    winner(overrides?: CallOverrides): Promise<[string]>;
  };

  addressToAmountBid(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  bid(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  bidders(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  finalize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getPrice(overrides?: CallOverrides): Promise<BigNumber>;

  judge(overrides?: CallOverrides): Promise<string>;

  nop(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  refund(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  seeInfo(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  winner(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    addressToAmountBid(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    bid(overrides?: CallOverrides): Promise<string>;

    bidders(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    finalize(overrides?: CallOverrides): Promise<void>;

    getPrice(overrides?: CallOverrides): Promise<BigNumber>;

    judge(overrides?: CallOverrides): Promise<string>;

    nop(overrides?: CallOverrides): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    refund(overrides?: CallOverrides): Promise<void>;

    seeInfo(overrides?: CallOverrides): Promise<void>;

    winner(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "BidEvent(bool,address,uint256)"(
      succeed?: null,
      bidder?: null,
      value?: null
    ): TypedEventFilter<
      [boolean, string, BigNumber],
      { succeed: boolean; bidder: string; value: BigNumber }
    >;

    BidEvent(
      succeed?: null,
      bidder?: null,
      value?: null
    ): TypedEventFilter<
      [boolean, string, BigNumber],
      { succeed: boolean; bidder: string; value: BigNumber }
    >;

    "BidFailed(bool,address,uint256)"(
      succeed?: null,
      bidder?: null,
      value?: null
    ): TypedEventFilter<
      [boolean, string, BigNumber],
      { succeed: boolean; bidder: string; value: BigNumber }
    >;

    BidFailed(
      succeed?: null,
      bidder?: null,
      value?: null
    ): TypedEventFilter<
      [boolean, string, BigNumber],
      { succeed: boolean; bidder: string; value: BigNumber }
    >;

    "FinalizeEvent(bool,address)"(
      succeed?: null,
      winnerOrJudge?: null
    ): TypedEventFilter<
      [boolean, string],
      { succeed: boolean; winnerOrJudge: string }
    >;

    FinalizeEvent(
      succeed?: null,
      winnerOrJudge?: null
    ): TypedEventFilter<
      [boolean, string],
      { succeed: boolean; winnerOrJudge: string }
    >;

    "Info(bool,bool,bool,uint256)"(
      hasJudge?: null,
      isReceivingBid?: null,
      isFinalized?: null,
      price?: null
    ): TypedEventFilter<
      [boolean, boolean, boolean, BigNumber],
      {
        hasJudge: boolean;
        isReceivingBid: boolean;
        isFinalized: boolean;
        price: BigNumber;
      }
    >;

    Info(
      hasJudge?: null,
      isReceivingBid?: null,
      isFinalized?: null,
      price?: null
    ): TypedEventFilter<
      [boolean, boolean, boolean, BigNumber],
      {
        hasJudge: boolean;
        isReceivingBid: boolean;
        isFinalized: boolean;
        price: BigNumber;
      }
    >;
  };

  estimateGas: {
    addressToAmountBid(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    bid(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    bidders(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    finalize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getPrice(overrides?: CallOverrides): Promise<BigNumber>;

    judge(overrides?: CallOverrides): Promise<BigNumber>;

    nop(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    refund(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    seeInfo(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    winner(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addressToAmountBid(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    bid(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    bidders(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    finalize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    judge(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nop(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    refund(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    seeInfo(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    winner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}