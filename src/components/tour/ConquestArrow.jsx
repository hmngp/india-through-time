import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

function latLngToPoint(map, lat, lng) {
  const pt = map.latLngToContainerPoint([lat, lng])
  return { x: pt.x, y: pt.y }
}

export default function ConquestArrow({ arrows = [] }) {
  const map = useMap()
  const svgRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!arrows.length) return

    const container = map.getContainer()
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('class', 'tour-conquest-svg')
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:650;pointer-events:none;'

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker')
    marker.setAttribute('id', 'tour-arrowhead')
    marker.setAttribute('markerWidth', '8')
    marker.setAttribute('markerHeight', '6')
    marker.setAttribute('refX', '7')
    marker.setAttribute('refY', '3')
    marker.setAttribute('orient', 'auto')
    const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    arrowPath.setAttribute('points', '0 0, 8 3, 0 6')
    arrowPath.setAttribute('fill', '#ff6b6b')
    marker.appendChild(arrowPath)
    defs.appendChild(marker)
    svg.appendChild(defs)

    const paths = []

    arrows.forEach((arrow, i) => {
      const from = latLngToPoint(map, arrow.from[0], arrow.from[1])
      const to = latLngToPoint(map, arrow.to[0], arrow.to[1])

      const midX = (from.x + to.x) / 2
      const midY = (from.y + to.y) / 2 - 40

      const d = `M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', d)
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', '#ff6b6b')
      path.setAttribute('stroke-width', '2.5')
      path.setAttribute('stroke-linecap', 'round')
      path.setAttribute('marker-end', 'url(#tour-arrowhead)')
      path.setAttribute('opacity', '0.85')

      const len = path.getTotalLength ? 200 : 200
      path.style.strokeDasharray = len
      path.style.strokeDashoffset = len
      path.style.animation = `tourArrowDraw 1.2s ${i * 0.3}s ease-out forwards`

      svg.appendChild(path)
      paths.push(path)
    })

    container.appendChild(svg)
    svgRef.current = svg
    containerRef.current = container

    return () => {
      if (svgRef.current && containerRef.current) {
        try { containerRef.current.removeChild(svgRef.current) } catch {}
      }
    }
  }, [map, arrows])

  return null
}
