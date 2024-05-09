#!/bin/bash

rm mbta/frontend/.env
rm mbta/backend/server/.env

cp setup/frontend_env mbta/frontend/.env
cp setup/backend_env mbta/backend/server/.env

cd mbta/frontend
npm install

cd ../backend/server
npm install
