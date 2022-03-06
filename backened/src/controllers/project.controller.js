const express = require("express");
const router = express.Router();


//Creating project model
const Project = require("../models/project.model");

router.post("/create", async (req, res) => {
    const project = await Project.create(req.body);

    return res.status(201).send(project);
})

router.get("/all", async (req, res) => {
    const project = await Project.find().lean().exec();

    return res.status(200).send(project);
})

router.get("/one/:id", async (req, res) => {
    const project = await Project.findById(req.params.id).lean().exec();

    return res.status(200).send(project);
})

router.patch("/oneUpdate/:id", async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new : true});
    
    return res.status(200).send(project);
})

router.post("/oneUpd/:id/:taskId", async (req, res) => {
    let project = await Project.findOne({_id : req.params.id});
    
    const {taskId} = req.body;
    // console.log(taskId);
   
     project.task.push({taskId});
   
    project = await project.save();
    // const p = await Project.findByIdAndUpdate(req.params.id, {task : t}, {new : true});
    return res.status(200).send(project);
})

router.post("/oneUpda/:id/:taskId", async (req, res) => {
    let project = await Project.findOne({_id : req.params.id});
    const {taskId} = req.body;
    const d = project.task.filter((e) => {
        return e.taskId !== taskId;
    });
    project.task = d;
    project = await project.save();
    return res.status(200).send(project);
})


router.delete("/ondelete/:id", async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);

    return res.status(200).send(project);
})



module.exports = router;