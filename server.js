const express = require('express')
require('dotenv').config()
const db = require('./db')

const passport = require('./auth')

//const Person = require('./models/Person')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
//Import the router file
const menuItemsRoutes = require('./routes/menuItemsRoutes')
const personRoutes = require('./routes/personRoutes');
//Middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] request made to : ${req.originalUrl}`);
    next();

}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false })

app.get('/', function (req, res) {
    res.send('Welcome to our hotel! We are happy to serve you❤')
})


app.use('/menu', menuItemsRoutes)
app.use(localAuthMiddleware);
app.use('/person', personRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('listening on port 3000 ')
})