export const PRESET_SUGGESTIONS = [
  "Kyoto, Japan",
  "Varanasi, India",
  "Cairo, Egypt",
  "Lisbon, Portugal",
  "Jaipur, India",
  "Cuzco, Peru",
];

export const CURATED_DESTINATIONS = [
  "Kyoto, Japan",
  "Varanasi, India",
  "Jaipur, India",
  "Lisbon, Portugal",
  "Cuzco, Peru",
  "Cairo, Egypt",
  "Istanbul, Turkey",
  "Oaxaca, Mexico",
  "Rome, Italy",
  "Chiang Mai, Thailand",
  "Athens, Greece",
  "Florence, Italy",
  "Fez, Morocco",
  "Siem Reap, Cambodia",
  "Petra, Jordan",
  "Guanajuato, Mexico",
  "Edinburgh, Scotland",
  "Marrakech, Morocco",
  "Zanzibar, Tanzania",
  "Luang Prabang, Laos",
  "Cartagena, Colombia",
  "Samarkand, Uzbekistan",
  "Lhasa, Tibet",
  "Bagan, Myanmar",
  "Udaipur, India",
  "Bukhara, Uzbekistan",
  "Dubrovnik, Croatia",
  "Budapest, Hungary",
  "Valletta, Malta",
  "Kathmandu, Nepal",
  "Shiraz, Iran",
  "Seville, Spain",
  "Antigua, Guatemala",
  "Hue, Vietnam",
  "Havana, Cuba",
  "Carcassonne, France",
  "San Miguel de Allende, Mexico",
  "Lalibela, Ethiopia",
  "Yazd, Iran",
  "Prague, Czech Republic",
  "Isfahan, Iran"
];

export const DURATIONS = [
  { label: "Weekend Sojourn", value: "2-3 Days" },
  { label: "Cultural Journey", value: "4-7 Days" },
  { label: "Deep Immersion", value: "10-14 Days" },
];

export const TRAVEL_STYLES = [
  { label: "Solo", value: "Solo" },
  { label: "Companion", value: "Couple" },
  { label: "Friends", value: "Friends" },
  { label: "Family", value: "Family" },
];

export const STYLE_CONSTRAINTS = {
  Solo: { default: 1, min: 1, max: 1 },
  Couple: { default: 2, min: 2, max: 4 },
  Friends: { default: 4, min: 3, max: 8 },
  Family: { default: 5, min: 3, max: 12 },
};

export const PERSONALITIES = [
  { value: "Explorer", label: "Mindful Explorer", desc: "Seeks raw local contact and off-grid walks" },
  { value: "Food Lover", label: "Culinary Initiate", desc: "Understands community through generational kitchens" },
  { value: "History Enthusiast", label: "Time Traveler", desc: "Fascinated by ruins, dynastic lines, and folklore" },
  { value: "Photographer", label: "Shadow & Light Collector", desc: "Observes architecture, daily life, and geometry" },
  { value: "Spiritual Traveler", label: "Sacred Pilgrim", desc: "Drawn to temple incense, meditation, and rituals" },
  { value: "Adventure Seeker", label: "Active Anthropologist", desc: "Combines rugged landscapes with living heritage" },
];

export const INTERESTS = [
  { value: "Heritage", label: "UNESCO & Ruins" },
  { value: "Architecture", label: "Sacred Geometry" },
  { value: "Local Food", label: "Traditional Gastronomy" },
  { value: "Art", label: "Folk Crafts & Paintings" },
  { value: "Festivals", label: "Rhythms & Traditions" },
  { value: "Nature", label: "Wild & Sacred Earth" },
  { value: "Photography", label: "Textures & Streetscapes" },
  { value: "Music", label: "Oral Legends & Ritual Songs" },
];
