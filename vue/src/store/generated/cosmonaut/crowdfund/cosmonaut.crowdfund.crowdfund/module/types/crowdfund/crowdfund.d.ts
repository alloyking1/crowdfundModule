import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "cosmonaut.crowdfund.crowdfund";
export interface Crowdfund {
    id: number;
    total: string;
    amount: string;
    fee: string;
    deadline: string;
    state: string;
    owner: string;
    pledger: {
        [key: string]: string;
    };
}
export interface Crowdfund_PledgerEntry {
    key: string;
    value: string;
}
export declare const Crowdfund: {
    encode(message: Crowdfund, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Crowdfund;
    fromJSON(object: any): Crowdfund;
    toJSON(message: Crowdfund): unknown;
    fromPartial(object: DeepPartial<Crowdfund>): Crowdfund;
};
export declare const Crowdfund_PledgerEntry: {
    encode(message: Crowdfund_PledgerEntry, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Crowdfund_PledgerEntry;
    fromJSON(object: any): Crowdfund_PledgerEntry;
    toJSON(message: Crowdfund_PledgerEntry): unknown;
    fromPartial(object: DeepPartial<Crowdfund_PledgerEntry>): Crowdfund_PledgerEntry;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
