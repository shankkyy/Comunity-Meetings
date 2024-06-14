const express= require('express')
const mongoose = require('mongoose')
const userRouter= require('./user/userRoutes')
const eventRouter= require('./event/eventRoutes')
const app = express();
const cors=require('cors')
require('dotenv').config()
app.use(cors())
const bodyParser = require("body-parser");
 app.use(bodyParser.json());
app.use(express.json());

port = process.env.PORT||5000;

    mongoose.connect(process.env.URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));
    




app.use('/api/users',userRouter);
app.use('/api/events', eventRouter);


app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`)
})
