import React, { useState } from 'react';
import './style.css';

// const input = document.querySelector(".input");
// const humidity = document.querySelector(".humidity");
// const pressure = document.querySelector(".pressure");
// const temp = document.querySelector(".temp");
// const searchBtn = document.querySelector(".search-btn");
// const pWarning = document.querySelector(".warning");



function Api() {
    const API_KEY = "&appid=0f2f74ba7f606c9d83b9af6957871138";
    const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
    const API_UNITS = "&units=metric";
    
    const [city, setCity] = useState("");
    const [temp, setTemp] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [pressure, setPressure] = useState(null);
    const [warning, setWarning] = useState("");
    
    const getWeather = () => {
        const CITY = city || 'Warsaw';
        const URL = API_LINK + CITY + API_KEY + API_UNITS;
        fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("coś tu nie gra");
            }
            return (
                response.json()
            );
        })
        .then(data => {
                
            const object = data.main;
            setTemp = object.temp;
            setHumidity = object.humidity;
            setPressure = object.pressure;
            setWarning = "";
                
            //     humidity.textContent = object.humidity + "%";
                
            //     temp.textContent = object.temp + "℃";
                
            // pressure.textContent = object.pressure;
            // pWarning.textContent = "";
            // console.log(object)
            })
            .catch(error => {
                setWarning("Error...");
                console.error("Jakiś problem z fetchowaniem");
            })
    }

    
    return (
        <div className="box">
            <h1 className="title">Fetching API</h1>

            <label htmlFor="city">City:</label>
            <input onChange={(e) => setCity(e.target.value)} value={city} placeholder='city name' id='city' type="text" className="input" />
            <p className="warning">{warning}</p>
            <button onClick={getWeather} className="search-btn">search</button>

            <p>temp: <span className="span temp">{temp !== null ? `${temp}℃` : 'nan'}</span></p>

            <p>humidity: <span className="span humidity">{humidity !== null ? `${humidity}` : 'nan'}</span></p>

            <p>pressure: <span className="span pressure">{pressure !== null ? `${pressure}` : 'nan'}</span></p>
       </div>
    );
}

export default Api;