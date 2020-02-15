#!/bin/bash -e

schtasks /create /tn "Contest Entry" /tr \
 "C:\Users\Dan\Documents\DFS-Pipeline\src\enterLineup\triggerContestEntry.sh" /sc daily /st 8:30
schtasks /create /tn "Lineup Entry Scheduler" /tr \
 "C:\Users\Dan\Documents\DFS-Pipeline\src\enterLineup\scheduleEntry.sh" /sc daily /st 8:30
