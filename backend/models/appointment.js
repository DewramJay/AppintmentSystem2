const { date, string, number } = require('joi');
const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    title: {
        type : String,
        required : false
    },
   
    startDate: {
        type : Date,
        required : false
    },
    endDate: {
        type : Date,
        required : false
    },
    status: {
        type : Number ,
        required : false
    },
    id: {
        type : Number ,
        required : false
    },
    maker: {
        type : String,
        required : false
    },
    seeker: {
        type : String,
        required : false
    },   
    category: {
        type : String,
        default: "zero"
    },
    makerNo: {
        type : String,
        required : false
    },
    seekerNo: {
        type : String,
        required : false
    },
    notes: {
        type : String,
        required : false
    }
})

const Appointment = mongoose.model("appointment",appointmentSchema);

module.exports = Appointment;