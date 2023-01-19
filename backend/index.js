const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routers/userRouter');
const cors = require('cors');

const app = express();
const port = process.env.PORT;


app.use(express.json());
// app.use(express.urlencoded({extended : true}));
app.use('/user', userRouter);
app.use(cors(
    {
        origin : 'http://localhost:3000',
        credentials : true
    }
));

app.get('/', (req, res) => {
    console.log('Request at index');
    res.status(299).send('Working Perfectly!!');
})

app.listen(port, () => console.log(`Express server has started at ${port}`));