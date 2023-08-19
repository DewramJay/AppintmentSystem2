const { date, string, number } = require('joi');
const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

    appointmentNo: {
        type : String,
        required : false
    },

    maker: {
        type : String,
        required : false
    },
    makerNo: {
        type : String,
        required : false
    },
    seeker: {
        type : String,
        required : false
    },
    seekerNo: {
        type : String,
        required : false
    },
    subject: {
        type : String,
        required : false
    },
    notes: {
        type : String,
        required : false
    },
    date: {
        type : String,
        required : false
    },
    time: {
        type : String,
        required : false
    },
    category: {
        type : String,
        required : true
    },
    status: {
        type : Number,
        required : false,
        // default : 0
    }
})

const Appointment = mongoose.model("appointment",appointmentSchema);

module.exports = Appointment;