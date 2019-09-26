FROM node:alpine

WORKDIR /app

COPY frontend/package.json frontend/package.json

RUN cd frontend && npm install

COPY frontend frontend

COPY  docker/bin/* /usr/bin/
