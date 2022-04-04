import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../crowdfund/params";
import { Crowdfund } from "../crowdfund/crowdfund";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
export declare const protobufPackage = "cosmonaut.crowdfund.crowdfund";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params holds all the parameters of this module. */
    params: Params | undefined;
}
export interface QueryGetCrowdfundRequest {
    id: number;
}
export interface QueryGetCrowdfundResponse {
    Crowdfund: Crowdfund | undefined;
}
export interface QueryAllCrowdfundRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllCrowdfundResponse {
    Crowdfund: Crowdfund[];
    pagination: PageResponse | undefined;
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse;
};
export declare const QueryGetCrowdfundRequest: {
    encode(message: QueryGetCrowdfundRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetCrowdfundRequest;
    fromJSON(object: any): QueryGetCrowdfundRequest;
    toJSON(message: QueryGetCrowdfundRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetCrowdfundRequest>): QueryGetCrowdfundRequest;
};
export declare const QueryGetCrowdfundResponse: {
    encode(message: QueryGetCrowdfundResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetCrowdfundResponse;
    fromJSON(object: any): QueryGetCrowdfundResponse;
    toJSON(message: QueryGetCrowdfundResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetCrowdfundResponse>): QueryGetCrowdfundResponse;
};
export declare const QueryAllCrowdfundRequest: {
    encode(message: QueryAllCrowdfundRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllCrowdfundRequest;
    fromJSON(object: any): QueryAllCrowdfundRequest;
    toJSON(message: QueryAllCrowdfundRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllCrowdfundRequest>): QueryAllCrowdfundRequest;
};
export declare const QueryAllCrowdfundResponse: {
    encode(message: QueryAllCrowdfundResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllCrowdfundResponse;
    fromJSON(object: any): QueryAllCrowdfundResponse;
    toJSON(message: QueryAllCrowdfundResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllCrowdfundResponse>): QueryAllCrowdfundResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Parameters queries the parameters of the module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Queries a Crowdfund by id. */
    Crowdfund(request: QueryGetCrowdfundRequest): Promise<QueryGetCrowdfundResponse>;
    /** Queries a list of Crowdfund items. */
    CrowdfundAll(request: QueryAllCrowdfundRequest): Promise<QueryAllCrowdfundResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Crowdfund(request: QueryGetCrowdfundRequest): Promise<QueryGetCrowdfundResponse>;
    CrowdfundAll(request: QueryAllCrowdfundRequest): Promise<QueryAllCrowdfundResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
