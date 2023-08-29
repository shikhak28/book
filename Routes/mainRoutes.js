const route = require('express').Router();
const {homepage,getdetail, createUser } = require("../Controllers/mainController");

route.get('/', homepage);
route.get('/getAll', getdetail);
route.post('/add', createUser);
// route.get('/main', (req,res) => {
//     res.send('testing main page!');
// });

module.exports = route;