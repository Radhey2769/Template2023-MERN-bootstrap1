const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL)
.then((result) => {
    console.info('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

module.exports = mongoose;