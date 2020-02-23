#!/bin/bash -e

SPORTS=( "$@" )

cd ../../Users/Dan/Documents/DFS-Pipeline/src/enterLineup || exit

for SPORT in "${SPORTS[@]}"
do
  START_TIME=$(aws s3 cp s3://dfs-pipeline/startTimes.json - | jq -r ".${SPORT}")

  if [ "$START_TIME" != null ]
  then
    node.exe ./enterContest.js "$SPORT" | xargs -I CONTEST_URL sh ./scheduleLineupEntry.sh "$SPORT" CONTEST_URL "$START_TIME"
  fi
done
