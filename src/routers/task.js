const Task = require("../models/Task");
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

router.delete("/tasks/:id",auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id , owner: req.user._id });
    // console.log(user);
    if (!task) return res.status(404).send("Task not Found");
    res.send(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});



// GET /tasks?completed=true
// GET /tasks?limit=10&page=1

const User = require('../models/User')
router.get("/tasks", auth,async (req, res) => {
  // await Task.find({}, (err, task) => {
  //   if (!task) return res.status(404).send(err);
  //   res.status(201).send(task);
  // });
 // METHOD 1: 
  // try {
  //   const tasks = await Task.find({owner:req.user._id},{_id:1,description:1,completed:1});
  //   res.status(200).send(tasks);
  // } catch (err) {
  //   res.status(404).send(err);
  // }

  //METHOD 2:  USING POPULATE with findOne()

  // const user = await User.findOne({_id:req.user._id})
  // await user.populate('tasks');
  // return res.status(200).send(user.tasks)
 

  //METHOD 3 : POPULATE THE AUTH REQ USER
  
    // await req.user.populate('tasks')
    const completed = req.query.completed;
    const limit = req.query.limit ; 
    const page = req.query.page;

    const match = {}
     if(completed){
      match.completed = completed == 'true'
     }
    try{
      await req.user.populate({
        path : 'tasks',
        match,
        options : {
          limit : parseInt(limit),
          skip: ((parseInt(page)-1)*limit)
        }
        
      })

    }
    catch(e){
      return res.status(404).send(e.message)
    }
    
    return res.status(200).send(req.user.tasks)


  // METHOD 4 : USING FIND() -- Doesnt work with find(); 
  // const user = await User.find({"_id":req.user._id}).populate('tasks')
  // console.log(user.toObject({virtuals:true}))
  // return res.status(200).send("hello")

});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id; // no need to convert string id to object id , it's taken care by mongoose
  // Task.find({ _id })
  //   .then((tasks) => res.status(200).send(tasks))
  //   .catch((err) => res.send(err));

  try {
    const task = await Task.findOne({ _id:_id ,owner: req.user._id});
    console.log('TASK ')
    console.log(task)
    // if(task.length == 0 ) return res.status(404).send('TASK not found'); // use this line when u use find() , find returns [] if no task found
    if(!task) return res.status(404).send('TASK not found'); // findOne() returns null if no task found 

    // find returns a cursor and findOne returns document 
    
    return res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/tasks", auth, (req, res) => {
  const task = new Task({...req.body,owner:req.user._id});

  task
    .save()
    .then(() => {
      console.log("task saved");
      res.status(201).send("successfully added task");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.patch("/tasks/:id",auth,async (req, res) => {
  const updates = Object.keys(req.body);
  const valid = ["description", "completed"];
  const validateBody = updates.every((update) => valid.includes(update));
  if (!validateBody) res.status(400).send("Invalid parameters");

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    const task = await Task.findOne({_id:req.params.id,owner:req.user._id});
    // find by ID returns null if not found
    if (task == null) throw new Error("Task not found");
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
