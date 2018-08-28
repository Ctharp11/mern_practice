const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()

const app = express();

const items = require('./routes/api');



app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true})
    .then(() => console.log('MongoDB conntected'))
    .catch(err => console.log(`MongoDB error ${err}`))

app.use('/api/items', items);

//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server connected at ${port}`));