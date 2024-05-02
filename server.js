const express = require('express')
const db = require('./db')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())


app.get('/', function (req, res) {
    res.send('Welcome to our hotel! We are happy to serve you❤')
})

//Import the router file
const menuItemsRoutes = require('./routes/menuItemsRoutes')
const personRoutes = require('./routes/personRoutes');

app.use('/menu', menuItemsRoutes)
app.use('/person', personRoutes)

app.listen(3000, () => {
    console.log('listening on port 3000 ')
})