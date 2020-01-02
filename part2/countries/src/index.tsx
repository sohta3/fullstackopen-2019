import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

type Country = {
  name: string;
  capital: string;
  population: number;
  languages: { name: string }[];
  flag: string;
};

type Weather = {
  temp: number;
  pressure: number;
  humidity: number;
};
const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [weather, setWeather] = useState<Weather | {}>({});

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(filteredCountries);
    if (filteredCountries.length !== 1) {
      return;
    }
    const capital = filteredCountries[0].capital;
    axios
      .get(`https://restcountries.eu/rest/v2/capital/${capital}`)
      .then(response => {
        setWeather(response.data.main);
      });
  }, [filteredCountries]);

  const handleFindCountries = (event: any) => {
    event.preventDefault();
    const q = event.target.value;

    if (!q || q.length === 0) {
      setFilteredCountries([]);
      return;
    }

    const filtered = countries.filter((country: { name: string }) => {
      return country.name.toLowerCase().indexOf(q.toLowerCase()) >= 0;
    });
    setFilteredCountries(filtered);
  };

  const showDetail = (country: Country) => {
    setFilteredCountries([country]);
  };

  return (
    <>
      <div>
        find countries<input type="text" onChange={handleFindCountries}></input>
      </div>
      {filteredCountries.length >= 10 ? (
        "Too many matches, specify another filter"
      ) : filteredCountries.length === 1 ? (
        <div>
          <h2>{filteredCountries[0].name}</h2>
          <p>capital: {filteredCountries[0].capital}</p>
          <p>population: {filteredCountries[0].population}</p>
          <h3>languages</h3>
          <ul>
            {filteredCountries[0].languages.map(language => {
              return <li key={language.name}>{language.name}</li>;
            })}
          </ul>
          <img
            style={{ width: "50px" }}
            src={filteredCountries[0].flag}
            alt="country flag"
          />
          <h3>Weather in {filteredCountries[0].capital}</h3>
        </div>
      ) : (
        <ul>
          {filteredCountries.map(country => {
            return (
              <li key={country.name}>
                {country.name}
                <button
                  onClick={() => {
                    showDetail(country);
                  }}
                >
                  show
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
