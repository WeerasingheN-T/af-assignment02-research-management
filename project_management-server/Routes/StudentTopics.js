const router=require("express").Router();
const nodemailer = require("nodemailer");
let Topics=require("../Models/StudentTopic.js");
const Topic=require("../Models/StudentTopic.js");

http://localhost:8071/studentTopic/add

router.route("/add").post(async(req,res)=>{
    
    const LeaderEmail=await Topic.findOne({LeaderEmail:req.body.LeaderEmail});

    if(LeaderEmail){
      return res.status(500).json({message:"Email has already been used"});
     }

     else{

    const GroupId=req.body.GroupId;
    const GroupDetails=req.body.GroupDetails;
    const LeaderEmail=req.body.LeaderEmail;
    const ResearchTopic=req.body.ResearchTopic;

    const newTopic=new Topics({
         
        GroupId,
        GroupDetails,
        LeaderEmail,
        ResearchTopic

    })

    newTopic.save().then(()=>{
        res.status(200).json("Topic is added");
    }).catch((err)=>{
        console.log(err);
        res.status(500).json("There is an error with adding the topic");
    })
  }
})

http://localhost:8071/studentTopic

router.route("/").get((req,res)=>{
    Topic.find().then((Topic)=>{
        res.status(200).json(Topic)
    }).catch((err)=>{
        console.log(err);
        res.status(404).json("Not found")
    })
})

http://localhost:8071/studentTopic/delete/5fsadfsad54asdfsad

router.route("/delete/:id").delete(async(req,res)=>{

    let {topicid}=req.params;
    await Topic.findByIdAndDelete({topicid})
    .then(()=>{
        res.status(200).send({status:"Topic deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete topic",error:err.message});
    })
})

router.route("/sendemail/:email").get(async(req,res)=>{

    const {email}=req.params;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'thathyaniweerasinghe@gmail.com',
          pass: 'anucdexfymdzcarb'
        }
      });

        await Topic.findOne({ LeaderEmail: email }).then(newTopic => {
        if(newTopic){
           var mailOptions = {
        from: 'thathyaniweerasinghe@gmail.com',
        to: `${email}`,
        subject: 'Confirming that the research topic has been accepted.',
        text: 'I, as the supervisor, would like to inform you that I have accepted your proposed title for the 4th year project reserach.Congrats on your work going forward.Thank you.Kind Regards,Weerasinghe N.T',
        html:'<p>I, as the supervisor, would like to inform you that I have accepted your proposed title for the 4th year project reserach.</p><b>Congrats on your work going forward.</b><p>Thank you</p><p>Kind Regards,</p><p>Weerasinghe N.T</p>'
      };
       
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send({status:"Email is sent"});
        }
      });     
        }
        else{
            res.status(404).send("Email has a error");
        }
    })
         

})

module.exports=router;