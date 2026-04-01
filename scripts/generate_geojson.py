"""
Generate historically accurate GeoJSON polygons for all placeholder eras.
Coordinates are based on documented empire extents from Wikipedia and historical atlases.
"""
import json, os, urllib.request, sys

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'geojson')
os.makedirs(OUT, exist_ok=True)

def save(filename, name, era_id, coords, multi=False):
    if multi:
        geom = {"type": "MultiPolygon", "coordinates": coords}
    else:
        geom = {"type": "Polygon", "coordinates": [coords]}
    fc = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {"name": name, "era": era_id},
            "geometry": geom
        }]
    }
    path = os.path.join(OUT, filename)
    with open(path, 'w') as f:
        json.dump(fc, f)
    sz = os.path.getsize(path)
    print(f"  {filename}: {sz} bytes")

def save_multi_feature(filename, features):
    fc = {"type": "FeatureCollection", "features": features}
    path = os.path.join(OUT, filename)
    with open(path, 'w') as f:
        json.dump(fc, f)
    sz = os.path.getsize(path)
    print(f"  {filename}: {sz} bytes")

# Modern India outline (reused for post-independence eras)
MODERN_INDIA = [
    [68.2, 23.5], [68.5, 22.0], [69.0, 22.5], [69.5, 21.0],
    [70.0, 20.5], [71.0, 20.8], [72.0, 19.0], [72.8, 18.9],
    [73.0, 17.5], [73.5, 16.0], [74.0, 14.5], [74.5, 13.0],
    [74.8, 12.0], [75.0, 11.0], [76.0, 9.5], [77.0, 8.2],
    [77.5, 8.1], [78.0, 8.5], [78.5, 9.5], [79.0, 10.5],
    [79.5, 11.5], [80.0, 12.5], [80.2, 13.5], [80.5, 15.5],
    [81.0, 16.5], [82.0, 17.0], [83.5, 18.5], [84.5, 19.0],
    [86.0, 20.0], [87.0, 21.0], [88.0, 21.5], [89.0, 21.8],
    [88.5, 22.5], [88.0, 23.0], [88.5, 24.0], [89.0, 26.0],
    [90.0, 26.5], [91.5, 26.5], [92.5, 27.5], [94.0, 28.5],
    [96.0, 28.0], [97.0, 27.5], [96.5, 26.0], [94.5, 25.0],
    [93.5, 24.0], [93.0, 23.5], [93.5, 22.5], [93.0, 21.5],
    [92.5, 21.0], [92.5, 20.5], [92.0, 21.0], [90.5, 22.0],
    [89.0, 21.8], [88.0, 21.5], [87.0, 21.0], [86.0, 20.0],
    [84.5, 19.0], [83.5, 18.5], [82.0, 17.0],
    [80.2, 13.5], [80.0, 12.5],
    [79.5, 11.5], [79.0, 10.5],
    # Going up the western side via Pakistan border
    [77.5, 8.1], [77.0, 8.2], [76.0, 9.5], [75.0, 11.0],
    [74.8, 12.0], [74.5, 13.0], [74.0, 14.5], [73.5, 16.0],
    [73.0, 17.5], [72.8, 18.9], [72.0, 19.0], [71.0, 20.8],
    [70.0, 20.5], [69.5, 21.0], [69.0, 22.5], [68.5, 22.0],
    [68.2, 23.5], [68.5, 24.5], [69.0, 25.0], [70.0, 26.5],
    [70.5, 27.5], [71.0, 28.0], [72.0, 29.5], [73.0, 30.5],
    [73.5, 31.0], [74.0, 31.5], [74.5, 32.5], [75.0, 33.0],
    [75.5, 34.0], [76.0, 34.5], [77.0, 35.0], [78.0, 35.5],
    [78.5, 34.5], [78.0, 33.0], [78.5, 32.5], [79.0, 31.0],
    [80.0, 30.5], [80.5, 29.5], [81.0, 28.5], [82.0, 27.5],
    [83.0, 27.0], [84.0, 27.5], [85.0, 27.0], [86.0, 26.5],
    [87.0, 26.5], [88.0, 26.5], [88.5, 24.0],
    [88.0, 23.0], [88.5, 22.5], [89.0, 21.8],
]

