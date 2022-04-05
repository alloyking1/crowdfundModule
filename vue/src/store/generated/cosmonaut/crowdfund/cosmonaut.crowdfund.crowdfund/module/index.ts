// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgLaunchCampaing } from "./types/crowdfund/tx";
import { MsgPledgeToken } from "./types/crowdfund/tx";
import { MsgClaimToken } from "./types/crowdfund/tx";
import { MsgWithdrawPledge } from "./types/crowdfund/tx";


const types = [
  ["/cosmonaut.crowdfund.crowdfund.MsgLaunchCampaing", MsgLaunchCampaing],
  ["/cosmonaut.crowdfund.crowdfund.MsgPledgeToken", MsgPledgeToken],
  ["/cosmonaut.crowdfund.crowdfund.MsgClaimToken", MsgClaimToken],
  ["/cosmonaut.crowdfund.crowdfund.MsgWithdrawPledge", MsgWithdrawPledge],
  
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgLaunchCampaing: (data: MsgLaunchCampaing): EncodeObject => ({ typeUrl: "/cosmonaut.crowdfund.crowdfund.MsgLaunchCampaing", value: MsgLaunchCampaing.fromPartial( data ) }),
    msgPledgeToken: (data: MsgPledgeToken): EncodeObject => ({ typeUrl: "/cosmonaut.crowdfund.crowdfund.MsgPledgeToken", value: MsgPledgeToken.fromPartial( data ) }),
    msgClaimToken: (data: MsgClaimToken): EncodeObject => ({ typeUrl: "/cosmonaut.crowdfund.crowdfund.MsgClaimToken", value: MsgClaimToken.fromPartial( data ) }),
    msgWithdrawPledge: (data: MsgWithdrawPledge): EncodeObject => ({ typeUrl: "/cosmonaut.crowdfund.crowdfund.MsgWithdrawPledge", value: MsgWithdrawPledge.fromPartial( data ) }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
