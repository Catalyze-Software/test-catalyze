#!/bin/sh

# remove all pulled repos
rm -rf _test_environment

# create folder
mkdir -p _test_environment

# create file for canister ids
touch _test_environment/testCanisterIds.ts

repos=(
    "sns_event_attendees"
    "sns_profiles"
    "sns_events"
    "sns_groups"
    "sns_members"
    "sns_reports"
)

# stop in case its running
dfx stop

# start the replica
dfx start --clean --background 

#iterate over the repositories
for repo in "${repos[@]}"; do
    # clone the repo
    git clone --depth 1 git@github.com:Oblivion-Software/$repo.git _test_environment/$repo

    # run code inside folder
    (
        # navigate to the folder
        cd _test_environment/$repo; 
        # create the parent folder (child gets automatically created)
        dfx canister create parent --no-wallet; 

        # store the canister id in a .ts file
        echo "export const $(echo "$repo")_canister_id = '$(dfx canister id parent)';" >> ../../_test_environment/testCanisterIds.ts;
        
        # install the wasm
        dfx canister install --wasm wasm/parent.wasm.gz parent;
    )
done
