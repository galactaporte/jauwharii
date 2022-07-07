//notes: conventionally 1st acess file is also named 'main.js' or 'index.js'

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config() //unsuccesful, try .load or .parse

}

const express = require ('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index') //this command links the index.js fomr the ROUTER folder

app.set('view engine', 'ejs') //ejs to be used as the view engine
app.set('views', __dirname + '/views') // (append project directory path) set source for 'views' directory(folder)
app.set('layout', 'layouts/layout') //set 'layout' file directory (eg: HTML header or footer for multiple use)
app.use(expressLayouts) 
app.use(express.static('public')) //folder to contain all styles sheet,javascript, images and all static files


//connecting to the database on mongoDB via mongoose
const mongoose = require ('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: false }) //unseuccessful? may be deprecated. toggle between true/false
//!do not hardcode the database URL. make mongoose connection dependent on the 'environment'
//ie: @development, connect to DB via local mongoDBserver and @deployment, connect via webhost [npm i --save-dev dotenv]
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)



