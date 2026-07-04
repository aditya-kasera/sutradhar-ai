import React, { useState } from "react";
import { 
  Sparkles, 
  MapPin, 
  BookOpen, 
  Award, 
  UtensilsCrossed, 
  Users, 
  ShieldAlert, 
  MessageSquareCode, 
  Eye, 
  History, 
  Camera, 
  Paintbrush, 
  Utensils, 
  User,
  Heart,
  Calendar,
  Compass,
  Flame,
  CheckCircle2
} from "lucide-react";
import { SutradharSchema, Story, HiddenGem, HeritageItem, FoodDishes, LocalExperience, EtiquetteItem, LocalPhrase } from "../types";

export default function ModuleRenderer({ data }: { data: SutradharSchema }) {
  // Graceful handling of malformed or incomplete responses with default values
  const meta = data?.meta || { 
    destination: "Unknown Destination", 
    thematic_vibe: "Intangible Vibe", 
    visual_palette: { primary: "#d97706", secondary: "#059669", accent: "#b45309" } 
  };
  
  const soul = data?.soul || { 
    thesis: "A deep cultural journey", 
    emotional_hook: "Uncover the local secrets, stories, and rhythms." 
  };

  const personalization_rationale = data?.personalization_rationale || {
    traveler_archetype_label: "Mindful Explorer",
    explanation: "These cultural layers were woven based on your chosen curiosity anchors to help you experience the living tapestry of the place."
  };

  const local_rhythms = data?.local_rhythms || [
    {
      season: "Vernal Equinox Transition",
      tradition_or_event: "Sacred Temple Chants & Dawn Offerings",
      description: "During the solar turning points, local monasteries and sacred places observe silent chants at sunrise, setting a deep meditative resonance.",
      verification_note: "Schedules shift with the solar cycle; consult your guesthouse host or visit local shrine notices on arrival."
    },
    {
      season: "Pre-Harvest Moon Phase",
      tradition_or_event: "Generational Craft Guild Gatherings",
      description: "Local weavers and artisans open their workshop courtyards for communal songs and collective thread drying under the moonlight.",
      verification_note: "Aligned with lunar calendars; check for community announcements at the local tourism kiosk or square."
    }
  ];

  const modules = data?.modules || {
    hidden_gems: [],
    stories: [],
    heritage: [],
    food: { rituals: "Authentic cooking philosophy", dining_customs: "Dining manners of community", must_try: [] },
    live_like_local: [],
    lens: { historian_view: "Layers of centuries", local_resident_view: "Soundscapes of childhood", chef_view: "Aromas and spices", artist_view: "Geometry of shadows", photographer_view: "Fleeting human glances" },
    protocol: { etiquette: [], greetings: [], phrases: [] }
  };

  const primaryColor = meta.visual_palette?.primary || "#d97706";
  const secondaryColor = meta.visual_palette?.secondary || "#059669";
  const accentColor = meta.visual_palette?.accent || "#b45309";

  const [activeLens, setActiveLens] = useState<keyof NonNullable<SutradharSchema['modules']['lens']>>("historian_view");

  const getLensIcon = (lens: string) => {
    switch (lens) {
      case "historian_view":
        return <History className="w-3.5 h-3.5" />;
      case "local_resident_view":
        return <User className="w-3.5 h-3.5" />;
      case "chef_view":
        return <Utensils className="w-3.5 h-3.5" />;
      case "artist_view":
        return <Paintbrush className="w-3.5 h-3.5" />;
      case "photographer_view":
        return <Camera className="w-3.5 h-3.5" />;
      default:
        return <Eye className="w-3.5 h-3.5" />;
    }
  };

  const getLensLabel = (lens: string) => {
    switch (lens) {
      case "historian_view":
        return "Historian";
      case "local_resident_view":
        return "Local Resident";
      case "chef_view":
        return "Chef";
      case "artist_view":
        return "Artist";
      case "photographer_view":
        return "Photographer";
      default:
        return lens;
    }
  };

  const getStoryBadgeColor = (type: string) => {
    switch (type) {
      case "folklore":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "legend":
        return "bg-pink-500/10 text-pink-400 border-pink-500/20";
      case "history":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  const renderCardFooter = (searchQuery?: string) => {
    return (
      <div className="mt-5 pt-4 border-t border-neutral-900 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[10px] text-neutral-500 font-sans font-light">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-semibold text-neutral-400 uppercase tracking-widest text-[8px] mr-1">Sources & Trust:</span>
          <span>• AI-generated cultural synthesis</span>
          <span>• Seasonal traditions may vary</span>
          <span>• Verify schedules locally</span>
        </div>
        {searchQuery && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-amber-500 hover:text-amber-400 transition-colors font-semibold uppercase tracking-wider text-[9px] shrink-0"
          >
            <span>📍 View on Google Maps</span>
            <span>↗</span>
          </a>
        )}
      </div>
    );
  };

  return (
    <div id="narrative-canvas" className="space-y-16 pb-20 font-sans text-neutral-200">
      
      {/* Module 1: The Soul of the Destination (Editorial Heading style) */}
      <header className="border-b border-subtle pb-10 space-y-6">
        <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-bold" style={{ color: primaryColor }}>
          <Sparkles className="w-4 h-4 animate-pulse shrink-0" />
          <span>The Soul of the Destination</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
            <h1 className="serif text-5xl sm:text-7xl font-light text-white leading-none tracking-tight">
              {meta.destination}
            </h1>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(meta.destination)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-amber-500 hover:text-amber-400 transition-colors font-semibold uppercase tracking-wider shrink-0"
            >
              <span>📍 View {meta.destination} on Google Maps</span>
              <span>↗</span>
            </a>
          </div>
          <p className="serif italic text-2xl sm:text-3.5xl text-neutral-300 leading-snug font-light max-w-4xl">
            "{soul.thesis}"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          <div className="lg:col-span-8 bg-neutral-950/30 border border-neutral-900 rounded-3xl p-6 sm:p-8 space-y-4">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block">Cultural Essence</span>
            <p className="text-md sm:text-lg text-neutral-300 leading-relaxed font-light text-balance font-serif">
              {soul.emotional_hook}
            </p>
          </div>
          <div className="lg:col-span-4 bg-card border border-subtle rounded-3xl p-6 flex flex-col justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold block">Thematic Vibe</span>
              <span className="serif text-lg text-white font-medium block italic">{meta.thematic_vibe}</span>
            </div>
            
            {/* Quick Facts Sidebar Callout to reduce fatigue */}
            <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-900 space-y-2">
              <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold block">Quick Tapestry Keys</span>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-400">
                <div>• Tempo: <span className="text-neutral-200">Atmospheric</span></div>
                <div>• Style: <span className="text-neutral-200">Slow Travel</span></div>
                <div>• Layer: <span className="text-neutral-200">Layer 2 Secrets</span></div>
                <div>• Spirit: <span className="text-neutral-200">Heritage First</span></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500">Destination Palette</span>
              <div className="flex space-x-2.5">
                <span className="w-3.5 h-3.5 rounded-full border border-neutral-900 shadow-md animate-pulse" style={{ backgroundColor: primaryColor }} title="Primary Color" />
                <span className="w-3.5 h-3.5 rounded-full border border-neutral-900 shadow-md" style={{ backgroundColor: secondaryColor }} title="Secondary Color" />
                <span className="w-3.5 h-3.5 rounded-full border border-neutral-900 shadow-md" style={{ backgroundColor: accentColor }} title="Accent Color" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* NEW: Personalization Rationale displaying traveler traits */}
      <section className="bg-gradient-to-br from-neutral-950 to-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full filter blur-[100px] opacity-15 pointer-events-none" style={{ backgroundColor: primaryColor }} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block">Tailored Narrative Companion</span>
            <div className="flex items-center space-x-2.5">
              <Award className="w-5 h-5" style={{ color: primaryColor }} />
              <h2 className="serif text-xl sm:text-2xl text-white font-medium">
                Personalized Traveler Profile: <span className="text-amber-400 font-semibold italic">{personalization_rationale.traveler_archetype_label}</span>
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3 py-1 rounded-full uppercase tracking-wider font-bold font-mono">
              Curiosity Anchors Weven
            </span>
          </div>
        </div>
        <div className="border-t border-neutral-850 pt-4">
          <p className="text-sm text-neutral-300 leading-relaxed font-light font-serif bg-neutral-950/40 border border-neutral-950 p-4 rounded-xl">
            {personalization_rationale.explanation}
          </p>
        </div>
      </section>

      {/* Main Grid: Signature Lens & Experiential Cards */}
      <main id="historical-depth" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Hand: Custom Signature Lens (Module 9) */}
        <div className="lg:col-span-5 space-y-8">
          
          <section className="bg-amber-500/5 border border-amber-500/20 p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="space-y-2">
              <span className="text-amber-500 text-[10px] uppercase font-bold tracking-[0.25em] block">The Signature Lens</span>
              <h2 className="serif text-3xl font-light text-white leading-tight">Cultural Lens</h2>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Observe this destination synthesized through several distinct creative viewpoints. Select a perspective below to shift your camera angle.
              </p>
            </div>

            {/* Selected Lens narrative display */}
            <div id="lens-narrative" role="tabpanel" className="border-l-2 border-amber-500/40 pl-5 py-2 my-4 min-h-[110px] flex items-center">
              <p className="serif italic text-lg sm:text-xl text-amber-200 leading-relaxed font-serif">
                "{modules.lens[activeLens] || "Centuries of cultural history await exploration."}"
              </p>
            </div>

            {/* Lens Switching Control Tabs */}
            <div className="flex flex-wrap gap-2 pt-2" role="tablist" aria-label="Creative Perspectives">
              {Object.keys(modules.lens).map((key) => {
                const lensKey = key as keyof NonNullable<SutradharSchema['modules']['lens']>;
                const isActive = activeLens === lensKey;
                return (
                  <button
                    key={lensKey}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="lens-narrative"
                    onClick={() => setActiveLens(lensKey)}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      isActive
                        ? "bg-amber-500 border-amber-500 text-black font-bold shadow-lg"
                        : "bg-neutral-900 border-subtle text-neutral-400 hover:text-white hover:border-neutral-700"
                    }`}
                  >
                    {getLensIcon(lensKey)}
                    <span>{getLensLabel(lensKey)}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Module 4: Living Heritage (Editorial Placement) */}
          <section className="bg-card rounded-3xl p-6 sm:p-8 border border-subtle space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Living Heritage</span>
              <span className="text-sm text-amber-500 font-serif font-semibold">★</span>
            </div>
            
            <div className="space-y-2">
              <h3 className="serif text-2xl text-white font-light">Sacred & Historic Tapestry</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Traditional architectures and UNESCO relevant heritages that support the memory of {meta.destination}.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {modules.heritage && modules.heritage.length > 0 ? (
                modules.heritage.map((item: HeritageItem, index: number) => (
                  <div key={index} className="border-b border-neutral-800 last:border-0 pb-4 last:pb-0 space-y-1.5">
                    <div className="flex justify-between items-baseline gap-4">
                      <h4 className="text-sm font-semibold text-neutral-200">{item.site_or_tradition}</h4>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 shrink-0">
                        {item.unesco_status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      {item.significance}
                    </p>
                    <div className="pt-0.5 pb-1">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.site_or_tradition + ", " + meta.destination)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[10px] text-neutral-400 hover:text-amber-500 transition-colors font-sans"
                      >
                        <span>📍 View on Google Maps</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-neutral-500 italic">No heritage items available.</p>
              )}
            </div>
            {renderCardFooter(meta.destination)}
          </section>

        </div>

        {/* Right Hand: Elegant Grid of Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1: Stories Waiting Around the Corner (Module 3) */}
          <div className="bg-card rounded-3xl p-6 sm:p-8 border border-subtle flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Stories Around the Corner</span>
                <span className="text-xs text-amber-500">◈</span>
              </div>
              
              <div className="space-y-6">
                {modules.stories && modules.stories.length > 0 ? (
                  modules.stories.slice(0, 2).map((story: Story, index: number) => (
                    <div key={index} className="space-y-2 bg-neutral-950/20 border border-neutral-900/60 p-4 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStoryBadgeColor(story.type)}`}>
                          {story.type}
                        </span>
                        {story.era && <span className="text-[9px] font-mono text-neutral-500">{story.era}</span>}
                      </div>
                      <h3 className="serif text-xl text-white font-light">{story.title}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light font-serif">
                        {story.narrative}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-500 italic">No stories available.</p>
                )}
              </div>
            </div>

            {modules.stories && modules.stories.length > 2 && (
              <div className="border-t border-neutral-800 pt-4 space-y-4">
                <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold block">Further Legends</span>
                {modules.stories.slice(2).map((story: Story, index: number) => (
                  <div key={index} className="space-y-1">
                    <h4 className="serif text-md text-neutral-300 font-light">{story.title}</h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-light line-clamp-3">
                      {story.narrative}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {renderCardFooter(meta.destination)}
          </div>

          {/* Card 2: Beyond the Guidebook (Module 2) - formatted for scannability */}
          <div className="bg-card rounded-3xl p-6 sm:p-8 border border-subtle flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Beyond the Guidebook</span>
                <span className="text-xs text-neutral-500 font-serif">02</span>
              </div>

              <div className="space-y-5">
                {modules.hidden_gems && modules.hidden_gems.length > 0 ? (
                  modules.hidden_gems.map((gem: HiddenGem, index: number) => (
                    <div key={index} className="group bg-neutral-950/20 border border-neutral-900/60 p-4 rounded-2xl space-y-2">
                      <div className="flex justify-between items-center gap-2">
                        <h4 className="text-sm font-semibold text-white group-hover:text-amber-500 transition-colors">
                          {gem.name}
                        </h4>
                        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                          {gem.vibe}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                        {gem.why_it_matters}
                      </p>
                      <div className="bg-neutral-950 border border-neutral-900 rounded-lg p-2.5 text-[10px] text-amber-500/90 leading-relaxed italic font-serif">
                        <strong className="font-sans font-bold text-[9px] tracking-wider uppercase mr-1.5 text-amber-400">LOCAL TIP:</strong>
                        {gem.local_tip}
                      </div>
                      <div className="pt-1.5">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gem.name + ", " + meta.destination)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 text-[11px] text-neutral-450 hover:text-amber-500 transition-colors font-medium"
                        >
                          <span>📍 View on Google Maps</span>
                          <span>↗</span>
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-500 italic">No hidden gems available.</p>
                )}
              </div>
            </div>
            {renderCardFooter(meta.destination)}
          </div>

          {/* Card 3: Taste the Culture (Module 5) - formatted with short lists and facts */}
          <div className="bg-card rounded-3xl p-6 sm:p-8 border border-subtle flex flex-col justify-between gap-6 md:col-span-1">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Taste the Culture</span>
                <span className="text-xs text-amber-500">♨</span>
              </div>

              <div className="space-y-3">
                <h3 className="serif text-2xl text-amber-100 font-light">Culinary Rituals</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-serif bg-neutral-950/30 p-3 rounded-xl border border-neutral-900">
                  {modules.food?.rituals || "Discover localized culinary techniques."}
                </p>
              </div>

              <div className="border-t border-neutral-800 pt-3 space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-neutral-500 block">Customs & Etiquette</span>
                <p className="text-[11px] text-neutral-450 leading-relaxed font-light">
                  {modules.food?.dining_customs || "Respect food gathering spaces."}
                </p>
              </div>
            </div>

            <div className="border-t border-neutral-800 pt-3 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold block">Must-Try Gastronomy</span>
              <div className="grid grid-cols-1 gap-2">
                {modules.food?.must_try && modules.food.must_try.length > 0 ? (
                  modules.food.must_try.map((item: FoodDishes, index: number) => (
                    <div key={index} className="text-xs bg-neutral-950/60 border border-neutral-900 p-2.5 rounded-xl space-y-1.5">
                      <div className="flex justify-between items-center font-semibold text-neutral-200">
                        <span>{item.dish}</span>
                        <span className="text-[9px] text-amber-500 font-light italic font-serif">{item.cultural_origin}</span>
                      </div>
                      <p className="text-[10px] text-neutral-450 font-light leading-snug">{item.description}</p>
                      <div className="pt-0.5">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.dish + " " + meta.destination)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-[9px] text-neutral-450 hover:text-amber-500 transition-colors font-sans font-medium"
                        >
                          <span>📍 View on Google Maps</span>
                          <span>↗</span>
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-500 italic">No dishes available.</p>
                )}
              </div>
            </div>
            {renderCardFooter(meta.destination)}
          </div>

          {/* Card 4: Respect & Etiquette (Module 7) - scannable do/dont layout */}
          <div className="bg-card rounded-3xl p-6 sm:p-8 border border-subtle flex flex-col justify-between gap-6 md:col-span-1">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Respect & Etiquette</span>
                <span className="text-xs text-emerald-500 italic">✓</span>
              </div>

              <div className="space-y-3">
                <h3 className="serif text-2xl text-white font-light">Communal Manners</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Avoid common traveler pitfalls and respect locals' sanctuary. Represent cross-cultural mindfulness.
                </p>
              </div>

              <ul className="text-[11px] space-y-3 text-neutral-300">
                {modules.protocol?.etiquette && modules.protocol.etiquette.length > 0 ? (
                  modules.protocol.etiquette.map((item: EtiquetteItem, index: number) => (
                    <li key={index} className="flex gap-2.5 items-start bg-neutral-950/20 border border-neutral-900/60 p-2.5 rounded-xl">
                      <span className={`text-xs shrink-0 font-bold ${item.type === "dont" ? "text-rose-400" : "text-emerald-400"}`}>
                        {item.type === "dont" ? "✕" : "✓"}
                      </span>
                      <div className="space-y-0.5">
                        <strong className="text-neutral-200">{item.rule}</strong>
                        <p className="text-[10px] text-neutral-500 leading-normal font-light">{item.reason}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-xs text-neutral-500 italic">No etiquette rules available.</p>
                )}
              </ul>
            </div>
            {renderCardFooter(meta.destination)}
          </div>

        </div>

      </main>

      {/* NEW: Dedicated Local Rhythms (Calendar & Seasons) Section */}
      <section id="local-rhythms" className="bg-card rounded-3xl p-6 sm:p-8 border border-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-800">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block">Temporal Cycles</span>
            <h3 className="serif text-3xl text-white font-light">Local Rhythms</h3>
          </div>
          <div className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3 py-1 rounded-full font-mono font-semibold">
            Non-Linear Calendars & Seasons
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-3xl">
          These seasonal milestones, spiritual cycles, and localized festivals are woven into the community’s natural environment. By focusing on non-linear intervals rather than specific dates, you connect deeper with living community streams.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {local_rhythms.map((rhythm, index) => (
            <div key={index} className="bg-neutral-950/40 border border-neutral-900 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest block" style={{ color: secondaryColor }}>
                  {rhythm.season}
                </span>
                <h4 className="serif text-lg text-white font-medium">{rhythm.tradition_or_event}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {rhythm.description}
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-900 text-[10px] text-neutral-500 font-serif italic">
                <strong className="font-sans font-bold text-[9px] uppercase tracking-wider text-amber-500/70 mr-1.5">Verification Advisory:</strong>
                {rhythm.verification_note}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-neutral-950 border border-neutral-900 p-4 rounded-xl text-[10px] text-neutral-500 leading-relaxed font-serif text-center italic mt-4">
          * Note: Many cultural rituals, market days, and spiritual schedules are tied to lunar or biological conditions. To experience these, check local notice boards, community spaces, or with guesthouse hosts upon your arrival.
        </div>
        {renderCardFooter(meta.destination)}
      </section>

      {/* Footer Modules: Live like a Local (Module 6) & Lexicon (Module 8) */}
      <section id="cultural-protocol" className="border-t border-subtle pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Module 6: Live Like a Local */}
        <div className="lg:col-span-5 bg-card border border-subtle rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Live Like a Local</span>
              <h3 className="serif text-2xl text-white font-light">Community Connections</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Venture beyond passive sightseeing. Form real relationships by exploring local crafts, supporting independent artisans, and understanding authentic workshop traditions.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {modules.live_like_local && modules.live_like_local.length > 0 ? (
                modules.live_like_local.map((exp: LocalExperience, index: number) => (
                  <div key={index} className="bg-neutral-950/30 border border-neutral-900 rounded-2xl p-4 space-y-2 hover:border-neutral-700 transition-all">
                    <h4 className="text-xs sm:text-sm font-semibold text-neutral-200">{exp.activity}</h4>
                    <p className="text-xs text-neutral-400 font-light">{exp.description}</p>
                    <div className="text-[9px] italic text-neutral-500 flex items-center justify-between pt-1.5 border-t border-neutral-900/40">
                      <div className="flex items-center gap-1.5">
                        <span className="text-rose-500">♥</span>
                        <span>{exp.cultural_connect}</span>
                      </div>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(exp.activity + ", " + meta.destination)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-neutral-450 hover:text-amber-500 transition-colors font-sans font-medium"
                      >
                        <span>📍 View on Google Maps</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-neutral-500 italic">No experiences available.</p>
              )}
            </div>
          </div>
          {renderCardFooter(meta.destination)}
        </div>

        {/* Module 8: Speak Like a Local */}
        <div className="lg:col-span-7 bg-card rounded-3xl p-6 sm:p-8 border border-subtle flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <span className="text-[9px] uppercase tracking-tighter text-neutral-500 font-bold block">Speak Like a Local</span>
            <div className="space-y-2">
              <h3 className="serif text-2xl text-white font-light">Lexicon of Courtesy</h3>
              <p className="text-xs text-neutral-400 font-light">
                Spoken words hold a sacred weight. Try speaking these locally recognized phrases to initiate heartfelt connections.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {modules.protocol?.phrases && modules.protocol.phrases.length > 0 ? (
                modules.protocol.phrases.map((item: LocalPhrase, index: number) => (
                  <div key={index} className="bg-neutral-950/50 rounded-xl p-4 border border-subtle space-y-1.5">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-xs font-semibold text-sky-400">{item.phrase}</span>
                      <span className="text-[10px] text-neutral-500 italic">"{item.meaning}"</span>
                    </div>
                    <div className="text-[10px] text-neutral-500 leading-normal font-light">
                      <div>Pronunciation: <strong className="text-neutral-300 font-mono">{item.pronunciation}</strong></div>
                      <div className="italic text-neutral-600 mt-0.5">Use: {item.usage}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-neutral-500 italic">No local phrases available.</p>
              )}
            </div>
          </div>

          {modules.protocol?.greetings && modules.protocol.greetings.length > 0 && (
            <div className="border-t border-neutral-850 pt-4 flex flex-wrap items-center gap-3">
              <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold font-mono">Greetings:</span>
              <div className="flex flex-wrap gap-1.5">
                {modules.protocol.greetings.map((greet, idx) => (
                  <span key={idx} className="text-[10px] bg-neutral-950/60 border border-subtle text-neutral-300 px-2.5 py-1 rounded-lg">
                    {greet}
                  </span>
                ))}
              </div>
            </div>
          )}
          {renderCardFooter(meta.destination)}
        </div>

      </section>

    </div>
  );
}