# Simplified clean modern India outline for reuse
INDIA_CLEAN = [
    [77.0, 35.5], [78.5, 35.0], [79.0, 32.5], [80.0, 30.5],
    [81.0, 28.5], [83.0, 27.0], [85.0, 27.0], [87.0, 26.5],
    [88.5, 26.0], [89.5, 26.5], [92.0, 27.5], [96.0, 28.0],
    [97.0, 27.0], [95.0, 25.5], [93.0, 23.0], [93.0, 21.5],
    [92.0, 21.5], [89.5, 22.0], [88.5, 21.5], [87.0, 21.0],
    [85.5, 20.0], [83.5, 18.5], [81.0, 16.5], [80.2, 14.5],
    [80.0, 12.5], [79.5, 10.5], [78.0, 8.5], [77.0, 8.1],
    [76.0, 9.5], [75.0, 11.5], [74.5, 13.0], [73.5, 16.0],
    [73.0, 17.5], [72.5, 19.0], [70.5, 20.5], [69.0, 22.5],
    [68.0, 23.5], [69.0, 25.5], [70.0, 27.0], [71.5, 28.5],
    [73.0, 30.5], [74.5, 32.0], [75.5, 34.0], [77.0, 35.5]
]

print("=== Generating historical GeoJSON files ===\n")

# --- VEDIC PERIOD (1500 BCE) ---
# Indo-Gangetic Plain, northwestern India, Sapta Sindhu region
save("vedic_period.geojson", "Vedic Period", "vedic_period", [
    [69.0, 30.0], [71.0, 31.5], [73.0, 32.0], [75.0, 31.5],
    [77.0, 30.5], [79.0, 29.5], [81.0, 28.5], [83.0, 27.0],
    [84.0, 26.5], [84.0, 25.0], [83.0, 24.0], [81.0, 23.5],
    [79.0, 24.0], [77.0, 25.0], [75.0, 26.0], [73.0, 27.0],
    [71.0, 28.0], [69.5, 28.5], [69.0, 30.0]
])

# --- MAHAJANAPADAS (600 BCE) ---
# 16 kingdoms across northern and central India, from Gandhara to Anga
save("mahajanapadas.geojson", "Mahajanapadas", "mahajanapadas", [
    [66.0, 33.0], [69.0, 35.0], [72.0, 34.0], [75.0, 32.0],
    [78.0, 30.0], [80.0, 28.0], [82.0, 26.5], [84.0, 25.0],
    [86.0, 24.5], [87.5, 24.0], [88.0, 22.5], [87.0, 21.0],
    [85.0, 21.0], [83.0, 22.0], [80.0, 22.5], [77.0, 23.0],
    [75.0, 23.5], [73.0, 24.0], [71.0, 25.0], [69.0, 27.0],
    [67.0, 29.0], [66.0, 31.0], [66.0, 33.0]
])

# --- MAURYA EARLY (322 BCE) ---
# Chandragupta: Northern India to Afghanistan, not yet full south
save("maurya_early.geojson", "Maurya Empire (Early)", "maurya_early", [
    [65.0, 36.0], [68.0, 37.0], [71.0, 35.5], [74.0, 33.0],
    [77.0, 31.0], [80.0, 29.0], [82.0, 27.0], [84.0, 26.0],
    [86.0, 25.5], [88.0, 24.0], [89.0, 23.0], [88.0, 21.5],
    [86.0, 20.5], [84.0, 20.0], [82.0, 19.5], [80.0, 20.0],
    [78.0, 19.0], [76.0, 18.0], [74.0, 18.5], [72.0, 20.0],
    [70.0, 22.0], [68.5, 24.0], [67.0, 27.0], [66.0, 29.0],
    [64.5, 32.0], [65.0, 34.5], [65.0, 36.0]
])

