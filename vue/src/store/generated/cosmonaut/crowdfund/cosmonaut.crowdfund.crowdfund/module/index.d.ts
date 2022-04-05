import { StdFee } from "@cosmjs/launchpad";
import { Registry, OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgLaunchCampaing } from "./types/crowdfund/tx";
import { MsgPledgeToken } from "./types/crowdfund/tx";
import { MsgClaimToken } from "./types/crowdfund/tx";
import { MsgWithdrawPledge } from "./types/crowdfund/tx";
export declare const MissingWalletError: Error;
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
}
interface SignAndBroadcastOptions {
    fee: StdFee;
    memo?: string;
}
declare const txClient: (wallet: OfflineSigner, { addr: addr }?: TxClientOptions) => Promise<{
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }?: SignAndBroadcastOptions) => any;
    msgLaunchCampaing: (data: MsgLaunchCampaing) => EncodeObject;
    msgPledgeToken: (data: MsgPledgeToken) => EncodeObject;
    msgClaimToken: (data: MsgClaimToken) => EncodeObject;
    msgWithdrawPledge: (data: MsgWithdrawPledge) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
