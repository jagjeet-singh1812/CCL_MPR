const express=require('express');
const cors=require('cors');
require('dotenv').config()
const app=express();
const port=process.env.PORT||5000;
const connectDB = require('./config/db');
const { bgYellow, yellow } = require('colors');
const   Contactroute=require('./Routes/Forms/form.js');
app.use(express.json());
app.use(cors());
app.use('/api/v1/forms',Contactroute);
const start=async()=>{
await connectDB();
app.listen(port,()=>{
    console.log(`started at http://localhost:${port}/`.yellow.bold);
})
}


start(); 

