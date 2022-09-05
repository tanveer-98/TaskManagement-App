const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is invalid");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) throw new Error("Invalid Age");
      },
    },
    password: {
      type: String,
      minLength: 7,
      trim: true,
      required: true,
      validate(value) {
        if (validator.contains(value.toLowerCase(), "password")) {
          //you can use a regex here

          throw new Error("Password should not contain the term Password ");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type:Buffer
    }
  },
  {
    timestamps: true,
  },
  { versionKey: false },
  // donot change the order , timestamps come before versionkey
 
);

// virual: not changing anything in the schema
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

const jwt = require("jsonwebtoken");

// UserSchema.methods// similar to UserSchame.statics

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "7days",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.getPublicData = async function () {
  // THIS GET PUBLIC DATA IS MANUAL WORK , A BETTER APPROACH IS TO USE
  // method 1:
  const user = this;
  const publicdata = ["name", "email", "age"];
  // const publicUser = {};
  // publicdata.forEach(x=>{
  //     publicUser[x] = user[x];
  // });
  // console.log(publicUser)
  // return publicUser;

  // method 2: using reducer

  // const publicUser = publicdata.reduce((obj,key)=>{
  //     return Object.assign(obj,{[key]:user[key]})
  // },{})
  // return publicUser;

  // method 3 : deleting data ;

  const userObject = user.toObject();
  // toObject : This method returns a cloned, vanilla object.
  // const userObject = user // this will just copy the reference
  console.log(typeof user);
  console.log(typeof userObject);
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

// methods.toJSON method is inbuilt

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  // toObject : This method returns a cloned, vanilla object.
  // const userObject = user // this will just copy the reference

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

// **** The main differerence between statics and methods is that methods are called on the instance of the model
// and statics can be directly called using the schama model

// Middleware : Using the  Schema static object https://riptutorial.com/mongoose/example/10574/schema-statics

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });
  //findone returns the document
  //    console.log(user)
  if (user == null) throw new Error(`Unable to login`);

  const userPassword = user.password;

  const isMatch = await bcrypt.compare(password, userPassword);
  // console.log(isMatch);
  if (isMatch) {
    console.log("Successfully logged in");
  } else throw new Error("Unable to login");
  return user;
};

// Writing a middleware to hash passwords before saving
// post : after , pre : before schema model is created .
userSchema.pre("save", async function (next) {
  const user = this; // gives a reference to the document before it's save
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log("just before saving");
  next(); // if we next call next we go the to actual flow of our application
});

// middle ware toe delete all Tasks when user is deleted
const Task = require("../models/Task");
userSchema.pre("remove", async function (next) {
  const user = this;
  const _id = user._id;
  await Task.deleteMany({ owner: _id });
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
