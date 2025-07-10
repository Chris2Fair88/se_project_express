const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorhandler');
const { errors } = require('celebrate');
const { PORT = 3001 } = process.env;
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.get('/items', require('./controllers/clothingitem').getItems);

app.use(auth);


app.use('/', routes);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Internal Server Error' : message,
  });
  next();
});

app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(console.error);
