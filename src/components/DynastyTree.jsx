import { useState } from 'react'
import dynasties from '../data/dynasties.json'

export default function DynastyTree({ era }) {
  const [expanded, setExpanded] = useState(false)

  const lineage = era?.id ? dynasties[era.id] : null

  if (!lineage || lineage.length === 0) return null

  return (
    <div className="panel-dynasty-tree">
      <button
        className="dynasty-toggle"
        onClick={() => setExpanded((p) => !p)}
      >
        {expanded ? '▼' : '▶'} DYNASTY LINEAGE
      </button>
      {expanded && (
        <ul className="dynasty-list">
          {lineage.map((member, i) => (
            <li key={i} className="dynasty-member">
              <span className="dynasty-name">{member.name}</span>
              <span className="dynasty-reign">[{member.reign}]</span>
              {member.parent && (
                <span className="dynasty-parent">← {member.parent}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
