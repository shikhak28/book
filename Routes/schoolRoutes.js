const route = require("express").Router();
const {getallschoollist ,addSchool,updateShool, deleteSchool} = require("../Controllers/schoolController")

route.get('/getSchoollist',getallschoollist);
route.post('/addSchool',addSchool);
route.post('/update/',updateShool);
route.delete('/delete/:id',deleteSchool);


module.exports =route;