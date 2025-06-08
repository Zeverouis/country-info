import './App.css';
import axios from 'axios';
import {useState} from 'react';
import worldMap from './assets/world_map.png';
import countryColours from "./helpers/countryColours.jsx";

function App() {
    const [showCountries, setShowCountries] = useState([]);
    const [loadCountries, setLoadCountries] = useState(false);
    const [searchCountry, setSearchCountry] = useState(' ');
    const [errorMessage, setErrorMessage] = useState(' ');
    const [countryData, setCountryData] = useState([]);

    async function getCountries() {
        try {
            const result = await axios.get(
                'https://restcountries.com/v3.1/all?fields=name,flags,population,region'
            );
            const sortedCountries = result.data.sort((a, b) => a.population - b.population);
            console.log(result);
            setShowCountries(sortedCountries);
            setLoadCountries(true);
        } catch (error) {
            console.error(error);
        }
    }

    async function getOneCountry() {
        event.preventDefault();
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${searchCountry}?fields=name,population,region,flags,tld,capital,subregion,borders`);
            console.log(response.data);
            setSearchCountry(' ');
            setErrorMessage(' ');
            setCountryData(response.data);
        } catch (error) {
            setCountryData([]);
            setErrorMessage(`${searchCountry} bestaat niet. Probeer het opnieuw`);
            console.log(error);
        }
    }

    return (
        <>
            <img src={worldMap} alt="World Map" className="worldMap"/>

            <form>
                <input type="search" id="search-country" placeholder="search individual countries"
                       value={searchCountry}
                       onChange={(e) => setSearchCountry(e.target.value)}/>
                <button type="submit" onClick={getOneCountry}>Search</button>
            </form>

            {errorMessage && <p>{errorMessage}</p>}
            <div>
                {countryData.map((country, index) => (
                    <div key={index} className="countryInfo">
                        <img className="countryImg" src={country.flags.svg}
                             alt={`Flag of ${country.name.common}`}/>
                        <p>{country.name.common}</p>
                            <p>{country.name.common} is situated in {country.subregion} and the capital is {country.capital}. {" "}
                            It has a population of {(country.population / 1_000_000).toFixed(2).toLocaleString()} million people and it
                            borders with {country.borders.length} neighboring countries.
                            Websites can be found on {country.tld} domains</p>
                    </div>
                ))}
            </div>

            <h1>Click the button fool!</h1>

            {!loadCountries ? (
                <button type="button" onClick={getCountries}>
                    Countries now pls
                </button>
            ) : (
                <div>
                    <h2>List of countries</h2>
                    <ul>
                        {showCountries.map((country, index) => (
                            <li key={index}>
                                <img className="countryImg" src={country.flags.svg}
                                     alt={`Flag of ${country.name.common}`}/>
                                <span className={countryColours(country.region)}> {country.name.common} </span>
                                has a population of {country.population.toLocaleString()} people
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default App;