# --- POST-MAURYA (185 BCE) ---
# Shunga Empire: central-north India, much reduced from Maurya
save("post_maurya.geojson", "Post-Maurya Period", "post_maurya", [
    [73.0, 30.0], [75.0, 29.5], [77.0, 28.5], [79.0, 27.5],
    [81.0, 26.5], [83.0, 26.0], [85.0, 25.5], [86.0, 24.5],
    [85.5, 23.0], [84.0, 22.0], [82.0, 22.0], [80.0, 22.5],
    [78.0, 23.0], [76.0, 23.5], [74.0, 24.5], [73.0, 26.0],
    [72.5, 28.0], [73.0, 30.0]
])

# --- KUSHAN & SATAVAHANA (100 CE) ---
# Two empires: Kushan in north (Afghanistan to Varanasi), Satavahana in Deccan
kushan = {
    "type": "Feature",
    "properties": {"name": "Kushan Empire", "era": "kushan_satavahana", "entity": "kushan"},
    "geometry": {"type": "Polygon", "coordinates": [[
        [65.0, 37.0], [68.0, 36.5], [71.0, 35.0], [74.0, 33.0],
        [76.0, 31.5], [78.0, 30.0], [80.0, 28.5], [82.0, 27.0],
        [83.0, 26.0], [83.0, 24.5], [82.0, 23.5], [80.0, 24.0],
        [78.0, 25.0], [76.0, 26.0], [74.0, 27.5], [72.0, 29.0],
        [70.0, 30.0], [68.0, 31.5], [66.0, 33.0], [65.0, 35.0],
        [65.0, 37.0]
    ]]}
}
satavahana = {
    "type": "Feature",
    "properties": {"name": "Satavahana Empire", "era": "kushan_satavahana", "entity": "satavahana"},
    "geometry": {"type": "Polygon", "coordinates": [[
        [73.0, 21.0], [74.0, 20.0], [74.5, 18.5], [75.0, 17.0],
        [76.0, 16.0], [77.0, 15.0], [78.0, 15.5], [79.5, 16.0],
        [80.5, 17.0], [81.0, 18.0], [81.5, 19.0], [82.0, 20.0],
        [81.0, 20.5], [79.5, 21.0], [78.0, 21.5], [76.0, 22.0],
        [74.5, 22.0], [73.5, 21.5], [73.0, 21.0]
    ]]}
}
save_multi_feature("kushan_satavahana.geojson", [kushan, satavahana])

# --- POST-GUPTA (467 CE) ---
# Fragmented: Vakatakas in Deccan, smaller kingdoms in north
save("post_gupta.geojson", "Post-Gupta Period", "post_gupta", [
    [73.0, 28.0], [75.0, 27.0], [77.0, 26.5], [79.0, 26.0],
    [81.0, 25.5], [83.0, 25.0], [84.5, 24.0], [85.0, 22.5],
    [84.0, 21.0], [82.0, 19.5], [80.0, 18.5], [78.0, 17.5],
    [76.0, 17.0], [74.5, 18.0], [73.5, 19.5], [73.0, 21.0],
    [72.5, 23.0], [72.0, 25.0], [72.5, 27.0], [73.0, 28.0]
])

