# College Match Maker

## Group Members:
* Yao-lung SU
* Xueyuan Guo
* Brett Marcinkiewicz

## Development:
* After you download the source code make sure you do a few things
1. Make sure you configure your local database right, look below on how to do that.
2. Make sure the under models/index.js that you are running var env = to the 'development'
3. Download dependencies ``` npm install ```
4. If you wish to just work on the front-end (Angular 4) go to the client/ directory and run ``` ng serve --proxy-config proxy.config.json ```
5. The back-end is not running so you need to run ``` node index.js ``` in another terminal window in the base directory of the project
6. Go to a web browser and go to localhost:4200

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
* Angular 4
* Node.js
* Express.js
* Sockets.io
* Postgres
* Sequelize
* Bootstrap 4

## Powerpoint:
* https://docs.google.com/presentation/d/1OUEA5dddzI0EnK8z4O-8xsqGpV44Em89cOZrlhOSFdU/edit?usp=sharing

## Note:
* You can't edit the master branch directly. Make a new branch and make your edits and make a pull request
* Important: Once your changes are merged into the master branch, the site will automatically update.
