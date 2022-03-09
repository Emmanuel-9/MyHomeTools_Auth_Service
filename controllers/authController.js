// const validator = require('validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
	try {
		const { first_name, last_name, email, phone_number, password } = req.body

		if (!(email && password && first_name && last_name && phone_number)) {
			res.status(400).send("All inputs are required")
		}

		const oldUser = await User.findOne({ email })

		if (oldUser) {
			return res.status(409).send("User already exists, Please Log In")
		}

		encryptedPassword = await bcrypt.hash(password, 10)

		const user = await User.create({
			first_name,
			last_name,
            phone_number,
			email: email.toLowerCase(),
			password: encryptedPassword,
		})

		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.JWT_SECRET,
			{
				expiresIn: "2h",
			}
		)

		user.token = token

		res.cookie("token", token, {
			sameSite: 'Lax'
		})

		console.log("token from cookie from server is ", res.cookie.token)
		console.log("token from server is ", token)

		res.status(201).json(user)
	} catch (err) {
		console.log("error",err)
	}
}

exports.logout = async ( req, res ) => {
	const cookies = new Cookies()
	return res.headers.cookie.token = null
}