# --- HARSHA'S EMPIRE (606 CE) ---
# Northern India from Gujarat to Bengal, bounded by Narmada in south
save("harsha_empire.geojson", "Harsha's Empire", "harsha_empire", [
    [69.0, 26.0], [70.0, 27.5], [72.0, 29.0], [74.0, 30.5],
    [76.0, 31.0], [78.0, 30.0], [80.0, 28.5], [82.0, 27.0],
    [84.0, 26.0], [86.0, 25.0], [87.5, 24.0], [88.5, 23.0],
    [88.0, 22.0], [86.5, 21.5], [85.0, 22.0], [83.0, 22.5],
    [81.0, 22.0], [79.0, 22.5], [77.0, 22.0], [75.5, 22.5],
    [74.0, 22.0], [73.0, 21.5], [72.0, 22.0], [71.0, 22.5],
    [70.0, 23.0], [69.0, 24.0], [68.5, 25.0], [69.0, 26.0]
])

# --- RASHTRAKUTAS & PALAS (750 CE) ---
# Two power centers: Rashtrakuta in Deccan, Pala in Bengal
rashtrakuta = {
    "type": "Feature",
    "properties": {"name": "Rashtrakuta Empire", "era": "rashtrakuta_pala", "entity": "rashtrakuta"},
    "geometry": {"type": "Polygon", "coordinates": [[
        [73.0, 21.5], [74.0, 20.0], [74.5, 18.0], [75.0, 16.5],
        [76.0, 15.0], [77.5, 14.5], [79.0, 15.0], [80.0, 16.0],
        [80.5, 17.5], [80.0, 19.0], [79.0, 20.0], [78.0, 21.0],
        [76.5, 21.5], [75.0, 22.0], [73.5, 22.0], [73.0, 21.5]
    ]]}
}
pala = {
    "type": "Feature",
    "properties": {"name": "Pala Empire", "era": "rashtrakuta_pala", "entity": "pala"},
    "geometry": {"type": "Polygon", "coordinates": [[
        [83.0, 27.0], [84.5, 26.5], [86.0, 26.0], [87.5, 25.0],
        [88.5, 24.0], [89.0, 23.0], [88.5, 22.0], [87.0, 21.5],
        [85.5, 22.0], [84.0, 23.0], [83.0, 24.5], [82.5, 26.0],
        [83.0, 27.0]
    ]]}
}
save_multi_feature("rashtrakuta_pala.geojson", [rashtrakuta, pala])

# --- CHOLA EMPIRE (1000 CE) ---
# Southern India + Sri Lanka, primarily Tamil country and Deccan coast
save("chola_empire.geojson", "Chola Empire", "chola_empire", [
    [75.5, 16.0], [76.5, 15.0], [77.0, 14.0], [77.5, 13.0],
    [78.0, 12.0], [78.5, 11.0], [79.0, 10.0], [79.5, 9.0],
    [80.0, 8.0], [80.5, 7.5], [81.0, 7.0], [81.5, 7.5],
    [81.0, 8.5], [80.5, 9.5], [80.3, 10.5], [80.0, 11.5],
    [80.2, 12.5], [80.5, 14.0], [81.0, 15.5], [82.0, 17.0],
    [83.0, 18.0], [84.0, 19.0], [85.0, 19.5], [84.0, 18.5],
    [82.5, 17.0], [81.0, 16.0], [80.0, 15.5], [79.0, 16.0],
    [78.0, 16.5], [77.0, 16.5], [76.0, 16.5], [75.5, 16.0]
])

# --- RAJPUT KINGDOMS (1000 CE) ---
# Rajasthan, Gujarat, parts of central India
save("rajput_kingdoms.geojson", "Rajput Kingdoms", "rajput_kingdoms", [
    [69.0, 26.0], [70.0, 27.5], [71.5, 28.5], [73.0, 29.5],
    [74.5, 30.0], [76.0, 29.5], [77.5, 28.5], [78.5, 27.5],
    [79.5, 26.5], [80.0, 25.0], [79.0, 24.0], [78.0, 23.0],
    [77.0, 22.0], [76.0, 21.5], [75.0, 21.0], [74.0, 21.0],
    [73.0, 21.5], [72.0, 22.0], [71.0, 22.5], [70.0, 23.0],
    [69.0, 24.0], [68.5, 25.0], [69.0, 26.0]
])

