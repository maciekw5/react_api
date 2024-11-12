import React, { useState } from "react";
import styles from "./Api.module.scss";

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
    const CITY = city || "Warsaw";
    const URL = API_LINK + CITY + API_KEY + API_UNITS;
    fetch(URL)
      .then(
        (response) => response.json(),
        () => setWarning("Coś się zjebało")
      )
      .then((data) => {
        console.log(data);
        console.log();

        const temperatureObject = data.main;
        setTemp(temperatureObject.temp);
        setHumidity(temperatureObject.humidity);
        setPressure(temperatureObject.pressure);
      });
  };

  return (
    <div className={styles.box}>
      <h1 className={styles.title}>Fetching API</h1>

      <label htmlFor="city">City:</label>
      <input
        onChange={(e) => setCity(e.target.value)}
        value={city}
        placeholder="city name"
        id="city"
        type="text"
        className={styles.input}
      />
      <p className={styles.warning}>{warning}</p>
      <button onClick={getWeather} className={styles["search-btn"]}>
        search
      </button>

      <p>
        temp:{" "}
        <span className={`${styles.temp} ${styles.span}`}>
          {temp !== null ? `${temp}℃` : "nan"}
        </span>
      </p>

      <p>
        humidity:{" "}
        <span className={`${styles.span} ${styles.humidity}`}>
          {humidity !== null ? `${humidity}` : "nan"}
        </span>
      </p>

      <p>
        pressure:{" "}
        <span className={`${styles.span} ${styles.pressure}`}>
          {pressure !== null ? `${pressure}` : "nan"}
        </span>
      </p>
    </div>
  );
}

export default Api;
