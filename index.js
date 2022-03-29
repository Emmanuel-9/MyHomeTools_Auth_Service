require ( 'dotenv' ).config();
const express = require('express');
require ('./config/db').connect();
const cors = require('cors')


//import routes
const authRoutes = require('./routes/authRoute');
const UserModel = require('./models/User');

//call express app
const app = express();
app.use (express.json())
app.use(cors())

 //routes middleware
//app.use('/routes', authRoutes);
app.use ("/auth" , require ('./routes/authRoute'));

//specify the port
const port = process.env.PORT

//Listen for connection
app.listen (port, () => {
    console.log ('server listening on port ' + port)
})

