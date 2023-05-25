#!/bin/sh

mkdir -p _test_environment

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

    # deploy canister
    (cd _test_environment/$repo; bash scripts/generate.sh; dfx deploy parent --no-wallet)
done
