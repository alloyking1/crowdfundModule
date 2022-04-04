/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
export const protobufPackage = "cosmonaut.crowdfund.crowdfund";
const baseMsgLaunchCampaing = {
    creator: "",
    total: "",
    amount: "",
    deadline: "",
    fee: "",
    owner: "",
    state: "",
};
export const MsgLaunchCampaing = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.total !== "") {
            writer.uint32(18).string(message.total);
        }
        if (message.amount !== "") {
            writer.uint32(26).string(message.amount);
        }
        if (message.deadline !== "") {
            writer.uint32(34).string(message.deadline);
        }
        if (message.fee !== "") {
            writer.uint32(42).string(message.fee);
        }
        if (message.owner !== "") {
            writer.uint32(50).string(message.owner);
        }
        if (message.state !== "") {
            writer.uint32(58).string(message.state);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgLaunchCampaing };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.total = reader.string();
                    break;
                case 3:
                    message.amount = reader.string();
                    break;
                case 4:
                    message.deadline = reader.string();
                    break;
                case 5:
                    message.fee = reader.string();
                    break;
                case 6:
                    message.owner = reader.string();
                    break;
                case 7:
                    message.state = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgLaunchCampaing };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.total !== undefined && object.total !== null) {
            message.total = String(object.total);
        }
        else {
            message.total = "";
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = String(object.amount);
        }
        else {
            message.amount = "";
        }
        if (object.deadline !== undefined && object.deadline !== null) {
            message.deadline = String(object.deadline);
        }
        else {
            message.deadline = "";
        }
        if (object.fee !== undefined && object.fee !== null) {
            message.fee = String(object.fee);
        }
        else {
            message.fee = "";
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = "";
        }
        if (object.state !== undefined && object.state !== null) {
            message.state = String(object.state);
        }
        else {
            message.state = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.total !== undefined && (obj.total = message.total);
        message.amount !== undefined && (obj.amount = message.amount);
        message.deadline !== undefined && (obj.deadline = message.deadline);
        message.fee !== undefined && (obj.fee = message.fee);
        message.owner !== undefined && (obj.owner = message.owner);
        message.state !== undefined && (obj.state = message.state);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgLaunchCampaing };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.total !== undefined && object.total !== null) {
            message.total = object.total;
        }
        else {
            message.total = "";
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = object.amount;
        }
        else {
            message.amount = "";
        }
        if (object.deadline !== undefined && object.deadline !== null) {
            message.deadline = object.deadline;
        }
        else {
            message.deadline = "";
        }
        if (object.fee !== undefined && object.fee !== null) {
            message.fee = object.fee;
        }
        else {
            message.fee = "";
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = "";
        }
        if (object.state !== undefined && object.state !== null) {
            message.state = object.state;
        }
        else {
            message.state = "";
        }
        return message;
    },
};
const baseMsgLaunchCampaingResponse = {};
export const MsgLaunchCampaingResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgLaunchCampaingResponse,
        };
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
    fromJSON(_) {
        const message = {
            ...baseMsgLaunchCampaingResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgLaunchCampaingResponse,
        };
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    LaunchCampaing(request) {
        const data = MsgLaunchCampaing.encode(request).finish();
        const promise = this.rpc.request("cosmonaut.crowdfund.crowdfund.Msg", "LaunchCampaing", data);
        return promise.then((data) => MsgLaunchCampaingResponse.decode(new Reader(data)));
    }
}