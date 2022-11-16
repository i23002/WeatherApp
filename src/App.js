/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import axios from 'axios';

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
            windspeed: ''

        };
    
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
    }
    render(){
              return (
        
              <div>
                <h1>{this.state.lat}</h1>
                <h1>{this.state.lon}</h1>
                <h1>Temparature: {this.state.temp}</h1>
                <h1>Humidity: {this.state.humidity}</h1>
                <h1>City: {this.state.city}</h1>
                <h1>Country: {this.state.country}</h1>
                <h1>weather: {this.state.weather}</h1>
                <h1>WIND SPEED: {this.state.windspeed}</h1>
                <h4>Using geolocation JavaScript API in React</h4>
        
              </div>
        
            );
        
          }
    
}

export default App;
