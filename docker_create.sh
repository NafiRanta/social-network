#!/bin/bash -e

## build the backend docker  container
docker image buid -f Dockerfile -t backend-image .
docker container run -d -p 8080:8080 --name backend-container backend-image

## Create a Dockerfile for the frontend

cd src/

docker image buid -f Dockerfile -t frontend-image .
docker container run -d -p 80:80 --name frontend-container frontend-image
