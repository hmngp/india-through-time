"""
Generate historically accurate GeoJSON for all eras using xatra's territory library.
Uses district-level GADM data with pre-defined historical region compositions.
NO simplification -- full resolution boundaries.
"""
import json, os, sys

os.environ['PYTHONIOENCODING'] = 'utf-8'

from xatra import Territory
from xatra.territory_library import (
    # Gangetic kingdoms / Mahajanapadas
    MAGADHA, KOSALA, KURU, PANCALA, VATSA, KASI, VIDEHA, LICCHAVI, MALLA,
    ANGA, SURASENA, AVANTI, AKARA, DASARNA, CEDI,
    # Punjab / NW
    GANDHARA, PUNJAB, SINDH, TRIGARTA, AUDUMBARA, KUNINDA,
    DOAB_IJ, MADRA, USINARA, MALAVA, KSUDRAKA,
    # Afghanistan / Central Asia
    KAMBOJA, BACTRIA, KANDAHAR, ZARANJ, HERAT,
    AFG_BACTRIA, AFG_MERU, AFG_MISC,
    # Rajasthan
    MATSYA, KUKURA, SALVA, RJ_MARU, HADOTI, RJ,
    # Gujarat
    KUTCH, ANARTA, SURASTRA, LATA, GUJARAT,
    # Madhya Pradesh
    PULINDA, MP,
    # Deccan
    VIDARBHA, RSIKA, MULAKA, ASMAKA, APARANTA, GREATER_PUNE,
    KUNTALA, KADAMBA, CAUVERIC, MAHISAKA, VENGI, DECCAN,
    # Tamil / South
    COLA, PANDYA, KANCI, KONGU, CERA, AY, EZHIMALA, TULU, COORG,
    KERALA, MALABAR, SIMHALA, TAMIL,
    # Bengal / East
    GAUDA, RADHA, SUHMA, PUNDRA, VANGA, SAMATATA, BENGAL,
    # Forests / Tribal
    GREAT_FOREST, KALINGA, UTKALA, CHHOTA_NAGPUR,
    # Composites
    GANGETIC, BRAHMAVARTA, AUDICYA, NORTH_INDIA, ARYAVARTA,
    SUBCONTINENT, SUBCONTINENT_PROPER, BHARATA,
    HIMALAYAN, TERAI, BALOCH,
    # NE India
    NEI_HIM, LAUHITYA,
    # Big composites
    BAYALU, UP_KALAKAVANA, UP_NAIMISA, BIHAR_NORTHEAST,
    # Kashmir
    KASHMIR, JAMMU, LADAKH, POJK, DARADA,
    # Pakistan sub-regions
    BAHAWALPUR,
)
from xatra.loaders import gadm

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'geojson')
os.makedirs(OUT, exist_ok=True)

def to_geojson(territory):
    gj = territory.to_geojson_dict()
    return gj

def save_single(filename, name, era_id, territory):
    geom = to_geojson(territory)
    if geom is None:
        print(f"  SKIP {filename}: no geometry")
        return
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
    print(f"  {filename}: {os.path.getsize(path):,} bytes")

def save_multi(filename, feature_list):
    features = []
    for name, era_id, territory, extra_props in feature_list:
        geom = to_geojson(territory)
        if geom is None:
            continue
        props = {"name": name, "era": era_id}
        props.update(extra_props)
        features.append({
            "type": "Feature",
            "properties": props,
            "geometry": geom
        })
    fc = {"type": "FeatureCollection", "features": features}
    path = os.path.join(OUT, filename)
    with open(path, 'w') as f:
        json.dump(fc, f)
    print(f"  {filename}: {os.path.getsize(path):,} bytes ({len(features)} features)")


print("=== Generating historically accurate GeoJSON (full resolution) ===\n")

# ─── 1. INDUS VALLEY CIVILIZATION (3300 BCE) ───
# Archaeological sites along Indus, Ghaggar-Hakra: Sindh, Punjab, Gujarat, Rajasthan
indus = SINDH | PUNJAB | KUTCH | ANARTA | SURASTRA | LATA | MATSYA | KUKURA | BRAHMAVARTA
save_single("indus_valley.geojson", "Indus Valley Civilization", "indus_valley", indus)

