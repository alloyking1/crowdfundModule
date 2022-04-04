package types

import (
	"fmt"
)

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		CrowdfundList: []Crowdfund{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated ID in crowdfund
	crowdfundIdMap := make(map[uint64]bool)
	crowdfundCount := gs.GetCrowdfundCount()
	for _, elem := range gs.CrowdfundList {
		if _, ok := crowdfundIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for crowdfund")
		}
		if elem.Id >= crowdfundCount {
			return fmt.Errorf("crowdfund id should be lower or equal than the last id")
		}
		crowdfundIdMap[elem.Id] = true
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
