#!/bin/bash -e

SPORT=$1

cd ../../Users/Dan/Documents/dfs-pipeline/src/enterLineup || exit
node ./enterLineup.js "$SPORT"
