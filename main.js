const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const routes = require('./routes/index.js');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

mongoose.connect(
  "mongodb+srv://rahul:rahul1511@pollingsystemapi.vovjszb.mongodb.net/PollingSystem?retryWrites=true&w=majority"
).then((result) => {
    console.log("Connected!");
    app.listen(3030)
}).catch((err) => {
    console.log(err);
});