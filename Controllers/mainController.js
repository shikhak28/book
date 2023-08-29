const db = require("../models/index");
const User = db.users;

const getdetail = async(req , res) =>{
    //res.send("get main detail");
    let alluser = await User.findAll();
  
    res.status(200).send(alluser);

}

const createUser = async(req , res) =>{
    let info = {
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
    }
   // console.log(req);
    let newuser = await User.create(info);
    res.status(200).send(newuser);

}
const homepage = (req, res) =>{
    res.send("get home page");
}
module.exports ={getdetail,createUser,homepage};