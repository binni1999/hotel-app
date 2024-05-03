const mongoose = require('mongoose')


//const mongoURL = process.env.MONGODB_URL;
const mongoURL = process.env.MONGODB_URL_LOCAL;
mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connection Established')
})
db.on('error', (err) => {
    console.log("There is some error ", err);

});
db.on('disconnected', () => {
    console.log("The server is disconnected");

})

module.exports.db;

