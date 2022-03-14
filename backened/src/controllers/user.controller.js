const express = require("express");
const router = express.Router();



//Creating project model
const User = require("../models/user.model");

router.post("/create/user", async (req, res) => {
    const user = await User.create(req.body);

    return res.status(201).send(user);
})

router.post("/insertMany/user", async (req, res) => {
    const user = await User.insertMany(req.body);
    return res.status(201).send(user);
})

router.get("/all/user", async (req, res) => {
    const user = await User.find().lean().exec();

    return res.status(200).send(user);
})

router.get("/allUser/user", async (req, res) => {
    let size = +req.query.size;
    let page = +req.query.page;
    let offset = (page - 1) * size;

    const user = await User.find().skip(offset).limit(size).lean().exec();

    const totalUser = await User.find().countDocuments().lean().exec();
    let totalPage =  Math.ceil(totalUser/ size);
    // console.log(totalPage)

    return res.status(200).send({user, totalPage});
    
    
    
    
    
})


router.get("/one/user/:id", async (req, res) => {
    const user = await User.findById(req.params.id).lean().exec();

    return res.status(200).send(user);
})

router.patch("/oneUpdate/user/:id", async (req, res) => {
    // console.log("this is just test")
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true});
    
    return res.status(200).send(user);
})

router.post("/oneUpd/user/:name", async (req, res) => {
    let user = await User.findOne({name : req.params.name});


    const {taskId} = req.body;
    // console.log(taskId);
   
     user.task.push({taskId});
   
    user = await user.save();
    // const p = await User.findByIdAndUpdate(user._id, {task : t}, {new : true});
    return res.status(200).send(user);
})

router.post("/oneUpda/user/:name", async (req, res) => {
    let user = await User.findOne({name : req.params.name});
    const {taskId} = req.body;
    const d = user.task.filter((e) => {
        return e.taskId !== taskId;
    });
    user.task = d;
    user = await user.save();
    return res.status(200).send(user);
})


router.get("/all/user/user/user", async (req, res) => {
    // const user = await User.find()..lean().exec();
    let size = +req.query.size;
    let page = +req.query.page;
    let offset = (page - 1) * size;

    const user = await User.find().sort({name : 1}).skip(offset).limit(size).lean().exec();

    const totalUser = await User.find().countDocuments().lean().exec();
    let totalPage =  Math.ceil(totalUser/ size);
    // console.log(totalPage)

    return res.status(200).send({user, totalPage});

    
})

router.get("/all/user/user/desc", async (req, res) => {
    let size = +req.query.size;
    let page = +req.query.page;
    let offset = (page - 1) * size;

    const user = await User.find().sort({name : -1}).skip(offset).limit(size).lean().exec();

    const totalUser = await User.find().countDocuments().lean().exec();
    let totalPage =  Math.ceil(totalUser/ size);
    // console.log(totalPage)

    return res.status(200).send({user, totalPage});
})

router.get("/all/user/user/name/:name", async (req, res) => {
    const user = await User.find({name : req.params.name}).lean().exec();
    
    return res.status(200).send(user);
})


router.delete("/ondelete/user/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    return res.status(200).send(user);
})






// for Login user 




const jwt = require("jsonwebtoken")
require("dotenv").config();
var path = require('path');

var newToken = (user) => {
    return jwt.sign({user}, process.env.KEY);
}

const upload = require("../middlewares/file-upload");
const fs = require("fs");

// const User = require("../models/user.model");

router.post("/image/image/image/image/image/:id", upload.single("profile_picture"), async (req, res) => {
    let user = await User.findOne({_id : req.params.id});
    const patha = path.join(__dirname, "../../../frontend/public/uploads/") + user.profile_picture;
    console.log(patha);
    
    fs.unlink(patha, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
    // path.basename('/Users/Refsnes/demo_path.js');
    user.profile_picture = path.basename(req.file.path);
   user =  await user.save();
   return res.status(200).send(user);
})

router.post("/register", async (req, res) => {
    let user = await User.findOne({email: req.body.email}).lean().exec();
    if(user) {
        return res.status(400).send({status: "failed", message: "user email is already exist"});
    }
    let userCreate = await User.create(req.body);
    let token = newToken(userCreate);
    return res.status(201).send({userCreate, token});
    
})


router.post("/login", async (req, res) => {
    let user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send({status: "failed", message : "Please check your email."})
    let match = user.checkPassword(req.body.password);
    if(!match) return res.status(400).send({status: "failed", message : "Please enter your correct password"})
    let token = newToken(user);
    return res.status(200).send({token, user});
})  


router.get("/allUser", async (req, res) => {
    let users = await User.find().lean().exec();
    return res.status(200).send({users});
})

router.get("/singleUser/:id", async (req, res) => {
    let user = await User.findById({_id : req.params.id});
    // console.log(user);
    return res.status(200).send(user);
})

router.patch("/selectDev/:name", async (req, res) => {
    let user = await User.findOne({name : req.params.name});
    console.log(req.body);
    return res.status(200).send({user});

})




module.exports = router;