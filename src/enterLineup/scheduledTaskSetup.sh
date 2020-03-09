#!/bin/bash -e

schtasks /create /tn "Schedule Lineup Entry" /tr \
  "C:\Users\Dan\Documents\DFS-Pipeline\src\enterLineup\scheduleLineupEntry.sh nba nhl" /sc daily /st 9:30
