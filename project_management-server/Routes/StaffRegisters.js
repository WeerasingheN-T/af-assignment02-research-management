const mongoose=require("mongoose");
const router=require("express").Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const {createJWT, } = require("../authorizations/StaffRegister.js");
let StaffRegister=require("../Models/StaffRegister.js");
const Staff=require("../Models/StaffRegister");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'C:/Users/Asela/OneDrive/Documents/Research Project Management Tool/af-assignment02/research-project-management-tool/src/Photos');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });


http://localhost:8071/staffRegister/add

router.route("/add").post(upload.single('imageFiles'),async(req,res)=>{
  
    const staff=req.body;
    
    const staffEmail=await Staff.findOne({staffEmail:staff.staffEmail});

    if(staffEmail){
      res.json({message:"Email has already been taken"});
     }

    else{
         staff.staffPassword=await bcrypt.hash(req.body.staffPassword,8);

    const staffFirstName=req.body.staffFirstName;
    const staffLastName=req.body.staffLastName;
    const staffId=req.body.staffId;
    const imageFiles=req.file.filename;
    const staffPosition=req.body.staffPosition;

    const newStaff=new StaffRegister({
         
        staffFirstName,
        staffLastName,
        staffId,
        imageFiles,
        staffPosition,
        staffEmail:staff.staffEmail,

        staffPassword:staff.staffPassword
    })

    newStaff.save().then(()=>{
        res.status(200).json("Staff member added");
    }).catch((err)=>{
        console.log(err);
        res.status(500).json("Staff member is not added");
    })
  }

})

http://localhost:8071/staffRegister

router.route("/").get((req,res)=>{
    StaffRegister.find().then((StaffRegisters)=>{
        res.status(200).json(StaffRegisters);
    }).catch((err)=>{
        console.log(err);
        res.status(404).json("Not found");
    })
})

http://localhost:8071/staffRegister/update/5fsadfsad54asdfsad

router.route("/update/:id").put(async(req,res)=>{
    let staffid=req.params.id;
    const{staffFirstName,staffLastName,staffId,staffPosition,staffEmail}=req.body;

    const updateStaff={
        staffFirstName,
        staffLastName,
        staffId,
        staffPosition,
        staffEmail
    }

    const update=await StaffRegister.findByIdAndUpdate(staffid,updateStaff).then(()=>{

        res.status(200).send({status:"User updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"});
    })
})

http://localhost:8071/staffRegister/delete/5fsadfsad54asdfsad

router.route("/delete/:id").delete(async(req,res)=>{

    let staffid=req.params.id;
    await StaffRegister.findByIdAndDelete(staffid)
    .then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user",error:err.message});
    })
})

router.route("/get/:email").get(async(req,res)=>{
    const {email}=req.params;
    StaffRegister.findOne({ staffEmail: email }).then(newStaff => {
        if(newStaff){
               return res.status(200).send({message:"Staff member found",newStaff:newStaff})
        }
        else{
            return res.status(500).send("not register");
        }
    })
})

router.route("/get/staffMember/:id").get(async(req,res)=>{
    const Staffid=req.params.id;

    const staffMembers=await StaffRegister.findById(Staffid)
    .then((staffmembers)=>{
        res.status(200).send({status:"Staff Member found",staffmembers})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message})
    })

})

router.route("/login").post(async(req,res)=>{
    const {email,password} =req.body;

    StaffRegister.findOne({ staffEmail: email }).then(newStaff => {
        if (!newStaff) {
          return res.status(404).json({
            errors: [{ newStaff: "not found" }],
          });
        } else {
           bcrypt.compare(password, newStaff.staffPassword).then(isMatch => {
              if (!isMatch) {
               return res.status(400).json({ errors: [{ password:
  "incorrect" }] 
               });
              }

        let access_token = createJWT(
          newStaff.email,
          newStaff._id,
          3600
        );
        jwt.verify(access_token, `${process.env.TOKEN_SECRET}`, (err,
  decoded) => {
          if (err) {
             res.status(500).json({ erros: err });
          }
          if (decoded) {
              return res.status(200).json({
                 success: true,
                 token: access_token,
                 message: newStaff
              });
            }
          });
        
         }).catch(err => {
            res.status(500).json({ erros2: err });
         });
       }
    }).catch(err => {
       res.status(500).json({ erros: err });
    });
});

module.exports=router;


