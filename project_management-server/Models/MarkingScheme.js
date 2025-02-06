const mongoose=require("mongoose");
const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

const Schema=mongoose.Schema;
const MarkingsSchema=new Schema({

    EvaluationDocumentName:{
        type:String,
        maxlength:100,
        required:true
    },

    markingPaper:{
        type:String,
        required:true
    }
})

const MarkingSchema=mongoose.model("markingSchema",MarkingsSchema);


module.exports= MarkingSchema;