#!/bin/bash -e

schtasks /create /tn "Contest Entry" /tr "C:\Users\Dan\Documents\DFS-Pipeline\src\enterLineup\triggerContestEntry.sh nba nhl" /sc daily /st 9:30
