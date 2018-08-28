const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();

const items = require('./routes/api');



app.use(bodyParser.json());

const db = process.env.DATABASE

mongoose.connect(db)
    .then(() => console.log('MongoDB conntected'))
    .catch(err => console.log(`MongoDB error ${err}`))

app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server connected at ${port}`));