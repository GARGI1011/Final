const express = require('express');
const request = require('request');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
var city= 'delhi';
const apiKey ='c55737f7738f1178fe3a4a53de30903d';
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

router.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});

router.post('/', function (req, res) {
  let city = 'delhi';
  let url = `http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=c55737f7738f1178fe3a4a53de30903d`;
  request(url, function (err, response, body) {
  
    if(err){
      return res.render('index', {weather: null, error: 'Error, please try again'});
    }
    let weather = JSON.parse(body);
    if(weather.current == undefined){
      return res.render('index', {weather: null, error: 'Error, please try again'});
    }
    let weatherText = `It's ${weather.current.temperature} degrees ${weather.current.is_day === "yes" ? 'Day time' : 'Night time'} in ${weather.location.name}, ${weather.location.country}!`;
    res.render('index', {weather: weatherText, error: null});
  });
});

app.use('/', router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
