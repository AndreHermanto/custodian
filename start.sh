#!/bin/bash

if [ -d "/custodian/node_modules" ] 
then
    echo "Container already created"
    echo "Updating dependencies if required"
    npm install
    echo "Starting"
    npm start

else 
    echo "installing dependencies"
    npm install

    echo "Creating database"
    npx sequelize-cli db:create

    echo "Migrating"
    npx sequelize-cli db:migrate

    echo "Seeding"
    npx sequelize-cli db:seed:all

    echo "Starting"
    npm start
fi