# ─── 2. VEDIC PERIOD (1500 BCE) ───
# Sapta Sindhu: Punjab, Brahmavarta (Haryana+Delhi), Kuru-Pancala heartland
vedic = PUNJAB | BRAHMAVARTA | KURU | PANCALA | GANDHARA | TRIGARTA
save_single("vedic_period.geojson", "Vedic Period", "vedic_period", vedic)

# ─── 3. MAHAJANAPADAS (600 BCE) ───
# The 16 great kingdoms: Magadha, Kosala, Kuru, Pancala, Vatsa, Kasi,
# Avanti, Gandhara, Kamboja, Matsya, Surasena, Anga, Videha, Malla, Cedi, etc.
mahajanapadas = (
    MAGADHA | KOSALA | KURU | PANCALA | VATSA | KASI | VIDEHA | LICCHAVI | MALLA |
    ANGA | SURASENA | AVANTI | GANDHARA | KAMBOJA | MATSYA | CEDI |
    TRIGARTA | AUDUMBARA | KUNINDA
)
save_single("mahajanapadas.geojson", "Mahajanapadas", "mahajanapadas", mahajanapadas)

# ─── 4. MAURYA EMPIRE — EARLY (322 BCE) ───
# Chandragupta: Magadha base, conquered Nanda, then Seleucid territories
# North India + Gandhara + Kamboja + parts of Afghanistan, down to Avanti
maurya_early = (
    NORTH_INDIA | GANDHARA | KAMBOJA | KANDAHAR | BALOCH |
    DECCAN | KALINGA | GREAT_FOREST | BENGAL
)
save_single("maurya_early.geojson", "Maurya Empire (Early)", "maurya_early", maurya_early)

# ─── 5. MAURYA EMPIRE — PEAK (268 BCE) ───
# Ashoka: Nearly the entire subcontinent + Afghanistan
# Everything except extreme Tamil south (Chera, Chola, Pandya stayed independent)
maurya_peak = SUBCONTINENT_PROPER | KAMBOJA | KANDAHAR | ZARANJ | BALOCH | BACTRIA
save_single("maurya_peak.geojson", "Maurya Empire (Peak)", "maurya_peak", maurya_peak)

# ─── 6. POST-MAURYA PERIOD (185 BCE) ───
# Shunga dynasty: Central Gangetic plain, reduced from Maurya
shunga = GANGETIC | AVANTI | AKARA | DASARNA | CEDI | BRAHMAVARTA | VIDARBHA
save_single("post_maurya.geojson", "Post-Maurya Period", "post_maurya", shunga)

# ─── 7. KUSHAN & SATAVAHANA (100 CE) ───
# Kushan: Bactria to Varanasi via Gandhara and northern plains
kushan_t = (
    BACTRIA | KAMBOJA | GANDHARA | PUNJAB | BRAHMAVARTA |
    KURU | PANCALA | KOSALA | KASI | VATSA | SURASENA |
    SINDH | TRIGARTA
)
# Satavahana: Deccan heartland
satavahana_t = (
    VIDARBHA | RSIKA | MULAKA | ASMAKA | APARANTA | GREATER_PUNE |
    KUNTALA | VENGI | MAHISAKA
)
save_multi("kushan_satavahana.geojson", [
    ("Kushan Empire", "kushan_satavahana", kushan_t, {"entity": "kushan"}),
    ("Satavahana Empire", "kushan_satavahana", satavahana_t, {"entity": "satavahana"}),
])

# ─── 8. GUPTA EMPIRE (320 CE) ───
# Golden Age: Gujarat to Bengal, Punjab to northern Deccan
gupta = (
    NORTH_INDIA | BENGAL | KALINGA | UTKALA |
    VIDARBHA | MULAKA | GREAT_FOREST
)
save_single("gupta_empire.geojson", "Gupta Empire", "gupta_empire", gupta)

# ─── 9. POST-GUPTA PERIOD (467 CE) ───
# Fragmented: Vakataka in Deccan, Maukhari/Later Gupta in Gangetic
post_gupta = (
    GANGETIC | VIDARBHA | MULAKA | ASMAKA | AVANTI | AKARA |
    BRAHMAVARTA | GUJARAT
)
save_single("post_gupta.geojson", "Post-Gupta Period", "post_gupta", post_gupta)

