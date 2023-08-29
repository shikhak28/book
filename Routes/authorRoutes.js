const route = require("express").Router();

const {getAuthors,addAuthors,updateAuthor,deleteAuthor,getdetail,getallbooksbyauthor} =require("../Controllers/authorController")

route.get('/getauthors',getAuthors);
route.post('/addAuthor',addAuthors);
route.put('/updateAuthor/:id',updateAuthor);
route.delete('/deleteAuthor/:id',deleteAuthor);
route.get('/getdetail/:id',getdetail);
// Get all books by an author
route.get('/getallbooksbyauthor/:id',getallbooksbyauthor);





module.exports =route;