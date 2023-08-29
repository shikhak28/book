const db = require("../models/index");
const School = db.School;

const getallschoollist = async(req, res)=>{
    try{
        let alllist =  await School.findAll();
        res.status(200).send(alllist);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
    
}

const addSchool = async(req,res)=>{
    try {
        let name =req.body.name;
        let schl_info ={
            "name":req.body.name,
        }
        if(!name){
            return res.status(400).send({ message: "Name is required" });
        }
        let school_info  = await db.School.create(schl_info);
        res.status(200).send(school_info);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
}

const updateShool = async(req,res) =>{
    try{
        let id =req.body.id;
        let name =req.body.name;
        if(!name){
            return res.status(500).send({message:"Name can not be blank!"});
        }
        const detail = await School.findOne({ where: { schoolId : id} });
        let msg ="Record not found!";
        if(detail){
            await School.update({name:name},{where :{schoolId :id}})
            msg ="School name updated sucessfully!";
        }
        res.status(200).send({ message: msg });

    }catch(e){
        return res.status(500).send({message:e.message});
    }
}

const deleteSchool = async(req,res) =>{
    try{
       let id = req.params.id;
       let detail = await School.findOne({where :{schoolId :id}});
       msg="Record not found";
        if(detail){
           await School.destroy({where:{schoolId :id}});
            msg="Record deleted sucessfully";
        }
        res.status(200).send({ message: msg });

    }catch(e){
        return res.status(500).send({message:e.message});
    }
}


module.exports ={ getallschoollist ,addSchool, updateShool, deleteSchool}