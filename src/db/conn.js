const mongoose = require('mongoose');
const registration = require("./models/registeration");
mongoose.connect('mongodb://127.0.0.1:27017/volunteerRegistration', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected successfully");
});
