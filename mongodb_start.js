// const mongodb = require("mongodb"); //returns object
// const MongoClient = mongodb.MongoClient;
const taskData = require("./tasks.json");
const { MongoClient, ObjectID } = require("mongodb");

// CREATING A CONNECTION

const connectionURL = "mongodb://127.0.0.1:27017";
//recommended to use 127.0.0.1 instead of locahost for better performance
const databaseName = "task-manager";
const options = {
  useNewUrlParser: true,
};
MongoClient.connect(connectionURL, options, (error, client) => {
  // asynchronous operation
  if (error) {
    return console.log("unable to connect to database");
  }
  console.log("Connection successful");
});
