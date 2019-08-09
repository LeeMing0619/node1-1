const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request');
const apiKey = '517cd65fc7ed170741e90f1b8944a26f';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.post('/', function(req, res) {
  let city = req.body.city;
  //7d5f693d39050ca5b4d7ae7d857771e6
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},uk&APPID=${apiKey}`
  request(url, function (err, response, body) {
      if(err){        
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          console.log(err);
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
})
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
