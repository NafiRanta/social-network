#!/bin/bash -e

docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker rmi $(docker images -q)
docker system prune -f --volumes
# clean frontend
rm -rf frontend/src/*
rm -rf frontend/public/*
