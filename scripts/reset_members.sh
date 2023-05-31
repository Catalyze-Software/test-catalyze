#!/bin/bash

# Check if the number of arguments is correct
if [ $# -ne 1 ]; then
  echo "Usage: $0 <arg1> <arg2>"
  exit 1
fi

# Assign the arguments to variables
arg1=$1
arg2=$2

# Display the arguments
echo "Argument 1: $arg1"
echo "Argument 2: $arg2"

# Add more code here to perform operations using the arguments
# ...

