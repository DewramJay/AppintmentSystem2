const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

router.post("/check-password", async (req, res) => {
	try {
	  // Retrieve the user by email from the request body
	  const user = await User.findOne({ email: req.body.email });
  
	  // If the user doesn't exist, respond with an error
	  if (!user) {
		return res.status(401).send({ message: "User not found" });
	  }
  
	  // Compare the provided password with the stored hashed password
	  const validPassword = await bcrypt.compare(
		req.body.password,
		user.password
	  );
  
	  // Respond with a message indicating whether the password is correct
	  if (validPassword) {
		res.status(200).send({ message: "Password is correct" });
	  } else {
		res.status(401).send({ message: "Password is incorrect" });
	  }
	} catch (error) {
		console.error(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });

module.exports = router;
