const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser: true }, (err) => {
mongoose.connect('mongodb://localhost:27017/nba', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection :' + err) }
});

require('./nba.model');