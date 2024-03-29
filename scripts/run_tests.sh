#!/bin/bash

TOTAL_COUNT=4
SUCCESS_COUNT=0
FAIL_COUNT=0
FAILED_AT=""

bash scripts/reset_all.sh

# Function to show the test result
function show_result() {
    if [ $FAIL_COUNT -ne 0 ]; then
        echo ========================================
        echo "$FAILED_AT tests failed. Exiting with error."
        echo ========================================
        exit 1
    else
        echo ========================================
        echo "Suite passed"
        echo $SUCCESS_COUNT / $TOTAL_COUNT Suites passed
        echo ========================================
    fi
}

function handle_error() {
    FAIL_COUNT=$((FAIL_COUNT + 1))
    FAILED_AT=$1
    handle_resets $1
    show_result
}

function handle_success() {
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    echo "$1 tests passed"
    handle_resets $1
    show_result

    
}

function handle_resets() {
    if [ $1 == "profiles" ]; then
        bash scripts/reset_canister.sh sns_profiles
        bash scripts/reset_canister.sh sns_members
        # Sleep for 5 seconds to allow the canister to reset and spin up child canister
        echo "sleeping for 5 seconds.."
        sleep 5
    fi
    
    if [ $1 == "groups" ]; then
        bash scripts/reset_canister.sh sns_members
        bash scripts/reset_canister.sh sns_profiles
        bash scripts/reset_canister.sh sns_groups
        # Sleep for 5 seconds to allow the canister to reset and spin up child canister
        echo "sleeping for 5 seconds.."
        sleep 5
    fi
}

tests=(
    "identities"
    "parents"
    "profiles"
    "groups"
    )

for test in "${tests[@]}"; do
# IDENTITIES TEST
npx jest $test
if [ $? -ne 0 ]; then
    handle_error $test
    exit 1
else 
    handle_success $test
fi
done
