const mongoose=require("mongoose");
const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

const Schema=mongoose.Schema;
const TopicsSchema=new Schema({
    GroupId:{
        type:String,
        maxlength:40,
        required:true
    },

    GroupDetails:{
        type:String,
        required:true
    },

    LeaderEmail:{
        type:String,
        unique:true,
        required:true
    },

    ResearchTopic:{
        type:String,
        maxlength:100,
        required:true
    }

})

const StudentTopic=mongoose.model("studentTopics",TopicsSchema);


module.exports=StudentTopic;