const express= require('express')
const userRouter = express.Router();
const {createUser} =require('./userController')
// routes
userRouter.post("/register",createUser );
// userRouter.post("/login", loginUser);

module.exports= userRouter
