#!/bin/bash -e

SPORT=$1

cd ../../Users/Dan/Documents/DFS-Pipeline/src/enterLineup || exit
node.exe ./enterLineup.js "$SPORT"
