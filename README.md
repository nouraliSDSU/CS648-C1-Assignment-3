
## Initial Step

Go to Api folder and run `npm  install` to install all the dependencies.\
Go to Ui folder and run `npm  install` to install all the dependencies.

## MongoDB reset

From Api folder, you can run `mongosh "mongodb+srv://cluster0.txcqn.mongodb.net/Inventory" --apiVersion 1 --username nour scripts/init.mongo.js` and enter password as `Hassan56` to reset the database with two products added initially.

## Development server

Go to Api folder and run `npm start server.js` to bring up the Api server.\
Go to Ui folder and run `npm start .\uiserver.js` to bring up the UI.\
Now Navigate to `http://localhost:8000/` to interact with the application.

## GraphQL Playground

After starting Development Server using previous step, open `http://localhost:3000/graphql` to interact with the API using GraphQL Playground.

## Compile Watch Mode

Go to UI folder and run `npm run watch` to make babel watch for changes in files. Make any changes and refresh the browser, the changes will be reflected. Make sure you have started the server as per the previous step.


## Lint check

To check for lint issues, go to Api and Ui folder and run `npm run lint` to get the linting issues in the respective folders.