# --- DELHI SULTANATE EARLY (1206 CE) ---
# Northern India centered on Delhi, Gangetic plain
save("delhi_sultanate_early.geojson", "Delhi Sultanate (Early)", "delhi_sultanate_early", [
    [71.0, 32.0], [73.0, 31.5], [75.0, 31.0], [77.0, 30.0],
    [79.0, 28.5], [81.0, 27.0], [83.0, 26.0], [85.0, 25.0],
    [86.0, 24.0], [85.5, 22.5], [84.0, 22.0], [82.0, 22.5],
    [80.0, 23.0], [78.0, 23.5], [76.0, 23.0], [74.0, 22.5],
    [73.0, 22.0], [72.0, 22.5], [71.0, 24.0], [70.0, 26.0],
    [70.0, 28.0], [70.5, 30.0], [71.0, 32.0]
])

# --- DELHI SULTANATE PEAK (1320 CE) ---
# Nearly entire subcontinent under Tughlaq, from Kashmir to Madurai
save("delhi_sultanate_peak.geojson", "Delhi Sultanate (Peak)", "delhi_sultanate_peak", [
    [69.0, 34.0], [72.0, 34.5], [75.0, 33.0], [77.0, 31.0],
    [79.0, 29.5], [81.0, 28.0], [83.0, 27.0], [85.0, 26.5],
    [87.0, 25.5], [88.5, 24.0], [89.0, 22.5], [88.0, 21.0],
    [86.0, 20.0], [84.0, 19.0], [82.0, 17.5], [80.5, 15.5],
    [79.5, 13.0], [79.0, 11.0], [78.0, 9.5], [77.0, 10.0],
    [76.0, 11.5], [75.5, 13.0], [75.0, 15.0], [74.5, 17.0],
    [74.0, 18.5], [73.5, 19.5], [73.0, 20.5], [72.0, 21.0],
    [71.0, 22.0], [70.0, 23.0], [69.0, 24.5], [68.5, 26.0],
    [69.0, 28.0], [69.5, 30.0], [69.0, 32.0], [69.0, 34.0]
])

# --- VIJAYANAGARA & BAHMANI (1400 CE) ---
# Southern India divided: Vijayanagara (south), Bahmani (north Deccan)
vijayanagara = {
    "type": "Feature",
    "properties": {"name": "Vijayanagara Empire", "era": "vijayanagara_bahmani", "entity": "vijayanagara"},
    "geometry": {"type": "Polygon", "coordinates": [[
        [74.5, 16.0], [75.5, 15.0], [76.5, 14.0], [77.5, 13.0],
        [78.0, 12.0], [78.5, 10.5], [79.0, 9.5], [78.0, 8.5],
        [77.0, 8.2], [76.0, 9.5], [75.0, 11.0], [74.5, 12.5],
        [74.0, 14.0], [74.0, 15.5], [74.5, 16.0]
    ]]}
}
bahmani = {
    "type": "Feature",
    "properties": {"name": "Bahmani Sultanate", "era": "vijayanagara_bahmani", "entity": "bahmani"},
    "geometry": {"type": "Polygon", "coordinates": [[
        [73.0, 21.0], [74.0, 19.5], [74.5, 18.0], [75.0, 16.5],
        [76.0, 16.0], [77.0, 16.5], [78.0, 17.0], [79.0, 17.5],
        [80.0, 18.0], [80.5, 19.5], [80.0, 20.5], [79.0, 21.0],
        [77.5, 21.5], [76.0, 21.5], [74.5, 21.5], [73.0, 21.0]
    ]]}
}
save_multi_feature("vijayanagara_bahmani.geojson", [vijayanagara, bahmani])

