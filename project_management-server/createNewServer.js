const express =require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const http=require("http");
const {Server, Socket}=require("socket.io");
const dotenv=require("dotenv");
const app=express();
require("dotenv").config();

const PORT=process.env.PORT || 8071;
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:8080",
        methods:["GET","POST"],
    },
});

io.on("connection",(socket)=>{
    console.log(socket.id);

    socket.on("join_room",(data)=>{
    socket.join(data);
    console.log(`User with Id:${socket.id} joined room:${data}`)
});

socket.on("send_message",(data)=>{
    socket.to(data.room).emit("receive_message",data);
})

    socket.on("disconnect",()=>{
        console.log("User Disconnected",Socket.id);
    })
});

app.use(cors());
app.use(bodyParser.json());

const URL=process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, err => {
    if(err) throw err;
        console.log('Connected to MongoDB!!!');
});

const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDb connection suc");
})



const StaffRouter=require("./Routes/StaffRegisters.js");
const TopicsRouter=require("./Routes/StudentTopics.js");
const MSchemeRouter=require("./Routes/MarkingSchemes.js");
const EvaluateRouter=require("./Routes/PresentaionEvaluates.js");

http://localhost:8071/staffRegister
app.use("/staffRegister",StaffRouter);

http://localhost:8071/studentTopic
app.use("/studentTopic",TopicsRouter);

http://localhost:8071/markingScheme
app.use("/markingScheme",MSchemeRouter);

http://localhost:8071/presentationScheme
app.use("/presentationScheme",EvaluateRouter);

module.exports=app;