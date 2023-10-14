const router = require("express").Router();
const Appointment = require("../models/appointment");
const nodemailer = require('nodemailer');
const { User } = require("../models/user");



router.route("/add").post(async (req,res)=>{


    const title = req.body.title;
    const id = isNaN(req.body.id) ? 0 : parseInt(req.body.id);
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const status = isNaN(req.body.status) ? 0 : parseInt(req.body.status);
    const maker = req.body.maker;
    const seeker = req.body.seeker;
    const category = req.body.category;
    const makerNo = req.body.makerNo;
    const seekerNo = req.body.seekerNo;
    const notes = req.body.notes;
    const cancel = isNaN(req.body.cancel) ? 0 : parseInt(req.body.cancel);

    let newAppointment = new Appointment();
    newAppointment.title = title;
    newAppointment.id = id;
    newAppointment.startDate = startDate;
    newAppointment.endDate = endDate;
    newAppointment.status = status;
    newAppointment.maker = maker;
    newAppointment.seeker = seeker;
    newAppointment.category = category;
    newAppointment.makerNo = makerNo;
    newAppointment.seekerNo = seekerNo;
    newAppointment.notes = notes;
    newAppointment.cancel = cancel;
    

/*******
 * 
 * 
 * 
 */


  
//const reciever = await User.findOne({ 'regNo': seekerNo});



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'appointmentmanagementsystem56@gmail.com',
    pass: 'kuqshjlrxfuazyct'
  }
});



const mailOptions = {
  from: 'appointmentmanagementsystem56@gmail.com',
  to: seekerNo,
  subject: 'New appointment received',
  text: 'There is a new appointment at ' + startDate
};

if (seekerNo) { // Check if seekerNo is not null
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });
}


/*** */


    newAppointment.save().then(()=>{
        res.json("Appointment created")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{
    Appointment.find().then((appointments)=>{
        res.json(appointments)
    }).catch((err)=>{
        console.log(err)
    })
})


router.get("/getOne/:id", async (req, res) => {
    const filter = { time: req.params.id };
  
    const data = await Appointment.findOne(filter);
  
    if (data) {
      return res.status(200).send({ success: true, Appointment: data });
    } else {
      return res.status(400).send({ success: false, msg: "Data not found" });
    }
  }); 

  router.get("/getOne1/:id", async (req, res) => {
    const filter = { _id: req.params.id };
    
    const data = await Appointment.findOne(filter);
    
    if (data) {
      return res.status(200).send({ success: true, Appointment: data });
    } else {
      return res.status(400).send({ success: false, msg: "Data not found" });
    }
    }); 
  
  router.get("/get", async (req, res) => {


    const filter = { date: req.query.date };
  
    const data = await Appointment.find(filter);
  
    if (data) {
      return res.status(200).send({ success: true, Appointment: data });
    } else {
      return res.status(400).send({ success: false, msg: "Data not found" });
    }
  }); 

  // router.get("/getOne/:id", async (req, res) => {
  //   const filter = { _id: req.params.id };
  //   alert(filter);
  //   const data = await Appointment.findOne(filter);
    
  //   if (data) {
  //     return res.status(200).send({ success: true, Appointment: data });
  //   } else {
  //     return res.status(400).send({ success: false, msg: "Data not found" });
  //   }
  //   }); 

  router.patch("/update/:id", async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const { status } = req.body;
  
      // Find the appointment by ID and update the status
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { status },
        { new: true }


        
      );
  
      if (!updatedAppointment) {
        return res.status(404).json({ success: false, msg: "Appointment not found" });
      }
  
      res.json({ success: true, appointment: updatedAppointment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }




  });


  //update cancel notification
  router.patch("/updateCancel/:id", async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const { cancel } = req.body;
  
      // Find the appointment by ID and update the status
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { cancel },
        { new: true }
      );
  
      if (!updatedAppointment) {
        return res.status(404).json({ success: false, msg: "Appointment not found" });
      }
  
      res.json({ success: true, appointment: updatedAppointment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  });



router.put("/updateAll/:updateId", async (req, res) => {
  const filter = { _id: req.params.updateId };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await Appointment.findOneAndUpdate(
      filter,
      {
        title: req.body.title,
        id: parseInt(req.body.id),
        maker: req.body.maker,
        seeker: req.body.seeker,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        category: req.body.category,
        status: parseInt(req.body.status),
        makerNo: req.body.makerNo,
        seekerNo: req.body.seekerNo,
        notes: req.body.notes,
      },
      options
    );

    // Send email notification after successfully updating the appointment
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'appointmentmanagementsystem56@gmail.com',
        pass: 'kuqshjlrxfuazyct'
      }
    });

    const mailOptions = {
      from: 'appointmentmanagementsystem56@gmail.com',
      to: req.body.makerNo, // Use the updated email address if necessary
      subject: 'Appointment Updated',
      text: 'Your appointment with' + req.body.seeker + 'have been updated.'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        // Do something useful after sending the email
      }
    });

    res.status(200).send({ appointment: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});



  router.route("/delete/:Id").delete(async(req,res)=>{
    let _id = req.params.Id;
  
    await Appointment.findOneAndDelete({ _id })
    .then (()=>{
        res.status(200).send({status: "Item is Deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting data"});
    })
  
  });
  





module.exports = router; 