# Crowdfunding Module

The acceptance of blockchain technology and decentralized finance (Defi) has grown recently because of the impact Defi has made in solving many problems faced in the financial industry and beyond.

Decentralized finance does this by making financial instruments available to everyone.

A crowdfunding application built on a self-hosted blockchain is an example of making financial instruments available to everyone.
In this section, you will build a crowdfunding Cosmos SDK module using Starport.

By the end of this section, you should be able to do the following using Starport

- Scaffold a blockchain
- Scaffold a Crowdfunding module
- Scaffold a list for Crowdfunding objects
- Create the following messages to interact with the crowdfunding object
  - Launch campaign
  - Pledge tokens to a campaign
  - Claim campaign funds by the creator
  - Withdraw pledge from a campaign by the pledger
- Work with other Cosmos SDK modules
- Utilize an escrow module account

> Note: This tutorial is solely for educational purposes. You should study this and build your unique solution but do not use this code in production.

## Module Overview

### The Campaign

The campaign has the following attributes:

- uint64 `id`
- string `total`
- string `amount`
- string `fee`
- string `deadline`
- string `state`
- string `owner`
- map<string, string> `pledger`

There are two parties involved in the campaign:

- `campaign owner`
- `pledger`

### Campaign owner

The campaign owner is the user that starts a crowdfunding campaign to raise a total sum in SDK coins. The process requires the creator to make the first donation to the campaign.

### Pledger

The pledger is a user that pledges SDK coins to support the campaign

Now you have an idea of the app, let us get started.

## Scaffold the Blockchain

The first step in building the module is to scaffold the blockchain. You can scaffold a fully functional Cosmos SDK blockchain using the command below

    starport scaffold chain github.com/cosmonaut/crowdfund --no module

The `--no-module` flag added to the starport command instructs starport not to create the blockchain along with a module. We will scaffold a Crowdfunding module in the next section.

## Scaffold the Module

Next, scaffold a Crowdfunding module using the commands below.
You first need to navigate into the newly created project folder directory like this

    cd crowdfund

In the `crowdfund` directory, create a new module using the following command

    starport scaffold module crowdfund --dep bank

Modules are stored in the `x/` folder directory in starport applications. You can find our module in this directory once the scaffolding process is completed.
The `--deep bank` flag installs dependencies necessary for your module to communicate with the Cosmos SDK bank module.

## Scaffold campaign list

We will store our newly created module in an array-like data structure. To achieve this, let us scaffold the necessary code using the command below

    starport scaffold list crowdfund total amount fee deadline state owner pledger --no-message

Once the scaffolding is completed. Navigate to `proto/crowdfund.proto` file. Update the content of the file with the code below

    message Crowdfund {
      uint64 id = 1;
      string total = 2;
      string amount = 3;
      string fee = 4;
      string deadline = 5;
      string state = 6;
      string owner = 7;
      map<string, string> pledger = 8;
    }

The code we added above modifies the `pledger` data type from `string` to `map`.

## Create messages

The following messages are needed to implement the functionalities of the module.

    - Launch campaign message
    - Pledge token message
    - Claim token message
    - Cancel campaign message

### Launch Campaign Message

This message enables the user to launch a campaign requesting donations. The message should have the following fields

    - Total
    - Amount
    - Deadline
    - Fee
    - Owner
    - State

You can create the message using the command below

    starport scaffold message launch-campaign total amount deadline fee owner state

The logic of the message will be implement in `x/crowdfund/keeper/msg_server_launch_campaign.go` file.

    package keeper

    import (
        "context"
        "github.com/cosmonaut/crowdfund/x/crowdfund/types"
        sdk "github.com/cosmos/cosmos-sdk/types"
        "github.com/tendermint/tendermint/crypto"
    )

    func (k msgServer) LaunchCampaing(goCtx context.Context, msg *types.MsgLaunchCampaing) (*types.MsgLaunchCampaingResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        []: # (create a new campaign)
        var crowdfund = types.Crowdfund{
            Total:    msg.Total,
            Amount:   msg.Amount,
            Deadline: msg.Deadline,
            Fee:      msg.Fee,
            Owner:    msg.Creator,
            State:    "in-progress",
        }

        []: # (get the campaign owner address)
        owner, _ := sdk.AccAddressFromBech32(msg.Creator)

        []: # (get the module account address)
        moduleAcc := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))

        get the module account address
        amount, err := sdk.ParseCoinsNormalized(crowdfund.Amount)
        if err != nil {
            panic(err)
        }

        sdkError := k.bankKeeper.SendCoins(ctx, owner, moduleAcc, amount)
        if sdkError != nil {
            return nil, sdkError
        }

        k.AppendCrowdfund(
            ctx,
            crowdfund,
        )

        return &types.MsgLaunchCampaingResponse{}, nil
    }

