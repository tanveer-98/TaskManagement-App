// const mongodb = require("mongodb"); //returns object
// const MongoClient = mongodb.MongoClient;
const taskData = require("./tasks.json");
const { MongoClient, ObjectID } = require("mongodb");

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());
console.log(id.id.length); // buffer size is 12
console.log("stringformat", id.toHexString());
console.log(id.toHexString().length); // buffer size is 24
// conlusion: buffer size is less for hex format
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
  const db = client.db(databaseName);

    db.collection("users").insertOne(
      {
        name: "Tanveer",
        age: 23,
      },
      (error, result) => {
        if (error) return console.log("unable to insert into database");
        console.log(result.ops); // array of document ie. the document that was inserted
        // result.ops also returns the docuement with a unique id
      }
    );

  db.collection("users").insertMany(
  [{name:"tanveer",roll:10},{name:"abhinav",roll:44}],
  (error,result)=>{
      if(error) return console.log("unable to insert into database");
      console.log(result.ops);
  }
  );

  // Challenge : insert 3 task into a new collection
  /*
1. user insretMany ot insert the document
2.setup the callback to handle error or print ops
3.run the script 
4. refresh the database in Robo 3t and view data in tasks collection


*/

  db.collection("tasks").insertMany(
    taskData,
    (error,result)=>{
      if(error) return console.log("unable to insert into database");
      console.log(result.ops);
    }
  )
  // console.log(taskData);

  // READ OPERATIONS:

  db.collection("users").findOne(
    { _id: new ObjectID("62e75bdcb0e76a19cca50c7b") },
    (error, user) => {
      if (error) return console.log("unable to find user");
      console.log(user);
    }
  );

  db.collection("users")
    .find({ age: 23 })
    .toArray((error, users) => {
      if (error) return console.log("unable to find user");
      console.log(users);
    });

  db.collection("users")
    .find({ age: 23 })
    .count((error, count) => {
      if (error) return console.log("unable to find user");
      console.log(count);
    });

  // CHALLENGE :
  //1 . use findone to fetch the last tak by its id (print doc to console)
  //2 . Use find to fetch all tasks that are not completed (print docs to console)
  //3 . test your work

  db.collection("tasks")
    .find({ completed: false })
    .toArray((error, tasks) => {
      if (error) return console.log("unable to find tasks");
      console.log(tasks);
    });

  // UPDATING DOCUMENTS
  // updateONe, updateMany

  db.collection("users")
    .updateOne(
      {
        _id: new ObjectID("62e75bdcb0e76a19cca50c7b"),
      },
      {
        $set: {
          name: "mike tyson",
        },
      }
    )
    .then(function (result) {
      console.log("updated");
    })
    .catch(function (err) {
      console.error(err);
    });
  // challenge : update all completed to true
  db.collection("tasks")
    .updateMany(
      {
        completed: false,
      },
      {
        $set: {
          completed: true,
        },
      }
    )
    .then((result) => console.log("updated"))
    .catch((error) => console.error(error));

  // DELETE OPERATION
//   db.collection("tasks")
//     .deleteMany({
//       completed: true
//     })
//     .then((result) => console.log("deleted"))
//     .catch((error) => console.error(error));
});

// document is subset of collection
// mongodb automatically creates a database , if the database is not created manually
