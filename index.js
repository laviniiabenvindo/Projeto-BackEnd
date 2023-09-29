const express = require('express');
const exphbs = require('express-handlebars');
const router = require('./routes/router')
const port = 5000;

const conn = require('./db/conn');

const app = express();

//MIDDLEWARES
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.listen(port, () =>{
    console.log(`http://localhost:${port}`)
});