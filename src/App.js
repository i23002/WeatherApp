import React from 'react';
import './App.css';

// eslint-disable-next-line no-unused-vars
var api = ''
class App extends React.Component{
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props)
    this.state = {
      latitude : 0,
      longitude : 0,
      items : []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
// axios install and make api work 
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) =>{
      this.setState({
        latitude : position.coords.latitude,
        longitude: position.coords.longitude
      })
       api = `https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
  })}
    render()
    {
      return(
        <div>
          <h1>Hello  world</h1>
          <button>Click</button>
          <h2>Longitude: {this.state.latitude}</h2>
          <h3>Latitude: {this.state.longitude}</h3>
        
          
        </div>
      )
    }
}


export default App;
