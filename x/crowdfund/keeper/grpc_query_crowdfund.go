package keeper

import (
	"context"

	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) CrowdfundAll(c context.Context, req *types.QueryAllCrowdfundRequest) (*types.QueryAllCrowdfundResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var crowdfunds []types.Crowdfund
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	crowdfundStore := prefix.NewStore(store, types.KeyPrefix(types.CrowdfundKey))

	pageRes, err := query.Paginate(crowdfundStore, req.Pagination, func(key []byte, value []byte) error {
		var crowdfund types.Crowdfund
		if err := k.cdc.Unmarshal(value, &crowdfund); err != nil {
			return err
		}

		crowdfunds = append(crowdfunds, crowdfund)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllCrowdfundResponse{Crowdfund: crowdfunds, Pagination: pageRes}, nil
}

func (k Keeper) Crowdfund(c context.Context, req *types.QueryGetCrowdfundRequest) (*types.QueryGetCrowdfundResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)
	crowdfund, found := k.GetCrowdfund(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetCrowdfundResponse{Crowdfund: crowdfund}, nil
}
