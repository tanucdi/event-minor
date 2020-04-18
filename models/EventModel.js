const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const eventSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    event_date:{
        type:String,
        required:true
    },
    creation_date:{
        type:Date,
        default:Date.now
    },
    event_time:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

module.exports=Event=mongoose.model('event',eventSchema);