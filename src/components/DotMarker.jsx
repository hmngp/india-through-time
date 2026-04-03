import { CircleMarker, Popup } from 'react-leaflet'

export default function DotMarker({ incident, variant = 'default' }) {
  const isBattle = variant === 'battle'
  const r = isBattle ? 5 : 4
  const ringR = isBattle ? 10 : 9

  return (
    <CircleMarker
      center={[incident.lat, incident.lng]}
      radius={r}
      pathOptions={{
        fillColor: '#ffffff',
        fillOpacity: 0.98,
        color: '#ffffff',
        weight: 1.2,
        opacity: 0.95,
        className: 'incident-marker-dot',
      }}
    >
      <Popup
        className="dot-popup-wrapper"
        maxWidth={300}
        minWidth={240}
      >
        <div className="dot-popup-card">
          <div className="dot-popup-card__top">
            <span className="dot-popup-card__tag">{incident.classification}</span>
          </div>
          <h3 className="dot-popup-card__title">{incident.title}</h3>
          <p className="dot-popup-card__location">{incident.location}</p>
          <span className="dot-popup-card__year">{incident.year}</span>
          <p className="dot-popup-card__desc">{incident.description}</p>
          <a
            href={incident.wikiLink}
            target="_blank"
            rel="noopener noreferrer"
            className="dot-popup-card__link"
          >
            Read on Wikipedia →
          </a>
        </div>
      </Popup>

      <CircleMarker
        center={[incident.lat, incident.lng]}
        radius={ringR}
        pathOptions={{
          fillColor: 'transparent',
          fillOpacity: 0,
          color: '#ffffff',
          weight: 1,
          opacity: 0.35,
          className: 'incident-marker-ring',
        }}
      />
    </CircleMarker>
  )
}
