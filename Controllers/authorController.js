const { DataTypes } = require("sequelize");
const db = require('../models/index');
const author =db.Authors;
//const {Books,Authors,Library} = require('../models/index');


const getAuthors = async(req,res)=>{
   // res.send("get all authors");
    try{
        let alllist =  await author.findAll();
        res.status(200).send(alllist);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
    
}
const addAuthors = async(req,res)=>{
    try{
        const {name,bio} = req.body;
        if(!name || !bio){
            return res.status(400).send({message:"All feilds are required"});
        }
        let info ={
            "name":name,
            "bio":bio,
        }
        let authorinfo = await author.create(info);
        res.send(authorinfo);

    }catch(e){
        return res.status(500).send({message:e.message});
    }
}

const updateAuthor = async(req,res)=>{
    try{
        let id =req.params.id;
        const {name,bio} = req.body;
        
        //const auth = await author.findOne({where:{ authorId : id}});
        const auth = await author.findOne({ where: { authorId : id} });
        let msg =`Author detail not found ${id}`;
        if(auth){
            let authorinfo = await author.update({name:name , bio:bio },{where :{authorId :id }});
             msg ="Author detail updated sucessfully";
        }
        
        res.status(200).send({message:msg});

    }catch(e){
        return res.status(500).send({message:e.message});
    }

}

const getdetail = async(req, res)=>{
    try{
        let id =req.params.id;
        if(!id){
            return res.status(400).send({message:"Id is required to fetch."});
        }
        const auth = await author.findOne({ where: { authorId : id} });
        if(!auth){
            return res.status(400).send({message:"Record not found"});
        }else{
            res.status(200).send({result:auth});
        }

    }catch(e){
        return res.status(500).send({message:e.message});

    }
}

const deleteAuthor = async(req,res)=>{
    try{
        
        let id = req.params.id;
         if(!id){
            let msg ="Id is required";
            return res.status(400).send({message:msg});
        }
        let detail = await author.findOne({where:{authorId : id}});
        let msg ="Author detail not found";
        if(detail){
            await author.destroy({where:{authorId:id}});
             msg ="Author detail deleted sucessfully";
        }
        
        res.send({message:msg});

    }catch(e){
        return res.status(500).send({message:e.message});
    }
}
//get all books by a author
const getallbooksbyauthor = async(req,res)=>{
    try{
        let id =req.params.id;
        if(!id){
            return res.status(400).send({message:"Id is required to fetch."});
        }
        console.log("db status");
        let books = await db.Books.findAll({
            where: {
              authorId: id
            },
            attributes: ['bookId','title'],
             include: [
               {
                 model: db.Authors,
                 required: false, // Use 'false' for left join
                 attributes: ['name','authorId']
               },
               {
                model:db.Library,
                required: false, // Use 'false' for left join
                attributes: ['name','libraryId']
              }
           ], 
            
          });
          
        res.send(books);
        
        //console.log(result);

    }catch(e){

    }
}


module.exports ={getAuthors,addAuthors,updateAuthor,deleteAuthor,getdetail,getallbooksbyauthor}