# ─── 10. HARSHA'S EMPIRE (606 CE) ───
# Last great north Indian empire: Gujarat to Bengal, Narmada is southern boundary
harsha = (
    GANGETIC | BRAHMAVARTA | BENGAL | AVANTI | AKARA | DASARNA |
    GUJARAT | PUNJAB | TRIGARTA | CEDI |
    GREAT_FOREST | KALINGA | UTKALA
)
save_single("harsha_empire.geojson", "Harsha's Empire", "harsha_empire", harsha)

# ─── 11. RASHTRAKUTAS & PALAS (750 CE) ───
# Rashtrakuta: Deccan + parts of north
rashtrakuta_t = (
    DECCAN | APARANTA | GREATER_PUNE | TAMIL |
    GUJARAT | AVANTI
)
# Pala: Bengal + Bihar + Odisha
pala_t = BENGAL | MAGADHA | GREAT_FOREST | KALINGA | UTKALA
save_multi("rashtrakuta_pala.geojson", [
    ("Rashtrakuta Empire", "rashtrakuta_pala", rashtrakuta_t, {"entity": "rashtrakuta"}),
    ("Pala Empire", "rashtrakuta_pala", pala_t, {"entity": "pala"}),
])

# ─── 12. CHOLA EMPIRE (1000 CE) ───
# Rajendra Chola I: Tamil country, Vengi, Karnataka coast, Sri Lanka
chola = (
    COLA | PANDYA | KANCI | KONGU | VENGI | SIMHALA |
    CAUVERIC | KADAMBA | TULU | COORG | KERALA | MAHISAKA
)
save_single("chola_empire.geojson", "Chola Empire", "chola_empire", chola)

# ─── 13. RAJPUT KINGDOMS (1000 CE) ───
# Chauhan, Paramara, Chandela, Solanki: Rajasthan, Gujarat, MP, Haryana
rajput = (
    RJ | BRAHMAVARTA | GUJARAT | AVANTI | AKARA | DASARNA |
    SURASENA | MATSYA | KUKURA | SALVA | HADOTI
)
save_single("rajput_kingdoms.geojson", "Rajput Kingdoms", "rajput_kingdoms", rajput)

# ─── 14. DELHI SULTANATE — EARLY (1206 CE) ───
# Slave Dynasty: North India centered on Delhi + Gangetic plain + Punjab
ds_early = (
    GANGETIC | BRAHMAVARTA | PUNJAB | SINDH | RJ |
    AVANTI | CEDI | BENGAL | GREAT_FOREST
)
save_single("delhi_sultanate_early.geojson", "Delhi Sultanate (Early)", "delhi_sultanate_early", ds_early)

# ─── 15. DELHI SULTANATE — PEAK (1320 CE) ───
# Muhammad bin Tughlaq: Nearly entire subcontinent
ds_peak = (
    SUBCONTINENT_PROPER | SINDH | PUNJAB | GANDHARA
)
save_single("delhi_sultanate_peak.geojson", "Delhi Sultanate (Peak)", "delhi_sultanate_peak", ds_peak)

# ─── 16. VIJAYANAGARA & BAHMANI (1400 CE) ───
vijayanagara_t = COLA | PANDYA | KANCI | KONGU | KERALA | CAUVERIC | KADAMBA | TULU | COORG | BAYALU
bahmani_t = DECCAN | APARANTA | GREATER_PUNE
save_multi("vijayanagara_bahmani.geojson", [
    ("Vijayanagara Empire", "vijayanagara_bahmani", vijayanagara_t, {"entity": "vijayanagara"}),
    ("Bahmani Sultanate", "vijayanagara_bahmani", bahmani_t, {"entity": "bahmani"}),
])

# ─── 17. PRE-MUGHAL INDIA (1500 CE) ───
# Lodi Sultanate in north, Vijayanagara in south, various regional
pre_mughal_north = GANGETIC | BRAHMAVARTA | PUNJAB | SINDH | RJ
pre_mughal_south = TAMIL | DECCAN | KALINGA
pre_mughal = pre_mughal_north | pre_mughal_south | BENGAL | GREAT_FOREST | GUJARAT
save_single("pre_mughal.geojson", "Pre-Mughal India", "pre_mughal", pre_mughal)

