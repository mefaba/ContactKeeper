const express = require("express")
const dotenv = require('dotenv');
const mongoose = require('mongoose')
var cors = require('cors')

/* TOOLS & MIDDLEWARES */
const app = express();
app.use(cors())

app.use(express.json())
dotenv.config();


/* DATABASE CONNECT */
const DB = process.env.mongoDB_URI
mongoose.connect(DB,{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true })
.then(()=>console.log("Database connected succesfully"))
.catch(err=>console.log(err))

//ROUTES
app.get('/', (req,res) => {
    res.send("server is working")
})

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

//RUNSERVER
const PORT = process.env.PORT || 5000
app.listen(PORT)