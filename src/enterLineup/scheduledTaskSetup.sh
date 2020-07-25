#!/bin/bash -e

schtasks //create //f //tn "Schedule Lineup Entry" //sc daily //st 09:30 //tr \
 "C:\Users\Dan\Documents\dfs-pipeline\src\enterLineup\scheduleLineupEntry.sh mlb nfl nba nhl"
