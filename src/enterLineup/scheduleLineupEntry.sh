#!/bin/bash -e

SPORTS=( "$@" )

for SPORT in "${SPORTS[@]}"
do
  START_TIME=$(aws s3 cp s3://dfs-pipeline/startTimes.json - | jq -r ".${SPORT}")

  if [ "$START_TIME" != null ]
  then
    UPPERCASE_SPORT=$(echo "$SPORT" | tr '[:lower:]' '[:upper:]')
    schtasks //create //f //tn "Enter $UPPERCASE_SPORT Lineup" //tr \
     "C:\Users\Dan\Documents\DFS-Pipeline\src\enterLineup\triggerLineupEntry.sh $SPORT" //sc once //st "$START_TIME"
  fi
done
