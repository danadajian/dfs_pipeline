#!/bin/bash -e

SPORT=$1
CONTEST_URL=$2

cd ../../Users/Dan/Documents/DFS-Pipeline/src/enterLineup || exit
node ./enterLineup.js "$SPORT" "$CONTEST_URL"
