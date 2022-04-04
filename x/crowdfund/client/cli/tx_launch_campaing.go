package cli

import (
	"strconv"

	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdLaunchCampaing() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "launch-campaing [total] [amount] [deadline] [fee] [owner] [state]",
		Short: "Broadcast message launch-campaing",
		Args:  cobra.ExactArgs(6),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argTotal := args[0]
			argAmount := args[1]
			argDeadline := args[2]
			argFee := args[3]
			argOwner := args[4]
			argState := args[5]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgLaunchCampaing(
				clientCtx.GetFromAddress().String(),
				argTotal,
				argAmount,
				argDeadline,
				argFee,
				argOwner,
				argState,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
