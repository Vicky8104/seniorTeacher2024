const express = require("express");
const mongoose=require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB Connected"))
.catch(err=>console.log(err));


// app.get("/",(req,res)=>{
//     res.send("Portal backend running....");
// });
app.listen(process.env.PORT,()=>{
    console.log("Sever running on port" + process.env.PORT);
});