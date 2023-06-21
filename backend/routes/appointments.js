const router = require("express").Router();
const Appointment = require("../models/appointment");

router.route("/add").post((req,res)=>{

    const appointmentNo = req.body.appointmentNo;
    const maker = req.body.maker;
    const seeker = req.body.seeker;
    const subject = req.body.subject;
    const date = req.body.date;
    const time = req.body.time;
    const notes = req.body.notes;
    const category = req.body.category;
    const status = isNaN(req.body.status) ? 0 : parseInt(req.body.status);

    let newAppointment = new Appointment();
    newAppointment.appointmentNo = appointmentNo;
    newAppointment.maker = maker;
    newAppointment.seeker = seeker;
    newAppointment.subject = subject;
    newAppointment.date = date;
    newAppointment.time = time;
    newAppointment.notes = notes;
    newAppointment.category = category;
    newAppointment.status = status;
    
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
    const filter = { subject: req.params.id };
    
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

module.exports = router; 