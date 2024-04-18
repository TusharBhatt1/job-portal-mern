const express = require("express");
const port = 3000;
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Jobs = require("./JobSchema")

//middleware
app.use(express.json());
app.use(cors());
app.use(cors());

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    console.log("CONNECTED TO DB")
   
})
  .catch((err) => {
    console.log("DB CONNECTION FAILED")
    console.log(err)
  });
app.get("/", (req, res) => {
  res.send("Hello World");
});


app.post("/post-job", async (req, res) => {
  try {
    console.log(req.body)
    const job= new Jobs(req.body)
    await job.save()
    return res.status(200).send({success:true})
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(404).send({success:false})
  }
});

app.get("/all-jobs",async(req,res)=>{
  const allJobs=await Jobs.find({})
  res.send(allJobs)
})
app.get("/getjob/:id",async(req,res)=>{
  const job= await Jobs.findById(req.params.id)
  res.send(job)
})
app.patch("/updatejob/:id",async(req,res)=>{
  try{
    await Jobs.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({success:true})
  }
  catch(err){
    res.status(500).json({success:false})
  }
 

})
app.get("/myJobs/:email",async(req,res)=>{

  const myjobs=await Jobs.find({postedBy:req.params.email})
  res.send(myjobs)
})
app.delete("/delete-post/:id",async(req,res)=>{
  try{
    const filteredJobs=await Jobs.findByIdAndDelete(req.params.id)
    res.json({success:true})
  }
  catch(err){
    res.status(403).json({success:false})
  }
  



})
app.get("/getAllJobs",async(req,res)=>{
  try{
    const allJobs=await Jobs.find({})
    const reversedJobs = allJobs.reverse();
    res.send(reversedJobs);
  }
  catch(err){
    res.status(403).json({success:false})
  }
 
})