const db = require("../models/index");
const Books = db.Books;

const getallbooks = async (req,res)=>{
    try{
        let booklist = await Books.findAll();
        if(booklist){
            res.status(200).send(booklist);
        }
    }catch(e){
        return res.status(500).send({ message: e.message });
    }
    
}

const addBooks = async(req,res)=>{
    try{
        const {title,authorid,libraryid} = req.body;
        if(!title || !authorid){
            return res.status(400).send({message:"All feilds are required"});
        }
        
        // Check the number of books with the name 
        const count = await Books.count({ where: { title: title }});
        if (count > 0) {
            
            return res.status(400).send({message:`Book title with ${title } already exist.`});
        } 
        let info ={
            "title":title,
            "authorId":authorid,
            "libraryid":libraryid,
        }
        let bookinfo = await Books.create(info);
        res.status(200).send(bookinfo);

    }catch(e){
        return res.status(500).send({message:e.message});
    }
}

const updateBooks =async(req,res)=>{
    try{
        let id =req.params.id;
        const {title,authorid,libraryid}=req.body;
        if(!id){
            return res.status(400).send({message:"Id is required to update."});
        }
        let bookinfo = await Books.findOne({where:{bookId:id}});
        if(!bookinfo){
            return res.status(400).send({message:"Record not found"});
        }
        await Books.update({title:title ,authorId:authorid,libraryId:libraryid},{where:{bookId:id}});
        let msg ="Book detail updated succesfully";
        res.status(200).send({message:msg});

    }catch(e){
        res.status(500).send({message:e.message});
    }
}

const deleteBook = async(req,res)=>{
    try{
        let id =req.params.id;
        if(!id){
            return res.status(400).send({message:"Id is required to delete."});
        }
        let bookinfo = await Books.findOne({where:{bookId:id}});
        if(!bookinfo){
            return res.status(400).send({message:"Record not found"});
        }else{
            await Books.destroy({where:{bookId:id}});
            let msg ="Book deleted sucessfully";
            res.status(200).send({message:msg});
        }

    }catch(e){
        res.status(500).send({message:e.message});

    }
} 
const getbookdetail = async(req,res)=>{
    try{
        let id =req.params.id;
        if(!id){
            return res.status(400).send({message:"Id is required to fetch."});
        }
        let bookinfo = await Books.findOne({where:{bookId:id}});
        if(!bookinfo){
            return res.status(400).send({message:"Record not found"});
        }else{
            res.status(200).send({result:bookinfo});
        }

    }catch(e){
        res.status(500).send({message:e.message});

    }
}




module.exports ={getallbooks,addBooks,updateBooks,deleteBook,getbookdetail}