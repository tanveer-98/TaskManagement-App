const path = require('path')
const express = require("express"); // express is an ORM
// express acts as a middleware between nodejs and the mongodb
const taskRouter = require('./routers/task');
const userRouter = require('./routers/users');
// starting the connection using mongoose
require("./db/mongoose");
const User = require("./models/User");
const Task = require("./models/Task");

//DOTENV configuration : note u donot need to require('dotenv') in every file if you are only using .env 
//and no path is given inside config else u have 
//to write this require statement in every file as path for config will be different for  each file


console.log(process.env.NODE_ENV)
console.log(path.resolve(__dirname, `../${process.env.NODE_ENV}.env`))
const result = require('dotenv').config({ path: path.resolve(__dirname, `../${process.env.NODE_ENV}.env`) });
if(result.error)
  throw result.error;
// console.log(result.parsed)

//middlewares
const cors = require("cors");
const app = express();
const port = process.env.PORT;
app.get('env')
app.use(cors()); 

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

//

app.listen(port, () => {
  console.log("server listning on port " + port);
});

