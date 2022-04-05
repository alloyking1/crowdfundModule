import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "cosmonaut.crowdfund.crowdfund";
export interface MsgLaunchCampaing {
    creator: string;
    total: string;
    amount: string;
    deadline: string;
    fee: string;
    owner: string;
    state: string;
}
export interface MsgLaunchCampaingResponse {
}
export interface MsgPledgeToken {
    creator: string;
    id: number;
    amount: string;
}
export interface MsgPledgeTokenResponse {
}
export interface MsgClaimToken {
    creator: string;
    id: number;
}
export interface MsgClaimTokenResponse {
}
export interface MsgWithdrawPledge {
    creator: string;
    id: number;
}
export interface MsgWithdrawPledgeResponse {
}
export interface MsgCancelCampaign {
    creator: string;
    id: number;
}
export interface MsgCancelCampaignResponse {
}
export declare const MsgLaunchCampaing: {
    encode(message: MsgLaunchCampaing, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgLaunchCampaing;
    fromJSON(object: any): MsgLaunchCampaing;
    toJSON(message: MsgLaunchCampaing): unknown;
    fromPartial(object: DeepPartial<MsgLaunchCampaing>): MsgLaunchCampaing;
};
export declare const MsgLaunchCampaingResponse: {
    encode(_: MsgLaunchCampaingResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgLaunchCampaingResponse;
    fromJSON(_: any): MsgLaunchCampaingResponse;
    toJSON(_: MsgLaunchCampaingResponse): unknown;
    fromPartial(_: DeepPartial<MsgLaunchCampaingResponse>): MsgLaunchCampaingResponse;
};
export declare const MsgPledgeToken: {
    encode(message: MsgPledgeToken, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgPledgeToken;
    fromJSON(object: any): MsgPledgeToken;
    toJSON(message: MsgPledgeToken): unknown;
    fromPartial(object: DeepPartial<MsgPledgeToken>): MsgPledgeToken;
};
export declare const MsgPledgeTokenResponse: {
    encode(_: MsgPledgeTokenResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgPledgeTokenResponse;
    fromJSON(_: any): MsgPledgeTokenResponse;
    toJSON(_: MsgPledgeTokenResponse): unknown;
    fromPartial(_: DeepPartial<MsgPledgeTokenResponse>): MsgPledgeTokenResponse;
};
export declare const MsgClaimToken: {
    encode(message: MsgClaimToken, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgClaimToken;
    fromJSON(object: any): MsgClaimToken;
    toJSON(message: MsgClaimToken): unknown;
    fromPartial(object: DeepPartial<MsgClaimToken>): MsgClaimToken;
};
export declare const MsgClaimTokenResponse: {
    encode(_: MsgClaimTokenResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgClaimTokenResponse;
    fromJSON(_: any): MsgClaimTokenResponse;
    toJSON(_: MsgClaimTokenResponse): unknown;
    fromPartial(_: DeepPartial<MsgClaimTokenResponse>): MsgClaimTokenResponse;
};
export declare const MsgWithdrawPledge: {
    encode(message: MsgWithdrawPledge, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgWithdrawPledge;
    fromJSON(object: any): MsgWithdrawPledge;
    toJSON(message: MsgWithdrawPledge): unknown;
    fromPartial(object: DeepPartial<MsgWithdrawPledge>): MsgWithdrawPledge;
};
export declare const MsgWithdrawPledgeResponse: {
    encode(_: MsgWithdrawPledgeResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgWithdrawPledgeResponse;
    fromJSON(_: any): MsgWithdrawPledgeResponse;
    toJSON(_: MsgWithdrawPledgeResponse): unknown;
    fromPartial(_: DeepPartial<MsgWithdrawPledgeResponse>): MsgWithdrawPledgeResponse;
};
export declare const MsgCancelCampaign: {
    encode(message: MsgCancelCampaign, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCancelCampaign;
    fromJSON(object: any): MsgCancelCampaign;
    toJSON(message: MsgCancelCampaign): unknown;
    fromPartial(object: DeepPartial<MsgCancelCampaign>): MsgCancelCampaign;
};
export declare const MsgCancelCampaignResponse: {
    encode(_: MsgCancelCampaignResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCancelCampaignResponse;
    fromJSON(_: any): MsgCancelCampaignResponse;
    toJSON(_: MsgCancelCampaignResponse): unknown;
    fromPartial(_: DeepPartial<MsgCancelCampaignResponse>): MsgCancelCampaignResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    LaunchCampaing(request: MsgLaunchCampaing): Promise<MsgLaunchCampaingResponse>;
    PledgeToken(request: MsgPledgeToken): Promise<MsgPledgeTokenResponse>;
    ClaimToken(request: MsgClaimToken): Promise<MsgClaimTokenResponse>;
    WithdrawPledge(request: MsgWithdrawPledge): Promise<MsgWithdrawPledgeResponse>;
    /** this line is used by starport scaffolding # proto/tx/rpc */
    CancelCampaign(request: MsgCancelCampaign): Promise<MsgCancelCampaignResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    LaunchCampaing(request: MsgLaunchCampaing): Promise<MsgLaunchCampaingResponse>;
    PledgeToken(request: MsgPledgeToken): Promise<MsgPledgeTokenResponse>;
    ClaimToken(request: MsgClaimToken): Promise<MsgClaimTokenResponse>;
    WithdrawPledge(request: MsgWithdrawPledge): Promise<MsgWithdrawPledgeResponse>;
    CancelCampaign(request: MsgCancelCampaign): Promise<MsgCancelCampaignResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
