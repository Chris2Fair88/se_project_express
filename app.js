const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const {PORT = 3001} = process.env;

const app = express();
app.use(express.json());



app.use((req, res, next) => {
  req.user = {
    _id: "682df9c628769ff026076f8d",
  };
  next();
});

app.use('/', routes);

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


