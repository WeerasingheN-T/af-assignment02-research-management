const mongoose=require("mongoose");
const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

const Schema=mongoose.Schema;
const RegisterSchema=new Schema({
    staffFirstName:{
        type:String,
        maxlength:40,
        required:true
    },

    staffLastName:{
        type:String,
        maxlength:40,
        required:true
    },

    staffId:{
        type:String,
        maxlength:8,
        required:true
    },

    imageFiles:{
        type:String
    },

    staffPosition:{
        type:String,
        required:true
    },

    staffEmail:{
        type:String,
        unique:true,
        required:true
    },

    staffPassword:{
        type:String,
        minlength:8,
        required:true
    },

})

const StaffRegister=mongoose.model("RegisterStaff",RegisterSchema);


module.exports=StaffRegister;