import { useEffect } from 'react'
import { useState } from 'react'

function Country({ country }) {
  if (!country) {
    return null
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} width='150px' />

      <Weather country={country} />
    </div>
  )
}

function Weather({ country }) {
  const [weather, setWeather] = useState(null)

  const capital = country.capital[0]

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${
        import.meta.env.VITE_SOME_KEY
      }&q=${capital}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => setWeather(data))
  }, [capital])

  if (!weather) {
    return null
  }

  return (
    <>
      <h2>Weather in {country.capital[0]}</h2>
      <div>temperature {weather.main.temp} Celcius</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <div>wind: {weather.wind.speed} m/s</div>
    </>
  )
}

export default Country
