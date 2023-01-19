const mongoose = require('mongoose');
const api_config = require('./config');

mongoose.connect(api_config.dbUrl)
.then((result) => {
    console.info('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

module.exports = mongoose;