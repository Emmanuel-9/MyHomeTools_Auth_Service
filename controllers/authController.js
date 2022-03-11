// const validator = require('validator');
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if ( !( email && password ) ) {
      res.status( 400 ).send( "All inputs are required to proceed" )
    }

    const user = await User.findOne( { email: req.body.email } )
    
    if ( !user ) {
      res.status( 404 ).send( "Invalid Credentials" )
    }
    else {

      if ( await bcrypt.compare( password, user.password ) ) {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "5h",
          }
        )
        //   res.cookie('cookie', token, {maxAge: 200000, httpOnly: true})

        user.token = token
      }
      res.status( 201 ).json( user )
    }
      // res.status(400).send({ message: "Invalid Credentials" })
    } catch ( err ) {
      res.status( 500 ).send( err.message )
    }
  
}

exports.logout = (req, res) => {
  res.clearCookie("cookie")
  res.redirect("/login")
}

exports.signup = async (req, res) => {
  try {
    //get user input
    const { first_name, last_name, email, phone_number, password } = req.body
    //validate user input
    if (!(email && password && first_name && last_name && phone_number)) {
      res.status(400).send("All inputs are required")
    }

    //check if user exists
    const oldUser = await User.findOne({ email })

    if (oldUser) {
      return res.status(409).send("User already exists, Please Log In")
    }

    //encrypt password
    encryptedPassword = await bcrypt.hash(password, 10)

    //create user in db
    const user = await User.create({
      first_name,
      last_name,
      phone_number,
      email: email.toLowerCase(),
      password: encryptedPassword,
    })

    //create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    )

    //save the token
    user.token = token

    res.cookie("token", token, {
      sameSite: "Lax",
    })

    console.log("token from cookie from server is ", res.cookie.token)
    console.log("token from server is ", token)

    //return new user
    res.status(201).json(user)
  } catch (err) {
    console.log("error", err)
  }
}

exports.logout = async (req, res) => {
  const cookies = new Cookies()
  return (res.headers.cookie.token = null)
}