To use `SendCoins()`, you need to modify `x/crowdfund/types/expected_keepers.go` and add the following

    package types

    import (
        sdk "github.com/cosmos/cosmos-sdk/types"
        "github.com/cosmos/cosmos-sdk/x/auth/types"
    )
    ...
    // BankKeeper defines the expected interface needed to retrieve account balances.
    type BankKeeper interface {
        ...
        // Methods imported from bank should be defined here
        SendCoins(ctx sdk.Context, fromAddr sdk.AccAddress, toAddr sdk.AccAddress, amt sdk.Coins) error
    }

Good job! You have created the `launch-campaign` message. To test if it works, you need to start your chain and query the message.

Start your chain using the command below

    starport chain serve

Create a campaign using the command below

    crowdfundd tx crowdfund launch-campaing 100token 20token 200 2token --from alice

Query the campaign using the command below

    crowdfundd query crowdfund list-crowdfund

`list-crowdfund` command displays a list of all the created campaings

    Crowdfund:
    - amount: 20token
      deadline: "200"
      fee: 2token
      id: "0"
      owner: cosmos1kftlkdnfrk6qmytcfrneacy7vu2qaen5ertfj9
      pledger: {}
      state: in-progress
      total: 100token
    pagination:
      next_key: null
      total: "0"

Now you have created and tested your `lauch-campaing` message.

Let us proceed to the next message. Before that, it is best practice to use git. You should commit your changes to git using the following command

    git add .
    git commit -m "launch campaing message added"

### Pledge Token Message

This message enables other users to pledge their tokens to the campaign. It needs the campaign `id` and the `amount` the user wants to pledge.

You can scaffold a message with the following details

    - id
    - amount

using the command below

    starport scaffold message pledge-token id:uint amount

The logic for the `pledge-token` message will be implemented in `x/crowdfund/keeper/msg_server_pledge_token.go` file like this

    package keeper

    import (
        "context"
        "github.com/cosmonaut/crowdfund/x/crowdfund/types"
        sdk "github.com/cosmos/cosmos-sdk/types"
        sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
        "github.com/tendermint/tendermint/crypto"
    )

    func (k msgServer) PledgeToken(goCtx context.Context, msg *types.MsgPledgeToken) (*types.MsgPledgeTokenResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        crowdfund, found := k.GetCrowdfund(ctx, msg.Id)
        if !found {
            return nil, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "key %d doesn't exist", msg.Id)
        }

        if crowdfund.State != "in-progress" {
            return nil, sdkerrors.Wrapf(types.ErrWrongCrowdfundState, "%v", crowdfund.State)
        }

        pledger, _ := sdk.AccAddressFromBech32(msg.Creator)
        amount, err := sdk.ParseCoinsNormalized(msg.Amount)
        if err != nil {
            panic(err)
        }

        moduleAcc := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))
        sdkError := k.bankKeeper.SendCoins(ctx, pledger, moduleAcc, amount)
        if sdkError != nil {
            return nil, sdkError
        }

        newModuleBalance := k.bankKeeper.GetBalance(ctx, moduleAcc, "token")

        pledgerPair := make(map[string]string)
        pledgerPair[msg.Creator] = amount.String()

        crowdfund.Pledger = pledgerPair
        crowdfund.Amount = newModuleBalance.String()

        k.SetCrowdfund(ctx, crowdfund)
        return &types.MsgPledgeTokenResponse{}, nil
    }

You need to update the `x/crowdfund/types/expected_keepers.go` file once again with the following

    ...
    // BankKeeper defines the expected interface needed to retrieve account balances.
    type BankKeeper interface {
        ...
        // module to check account balance
        GetBalance(ctx sdk.Context, addr sdk.AccAddress, denom string) sdk.Coin
    }

You also need to add `ErrWrongCrowdfundState` to `x/crowdfund/types/errors.go` file.

      ....
    // x/crowdfund module sentinel errors
    var (
          ....
        ErrWrongCrowdfundState = sdkerrors.Register(ModuleName, 1, "wrong campaing state")
    )

To test, Re-start the chain with a new database by adding the `-r` flag

    starport chain serve -r

create a new campaign

    crowdfundd tx crowdfund launch-campaing 100token 20token 200 2token --from alice

Pledge token to the campaign

    crowdfundd tx crowdfund pledge-token 0 60token --from bob

Verify that the `pledge-token` transaction was successful

    crowdfundd query crowdfund list-crowdfund

The `pledger` was updated with the `wallet address` and `amount` map of the user

    Crowdfund:
    - amount: 80token  //amount updated
      deadline: "200"
      fee: 2token
      id: "0"
      owner: cosmos1kftlkdnfrk6qmytcfrneacy7vu2qaen5ertfj9
      pledger:
        cosmos1t3cd6x4qm4vrv6vy65653r7ajuj50rttvtuhs7: 60token   //pledger and amount map
      state: in-progress
      total: 100token
    pagination:
      next_key: null
      total: "0"

