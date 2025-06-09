const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const auth = require('./middlewares/auth');

const {PORT = 3001} = process.env;
const { login, createUser } = require('./controllers/users');
const app = express();
app.use(express.json());







mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



app.post('/signin', login);
app.post('/signup', createUser);


app.use(auth);
app.use('/', routes);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Internal Server Error' : message,
  });
});
