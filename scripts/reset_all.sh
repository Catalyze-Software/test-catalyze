#!/bin/sh

  repos=(
    "sns_groups"
    "sns_profiles"
    "sns_members"
    "sns_event_attendees"
    "sns_events"
    "sns_reports"
)

for repo in "${repos[@]}"; do
  (
    cd _test_environment/$repo; 
    dfx canister uninstall-code parent;
    dfx canister install --wasm wasm/parent.wasm.gz parent;
  )
done
