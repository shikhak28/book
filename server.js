const env = require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8091;
var corsOption ={
    origin:'*'
}
app.use(cors(corsOption));
app.use(express.json());
//defineing routes

app.use('/',require('./Routes/mainRoutes'));
app.use('/books',require('./Routes/bookRoutes'));
app.use('/authors',require('./Routes/authorRoutes'));
app.use('/library',require('./Routes/libraryRoutes'));
app.use('/school',require('./Routes/schoolRoutes'));



app.listen(port,()=>{
    console.log(`running on port ${port}`);
   // console.log(process);
});