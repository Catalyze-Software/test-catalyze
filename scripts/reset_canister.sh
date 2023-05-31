#!/bin/sh

if [ $# -ne 1 ]; then
  repos=(
    "sns_event_attendees"
    "sns_profiles"
    "sns_events"
    "sns_groups"
    "sns_members"
    "sns_reports"
)
    echo "Usage: Please pass in one of the following arguments:"
    for repo in "${repos[@]}"; do
    echo - $repo
    done
  exit 1
fi

cd _test_environment/$1; 
dfx canister uninstall-code parent;
dfx canister install --wasm wasm/parent.wasm.gz parent;
