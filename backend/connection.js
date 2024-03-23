const mongoose = require('mongoose');
const { DB_URL } = require('./config');


mongoose.connect(DB_URL)
.then((result) => {
    console.info('Connected to Database');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

module.exports = mongoose;