# College Match Maker

## Group Members:
* Yao-lung SU
* Xueyuan Guo
* Brett Marcinkiewicz

## Download Code:
1. Create a directory and clone the repo.
``` git clone  https://github.com/BrettMarcin/College_Match_Maker.git```

## Configure Database:
Note: Please download postgresql if you haven't already: https://www.postgresql.org/download/
Instructions to set up database:
1. Start up postgres if this doesn't work please look up how to init postgres: ``` psql postgres ```
2. Create user: ``` CREATE ROLE new_user WITH LOGIN PASSWORD 'new_password' ```
3. ``` CREATE DATABASE colleges; ```
4. ``` GRANT ALL PRIVILEGES ON DATABASE colleges TO new_user; ```
5. ``` \q ```
6. ** Important: ** The master branch is configured to use the production database, change it to development.
  - Go to /models/index.js
  - There is a variable called "env" make sure it has the name 'development' after the || operator.

## Run the code:
1. Download npm
⋅⋅* https://www.npmjs.com/get-npm
2. Download dependencies ``` npm install ```
3. Run Server: ``` node index.js ```
4. Go to a web browser and go to localhost:3000

## Technologies:
* Angular.js
* Node.js
* Express.js
* Sockets.io
* Postgres
* Sequelize
* Bootstrap

## Powerpoint:
* https://drive.google.com/file/d/0Bzh3FDJ2wJwZRlBQUENlWVlyZGs/view

## Note:
* You can't edit the master branch directly. Make a new branch and make your edits and make a pull request
* Important: Once your changes are merged into the master branch, the site will automatically update.
