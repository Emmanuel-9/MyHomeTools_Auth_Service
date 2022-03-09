const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!(email && password)) {
      res.status(400).send("All inputs are required to proceed")
    }

    const user = await User.findOne({ email: req.body.email })

    if(user.isAdmin = true && (await bcrypt.compare(password, user.password)))
    {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.TOKEN_KEY,
        { 
            expiresIn: "5h" 
        }
      )

      user.token = token

      res.status(201).json(user)
    }
    res.status(400).send({ message: "Invalid Credentials" })
  } catch (err) {
    res.status(500).json(err)
  }
}
