#!/bin/bash -e

SPORT=$1
CONTEST_URL=$2
START_TIME=$3

UPPERCASE_SPORT=$(echo "$SPORT" | tr '[:lower:]' '[:upper:]')

schtasks /create /tn "Enter $UPPERCASE_SPORT Lineup" /tr \
  "C:\Users\Dan\Documents\DFS-Pipeline\src\enterLineup\triggerLineupEntry.sh $SPORT $CONTEST_URL" \
   /sc once /st "$START_TIME"
