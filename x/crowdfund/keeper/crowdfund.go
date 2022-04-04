package keeper

import (
	"encoding/binary"

	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// GetCrowdfundCount get the total number of crowdfund
func (k Keeper) GetCrowdfundCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.CrowdfundCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetCrowdfundCount set the total number of crowdfund
func (k Keeper) SetCrowdfundCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.CrowdfundCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendCrowdfund appends a crowdfund in the store with a new id and update the count
func (k Keeper) AppendCrowdfund(
	ctx sdk.Context,
	crowdfund types.Crowdfund,
) uint64 {
	// Create the crowdfund
	count := k.GetCrowdfundCount(ctx)

	// Set the ID of the appended value
	crowdfund.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrowdfundKey))
	appendedValue := k.cdc.MustMarshal(&crowdfund)
	store.Set(GetCrowdfundIDBytes(crowdfund.Id), appendedValue)

	// Update crowdfund count
	k.SetCrowdfundCount(ctx, count+1)

	return count
}

// SetCrowdfund set a specific crowdfund in the store
func (k Keeper) SetCrowdfund(ctx sdk.Context, crowdfund types.Crowdfund) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrowdfundKey))
	b := k.cdc.MustMarshal(&crowdfund)
	store.Set(GetCrowdfundIDBytes(crowdfund.Id), b)
}

// GetCrowdfund returns a crowdfund from its id
func (k Keeper) GetCrowdfund(ctx sdk.Context, id uint64) (val types.Crowdfund, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrowdfundKey))
	b := store.Get(GetCrowdfundIDBytes(id))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveCrowdfund removes a crowdfund from the store
func (k Keeper) RemoveCrowdfund(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrowdfundKey))
	store.Delete(GetCrowdfundIDBytes(id))
}

// GetAllCrowdfund returns all crowdfund
func (k Keeper) GetAllCrowdfund(ctx sdk.Context) (list []types.Crowdfund) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CrowdfundKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Crowdfund
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetCrowdfundIDBytes returns the byte representation of the ID
func GetCrowdfundIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetCrowdfundIDFromBytes returns ID in uint64 format from a byte array
func GetCrowdfundIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
