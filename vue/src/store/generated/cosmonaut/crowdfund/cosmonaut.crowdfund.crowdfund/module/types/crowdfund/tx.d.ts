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
/** Msg defines the Msg service. */
export interface Msg {
    LaunchCampaing(request: MsgLaunchCampaing): Promise<MsgLaunchCampaingResponse>;
    /** this line is used by starport scaffolding # proto/tx/rpc */
    PledgeToken(request: MsgPledgeToken): Promise<MsgPledgeTokenResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    LaunchCampaing(request: MsgLaunchCampaing): Promise<MsgLaunchCampaingResponse>;
    PledgeToken(request: MsgPledgeToken): Promise<MsgPledgeTokenResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
