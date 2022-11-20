/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import axios from 'axios';
import ReactAnimatedWeather from 'react-animated-weather';



const defaults = {
  color: "goldenrod",
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
            icon: "CLEAR_DAY"
            

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
         switch (this.state.weather) {
          case "Haze":
            this.setState({ icon: "CLEAR_DAY" });
            break;
          case "Clouds":
            this.setState({ icon: "CLOUDY" });
            break;
          case "Rain":
            this.setState({ icon: "RAIN" });
            break;
          case "Snow":
            this.setState({ icon: "SNOW" });
            break;
          case "Dust":
            this.setState({ icon: "WIND" });
            break;
          case "Drizzle":
            this.setState({ icon: "SLEET" });
            break;
          case "Fog":
            this.setState({ icon: "FOG" });
            break;
          case "Smoke":
            this.setState({ icon: "FOG" });
            break;
          case "Tornado":
            this.setState({ icon: "WIND" });
            break;
          default:
            this.setState({ icon: "CLEAR_DAY" });
        }
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
                icon={this.state.icon}
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
              </div>
        
            );
        
          }
    
}

export default App;
