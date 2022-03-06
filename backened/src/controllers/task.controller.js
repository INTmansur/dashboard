const express = require("express");
const router = express.Router();



const Task = require("../models/task.model");


router.post("/create/task/all", async (req, res) => {
    const task = await Task.create(req.body);

    return res.status(201).send(task);
})


router.get("/all/task/all/:id", async (req, res) => {
    const task = await Task.find({project_id : req.params.id}).lean().exec();

    return res.status(200).send(task);
})

router.get("/all/task/one/:id", async (req, res) =>{
    const task = await Task.findOne({_id : req.params.id});

    return res.status(200).send(task);
})

router.patch("/all/task/updateOne/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true}).lean().exec();

    return res.status(200).send(task);
})

router.delete("/all/task/deleteOne/:id", async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(task);
})



module.exports = router;