Good job! Remember to commit your changes to git using the command

    git add .
    git commit -m"pledge token messae added"

### Claim Token Message

This message enables the campaign creator claim the tokens raised to the campaign. It needs the campaign `id` .

You can scaffold the message with the following details

    - id

using the command below

    starport scaffold message claim-token id:uint

The logic for the `pledge-token` message will be implemented in `x/crowdfund/keeper/msg_server_claim_token.go` file

    package keeper

    import (
        "context"
        "strconv"
        "github.com/cosmonaut/crowdfund/x/crowdfund/types"
        sdk "github.com/cosmos/cosmos-sdk/types"
        sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
        "github.com/tendermint/tendermint/crypto"
    )

    func (k msgServer) ClaimToken(goCtx context.Context, msg *types.MsgClaimToken) (*types.MsgClaimTokenResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        crowdfund, found := k.GetCrowdfund(ctx, msg.Id)
        if !found {
            return nil, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "key %d doesn't exist", msg.Id)
        }

        if crowdfund.State != "in-progress" {
            return nil, sdkerrors.Wrapf(types.ErrWrongCrowdfundState, "%v", crowdfund.State)
        }

        requester, _ := sdk.AccAddressFromBech32(msg.Creator)
        if requester.String() != crowdfund.Owner {
            return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "Cannot claim funds: not the campaing creator")
        }

        deadline, err := strconv.ParseInt(crowdfund.Deadline, 10, 64)
        if err != nil {
            panic(err)
        }
        if ctx.BlockHeight() < deadline {
            return nil, sdkerrors.Wrap(types.ErrDeadline, "Cannot claim funds before deadline")
        }

        if crowdfund.Amount == crowdfund.Total {

            moduleAcc := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))
            amount, err := sdk.ParseCoinsNormalized(crowdfund.Amount)
            if err != nil {
                panic(err)
            }

            sdkError := k.bankKeeper.SendCoins(ctx, moduleAcc, requester, amount)
            if sdkError != nil {
                return nil, sdkError
            }

            crowdfund.State = "completed"
        } else {


            return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "Cannot claim funds: campaing goal not reached")
        }

        k.SetCrowdfund(ctx, crowdfund)
        return &types.MsgClaimTokenResponse{}, nil
    }

Register `ErrDeadline` by update the `x/crowdfund/types/errors.go` file in this manner

    ....

    // x/crowdfund module sentinel errors
    var (
        ...
        ErrDeadline = sdkerrors.Register(ModuleName, 2, "deadline")
    )

Restart the chain to test

    starport chain server -r

Launch a new `campaign`

    crowdfundd tx crowdfund launch-campaing 100token 20token 200 2token --from alice

Pledge enough tokens to meet the campaign goal

    crowdfundd tx crowdfund pledge-token 0 80token --from bob

Claim tokens as the campaign creator

    crowdfundd tx crowdfund claim-token 0 --from alice

Verify changes using `list-crowdfund` command

    crowdfundd query crowdfund list-crowdfund

The campaign state is set to completed

    Crowdfund:
    - amount: 100token
      deadline: "200"
      fee: 2token
      id: "0"
      owner: cosmos10l270v64vtvlzvrurtwg0ywym49r57x8dnrd7d
      pledger:
        cosmos12mrp4dzhssq7ggv2l2caem2arm0haht7ajklsy: 80token
      state: completed
      total: 100token
    pagination:
      next_key: null
      total: "0"

Verify the creators account balance

    crowdfundd query bank balances <alice_address>

Commit changes to git

    git add .
    git commit -m "claim token message created"

### Withdraw Pledge

This message enables pledgers to withdraw their pledge if the campaign goal was not met. It needs the campaign `id` .

You can scaffold a message with the following details

    - id

using the command below

    starport scaffold message withdraw-pledge id:uint

