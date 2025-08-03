require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index');
const { errors } = require('celebrate');
const { PORT = 3001 } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorhandler');

const app = express();
app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.post('/signin', require('./controllers/users').login);
app.post('/signup', require('./controllers/users').createUser);
app.get('/items', require('./controllers/clothingitem').getItems);

app.use(require('./middlewares/auth'));

app.use(routes);

app.use(errorLogger);
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