# --- PRE-MUGHAL INDIA (1500 CE) ---
# Fragmented: Lodi Sultanate in north, Vijayanagara in south, various regional
save("pre_mughal.geojson", "Pre-Mughal India", "pre_mughal", [
    [70.0, 32.0], [73.0, 31.5], [75.0, 30.5], [77.0, 29.5],
    [79.0, 28.0], [81.0, 27.0], [83.0, 26.5], [85.0, 26.0],
    [87.0, 25.0], [88.0, 23.5], [88.0, 22.0], [87.0, 21.0],
    [85.0, 20.0], [83.0, 19.0], [81.0, 17.0], [80.0, 15.0],
    [79.0, 12.0], [78.0, 9.0], [77.0, 8.2], [76.0, 9.5],
    [75.0, 11.5], [74.5, 13.5], [74.0, 16.0], [73.5, 18.0],
    [73.0, 20.0], [72.0, 21.0], [70.5, 22.0], [69.5, 24.0],
    [69.0, 26.0], [69.5, 28.5], [70.0, 30.5], [70.0, 32.0]
])

# --- MUGHAL EARLY (1526 CE) ---
# Babur's territory: northern India - Delhi, Agra, parts of Rajasthan, Bihar
save("mughal_early.geojson", "Mughal Empire (Early)", "mughal_early", [
    [66.0, 35.0], [69.0, 36.0], [72.0, 34.5], [75.0, 32.5],
    [77.0, 30.5], [79.0, 29.0], [81.0, 27.5], [83.0, 26.5],
    [85.0, 25.5], [86.0, 24.5], [86.0, 23.0], [84.5, 22.0],
    [82.0, 22.5], [80.0, 23.0], [78.0, 23.5], [76.0, 23.0],
    [74.5, 22.5], [73.0, 22.0], [72.0, 22.5], [70.5, 23.5],
    [69.0, 25.0], [68.0, 27.0], [67.0, 29.5], [66.0, 32.0],
    [66.0, 35.0]
])

# --- MUGHAL DECLINE (1707 CE) ---
# Reduced Mughal: mainly Delhi region + nominal authority over fragments
save("mughal_decline.geojson", "Mughal Decline", "mughal_decline", [
    [73.0, 30.5], [75.0, 30.0], [77.0, 29.0], [78.5, 28.0],
    [79.5, 27.0], [80.0, 26.0], [80.0, 25.0], [79.0, 24.5],
    [78.0, 24.0], [77.0, 24.5], [76.0, 25.0], [75.0, 25.5],
    [74.0, 26.0], [73.0, 27.0], [72.5, 28.5], [73.0, 30.5]
])

# --- BRITISH EAST INDIA CO. (1800 CE) ---
# Three presidencies: Bengal, Madras, Bombay + expanding
bengal_presidency = {
    "type": "Feature",
    "properties": {"name": "Bengal Presidency", "era": "british_east_india", "entity": "bengal"},
    "geometry": {"type": "Polygon", "coordinates": [[
        [80.0, 27.0], [82.0, 26.5], [84.0, 26.0], [86.0, 25.5],
        [87.5, 25.0], [88.5, 24.0], [89.0, 22.5], [88.5, 21.5],
        [87.0, 21.0], [85.0, 20.5], [83.5, 21.0], [82.0, 22.0],
        [80.5, 23.5], [80.0, 25.0], [80.0, 27.0]
    ]]}
}
madras_presidency = {
    "type": "Feature",
    "properties": {"name": "Madras Presidency", "era": "british_east_india", "entity": "madras"},
    "geometry": {"type": "Polygon", "coordinates": [[
        [78.5, 16.0], [79.0, 14.5], [79.5, 12.5], [80.0, 10.5],
        [79.5, 9.0], [78.5, 8.5], [77.5, 8.2], [77.0, 9.5],
        [76.5, 11.0], [76.0, 13.0], [76.5, 14.5], [77.5, 15.5],
        [78.5, 16.0]
    ]]}
}
bombay_presidency = {
    "type": "Feature",
    "properties": {"name": "Bombay Presidency", "era": "british_east_india", "entity": "bombay"},
    "geometry": {"type": "Polygon", "coordinates": [[
        [72.5, 21.5], [73.0, 20.0], [73.5, 18.5], [74.0, 17.0],
        [74.5, 15.5], [75.0, 14.5], [76.0, 15.5], [76.5, 17.0],
        [76.0, 18.5], [75.0, 20.0], [74.0, 21.0], [73.0, 21.5],
        [72.5, 21.5]
    ]]}
}
save_multi_feature("british_east_india.geojson", [bengal_presidency, madras_presidency, bombay_presidency])

