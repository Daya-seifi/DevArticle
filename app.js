const express = require('express')
const bodyparser = require('body-parser')
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require('helmet');
const hpp = require("hpp");
const xss = require("xss-clean");
const rateLimit = require('express-rate-limit');
const fileUploader  = require('express-fileupload');
const cors = require('cors');

////////////////////////////////////////////////////////////////////////////////////////////////
require('dotenv').config({path : "./config/config.env"});
///////////////////////////////////////////////////////////////////////////////////////////

const RegisterRouter  = require('./routes/RegisterRouter');
const LoginHandler = require('./routes/LoginRouter');
const CDB = require('./config/ConnectDataBase')
const errorHandler  = require('./middleware/ErrorHandler');
const DashboardRouter = require('./routes/DashboardRouter'); 
const AdminRouter  = require('./routes/AdminRouter');
const IndexRouter = require('./routes/indexRouter');
const setHeader = require('./middleware/Headers');


const app = express()

app.use(cors())


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 
});

app.use(fileUploader())

//NO-SQL INJECTION
app.use(mongoSanitize());


//HTTP HEADERS ATTACK
app.use(helmet())

//XSS ATTACKS
app.use(xss())

//HTTP ATTACKS
app.use(hpp());

//DDOS ATTACK
app.use(limiter);



app.use(bodyparser.urlencoded({extended : false}))
app.use(bodyparser.json())
// app.use(setHeader.setHeaders)

//DataBase Connecting
CDB()




app.use(RegisterRouter)
app.use(LoginHandler)
app.use(DashboardRouter)
app.use(IndexRouter)
app.use(AdminRouter)

const port = process.env.PORT

app.use(errorHandler.ErrorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
