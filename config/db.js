const mongoose = require('mongoose') 

const { MONGODB_URL } = process.env

exports.connect = () => {
    mongoose
    .connect( MONGODB_URL, {
    useNewUrlParser: true,
    })

    .then(() => {
        console.log("connected to database successfully")
    })
    .catch((error) => {
        console.log("database connection failed")
        console.log(error)
        process.exit(1)
    })

}