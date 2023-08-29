const route = require('express').Router();
const {getallbooks,addBooks,updateBooks,deleteBook,getbookdetail
} = require("../Controllers/booksController");

route.get('/getAllbooks', getallbooks);
route.post('/addbooks', addBooks);
route.get('/getbookdetail/:id', getbookdetail);
route.put('/updateBook/:id', updateBooks);
route.delete('/deleteBook/:id', deleteBook);


// Get all books in a library
// Get all books available in a school's library
// Get all books authored by an author from a specific school

module.exports =route;