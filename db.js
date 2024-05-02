const mongoose = require('mongoose')

//const mongoURL = "mongodb://127.0.0.1/hotels";
//const mongoURL = process.env.MONGODB_URL_LOCAL;
// const mongoURL = 'mongodb+srv://pankajbinwal22:Pankaj12345@cluster0.luvofic.mongodb.net/';
// console.log(process.env.MONGODB_URL);
const mongoURL = process.env.MONGODB_URL;
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

