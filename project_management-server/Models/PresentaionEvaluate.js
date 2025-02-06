const mongoose=require("mongoose");
const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

const Schema=mongoose.Schema;
const PresentaionSchema=new Schema({

    Nevaluate:{
        type:String,
        maxlength:40,
        required:true
    },
    
    Pmark:{
        type:String,
        required:true
    }
       
})

const PresentaionSchemas=mongoose.model("presentaionSchema",PresentaionSchema);


module.exports= PresentaionSchemas;