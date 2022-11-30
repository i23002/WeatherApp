/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import axios from 'axios';
import ReactAnimatedWeather from 'react-animated-weather';

const month_arr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const day_arr = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thrusday',
  'Friday',
  'Saturday'
]

const d = new Date();
const year = d.getFullYear();
const month = month_arr[d.getMonth()]
const day = day_arr[d.getDay()]
const date = d.getDate()

const h = d.getHours();
var curr = h;
var next = h+1;
var secNext = h +2;
var zone = "";
var zonea = "";
var zoneb = ""

if (h === 0){
 curr = 12;
}
if (h +1 === 24 && h+2 === 25){
  next = 12;
  secNext = 1;
}


if (curr >= 12){
  zone = "PM"
}
else{
  zone = "AM"
}


if (next >= 12){
  zonea = "PM"
}
else{
  zonea = "AM"
}


if (secNext >= 12){
  zoneb = "PM"
}
else{
  zoneb = "AM"
}


var smartness = ''



var weather = ""
const defaults = {
  icon: "",
  color: "white",
  size: 100,
  animate: true,
};


// eslint-disable-next-line no-unused-vars
class App extends React.Component{

    constructor(props) {

        super(props);
    
        this.state = {
            lat: 0,
            lon: 0,
            temp : 0,
            humidity: 0,
            city: '',
            country: '',
            sunrise: '',
            sunset : '',
            weather: '',
            windspeed: '',
            on: true,
            symbol: '\u00b0'.concat('C'),
            icon: "",
            tempFirst: 0,
            tempSec : 0,
            tempThird: 0,
            timeFirst: 0,
            timeSec: 0,
            timeThird: 0,
            day: "",
            month: "",
            dt: "",
            year:0,
        };
        this.toggle = this.toggle.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    
      }
      //the most interesting section i learned really appreciate it
      componentDidMount() {
        if (navigator.geolocation){
          this.getPosition()//if the promise got fullfilled then call the getweather
          .then((position) =>{
              this.getWeather(position.coords.latitude , position.coords.longitude)
          })
          .catch((err) => {// other wise call the catch 
            this.getWeather(28.67 , 58.77);
            alert('Enable the location ')
          })
        }else{
          alert("Geolocation Not Available")
        }  
    }
    getPosition = (options) =>{
       return new Promise(function (resolve , reject){
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
       })
    }
    getWeather = async(lat , lon) =>{
         const api_call = axios.get(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`)
         .then(response => {
          const data = response.data;
          this.setState({
            lat : lat,
            lon: lon,
            temp: Math.round(data.main.temp),
            humidity: data.main.humidity,
            city: data.name,
            country: data.sys.country,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            weather: data.weather[0].main,
            windspeed: data.wind.speed
            
          })
         })
         const api_call_2 = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,dewpoint_2m,rain,snowfall,windspeed_10m`)
         .then(res => res.json())
         .then(result => {
          this.setState({
            tempFirst: result.hourly.temperature_2m[h],
            tempSec: result.hourly.temperature_2m[h+1],
            tempThird: result.hourly.temperature_2m[h+2],
            timeFirst: curr,
            timeSec: next,
            timeThird: secNext
          })
         })

    };
   
    toggle(){
        if (this.state.on){
          this.setState(state => ({
            temp: (state.temp * 9/5)+32,
            on: false,
            symbol: "\u2109"
          }))
        }
        if (this.state.on === false){
          this.setState(state => ({
            temp: Math.round(((state.temp -32)*5)/9),
            on: true,
            symbol: '\u00b0'.concat('C')
          }))
        }
    }

    render(){
      if (this.state.weather === "Clouds"){
        weather = "CLOUDY"
        smartness = 'black'
      }
      else if (this.state.weather === "Rain"){
        weather = "RAIN"
        smartness = 'black'
      }
      else if(this.state.weather === "Snow"){
        weather = "SNOW"
        smartness = 'blue'
      }
      else if(this.state.weather === "Dust" || this.state.weather === "Tornado"){
        weather = "WIND"
        smartness = 'green'
      }
      else if(this.state.weather === "Fog" || this.state.weather === "Smoke"){
        weather = "FOG"
        smartness = '#abaeb0'
      }
      else{
        weather = "CLEAR_DAY"
        smartness = 'yellow'
      }
      return(
        <div id='container'>
          <header>
            <div id="location">
              <p id="city">City: {this.state.city}</p>
              <p id="comma">,</p>
              <p id="country">Country:{this.state.country}</p>
            </div>
            <div id="date">
              <p id="day">{day}</p>
              <p id="month">{month}</p>
              <p id="dt">{date},</p>
              <p id="year">{year}</p>
            </div>
          </header>
          <main>
             <div id="temp">
               <p>{this.state.temp}</p>
               <button onClick={this.toggle}>{this.state.symbol}</button>
             </div>
            <div id="box1">
             <div id="icon1">
             <ReactAnimatedWeather
            icon={weather}
            color={smartness}
            size={defaults.size}
            animate={defaults.animate}
          />
             </div>
             <div id="weather2">
              <p>{this.state.weather}</p>
             </div>
            </div>
          </main>
          <footer>
            <div id="forecast">
              <div id="item1">
                  <p id='i11'>{this.state.timeFirst}{zone}</p>
                  <p id='i12'>{this.state.tempFirst}{'\u00b0'.concat('C')}</p>
                  <p id='i13'>{this.state.weather}</p>
              </div>
              <div id="item2">
                  <p id='i21'>{this.state.timeSec}{zonea}</p>
                  <p id='i22'>{this.state.tempSec}{'\u00b0'.concat('C')}</p>
                  <p id='i23'>{this.state.weather}</p>
              </div>
              <div id="item3">
                  <p id='i31'>{this.state.timeThird}{zoneb}</p>
                  <p id='i32'>{this.state.tempThird}{'\u00b0'.concat('C')}</p>
                  <p id='i33'>{this.state.weather}</p>
                </div>
            </div>
          </footer>
          <div id="additional">
            <p id='wind'>Wind Speed: {this.state.windspeed}m/s</p>
            <p id='humidity'>Humidity: {this.state.humidity}%</p>
          </div>

        </div>
      )
    }
}

export default App;
