#!/bin/bash -e

SPORTS=("nba" "nhl")

schtasks /create /tn "Contest Entry" /tr \
 "C:\Users\Dan\Documents\DFS-Pipeline\src\enterLineup\triggerContestEntry.sh ${SPORTS[*]}" /sc daily /st 9:30
