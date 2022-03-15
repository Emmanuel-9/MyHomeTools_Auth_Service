const User = require("../models/User")

exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      })
    })
}

exports.findOne = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      res.status(200).json(user)
    })
      .catch( ( err ) => {
          console.log( "error", err.message )
          res.status(404).send( err.message)
    })
}
