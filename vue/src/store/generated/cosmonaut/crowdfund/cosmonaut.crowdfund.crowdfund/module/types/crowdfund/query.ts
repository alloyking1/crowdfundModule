/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Params } from "../crowdfund/params";
import { Crowdfund } from "../crowdfund/crowdfund";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";

export const protobufPackage = "cosmonaut.crowdfund.crowdfund";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

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

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryGetCrowdfundRequest: object = { id: 0 };

export const QueryGetCrowdfundRequest = {
  encode(
    message: QueryGetCrowdfundRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetCrowdfundRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetCrowdfundRequest,
    } as QueryGetCrowdfundRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetCrowdfundRequest {
    const message = {
      ...baseQueryGetCrowdfundRequest,
    } as QueryGetCrowdfundRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetCrowdfundRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetCrowdfundRequest>
  ): QueryGetCrowdfundRequest {
    const message = {
      ...baseQueryGetCrowdfundRequest,
    } as QueryGetCrowdfundRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetCrowdfundResponse: object = {};

export const QueryGetCrowdfundResponse = {
  encode(
    message: QueryGetCrowdfundResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Crowdfund !== undefined) {
      Crowdfund.encode(message.Crowdfund, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetCrowdfundResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetCrowdfundResponse,
    } as QueryGetCrowdfundResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Crowdfund = Crowdfund.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetCrowdfundResponse {
    const message = {
      ...baseQueryGetCrowdfundResponse,
    } as QueryGetCrowdfundResponse;
    if (object.Crowdfund !== undefined && object.Crowdfund !== null) {
      message.Crowdfund = Crowdfund.fromJSON(object.Crowdfund);
    } else {
      message.Crowdfund = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetCrowdfundResponse): unknown {
    const obj: any = {};
    message.Crowdfund !== undefined &&
      (obj.Crowdfund = message.Crowdfund
        ? Crowdfund.toJSON(message.Crowdfund)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetCrowdfundResponse>
  ): QueryGetCrowdfundResponse {
    const message = {
      ...baseQueryGetCrowdfundResponse,
    } as QueryGetCrowdfundResponse;
    if (object.Crowdfund !== undefined && object.Crowdfund !== null) {
      message.Crowdfund = Crowdfund.fromPartial(object.Crowdfund);
    } else {
      message.Crowdfund = undefined;
    }
    return message;
  },
};

const baseQueryAllCrowdfundRequest: object = {};

export const QueryAllCrowdfundRequest = {
  encode(
    message: QueryAllCrowdfundRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllCrowdfundRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllCrowdfundRequest,
    } as QueryAllCrowdfundRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllCrowdfundRequest {
    const message = {
      ...baseQueryAllCrowdfundRequest,
    } as QueryAllCrowdfundRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllCrowdfundRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllCrowdfundRequest>
  ): QueryAllCrowdfundRequest {
    const message = {
      ...baseQueryAllCrowdfundRequest,
    } as QueryAllCrowdfundRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllCrowdfundResponse: object = {};

export const QueryAllCrowdfundResponse = {
  encode(
    message: QueryAllCrowdfundResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Crowdfund) {
      Crowdfund.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllCrowdfundResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllCrowdfundResponse,
    } as QueryAllCrowdfundResponse;
    message.Crowdfund = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Crowdfund.push(Crowdfund.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllCrowdfundResponse {
    const message = {
      ...baseQueryAllCrowdfundResponse,
    } as QueryAllCrowdfundResponse;
    message.Crowdfund = [];
    if (object.Crowdfund !== undefined && object.Crowdfund !== null) {
      for (const e of object.Crowdfund) {
        message.Crowdfund.push(Crowdfund.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllCrowdfundResponse): unknown {
    const obj: any = {};
    if (message.Crowdfund) {
      obj.Crowdfund = message.Crowdfund.map((e) =>
        e ? Crowdfund.toJSON(e) : undefined
      );
    } else {
      obj.Crowdfund = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllCrowdfundResponse>
  ): QueryAllCrowdfundResponse {
    const message = {
      ...baseQueryAllCrowdfundResponse,
    } as QueryAllCrowdfundResponse;
    message.Crowdfund = [];
    if (object.Crowdfund !== undefined && object.Crowdfund !== null) {
      for (const e of object.Crowdfund) {
        message.Crowdfund.push(Crowdfund.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Crowdfund by id. */
  Crowdfund(
    request: QueryGetCrowdfundRequest
  ): Promise<QueryGetCrowdfundResponse>;
  /** Queries a list of Crowdfund items. */
  CrowdfundAll(
    request: QueryAllCrowdfundRequest
  ): Promise<QueryAllCrowdfundResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmonaut.crowdfund.crowdfund.Query",
      "Params",
      data
    );
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  Crowdfund(
    request: QueryGetCrowdfundRequest
  ): Promise<QueryGetCrowdfundResponse> {
    const data = QueryGetCrowdfundRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmonaut.crowdfund.crowdfund.Query",
      "Crowdfund",
      data
    );
    return promise.then((data) =>
      QueryGetCrowdfundResponse.decode(new Reader(data))
    );
  }

  CrowdfundAll(
    request: QueryAllCrowdfundRequest
  ): Promise<QueryAllCrowdfundResponse> {
    const data = QueryAllCrowdfundRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmonaut.crowdfund.crowdfund.Query",
      "CrowdfundAll",
      data
    );
    return promise.then((data) =>
      QueryAllCrowdfundResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
