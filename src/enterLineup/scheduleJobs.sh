#!/bin/bash

NBA_START_TIME=$(aws s3 cp s3://dfs-pipeline/startTimes.json - | jq -r '.nba')

NHL_START_TIME=$(aws s3 cp s3://dfs-pipeline/startTimes.json - | jq -r '.nhl')

schtasks /create /tn "Enter NBA Lineup" /tr \
 "C:\Users\Dan\Documents\DFS-Pipeline\src\enterLineup\triggerLineupEntry.sh nba" /sc once /st "$NBA_START_TIME"
schtasks /create /tn "Enter NHL Lineup" /tr \
 "C:\Users\Dan\Documents\DFS-Pipeline\src\enterLineup\triggerLineupEntry.sh nhl" /sc once /st "$NHL_START_TIME"
