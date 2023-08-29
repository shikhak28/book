const{DataTypes}=require("sequelize");
const db = require("../models/index");
const library =db.Library;

const getlibrary = async (req,res)=>{
    try{
        let info = await library.findAll();
        res.status(200).send(info);

    }catch(e){
        res.status(500).send({messege:e.messege});
    }
    
}

const addLibrary = async(req,res)=>{
    try{
        const {name,location}=req.body;
        if(!name || !location){
            return res.status(400).send({messege:"All feilds are required."});
        }
        let info ={
            name:name,
            location:location
        }
        let librarydetail = await library.create(info);
        res.status(200).send(librarydetail);
    }catch(e){
        res.status(500).send({messege:e.messege});
    }
}

const getlibrarydetail = async(req,res)=>{
    try{
        let id = req.params.id;
       
        let libraryinfo  = await library.findOne({where:{libraryId:id}});
        if(!libraryinfo){
            return res.status(400).send({message:"Record not found"});
        }else{
            res.status(200).send({result:libraryinfo});
        }

    }catch(e){
        res.status(500).send({messege:e.messege});
    }
}

const deleteLibrary = async(req,res)=>{
    try{
        let id = req.params.id;
        if(!id){
            return res.status(400).send({message:"Id is required to delete."});
        }
        let libraryinfo  = await library.findOne({where:{libraryId:id}});
        if(!libraryinfo){
            return res.status(400).send({message:"Record not found"});
        }else{
            await library.destroy({where:{libraryId:id}});
            res.status(200).send({message:"Record Deleted successfully!"});
        }

    }catch(e){
        res.status(500).send({messege:e.messege});
    }
}

const updateLibrary = async(req,res)=>{
    try{
        let id = req.params.id;
        const {name,location} =req.body;
        if(!id){
            return res.status(400).send({message:"Id is required to update."});
        }
        let libraryinfo  = await library.findOne({where:{libraryId:id}});
        if(!libraryinfo){
            return res.status(400).send({message:"Record not found"});
        }else{
            if (name !== undefined && name.trim() === '') {
                return res.status(400).send({message:"name can not be blank."});
            }
            if (location !== undefined && location.trim() === '') {

                return res.status(400).send({message:"location can not be blank."});
            }
            let data = await library.update({name:name, location:location},{where:{libraryId:id}})
            res.status(200).send({message:`Record updated successfully!${data}`});
        }
    }catch(e){
        res.status(500).send({messege:e.messege});
    }
}
//get all books from a library
const getallbooksfromlibrary = async(req,res)=> {
    try{
        let libraryId =req.params.id;
        if(!libraryId){
            return res.status(400).send({message:"Id is required to fetch."});
        }
        const books = await library.findAll({
            where: {
              libraryId: libraryId
            },
            attributes: ['name','location'],
            include: [
                {
                    model: db.Books,
                    required: false, // Use 'false' for left join
                    attributes: ['title'],
                        include: [
                            {
                            model: db.Authors,
                            attributes: ['name']
                            }
                        ]
                },
                
            ],
        });

       /*  const query = `
        SELECT l.name, l.location, b.title, a.name as authorName, a.authorId
        FROM libraries l
        LEFT JOIN books b ON l.libraryId = b.libraryId
        LEFT JOIN authors a ON b.authorId = a.authorId
        WHERE l.libraryId = :libraryId
        `;

        const booksInLibrary = await db.sequelize.query(query, {
        replacements: { libraryId: libraryId },
        type: db.sequelize.QueryTypes.SELECT,
        }); */

        res.send(books);

    }catch(e){
        res.status(500).send({message:e.message});

    }
}
module.exports ={getlibrary,addLibrary,getlibrarydetail,deleteLibrary,updateLibrary,getallbooksfromlibrary }