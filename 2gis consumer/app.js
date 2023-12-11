const express = require('express');
const path = require('path');
const geoController = require('./controllers/GeoController');
const app = express();

require('dotenv').config();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', geoController);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
