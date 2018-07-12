const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'twig');

// app.use(morgan('combined'));                          // To log
app.use(express.static(__dirname +'/public'));        // Public Page
app.use(favicon(__dirname +'/public/favicon.ico'));   // Load favicon
app.use(bodyParser.urlencoded({extended: true}));     // to support URL-encoded bodies
app.use(express.urlencoded());                        // to support URL-encoded bodies
app.use(cookieParser());                              // Init Cookies

// HomePage
app.get('/', function(req, res){
  res.render('form');
});

// FormPage
app.get('/:maxNumber', function(req, res){
  res.render('index', {
    tasks : req.cookies,
    maxNumber : req.params.maxNumber,
    headMessage : 'Node + Express = <3'
  });
  if (req.params.maxNumber == 5) {
    console.log('Heyyy: ', req.cookies);
  }
});

// Request Post
app.post('/addTodo', function(req, res){
  var task = req.body.task;
  if (req.cookies.tasks == undefined) {
    res.cookie(tasks, []);
  }
  res.cookie(tasks['task'], task);
  console.log('Cookies: ', req.cookies);
  res.redirect('/5');
});


// Test
app.get('/floor/:floorNumber/bedroom/:bedroomNumber', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.send('You are on floor number '+ req.params.floorNumber +' on bedroom number '+ req.params.bedroomNumber);
});

// Page 404
app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});

app.listen(8080);
