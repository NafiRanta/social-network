#!/bin/bash -e

## build the backend docker  container
docker image build -f Dockerfile -t backend-image .
docker container run -d -p 8080:8080 --name backend-container backend-image

## Create a Dockerfile for the frontend

cp -r src/* frontend/src/
cp -r public/* frontend/public/
cp -r package*.json frontend/
cd frontend/

docker image build -f Dockerfile -t frontend-image .
docker container run -d -p 80:80 --name frontend-container frontend-image
