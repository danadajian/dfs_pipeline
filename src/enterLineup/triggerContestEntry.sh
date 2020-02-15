#!/bin/bash -e

SPORTS=$1
cd ../../Users/Dan/Documents/DFS-Pipeline/src/enterLineup || exit
node ./enterContests.js "$SPORTS"