# ─── 18. MUGHAL EMPIRE — EARLY (1526 CE) ───
# Babur: North India + Afghanistan
mughal_early = (
    GANGETIC | BRAHMAVARTA | PUNJAB | GANDHARA | KAMBOJA |
    RJ | SINDH | GUJARAT | AVANTI | BENGAL
)
save_single("mughal_early.geojson", "Mughal Empire (Early)", "mughal_early", mughal_early)

# ─── 19. MUGHAL PEAK (1658 CE) ───
# Aurangzeb: Nearly entire subcontinent + Afghanistan
mughal_peak = (
    SUBCONTINENT_PROPER | KAMBOJA | GANDHARA | SINDH | PUNJAB | BALOCH |
    BENGAL | GREAT_FOREST | KALINGA
)
save_single("mughal_peak.geojson", "Mughal Empire (Peak)", "mughal_peak", mughal_peak)

# ─── 20. MUGHAL DECLINE (1707 CE) ───
# Reduced to Delhi region + nominal authority over fragments
mughal_decline = (
    BRAHMAVARTA | KURU | PANCALA | SURASENA | KOSALA |
    KASI | VATSA | PUNJAB
)
save_single("mughal_decline.geojson", "Mughal Decline", "mughal_decline", mughal_decline)

# ─── 21. MARATHA CONFEDERACY (1758 CE) ───
# Attock to Cuttack: massive confederacy
maratha = (
    APARANTA | GREATER_PUNE | VIDARBHA | MULAKA | ASMAKA | RSIKA |
    KUNTALA | DECCAN | GANGETIC | BRAHMAVARTA | PUNJAB |
    RJ | GUJARAT | MP | BENGAL | GREAT_FOREST | KALINGA
)
save_single("maratha_peak.geojson", "Maratha Confederacy", "maratha_peak", maratha)

# ─── 22. BRITISH EAST INDIA CO. (1800 CE) ───
bengal_t = BENGAL | GANGETIC | GREAT_FOREST | KALINGA
madras_t = TAMIL | VENGI | KANCI | COLA | PANDYA | KERALA
bombay_t = APARANTA | GREATER_PUNE | GUJARAT | SURASTRA
save_multi("british_east_india.geojson", [
    ("Bengal Presidency", "british_east_india", bengal_t, {"entity": "bengal"}),
    ("Madras Presidency", "british_east_india", madras_t, {"entity": "madras"}),
    ("Bombay Presidency", "british_east_india", bombay_t, {"entity": "bombay"}),
])

# ─── 23. BRITISH RAJ (1858 CE) ───
british_raj = SUBCONTINENT | gadm("MMR")
save_single("british_raj.geojson", "British Raj", "british_raj", british_raj)

# ─── 24. LATE RAJ / INDEPENDENCE MOVEMENT (1920 CE) ───
save_single("late_raj.geojson", "Late Raj & Independence Movement", "late_raj", british_raj)

# ─── 25. PARTITION (1947 CE) ───
india_47 = gadm("IND")
pakistan_47 = gadm("PAK") | gadm("BGD")
save_multi("partition_1947.geojson", [
    ("India", "partition_1947", india_47, {"entity": "india"}),
    ("Pakistan & East Pakistan", "partition_1947", pakistan_47, {"entity": "pakistan"}),
])

# ─── 26. EARLY REPUBLIC (1950 CE) ───
save_single("early_republic.geojson", "Republic of India", "early_republic", gadm("IND"))

# ─── 27. STATES REORGANISATION (1956 CE) ───
save_single("states_reorganisation.geojson", "States Reorganisation", "states_reorganisation", gadm("IND"))

# ─── 28. POST WARS 1971 ───
save_single("post_wars_1971.geojson", "Post-Wars India", "post_wars_1971", gadm("IND"))

# ─── 29. MODERN INDIA (2024 CE) ───
save_single("modern_india.geojson", "Modern India", "modern_india", gadm("IND"))

print("\n=== All GeoJSON files generated with FULL RESOLUTION xatra boundaries! ===")
print(f"Output: {os.path.abspath(OUT)}")
