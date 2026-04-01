import { useState, useMemo } from 'react'
import cities from '../data/cities.json'
import eras from '../data/eras.json'
import { useNavigate } from 'react-router-dom'

export default function CitySearch({ onCitySelect, selectedCity }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const matches = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return cities.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 8)
  }, [query])

  const cityEras = useMemo(() => {
    if (!selectedCity) return []
    return selectedCity.eraIds
      .map((eraId) => {
        const era = eras.find((e) => e.id === eraId)
        return era ? { ...era } : null
      })
      .filter(Boolean)
  }, [selectedCity])

  const handleSelect = (city) => {
    setQuery(city.name)
    setIsOpen(false)
    onCitySelect?.(city)
  }

  const handleClear = () => {
    setQuery('')
    onCitySelect?.(null)
  }

  const handleEraClick = (era) => {
    const idx = eras.findIndex((e) => e.id === era.id)
    if (idx >= 0) navigate(`/era/${era.id}`)
  }

  return (
    <div className="city-search">
      <div className="city-search-input-wrap">
        <input
          type="text"
          className="city-search-input"
          placeholder="Type any Indian city..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
            if (!e.target.value.trim()) onCitySelect?.(null)
          }}
          onFocus={() => setIsOpen(true)}
        />
        {selectedCity && (
          <button className="city-search-clear" onClick={handleClear} title="Clear">
            ✕
          </button>
        )}
      </div>

      {isOpen && matches.length > 0 && !selectedCity && (
        <ul className="city-search-dropdown">
          {matches.map((city) => (
            <li key={city.id}>
              <button onClick={() => handleSelect(city)}>{city.name}</button>
            </li>
          ))}
        </ul>
      )}

      {selectedCity && cityEras.length > 0 && (
        <div className="passport-card">
          <div className="passport-header">
            <span className="passport-pin">📍</span>
            <span className="passport-city">{selectedCity.name.toUpperCase()}</span>
            <span className="passport-label">CITY PASSPORT</span>
          </div>
          <div className="passport-divider" />
          <ul className="passport-timeline">
            {cityEras.map((era) => (
              <li key={era.id} className="passport-era">
                <button className="passport-era-btn" onClick={() => handleEraClick(era)}>
                  <span className="passport-year">{era.yearDisplay}</span>
                  <span className="passport-arrow">→</span>
                  <span className="passport-name">{era.eraName}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="passport-divider" />
          <div className="passport-footer">
            {cityEras.length} RULER{cityEras.length !== 1 ? 'S' : ''} ACROSS {
              (() => {
                const first = cityEras[0]?.yearDisplay || ''
                const last = cityEras[cityEras.length - 1]?.yearDisplay || ''
                return `${first} – ${last}`
              })()
            }
          </div>
        </div>
      )}
    </div>
  )
}
