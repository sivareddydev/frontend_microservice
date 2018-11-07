#!/bin/bash
name='microservices-frontend:1.1'
docker build -t $name .
echo "Image $name built"

