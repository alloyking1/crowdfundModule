/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "cosmonaut.crowdfund.crowdfund";

export interface Crowdfund {
  id: number;
  total: string;
  amount: string;
  fee: string;
  deadline: string;
  state: string;
  owner: string;
  pledger: { [key: string]: string };
}

export interface Crowdfund_PledgerEntry {
  key: string;
  value: string;
}

const baseCrowdfund: object = {
  id: 0,
  total: "",
  amount: "",
  fee: "",
  deadline: "",
  state: "",
  owner: "",
};

export const Crowdfund = {
  encode(message: Crowdfund, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.total !== "") {
      writer.uint32(18).string(message.total);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.fee !== "") {
      writer.uint32(34).string(message.fee);
    }
    if (message.deadline !== "") {
      writer.uint32(42).string(message.deadline);
    }
    if (message.state !== "") {
      writer.uint32(50).string(message.state);
    }
    if (message.owner !== "") {
      writer.uint32(58).string(message.owner);
    }
    Object.entries(message.pledger).forEach(([key, value]) => {
      Crowdfund_PledgerEntry.encode(
        { key: key as any, value },
        writer.uint32(66).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Crowdfund {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCrowdfund } as Crowdfund;
    message.pledger = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.total = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        case 4:
          message.fee = reader.string();
          break;
        case 5:
          message.deadline = reader.string();
          break;
        case 6:
          message.state = reader.string();
          break;
        case 7:
          message.owner = reader.string();
          break;
        case 8:
          const entry8 = Crowdfund_PledgerEntry.decode(reader, reader.uint32());
          if (entry8.value !== undefined) {
            message.pledger[entry8.key] = entry8.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Crowdfund {
    const message = { ...baseCrowdfund } as Crowdfund;
    message.pledger = {};
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = String(object.total);
    } else {
      message.total = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = String(object.amount);
    } else {
      message.amount = "";
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = String(object.fee);
    } else {
      message.fee = "";
    }
    if (object.deadline !== undefined && object.deadline !== null) {
      message.deadline = String(object.deadline);
    } else {
      message.deadline = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = String(object.state);
    } else {
      message.state = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.pledger !== undefined && object.pledger !== null) {
      Object.entries(object.pledger).forEach(([key, value]) => {
        message.pledger[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: Crowdfund): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.total !== undefined && (obj.total = message.total);
    message.amount !== undefined && (obj.amount = message.amount);
    message.fee !== undefined && (obj.fee = message.fee);
    message.deadline !== undefined && (obj.deadline = message.deadline);
    message.state !== undefined && (obj.state = message.state);
    message.owner !== undefined && (obj.owner = message.owner);
    obj.pledger = {};
    if (message.pledger) {
      Object.entries(message.pledger).forEach(([k, v]) => {
        obj.pledger[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Crowdfund>): Crowdfund {
    const message = { ...baseCrowdfund } as Crowdfund;
    message.pledger = {};
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = object.total;
    } else {
      message.total = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    } else {
      message.amount = "";
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = object.fee;
    } else {
      message.fee = "";
    }
    if (object.deadline !== undefined && object.deadline !== null) {
      message.deadline = object.deadline;
    } else {
      message.deadline = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.pledger !== undefined && object.pledger !== null) {
      Object.entries(object.pledger).forEach(([key, value]) => {
        if (value !== undefined) {
          message.pledger[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseCrowdfund_PledgerEntry: object = { key: "", value: "" };

export const Crowdfund_PledgerEntry = {
  encode(
    message: Crowdfund_PledgerEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Crowdfund_PledgerEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCrowdfund_PledgerEntry } as Crowdfund_PledgerEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Crowdfund_PledgerEntry {
    const message = { ...baseCrowdfund_PledgerEntry } as Crowdfund_PledgerEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(message: Crowdfund_PledgerEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<Crowdfund_PledgerEntry>
  ): Crowdfund_PledgerEntry {
    const message = { ...baseCrowdfund_PledgerEntry } as Crowdfund_PledgerEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
