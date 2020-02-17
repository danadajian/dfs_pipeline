#!/bin/bash -e

aws ecr create-repository --region us-east-2 --repository-name dfs-optimizer

# shellcheck disable=SC2046
eval $(aws ecr get-login --region us-east-2 --no-include-email)

docker build -t dfs-optimizer .

docker tag dfs-optimizer:latest 062130427086.dkr.ecr.us-east-2.amazonaws.com/dfs-optimizer:latest

docker push 062130427086.dkr.ecr.us-east-2.amazonaws.com/dfs-optimizer:latest