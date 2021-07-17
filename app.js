const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const fileupload        = require("express-fileupload");
const mongoose          = require('mongoose');
const config            = require('./config.json')


const port = 3000;
const mongoUrl= config.mongoUrl;

const order    = require('./routes/order.js');

mongoose.connect(mongoUrl, { useNewUrlParser: true ,useUnifiedTopology :true})
    .then(response => {
        console.log("MongoDB Connected.");
    }).catch(err => {
        console.log("MongoDB Connection Failed.");
});



app.use(bodyParser.urlencoded({limit: '10mb', extended: false, parameterLimit: 10000 }));
app.use(bodyParser.json({limit: '10mb'}));
app.use(fileupload());



app.get('/', (req, res) => {
  res.send('API Server is Running')
})

app.use('/order/', order);


app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})