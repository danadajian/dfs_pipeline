#!/bin/bash -e

SPORT=$1
cd ../../Users/Dan/Documents/DFS-Pipeline || exit
node ./enterLineup.js "$SPORT"
