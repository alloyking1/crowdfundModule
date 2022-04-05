package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgPledgeToken = "pledge_token"

var _ sdk.Msg = &MsgPledgeToken{}

func NewMsgPledgeToken(creator string, id uint64, amount string) *MsgPledgeToken {
	return &MsgPledgeToken{
		Creator: creator,
		Id:      id,
		Amount:  amount,
	}
}

func (msg *MsgPledgeToken) Route() string {
	return RouterKey
}

func (msg *MsgPledgeToken) Type() string {
	return TypeMsgPledgeToken
}

func (msg *MsgPledgeToken) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgPledgeToken) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgPledgeToken) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
