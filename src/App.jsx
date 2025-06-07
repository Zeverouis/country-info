import './App.css';
import axios from 'axios';
import { useState } from 'react';
import worldMap from './assets/world_map.png';

function App() {
    const [showCountries, setShowCountries] = useState([]);
    const [loadCountries, setLoadCountries] = useState(false);

    async function getCountries() {
        try {
            const result = await axios.get(
                'https://restcountries.com/v3.1/all?fields=name,flags,population'
            );
            const sortedCountries = result.data.sort((a, b) => a.population - b.population);
            console.log(result);
            setShowCountries(sortedCountries);
            setLoadCountries(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <img src={worldMap} alt="World Map" className= "worldMap"/>
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
                               <img className= "countryImg" src={country.flags.svg} alt={`Flag of ${country.name.common}`}/>
                                {country.name.common} has a population of {country.population.toLocaleString()} people
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default App;

