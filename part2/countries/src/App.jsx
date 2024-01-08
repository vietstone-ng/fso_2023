import { useEffect, useState } from 'react'
import Country from './Country'

function App() {
  const [all, setAll] = useState([])
  const [filter, setFilter] = useState('')
  const [country, setCountry] = useState(null)

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => response.json())
      .then((data) => setAll(data))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setCountry(null)
  }

  const filtered = all.filter(
    (country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase()) ||
      country.name.official.toLowerCase().includes(filter.toLowerCase())
  )

  const handleShowClick = (countryToShow) => setCountry(countryToShow)

  return (
    <>
      <div>
        find countries{' '}
        <input type='text' value={filter} onChange={handleFilterChange} />
      </div>
      <br />
      <div>
        {filter.length > 0 && filtered.length > 10 && (
          <div>Too many matchs, specify another filter</div>
        )}
        {filtered.length <= 10 && filtered.length > 1 && (
          <div>
            {filtered.map((country) => (
              <div key={country.name.common}>
                {country.name.common}{' '}
                <input
                  type='button'
                  value='show'
                  onClick={() => handleShowClick(country)}
                />
              </div>
            ))}
          </div>
        )}
        <Country country={filtered.length === 1 ? filtered[0] : country} />
      </div>
    </>
  )
}

export default App
