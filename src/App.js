/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import axios from 'axios';
import ReactAnimatedWeather from 'react-animated-weather';


const d = new Date();
const h = d.getHours();
var curr = h;
var next = h+1;
var secNext = h +2;

if (h === 0){
 curr = 12;
}
if (h +1 === 24 && h+2 === 25){
  next = 12;
  secNext = 1;
}


const defaults = {
  icon: "",
  color: "white",
  size: 112,
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
            date:  Date(),
            icon: "",
            tempFirst: 0,
            tempSec : 0,
            tempThird: 0,
            timeFirst: 0,
            timeSec: 0,
            timeThird: 0

            

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
        return (
          <div>
            <div id="navbar">
              <div><p>Latitude: {this.state.lat} </p></div>
              <div><p>Longitude: {this.state.lon}</p></div>
              <div><p>City: {this.state.city}</p></div>
              <div><p>Country: {this.state.country}</p></div>
            </div>
            <div id='outer'>
            <div id="main">
              <p>Weather: {this.state.weather}</p>
              <div id="inline">
              <p>Temp: {this.state.temp}</p>
              <button onClick={this.toggle}>{this.state.symbol}</button>
              </div>
            </div>
            <div id="icon1">
            <ReactAnimatedWeather
            icon={"CLOUDY"}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
            </div>
            </div>
            <div id="details">
              <p>Humidity: {this.state.humidity}</p>
              <p>Wind: {this.state.windspeed} M/S</p>
              <p>Date: {this.state.date}</p>
            </div>
                <div>
                  <p>time: {this.state.timeFirst}</p>
                  <p>Temp: {this.state.tempFirst}</p>
                  <p>H : {h}</p>
                </div>
                <div>
                  <p>time: {this.state.timeSec}</p>
                  <p>Temp: {this.state.tempSec}</p>
                  <p>H : {next}</p>
                </div>
                <div>
                  <p>time: {this.state.timeThird}</p>
                  <p>Temp: {this.state.tempThird}</p>
                  <p>H : {secNext}</p>
                </div>
          </div>
    
        );
    
      }if (this.state.weather === "Rain"){
        return (
          <div>
            <div id="navbar">
              <div><p>Latitude: {this.state.lat} </p></div>
              <div><p>Longitude: {this.state.lon}</p></div>
              <div><p>City: {this.state.city}</p></div>
              <div><p>Country: {this.state.country}</p></div>
            </div>
            <div id='outer'>
            <div id="main">
              <p>Weather: {this.state.weather}</p>
              <div id="inline">
              <p>Temp: {this.state.temp}</p>
              <button onClick={this.toggle}>{this.state.symbol}</button>
              </div>
            </div>
            <div id="icon1">
            <ReactAnimatedWeather
            icon={"RAIN"}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
            </div>
            </div>
            <div id="details">
              <p>Humidity: {this.state.humidity}</p>
              <p>Wind: {this.state.windspeed} M/S</p>
              <p>Date: {this.state.date}</p>
            </div>
            <div>
                  <p>time: {this.state.timeFirst}</p>
                  <p>Temp: {this.state.tempFirst}</p>
                  <p>H : {h}</p>
                </div>
                <div>
                  <p>time: {this.state.timeSec}</p>
                  <p>Temp: {this.state.tempSec}</p>
                  <p>H : {next}</p>
                </div>
                <div>
                  <p>time: {this.state.timeThird}</p>
                  <p>Temp: {this.state.tempThird}</p>
                  <p>H : {secNext}</p>
                </div>
          </div>
    
        );

      }if (this.state.weather === "Snow"){
        return (
          <div>
            <div id="navbar">
              <div><p>Latitude: {this.state.lat} </p></div>
              <div><p>Longitude: {this.state.lon}</p></div>
              <div><p>City: {this.state.city}</p></div>
              <div><p>Country: {this.state.country}</p></div>
            </div>
            <div id='outer'>
            <div id="main">
              <p>Weather: {this.state.weather}</p>
              <div id="inline">
              <p>Temp: {this.state.temp}</p>
              <button onClick={this.toggle}>{this.state.symbol}</button>
              </div>
            </div>
            <div id="icon1">
            <ReactAnimatedWeather
            icon={"SNOW"}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
            </div>
            </div>
            <div id="details">
              <p>Humidity: {this.state.humidity}</p>
              <p>Wind: {this.state.windspeed} M/S</p>
              <p>Date: {this.state.date}</p>
            </div>
            <div>
                  <p>time: {this.state.timeFirst}</p>
                  <p>Temp: {this.state.tempFirst}</p>
                  <p>H : {h}</p>
                </div>
                <div>
                  <p>time: {this.state.timeSec}</p>
                  <p>Temp: {this.state.tempSec}</p>
                  <p>H : {next}</p>
                </div>
                <div>
                  <p>time: {this.state.timeThird}</p>
                  <p>Temp: {this.state.tempThird}</p>
                  <p>H : {secNext}</p>
                </div>
          </div>
    
        );
      }if(this.state.weather === "Dust" || this.state.weather === "Tornado"){
        return (
          <div>
            <div id="navbar">
              <div><p>Latitude: {this.state.lat} </p></div>
              <div><p>Longitude: {this.state.lon}</p></div>
              <div><p>City: {this.state.city}</p></div>
              <div><p>Country: {this.state.country}</p></div>
            </div>
            <div id='outer'>
            <div id="main">
              <p>Weather: {this.state.weather}</p>
              <div id="inline">
              <p>Temp: {this.state.temp}</p>
              <button onClick={this.toggle}>{this.state.symbol}</button>
              </div>
            </div>
            <div id="icon1">
            <ReactAnimatedWeather
            icon={"WIND"}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
            </div>
            </div>
            <div id="details">
              <p>Humidity: {this.state.humidity}</p>
              <p>Wind: {this.state.windspeed} M/S</p>
              <p>Date: {this.state.date}</p>
            </div>
            <div>
                  <p>time: {this.state.timeFirst}</p>
                  <p>Temp: {this.state.tempFirst}</p>
                  <p>H : {h}</p>
                </div>
                <div>
                  <p>time: {this.state.timeSec}</p>
                  <p>Temp: {this.state.tempSec}</p>
                  <p>H : {next}</p>
                </div>
                <div>
                  <p>time: {this.state.timeThird}</p>
                  <p>Temp: {this.state.tempThird}</p>
                  <p>H : {secNext}</p>
                </div>
          </div>
    
        );
      }if(this.state.weather === "Fog" || this.state.weather === "Smoke"){
        return (
          <div>
            <div id="navbar">
              <div><p>Latitude: {this.state.lat} </p></div>
              <div><p>Longitude: {this.state.lon}</p></div>
              <div><p>City: {this.state.city}</p></div>
              <div><p>Country: {this.state.country}</p></div>
            </div>
            <div id='outer'>
            <div id="main">
              <p>Weather: {this.state.weather}</p>
              <div id="inline">
              <p>Temp: {this.state.temp}</p>
              <button onClick={this.toggle}>{this.state.symbol}</button>
              </div>
            </div>
            <div id="icon1">
            <ReactAnimatedWeather
            icon={"FOG"}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
            </div>
            </div>
            <div id="details">
              <p>Humidity: {this.state.humidity}</p>
              <p>Wind: {this.state.windspeed} M/S</p>
              <p>Date: {this.state.date}</p>
            </div>
            <div>
                  <p>time: {this.state.timeFirst}</p>
                  <p>Temp: {this.state.tempFirst}</p>
                  <p>H : {h}</p>
                </div>
                <div>
                  <p>time: {this.state.timeSec}</p>
                  <p>Temp: {this.state.tempSec}</p>
                  <p>H : {next}</p>
                </div>
                <div>
                  <p>time: {this.state.timeThird}</p>
                  <p>Temp: {this.state.tempThird}</p>
                  <p>H : {secNext}</p>
                </div>
          </div>
    
        );
      }
      return (
              <div>
                <div id="navbar">
                  <div><p>Latitude: {this.state.lat} </p></div>
                  <div><p>Longitude: {this.state.lon}</p></div>
                  <div><p>City: {this.state.city}</p></div>
                  <div><p>Country: {this.state.country}</p></div>
                </div>
                <div id='outer'>
                <div id="main">
                  <p>Weather: {this.state.weather}</p>
                  <div id="inline">
                  <p>Temp: {this.state.temp}</p>
                  <button onClick={this.toggle}>{this.state.symbol}</button>
                  </div>
                </div>
                <div id="icon1">
                <ReactAnimatedWeather
                icon={"CLEAR_DAY"}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
                </div>
                </div>
                <div id="details">
                  <p>Humidity: {this.state.humidity}</p>
                  <p>Wind: {this.state.windspeed} M/S</p>
                  <p>Date: {this.state.date}</p>
                </div>
                <div>
                  <p>time: {this.state.timeFirst}</p>
                  <p>Temp: {this.state.tempFirst}</p>
                  <p>H : {h}</p>
                </div>
                <div>
                  <p>time: {this.state.timeSec}</p>
                  <p>Temp: {this.state.tempSec}</p>
                  <p>H : {next}</p>
                </div>
                <div>
                  <p>time: {this.state.timeThird}</p>
                  <p>Temp: {this.state.tempThird}</p>
                  <p>H : {secNext}</p>
                </div>
              </div>
        
            );
        
  }
    
}

export default App;
