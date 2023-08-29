const route = require("express").Router();
const { getlibrary,addLibrary,getlibrarydetail,deleteLibrary,updateLibrary,getallbooksfromlibrary } = require("../Controllers/libraryController")

route.get('/getlibrary',getlibrary);
route.post('/addLibrary',addLibrary);
route.get('/getlibrarydetail/:id',getlibrarydetail);
route.delete('/deleteLibrary/:id',deleteLibrary);
route.put('/updateLibrary/:id',updateLibrary);
route.get('/getAllBooksFromLibrary/:id',getallbooksfromlibrary)


module.exports = route;