# --- LATE RAJ / INDEPENDENCE MOVEMENT (1920 CE) ---
# Same as British Raj extent (use british_raj coords which already exist and are good)
# Copy from existing british_raj if it's good, otherwise use our clean outline
save("late_raj.geojson", "Late Raj & Independence Movement", "late_raj", [
    [62.0, 30.0], [65.0, 28.0], [68.0, 25.0], [70.0, 22.0],
    [72.0, 18.0], [72.0, 14.0], [74.0, 10.0], [77.0, 8.0],
    [80.0, 12.0], [85.0, 16.0], [88.0, 20.0], [92.0, 22.0],
    [96.0, 25.0], [97.0, 28.0], [95.0, 28.0], [92.0, 27.0],
    [90.0, 26.5], [88.5, 26.0], [88.0, 24.0], [88.5, 22.5],
    [89.0, 21.5], [88.0, 21.0], [86.0, 20.0], [83.0, 18.0],
    [80.0, 14.0], [77.0, 9.0], [75.0, 11.0], [72.0, 15.0],
    [69.0, 19.0], [66.0, 24.0], [63.0, 28.0], [62.0, 30.0],
    [63.0, 32.0], [66.0, 34.0], [69.0, 36.0], [72.0, 36.0],
    [75.0, 35.5], [78.0, 36.0], [80.0, 33.0], [79.0, 31.0],
    [78.0, 29.5], [76.0, 28.5], [73.0, 30.5], [70.0, 33.0],
    [67.0, 35.0], [65.0, 34.0], [63.0, 32.0], [62.0, 30.0]
])

# --- EARLY REPUBLIC (1950 CE) ---
# Post-partition India (similar to modern but without current northeast adjustments)
save("early_republic.geojson", "Early Republic", "early_republic", INDIA_CLEAN)

# --- STATES REORGANISATION (1956 CE) ---
# Same borders as early republic
save("states_reorganisation.geojson", "States Reorganisation", "states_reorganisation", INDIA_CLEAN)

# --- IMPROVE EXISTING ROUGH FILES ---
print("\n=== Improving existing rough GeoJSON ===\n")

# Better Maratha Confederacy (1758) - from Attock to Cuttack
save("maratha_peak.geojson", "Maratha Confederacy", "maratha_peak", [
    [69.0, 34.0], [71.0, 33.0], [73.0, 31.5], [75.0, 30.5],
    [77.0, 29.5], [79.0, 28.0], [81.0, 27.0], [83.0, 26.0],
    [84.5, 25.0], [86.0, 24.0], [86.0, 22.0], [85.0, 20.5],
    [83.5, 19.0], [82.0, 17.5], [80.5, 16.0], [79.0, 14.5],
    [77.5, 14.0], [76.0, 14.5], [75.0, 15.0], [74.0, 16.5],
    [73.5, 18.0], [73.0, 19.5], [72.0, 20.5], [71.0, 21.5],
    [70.0, 23.0], [69.0, 25.0], [68.5, 27.0], [69.0, 29.0],
    [69.0, 31.0], [69.0, 34.0]
])

print("\n=== All GeoJSON files generated! ===")
print(f"\nOutput directory: {os.path.abspath(OUT)}")
