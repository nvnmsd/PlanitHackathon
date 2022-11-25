const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const favorite = require('./routes/favorite');
const app = express();
const cors = require('cors');


const port = 4500;

const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],
  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile );

// Set static Folder
app.use(express.static(path.join(__dirname,'client')));

//Body parser Middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/', index);
app.use('/favorite', favorite);


app.listen(port, function() {
  console.log('Example app listening on port ', port);
});
