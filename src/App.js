import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Chip from '@material-ui/core/Chip';

//action
import {fetchWeather} from "./actions/fetchWeather";

let cities = [];

function App() {

  const [city, setCity] = useState("");

 // console.log(JSON.stringify(addCities));

  const weatherSelector = useSelector((state) => state);

  const dispatch = useDispatch();
  const getWeatherInfoAction = (city) => dispatch(fetchWeather(city));

  useEffect(() => {
    getWeatherInfoAction("San Jose");
  },{});

  const getWeatherInfo = (e) => {
    e.preventDefault();
    if(city === ""){
      console.log("No City Selected");
    }else{
      cities.push(city);
      getWeatherInfoAction(city);
      console.log(JSON.stringify(city));
      console.log(weatherSelector.weatherInfo);
    }
  }
/* Chip Added */
  const useStyles = makeStyles(theme => ({
    chip: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const handleClick = (e) => {
    document.getElementById('cityname').value = e.city;
    getWeatherInfoAction(e.city);
  }

  const handleDelete = (e) => {
    let index = cities.indexOf(e.city);
    if(index > -1) {
      cities.splice(index, 1)
    }
    console.log(JSON.stringify(cities));
    setCity(cities[0]);
  }

  /* Chip Added */

  let details = "";
  if(weatherSelector.weatherInfo && weatherSelector.weatherInfo.hasOwnProperty("location")){
    details =  <div>
                <div className="col-4 weather-icon">
                  <img src={weatherSelector.weatherInfo.current.condition.icon} alt="Temp Icon"/>
                </div>
                <div className="col-4 weather-location">
                  <p className="city">{weatherSelector.weatherInfo.location.name}</p>
                  <p className="country">{weatherSelector.weatherInfo.location.country}</p>
                </div>
                <div className="col-4 weather-temp">
                  <p className="celcious">{weatherSelector.weatherInfo.current.temp_c}°C</p>
                  <p className="status">{weatherSelector.weatherInfo.current.condition.text}</p>
                </div>
                <div className="clear"></div>
               </div>;
  }else{
    details = <p className="error-msg">You need to type an exact city name</p>
  }

  return (
    <React.Fragment>
      <section className="row">
        <div className="col-12 container">
          <div className="headbar">
            <h2>Weather</h2>
          </div>
          <div className="bodySection">
            <div className="detail">      
              {details}
            </div>
            <form className="col-12" onSubmit={getWeatherInfo}>
              <div className="control">
                <div className="col-s-12 col-8 textbox-container">
                  <input type="text" name="name" id="cityname" placeholder="Type City Name" onChange={e => setCity(e.target.value)} />
                </div>
                <div className="col-s-12 col-3 submit-container">
                  <input type="submit" value="Check Weather" />
                </div>
                <div className="clear"></div>
                {cities.map((city, i) => (
                  <Chip 
                      key = {i}
                      label={city}
                      className={classes.chip}
                      onClick={e => handleClick({city})}
                      onDelete={e => handleDelete({city})}
                  />))}
              </div>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default App;
