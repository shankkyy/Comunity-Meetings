const express= require('express')
const mongoose = require('mongoose')
const userRouter= require('./user/userRoutes')
const app = express();
const cors=require('cors')
require('dotenv').config()
app.use(cors())

app.use(express.json());

port = process.env.PORT||5000;
try {
    mongoose.connect('mongodb://0.0.0.0:27017/bookstore')

    console.log('connected to mongodb')

} catch (error) {

    console.log("error connecting to the db", error);
}



app.use('/api/users',userRouter);

app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`)
})
