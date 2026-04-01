export const TOUR_INTRO = {
  title: "Welcome to इतिहास",
  text: "Before Pakistan, before the British, before the Mughals — this land had 5,000 years of stories. Let's start at the very beginning.",
  duration: 6000,
};

export const TOUR_OUTRO = {
  title: "This Is Your History",
  subtitle: "5,000 years in 25 minutes",
  text: "From the world's first cities to the world's largest democracy — you just traveled through one of humanity's greatest civilizations.",
};

export const chapters = [
  // ─── CHAPTER I ─────────────────────────────────────────────
  {
    id: "indus_valley",
    number: "I",
    title: "THE INDUS VALLEY",
    subtitle: "The Dawn of Urban India",
    period: "3300 BCE – 1300 BCE",
    tagline: "The world's first planned cities were here",
    eraId: "indus_valley",
    steps: [
      {
        text: "Before Rome, before Athens, before any European city existed — one of the world's greatest civilizations was already flourishing along the Indus River.",
        mapAction: { type: "flyTo", lat: 27.3, lng: 68.0, zoom: 5, duration: 2500 },
        duration: 7000,
      },
      {
        text: "Mohenjo-daro — 'Mound of the Dead.' This city had grid-planned streets, multi-storey buildings, and a sewage system that wouldn't be matched in Europe for 4,000 years.",
        mapAction: { type: "flyTo", lat: 27.32, lng: 68.14, zoom: 8, duration: 2000 },
        duration: 7000,
      },
      {
        text: "700 kilometres north, Harappa was the twin capital. Together, these cities governed a civilization of over 5 million people across modern Pakistan, India, and Afghanistan.",
        mapAction: { type: "flyTo", lat: 30.63, lng: 72.87, zoom: 7, duration: 2000 },
        duration: 7000,
      },
      {
        text: "At its peak, the Indus Valley Civilization covered 1.2 million square kilometres — larger than ancient Egypt and Mesopotamia combined.",
        mapAction: { type: "highlightRegion", geojsonFile: "indus_valley.geojson" },
        duration: 6000,
      },
      {
        text: "They invented standardized weights, built the Great Bath of Mohenjo-daro, and created a script that remains undeciphered to this day — one of archaeology's greatest mysteries.",
        mapAction: { type: "animateExpansion", geojsonFile: "indus_valley.geojson", duration: 3000 },
        achievements: [
          { icon: "grid", label: "Grid Streets", lat: 27.3, lng: 68.1 },
          { icon: "water", label: "Sewage System", lat: 27.4, lng: 68.2 },
          { icon: "scale", label: "Standard Weights", lat: 30.6, lng: 72.9 },
        ],
        duration: 7000,
      },
    ],
    quiz: {
      question: "What made the Indus Valley cities remarkable for their time?",
      options: [
        "They built pyramids",
        "Advanced drainage and grid-planned streets",
        "They invented the wheel",
        "They had a standing army of millions",
      ],
      correctIndex: 1,
      explanation: "Mohenjo-daro had grid-planned streets and a sophisticated sewage system — 4,000 years before modern Europe achieved the same.",
    },
  },

  // ─── CHAPTER II ────────────────────────────────────────────
  {
    id: "mahajanapadas",
    number: "II",
    title: "THE MAHAJANAPADAS",
    subtitle: "Sixteen Great Kingdoms",
    period: "600 BCE – 322 BCE",
    tagline: "Sixteen kingdoms. One would change everything.",
    eraId: "mahajanapadas",
    steps: [
      {
        text: "After the Indus Valley declined, power shifted east to the Gangetic plain. By 600 BCE, sixteen powerful kingdoms — the Mahajanapadas — dominated the landscape.",
        mapAction: { type: "flyTo", lat: 25.0, lng: 80.0, zoom: 5, duration: 2500 },
        duration: 7000,
      },
      {
        text: "This era saw the birth of two world religions. In Lumbini, Siddhartha Gautama became the Buddha. In Bihar, Vardhamana became Mahavira, the founder of Jainism.",
        mapAction: { type: "flyTo", lat: 27.47, lng: 83.28, zoom: 7, duration: 2000 },
        achievements: [
          { icon: "dharma", label: "Buddhism Born", lat: 27.47, lng: 83.28 },
          { icon: "jain", label: "Jainism Born", lat: 25.36, lng: 85.14 },
        ],
        duration: 7000,
      },
      {
        text: "Among the sixteen, Magadha — centered on Rajagriha in modern Bihar — would emerge as the most powerful. Its iron-rich soil and strategic rivers made it an economic powerhouse.",
        mapAction: { type: "flyTo", lat: 25.03, lng: 85.42, zoom: 7, duration: 2000 },
        duration: 6000,
      },
      {
        text: "From Gandhara in Afghanistan to Anga in Bengal, these kingdoms set the stage for India's first great empire. Democracy was practiced in the Vaishali republic — centuries before Athens.",
        mapAction: { type: "highlightRegion", geojsonFile: "mahajanapadas.geojson" },
        achievements: [
          { icon: "vote", label: "Republic of Vaishali", lat: 25.99, lng: 85.13 },
        ],
        duration: 7000,
      },
    ],
    quiz: {
      question: "Which two world religions were born during the Mahajanapada period?",
      options: [
        "Hinduism and Islam",
        "Buddhism and Jainism",
        "Christianity and Zoroastrianism",
        "Sikhism and Sufism",
      ],
      correctIndex: 1,
      explanation: "Both the Buddha and Mahavira lived during this era, founding Buddhism and Jainism respectively in the Gangetic plain.",
    },
  },

  // ─── CHAPTER III ───────────────────────────────────────────
  {
    id: "maurya",
    number: "III",
    title: "THE MAURYA EMPIRE",
    subtitle: "India's First Unification",
    period: "322 BCE – 185 BCE",
    tagline: "One man united all of India for the first time",
    eraId: "maurya_peak",
    steps: [
      {
        text: "It began in Pataliputra — modern Patna, Bihar. A young man named Chandragupta Maurya, guided by the brilliant strategist Chanakya, overthrew the Nanda dynasty.",
        mapAction: { type: "flyTo", lat: 25.61, lng: 85.14, zoom: 7, duration: 2500 },
        duration: 7000,
      },
      {
        text: "Chandragupta didn't stop there. He marched west and defeated the generals of Alexander the Great, taking control of Afghanistan and Balochistan.",
        mapAction: { type: "flyTo", lat: 33.0, lng: 68.0, zoom: 5, duration: 2000 },
        conquestArrows: [
          { from: [25.6, 85.1], to: [34.5, 69.2], label: "Western Conquest" },
        ],
        duration: 7000,
      },
      {
        text: "His grandson Ashoka inherited the largest empire India had ever seen. But one war changed everything — the conquest of Kalinga.",
        mapAction: { type: "flyTo", lat: 20.3, lng: 85.8, zoom: 6, duration: 2000 },
        conquestArrows: [
          { from: [25.6, 85.1], to: [20.3, 85.8], label: "Kalinga War" },
        ],
        duration: 7000,
      },
      {
        text: "The Kalinga War killed over 100,000 people. Horrified by the carnage, Ashoka renounced violence and embraced Buddhism — transforming from a conqueror into a philosopher-king.",
        mapAction: { type: "flyTo", lat: 20.5, lng: 86.0, zoom: 7, duration: 1500 },
        duration: 7000,
      },
      {
        text: "Under Ashoka, the Maurya Empire stretched nearly 5 million square kilometres — from Afghanistan to Bangladesh, Kashmir to Karnataka. The Lion Capital of Ashoka is India's national emblem today.",
        mapAction: { type: "animateExpansion", geojsonFile: "maurya_peak.geojson", duration: 3500 },
        duration: 7000,
      },
      {
        text: "Ashoka erected pillars across India proclaiming dharma, tolerance, and non-violence. He sent Buddhist missionaries as far as Greece, Egypt, and Sri Lanka.",
        mapAction: { type: "highlightRegion", geojsonFile: "maurya_peak.geojson" },
        achievements: [
          { icon: "pillar", label: "Ashoka Pillar", lat: 25.38, lng: 83.02 },
          { icon: "lion", label: "Lion Capital", lat: 25.38, lng: 83.02 },
          { icon: "dharma", label: "Dharma Missions", lat: 7.87, lng: 80.77 },
        ],
        duration: 7000,
      },
    ],
    quiz: {
      question: "What made Emperor Ashoka renounce violence?",
      options: [
        "He lost a battle",
        "A priest converted him",
        "The devastating Kalinga War",
        "He ran out of soldiers",
      ],
      correctIndex: 2,
      explanation: "The Kalinga War killed over 100,000 people. Horrified by the carnage he caused, Ashoka embraced Buddhism and non-violence.",
    },
  },

  // ─── CHAPTER IV ────────────────────────────────────────────
  {
    id: "gupta",
    number: "IV",
    title: "THE GUPTA EMPIRE",
    subtitle: "India's Golden Age",
    period: "320 CE – 550 CE",
    tagline: "India taught the world",
    eraId: "gupta_empire",
    steps: [
      {
        text: "After centuries of fragmentation, a new dynasty arose from Magadha. Chandragupta I married a Licchavi princess, founding the Gupta Empire in 320 CE.",
        mapAction: { type: "flyTo", lat: 25.6, lng: 85.1, zoom: 7, duration: 2500 },
        duration: 7000,
      },
      {
        text: "His son Samudragupta was a military genius. He marched south and defeated twelve kings, earning the title 'Indian Napoleon.' The empire stretched from Gujarat to Bengal.",
        mapAction: { type: "animateExpansion", geojsonFile: "gupta_empire.geojson", duration: 3000 },
        conquestArrows: [
          { from: [25.6, 85.1], to: [22.0, 72.0], label: "Western Campaign" },
          { from: [25.6, 85.1], to: [15.0, 79.0], label: "Southern Campaign" },
        ],
        duration: 7000,
      },
      {
        text: "Under Chandragupta II, India entered its Golden Age. The arts, sciences, and literature flourished as never before — or since.",
        mapAction: { type: "highlightRegion", geojsonFile: "gupta_empire.geojson" },
        duration: 6000,
      },
      {
        text: "The number zero. The decimal system. Chess. Kalidasa's poetry. Aryabhata's astronomy. Sushruta's surgery. The Gupta era gave the world inventions that changed civilization forever.",
        achievements: [
          { icon: "zero", label: "The Number Zero", lat: 25.6, lng: 85.1 },
          { icon: "chess", label: "Chess Invented", lat: 25.3, lng: 83.0 },
          { icon: "scroll", label: "Kalidasa's Poetry", lat: 23.2, lng: 75.8 },
          { icon: "star", label: "Aryabhata's Astronomy", lat: 25.6, lng: 84.0 },
        ],
        duration: 8000,
      },
      {
        text: "Nalanda University in Bihar became the world's first residential university — attracting scholars from China, Korea, Japan, and Central Asia. It housed 9 million manuscripts.",
        mapAction: { type: "flyTo", lat: 25.14, lng: 85.45, zoom: 8, duration: 2000 },
        achievements: [
          { icon: "university", label: "Nalanda University", lat: 25.14, lng: 85.45 },
        ],
        duration: 7000,
      },
    ],
    quiz: {
      question: "Which of these was invented during the Gupta Golden Age?",
      options: [
        "The printing press",
        "The concept of zero",
        "Gunpowder",
        "The compass",
      ],
      correctIndex: 1,
      explanation: "The concept of zero as a number was formalized during the Gupta period — arguably India's greatest gift to world mathematics.",
    },
  },

  // ─── CHAPTER V ─────────────────────────────────────────────
  {
    id: "medieval",
    number: "V",
    title: "MEDIEVAL INDIA",
    subtitle: "The Age of Regional Powers",
    period: "750 CE – 1200 CE",
    tagline: "No single ruler. Dozens of kingdoms. Extraordinary culture.",
    eraId: "rashtrakuta_pala",
    steps: [
      {
        text: "After the Guptas fell, India fragmented into dozens of competing kingdoms. But this wasn't a dark age — it was an explosion of regional culture and architecture.",
        mapAction: { type: "flyTo", lat: 20.0, lng: 78.0, zoom: 5, duration: 2500 },
        duration: 7000,
      },
      {
        text: "In the Deccan, the Rashtrakutas carved the Kailasa Temple at Ellora from a single rock — one of the greatest architectural achievements in human history.",
        mapAction: { type: "flyTo", lat: 20.02, lng: 75.18, zoom: 7, duration: 2000 },
        achievements: [
          { icon: "temple", label: "Kailasa Temple", lat: 20.02, lng: 75.18 },
        ],
        duration: 7000,
      },
      {
        text: "In the south, the Chola Empire built the greatest navy in Indian history. Rajendra Chola I conquered parts of Southeast Asia — modern Malaysia and Indonesia.",
        mapAction: { type: "flyTo", lat: 10.78, lng: 79.13, zoom: 6, duration: 2000 },
        conquestArrows: [
          { from: [10.78, 79.13], to: [3.0, 101.7], label: "Chola Naval Expedition" },
          { from: [10.78, 79.13], to: [7.0, 80.0], label: "Sri Lanka Conquest" },
        ],
        duration: 7000,
      },
      {
        text: "In Bengal, the Pala dynasty patronized Buddhism and built the massive Somapura Mahavihara. India was fragmented, but each fragment was a world unto itself.",
        mapAction: { type: "highlightRegion", geojsonFile: "rashtrakuta_pala.geojson" },
        achievements: [
          { icon: "temple", label: "Somapura Vihara", lat: 25.03, lng: 88.98 },
        ],
        duration: 7000,
      },
    ],
    quiz: {
      question: "What did the Chola Empire achieve that was unique in Indian history?",
      options: [
        "Built the Taj Mahal",
        "Conquered parts of Southeast Asia by sea",
        "Invented gunpowder",
        "United all of India",
      ],
      correctIndex: 1,
      explanation: "Rajendra Chola I's navy conquered parts of modern Malaysia and Indonesia — the only Indian empire to project major naval power across the Indian Ocean.",
    },
  },

  // ─── CHAPTER VI ────────────────────────────────────────────
  {
    id: "mughal",
    number: "VI",
    title: "THE MUGHAL EMPIRE",
    subtitle: "Splendour and Power",
    period: "1526 CE – 1707 CE",
    tagline: "The most powerful empire since the Mauryas",
    eraId: "mughal_peak",
    steps: [
      {
        text: "In 1526, Babur — a descendant of both Genghis Khan and Timur — rode through the Khyber Pass with just 12,000 soldiers and defeated an army of 100,000 at the Battle of Panipat.",
        mapAction: { type: "flyTo", lat: 29.39, lng: 76.97, zoom: 7, duration: 2500 },
        conquestArrows: [
          { from: [34.5, 71.0], to: [29.39, 76.97], label: "Babur's Invasion" },
        ],
        duration: 7000,
      },
      {
        text: "His grandson Akbar was the true architect of Mughal greatness. He practised religious tolerance, married a Hindu Rajput princess, and created a syncretic court culture.",
        mapAction: { type: "flyTo", lat: 27.18, lng: 78.02, zoom: 7, duration: 2000 },
        achievements: [
          { icon: "crown", label: "Akbar's Court", lat: 27.18, lng: 78.02 },
        ],
        duration: 7000,
      },
      {
        text: "Shah Jahan built the Taj Mahal — a monument to love that took 22 years and 20,000 workers. It remains one of the most beautiful structures ever created.",
        mapAction: { type: "flyTo", lat: 27.17, lng: 78.04, zoom: 9, duration: 2000 },
        achievements: [
          { icon: "taj", label: "Taj Mahal", lat: 27.17, lng: 78.04 },
        ],
        duration: 7000,
      },
      {
        text: "Under Aurangzeb, the empire reached its maximum extent — covering nearly 4 million sq km and ruling 150 million people. In 1700, Mughal India had a GDP larger than all of Europe combined.",
        mapAction: { type: "animateExpansion", geojsonFile: "mughal_peak.geojson", duration: 3500 },
        duration: 7000,
      },
      {
        text: "But Aurangzeb's endless wars in the Deccan, religious intolerance, and overtaxation planted the seeds of decline. Within decades of his death, the empire would crumble.",
        mapAction: { type: "highlightRegion", geojsonFile: "mughal_peak.geojson" },
        duration: 6000,
      },
      {
        text: "The Mughal legacy lives on in India's architecture, cuisine, language (Urdu), and art. The Red Fort, Jama Masjid, and Humayun's Tomb still stand in Delhi today.",
        mapAction: { type: "flyTo", lat: 28.66, lng: 77.24, zoom: 8, duration: 2000 },
        achievements: [
          { icon: "fort", label: "Red Fort", lat: 28.66, lng: 77.24 },
          { icon: "mosque", label: "Jama Masjid", lat: 28.65, lng: 77.23 },
        ],
        duration: 7000,
      },
    ],
    quiz: {
      question: "In 1700, how did Mughal India's economy compare to Europe?",
      options: [
        "It was about the same",
        "Europe was far richer",
        "India's GDP was larger than all of Europe",
        "India was in economic decline",
      ],
      correctIndex: 2,
      explanation: "In 1700, Mughal India had a GDP representing roughly 25% of the world economy — larger than the entire continent of Europe combined.",
    },
  },

  // ─── CHAPTER VII ───────────────────────────────────────────
  {
    id: "british",
    number: "VII",
    title: "THE BRITISH RAJ",
    subtitle: "The Sun Never Sets",
    period: "1757 CE – 1947 CE",
    tagline: "How 100,000 British controlled 300 million Indians",
    eraId: "british_raj",
    steps: [
      {
        text: "It started as trade. The British East India Company arrived in 1600 for spices and textiles. But after the Battle of Plassey in 1757, trade became conquest.",
        mapAction: { type: "flyTo", lat: 23.8, lng: 88.4, zoom: 7, duration: 2500 },
        conquestArrows: [
          { from: [51.5, -0.1], to: [22.57, 88.36], label: "East India Company" },
        ],
        duration: 7000,
      },
      {
        text: "Three presidencies — Bengal, Madras, and Bombay — became the foundations of British India. Through wars, treaties, and deception, they swallowed kingdom after kingdom.",
        mapAction: { type: "highlightRegion", geojsonFile: "british_east_india.geojson" },
        duration: 7000,
      },
      {
        text: "After the failed Sepoy Mutiny of 1857, Queen Victoria took direct control. The British Raj ruled 300 million Indians with just 20,000 administrators.",
        mapAction: { type: "animateExpansion", geojsonFile: "british_raj.geojson", duration: 3500 },
        duration: 7000,
      },
      {
        text: "Britain extracted an estimated $45 trillion from India over 200 years. They built railways — not for Indians, but to move goods to ports. Famines killed tens of millions while grain was exported.",
        mapAction: { type: "flyTo", lat: 22.0, lng: 78.0, zoom: 5, duration: 2000 },
        duration: 8000,
      },
      {
        text: "But resistance never died. From Rani Lakshmibai to Bhagat Singh, from Subhas Chandra Bose to Mahatma Gandhi — millions fought for freedom through revolution and non-violence alike.",
        mapAction: { type: "highlightRegion", geojsonFile: "british_raj.geojson" },
        achievements: [
          { icon: "flag", label: "Salt March 1930", lat: 21.17, lng: 72.83 },
          { icon: "fist", label: "Quit India 1942", lat: 18.93, lng: 72.83 },
        ],
        duration: 7000,
      },
    ],
    quiz: {
      question: "How many British administrators ruled over 300 million Indians during the Raj?",
      options: [
        "About 500,000",
        "About 100,000",
        "About 20,000",
        "About 5,000",
      ],
      correctIndex: 2,
      explanation: "At its peak, the British Raj controlled the entire subcontinent with just 20,000 British administrators and 70,000 British troops — governing 300 million people.",
    },
  },

  // ─── CHAPTER VIII ──────────────────────────────────────────
  {
    id: "independence",
    number: "VIII",
    title: "INDEPENDENCE",
    subtitle: "Freedom at Midnight",
    period: "1947 CE – Present",
    tagline: "The most painful birth of a nation in history",
    eraId: "partition_1947",
    steps: [
      {
        text: "At the stroke of midnight on August 15, 1947, India gained independence. Nehru's words echoed: 'At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom.'",
        mapAction: { type: "flyTo", lat: 28.61, lng: 77.23, zoom: 7, duration: 2500 },
        duration: 8000,
      },
      {
        text: "But freedom came with partition. A line drawn in 5 weeks by a British lawyer who had never visited India split the subcontinent. 15 million people displaced. Up to 2 million killed.",
        mapAction: { type: "highlightRegion", geojsonFile: "partition_1947.geojson" },
        conquestArrows: [
          { from: [30.0, 73.0], to: [28.6, 77.2], label: "Migration East" },
          { from: [28.6, 77.2], to: [30.0, 73.0], label: "Migration West" },
        ],
        duration: 8000,
      },
      {
        text: "India adopted its constitution on January 26, 1950 — becoming the world's largest democracy. Dr. B.R. Ambedkar, born into an 'untouchable' caste, was its chief architect.",
        mapAction: { type: "flyTo", lat: 28.61, lng: 77.21, zoom: 8, duration: 2000 },
        achievements: [
          { icon: "scroll", label: "Constitution of India", lat: 28.61, lng: 77.21 },
        ],
        duration: 7000,
      },
      {
        text: "In 1971, India liberated Bangladesh in just 13 days — one of the shortest wars in history. 93,000 Pakistani soldiers surrendered, the largest surrender since World War II.",
        mapAction: { type: "flyTo", lat: 23.81, lng: 90.41, zoom: 6, duration: 2000 },
        conquestArrows: [
          { from: [22.57, 88.36], to: [23.81, 90.41], label: "1971 Liberation" },
        ],
        duration: 7000,
      },
      {
        text: "Today, India is 1.44 billion people, a nuclear power, a space-faring nation that landed on the Moon's south pole, and the world's fifth-largest economy. The story continues.",
        mapAction: { type: "animateExpansion", geojsonFile: "modern_india.geojson", duration: 3000 },
        achievements: [
          { icon: "rocket", label: "Chandrayaan-3", lat: 13.0, lng: 80.2 },
          { icon: "atom", label: "Nuclear Power", lat: 19.0, lng: 73.0 },
        ],
        duration: 8000,
      },
    ],
    quiz: {
      question: "How long did Cyril Radcliffe have to draw the partition boundary?",
      options: [
        "2 years",
        "6 months",
        "5 weeks",
        "1 week",
      ],
      correctIndex: 2,
      explanation: "Cyril Radcliffe, who had never been to India, was given just 5 weeks to draw the line that would divide a civilization and displace 15 million people.",
    },
  },
];
