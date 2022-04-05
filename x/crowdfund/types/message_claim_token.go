package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgClaimToken = "claim_token"

var _ sdk.Msg = &MsgClaimToken{}

func NewMsgClaimToken(creator string, id uint64) *MsgClaimToken {
	return &MsgClaimToken{
		Creator: creator,
		Id:      id,
	}
}

func (msg *MsgClaimToken) Route() string {
	return RouterKey
}

func (msg *MsgClaimToken) Type() string {
	return TypeMsgClaimToken
}

func (msg *MsgClaimToken) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgClaimToken) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgClaimToken) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
