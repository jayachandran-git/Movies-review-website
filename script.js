const express = require("express")
require("dotenv").config();
const mongoose = require('mongoose');
const app = express();
const taskRoutes = require("./routes/taskRoute");

app.use((req,res,next) =>{
    console.log(req.path, req.method);
    next();
});

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
   .then(() =>{
    app.listen(process.env.PORT, ()=>{
        console.log('DB connected successfully and listening to ' + process.env.PORT);
    });
  })
   .catch((error) => console.log(error));
   
  app.use("/api/tasks", taskRoutes);



