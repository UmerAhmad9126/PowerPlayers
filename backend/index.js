const express = require("express");
const { connection } = require("./Configs/db");

const app = express();
require("dotenv").config();

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to Database")        
    } catch (error) {
        console.log(error.message)
    }
    console.log(`Port runnning on ${process.env.PORT}`)
})