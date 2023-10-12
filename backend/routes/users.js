const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		// Check if the email has the required domain
		// const email = req.body.email;
		// if (!email.endsWith("@engug.ruh.ac.lk")) {
		//   return res.status(400).send({ message: "Email must be from engug.ruh.ac.lk domain" });
		// }
		
		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// router.get("/getOne/:id", async (req, res) => {
// 	const filter = { _id: req.params.id };
  
// 	const data = await User.findById(filter,{password:0});
  
// 	if (data) {
// 	  return res.status(200).send({ success: true, User: data });
// 	} else {
// 	  return res.status(400).send({ success: false, msg: "Data not found" });
// 	}
//   }); 
  

  router.get("/getOne/:id", async (req, res) => {
	const filter = { email: req.params.id };
  
	const data = await User.findOne(filter,{password:0});
  
	if (data) {
	  return res.status(200).send({ success: true, User: data });
	} else {
	  return res.status(400).send({ success: false, msg: "Data not found" });
	}
  }); 

  router.get("/getName/:id", async (req, res) => {
	const filter = { regNo: req.params.id };
  
	const data = await User.findOne(filter,{password:0});
  
	if (data) {
	  return res.status(200).send({ success: true, User: data });
	} else {
	  return res.status(400).send({ success: false, msg: "Data not found" });
	}
  });  
  


  router.route("/").get((req,res)=>{
    User.find().then((users)=>{
        res.json(users)
    }).catch((err)=>{
        console.log(err)
    })
})

router.put("/:id", async (req, res) => {
	try {
	  const userId = req.params.id;
	  const userDataToUpdate = req.body;
  
	  // Validate the request body
	  const { error } = validate(userDataToUpdate);
	  if (error) {
		return res.status(400).send({ message: error.details[0].message });
	  }
  
	  // Check if the user with the given ID exists
	  const existingUser = await User.findById(userId);
	  if (!existingUser) {
		return res.status(404).send({ message: "User not found" });
	  }
  
	  // Update the user's data
	  for (const key in userDataToUpdate) {
		existingUser[key] = userDataToUpdate[key];
	  }
	  // Update other fields as needed
  
	  // If the password is being updated, hash it
	  if (userDataToUpdate.password) {
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(userDataToUpdate.password, salt);
		existingUser.password = hashPassword;
	  }
  
	  // Save the updated user data
	  await existingUser.save();
  
	  res.status(200).send({ message: "User updated successfully" });
	} catch (error) {
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });

  router.patch("/updateImage/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const { userimage } = req.body;
  
      // Find the appointment by ID and update the status
      const updatedUserImage = await User.findByIdAndUpdate(
        _id,
        { userimage },
        { new: true }
        
      );
  
      if (!updatedUserImage) {
        return res.status(404).json({ success: false, msg: "User not found" });
      }
  
      res.json({ success: true, user: updatedUserImage });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  });
  



module.exports = router;