#!/bin/bash -e

schtasks /create /tn "Enter NBA Lineup" /tr "C:\Users\Dan\Documents\DFS-Pipeline\src\enterLineup\triggerLineupEntry.sh nba" /sc once /st 14:41
schtasks /create /tn "Enter NHL Lineup" /tr "C:\Users\Dan\Documents\DFS-Pipeline\src\enterLineup\triggerLineupEntry.sh nhl" /sc once /st 14:41
