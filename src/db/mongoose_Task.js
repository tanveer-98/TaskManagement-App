const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/tsk-manager-api');

// TASK Schema: 
const Task = mongoose.model ('Task',{
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false,
        required:false
    }
});

const newtask1 = new Task({
    description: "Go to the washroom",
   
});

const newtask2  = new Task({
    description: "go the the bed ",
    completed : true
});

// newtask2.save()
// .then(res=>console.log("success"))
// .catch(err=>console.log(err))

newtask1.save()
.then(res=>console.log("success"))
.catch(err=>console.log(err))