The logic for the `withdraw-pledge` message will be implemented in `x/crowdfund/keeper/msg_server_withdraw_pledge.go` file like this

    package keeper

    import (
        "context"
        "strconv"
        "github.com/cosmonaut/crowdfund/x/crowdfund/types"
        sdk "github.com/cosmos/cosmos-sdk/types"
        sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
        "github.com/tendermint/tendermint/crypto"
    )

    func (k msgServer) WithdrawPledge(goCtx context.Context, msg *types.MsgWithdrawPledge) (*types.MsgWithdrawPledgeResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        crowdfund, found := k.GetCrowdfund(ctx, msg.Id)
        if !found {
            return nil, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "key %d doesn't exist", msg.Id)
        }

        if crowdfund.State != "in-progress" {
            return nil, sdkerrors.Wrapf(types.ErrWrongCrowdfundState, "%v", crowdfund.State)
        }

        deadline, err := strconv.ParseInt(crowdfund.Deadline, 10, 64)
        if err != nil {
            panic(err)
        }
        if ctx.BlockHeight() < deadline {
            return nil, sdkerrors.Wrap(types.ErrDeadline, "Cannot claim funds before deadline")
        }

        if crowdfund.Amount != crowdfund.Total {
            moduleAcc := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))
            amount, err := sdk.ParseCoinsNormalized(crowdfund.Pledger[msg.Creator])
            if err != nil {
                panic(err)
            }

            pledger, _ := sdk.AccAddressFromBech32(msg.Creator)

            sdkError := k.bankKeeper.SendCoins(ctx, moduleAcc, pledger, amount)
            if sdkError != nil {
                return nil, sdkError
            }

            newModuleBalance := k.bankKeeper.GetBalance(ctx, moduleAcc, "token")
            crowdfund.Amount = newModuleBalance.String()

            delete(crowdfund.Pledger, msg.Creator)

            crowdfund.State = "refund"

        } else {

            return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "Cannot claim funds: campaing goal was met")
        }

        k.SetCrowdfund(ctx, crowdfund)
        return &types.MsgWithdrawPledgeResponse{}, nil
    }

To test the newly created message, restart the chains once more

    starport chain server -r

Launch a new campaign

    crowdfundd tx crowdfund launch-campaing 100token 20token 200 2token --from alice

Pledge some tokens to the campaign

    crowdfundd tx crowdfund pledge-token 0 20token --from bob

List crowdfund to see our pledge

    crowdfundd query crowdfund list-crowdfund

Outputted result

    Crowdfund:
    - amount: 40token
      deadline: "200"
      fee: 2token
      id: "0"
      owner: cosmos1n64fs93zfzessunpnkj2se3xkl7phsr49lfnxp
      pledger:
        cosmos1zgz2vtuc83x0dxl9pd447r64rwz8zw9q97ucap: 20token
      state: in-progress
      total: 100token
    pagination:
      next_key: null
      total: "0"

Withdraw pledge token

    crowdfundd tx crowdfund withdraw-pledge 0 --from bob

Verify refund of pledge

    crowdfundd query crowdfund list-crowdfund


    Crowdfund:
    - amount: 20token
      deadline: "200"
      fee: 2token
      id: "0"
      owner: cosmos1n64fs93zfzessunpnkj2se3xkl7phsr49lfnxp
      pledger: {}
      state: refund
      total: 100token
    pagination:
      next_key: null
      total: "0"

Verify pledger account balance

    crowdfundd query bank balances <alice_address>

Commit changes to git

    git add .
    git commit -m"pledger refund message created"

### Cancel Campaign Message

This message deletes a campaign with no pledge or sets its state to cancel if there are pledges. It needs the campaign `id`.

You can scaffold the message with the following detail

    - id

using the command below

    starport scaffold message cancel-campaign id:uint

The logic for the `cancel-pledge` message will be implemented in `x/crowdfund/keeper/msg_server_cancel_campaign.go` file like this

    package keeper

    import (
        "context"
        "github.com/cosmonaut/crowdfund/x/crowdfund/types"
        sdk "github.com/cosmos/cosmos-sdk/types"
        sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
        "github.com/tendermint/tendermint/crypto"
    )

    func (k msgServer) CancelCampaign(goCtx context.Context, msg *types.MsgCancelCampaign) (*types.MsgCancelCampaignResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        crowdfund, found := k.GetCrowdfund(ctx, msg.Id)
        if !found {
            return nil, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "key %d doesn't exist", msg.Id)
        }

        requester, _ := sdk.AccAddressFromBech32(msg.Creator)
        if requester.String() != crowdfund.Owner {
            return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "Cannot claim funds: not the campaing creator")
        }

        pledger := crowdfund.Pledger
        if pledger == nil {

            moduleAcc := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))
            amount, err := sdk.ParseCoinsNormalized(crowdfund.Amount)
            if err != nil {
                panic(err)
            }

            sdkError := k.bankKeeper.SendCoins(ctx, moduleAcc, requester, amount)
            if sdkError != nil {
                return nil, sdkError
            }

            k.RemoveCrowdfund(ctx, msg.Id)
        } else {
            crowdfund.State = "cancelled"
        }

        return &types.MsgCancelCampaignResponse{}, nil
    }

## Summary

Great job. You have completed the Crowdfunding tutorial.
You implemented the following:

- Scaffold a blockchain
- Scaffold a Crowdfunding module
- Scaffold a list for Crowdfunding objects
- Create messages in your crowdfunding module to interact with the following message
  - Launch campaign
  - Pledge tokens to a campaign
  - Claim campaign funds by the creator
  - Withdraw pledge from a campaign by the pledger
  - Work with other Cosmos SDK modules
  - Utilize an escrow module account
