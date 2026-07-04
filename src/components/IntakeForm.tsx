import React, { useState, useEffect, useRef } from "react";
import { Compass, BookOpen, Clock, Users, Flame, Sparkles } from "lucide-react";
import { TravelInputs } from "../types";
import {
  PRESET_SUGGESTIONS,
  CURATED_DESTINATIONS,
  DURATIONS,
  TRAVEL_STYLES,
  STYLE_CONSTRAINTS,
  PERSONALITIES,
  INTERESTS,
} from "../data";

interface IntakeFormProps {
  onSubmit: (inputs: TravelInputs) => void;
  isLoading: boolean;
}

export default function IntakeForm({ onSubmit, isLoading }: IntakeFormProps) {
  const [destination, setDestination] = useState("");
  const [debouncedDestination, setDebouncedDestination] = useState("");
  const [duration, setDuration] = useState("4-7 Days");
  const [style, setStyle] = useState("Solo");
  const [travelerCount, setTravelerCount] = useState(1);
  const [personality, setPersonality] = useState("Explorer");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Heritage", "Local Food"]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync travelerCount with constellation style
  useEffect(() => {
    const constraint = STYLE_CONSTRAINTS[style as keyof typeof STYLE_CONSTRAINTS];
    if (constraint) {
      setTravelerCount(constraint.default);
    }
  }, [style]);

  // Debounce destination input for filtering
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedDestination(destination);
    }, 150);
    return () => {
      clearTimeout(handler);
    };
  }, [destination]);

  // Filter curated destinations based on debounced query
  const filteredDestinations = CURATED_DESTINATIONS.filter((item) =>
    item.toLowerCase().includes(debouncedDestination.toLowerCase())
  );

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    onSubmit({
      destination: destination.trim(),
      duration,
      style,
      personality,
      interests: selectedInterests,
      travelerCount,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Visual Header in Editorial Style */}
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center justify-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-[10px] text-amber-500 tracking-[0.2em] uppercase font-bold">
          <Sparkles className="w-3 h-3" />
          <span>Layer 2 Cultural Tapestry Companion</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-light text-white tracking-tight serif">
          Sutradhar <span className="italic text-amber-500">AI</span>
        </h1>
        <p className="text-md sm:text-lg text-neutral-400 font-light max-w-xl mx-auto leading-relaxed serif italic">
          "Every Place Has a Story."
        </p>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="space-y-10 bg-card border border-subtle rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md"
      >
        
        {/* Section 1: Destination */}
        <div className="space-y-4">
          <label htmlFor="destination" className="flex items-center space-x-2.5 text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>Where does your curiosity draw you?</span>
          </label>
          <div className="relative" ref={dropdownRef}>
            <input
              id="destination"
              type="text"
              required
              disabled={isLoading}
              className="w-full bg-neutral-950 border border-subtle p-4 pl-5 pr-12 rounded-2xl text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 placeholder-neutral-600 transition-all text-md serif italic"
              placeholder="Enter any town, region, or city (e.g. Varanasi, Kyoto, Cairo...)"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setShowDropdown(false);
                }
              }}
              aria-autocomplete="list"
              aria-controls="destination-dropdown"
              aria-expanded={showDropdown && filteredDestinations.length > 0}
            />
            {showDropdown && filteredDestinations.length > 0 && (
              <div 
                id="destination-dropdown"
                role="listbox"
                className="absolute z-50 w-full mt-2 bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl max-h-60 overflow-y-auto divide-y divide-neutral-900 scrollbar-thin scrollbar-thumb-amber-500/20"
              >
                {filteredDestinations.map((item) => (
                  <button
                    key={item}
                    type="button"
                    role="option"
                    aria-selected={destination === item}
                    onClick={() => {
                      setDestination(item);
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-5 py-3 hover:bg-amber-500/10 focus:bg-amber-500/10 text-neutral-300 hover:text-white transition-all text-sm flex items-center justify-between focus:outline-none"
                  >
                    <span>{item}</span>
                    <span className="text-[10px] text-amber-500/60 uppercase tracking-widest font-semibold font-mono">Curated</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Preset Suggestions */}
          <div className="flex flex-wrap gap-2 pt-1 items-center">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold mr-1">Inspirations:</span>
            {PRESET_SUGGESTIONS.map((preset) => (
              <button
                key={preset}
                type="button"
                disabled={isLoading}
                onClick={() => setDestination(preset)}
                className={`text-[11px] px-3 py-1.5 rounded-full border transition-all ${
                  destination.toLowerCase() === preset.toLowerCase()
                    ? "bg-amber-500 border-amber-500 text-black font-semibold shadow-md"
                    : "bg-neutral-950 border-subtle text-neutral-400 hover:border-neutral-700"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Duration & Travel Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-neutral-800">
          
          {/* Duration Selector */}
          <div className="space-y-4">
            <span className="flex items-center space-x-2.5 text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Tempo of Exploration</span>
            </span>
            <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Tempo of Exploration">
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  role="radio"
                  aria-checked={duration === d.value}
                  disabled={isLoading}
                  onClick={() => setDuration(d.value)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                    duration === d.value
                      ? "bg-amber-500/10 border-amber-500/60 text-amber-400 font-medium"
                      : "bg-neutral-950 border-subtle text-neutral-400 hover:border-neutral-700 font-normal"
                  }`}
                >
                  <span className="text-xs font-semibold">{d.label}</span>
                  <span className="text-[9px] text-neutral-500 mt-0.5">{d.value}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Style Selector */}
          <div className="space-y-4">
            <span className="flex items-center space-x-2.5 text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold">
              <Users className="w-3.5 h-3.5 text-amber-500" />
              <span>Traveler Constellation</span>
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="radiogroup" aria-label="Traveler Constellation">
              {TRAVEL_STYLES.map((ts) => (
                <button
                  key={ts.value}
                  type="button"
                  role="radio"
                  aria-checked={style === ts.value}
                  disabled={isLoading}
                  onClick={() => setStyle(ts.value)}
                  className={`py-3 px-3 rounded-2xl border text-center transition-all ${
                    style === ts.value
                      ? "bg-amber-500/10 border-amber-500/60 text-amber-400 font-medium"
                      : "bg-neutral-950 border-subtle text-neutral-400 hover:border-neutral-700 font-normal"
                  }`}
                >
                  <span className="text-xs font-medium block whitespace-nowrap">{ts.label}</span>
                </button>
              ))}
            </div>

            {/* Traveler Count Selection */}
            <div className="flex items-center justify-between bg-neutral-950/40 p-3.5 rounded-2xl border border-neutral-900 mt-2.5">
              <span className="text-[11px] text-neutral-400 font-medium font-sans">Number of Travelers:</span>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  aria-label="Decrease traveler count"
                  disabled={isLoading || style === "Solo" || travelerCount <= (STYLE_CONSTRAINTS[style as keyof typeof STYLE_CONSTRAINTS]?.min ?? 1)}
                  onClick={() => setTravelerCount(prev => Math.max((STYLE_CONSTRAINTS[style as keyof typeof STYLE_CONSTRAINTS]?.min ?? 1), prev - 1))}
                  className="w-7 h-7 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-neutral-200 rounded-full flex items-center justify-center text-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="text-xs font-bold text-amber-400 w-6 text-center" aria-live="polite">{travelerCount}</span>
                <button
                  type="button"
                  aria-label="Increase traveler count"
                  disabled={isLoading || style === "Solo" || travelerCount >= (STYLE_CONSTRAINTS[style as keyof typeof STYLE_CONSTRAINTS]?.max ?? 12)}
                  onClick={() => setTravelerCount(prev => Math.min((STYLE_CONSTRAINTS[style as keyof typeof STYLE_CONSTRAINTS]?.max ?? 12), prev + 1))}
                  className="w-7 h-7 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-neutral-200 rounded-full flex items-center justify-center text-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Section 3: Traveler Personality */}
        <div className="space-y-4 pt-6 border-t border-neutral-800">
          <span className="flex items-center space-x-2.5 text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Select Your Cultural Archetype</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="radiogroup" aria-label="Cultural Archetype">
            {PERSONALITIES.map((p) => (
              <button
                key={p.value}
                type="button"
                role="radio"
                aria-checked={personality === p.value}
                disabled={isLoading}
                onClick={() => setPersonality(p.value)}
                className={`flex flex-col text-left p-4 rounded-2xl border transition-all ${
                  personality === p.value
                    ? "bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/20"
                    : "bg-neutral-950 border-subtle hover:border-neutral-700"
                }`}
              >
                <span className={`text-xs font-bold ${personality === p.value ? "text-amber-400" : "text-neutral-200"}`}>
                  {p.label}
                </span>
                <span className="text-[10px] text-neutral-500 mt-1 leading-relaxed font-light">
                  {p.desc}
                </span>
              </button>
            ))}
          </div>

          {/* Full-width AI Co-Pilot Assistant Card */}
          <div className="pt-2">
            <button
              type="button"
              disabled={isLoading}
              role="radio"
              aria-checked={personality === "I'm not sure—help me choose"}
              onClick={() => setPersonality("I'm not sure—help me choose")}
              className={`w-full text-left p-6 rounded-3xl border transition-all relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                personality === "I'm not sure—help me choose"
                  ? "bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border-amber-500/60 ring-1 ring-amber-500/20 shadow-2xl"
                  : "bg-neutral-950/45 border-dashed border-neutral-800 hover:border-neutral-700"
              }`}
            >
              {/* Decorative background blur glow */}
              <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full filter blur-[50px] opacity-15 pointer-events-none transition-all duration-700 ${
                personality === "I'm not sure—help me choose" ? "bg-amber-500 scale-125" : "bg-neutral-900"
              }`} />

              <div className="space-y-1.5 flex-1 z-10">
                <div className="flex items-center space-x-2">
                  <Sparkles className={`w-4 h-4 shrink-0 ${personality === "I'm not sure—help me choose" ? "text-amber-400 animate-pulse" : "text-neutral-500"}`} />
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">AI Assistant Co-Pilot</span>
                </div>
                <h4 className="serif text-xl text-white font-light">
                  "I'm not sure—help me choose"
                </h4>
                <p className="text-xs text-neutral-450 leading-relaxed font-light max-w-2xl">
                  Let Sutradhar infer your archetype based on your selected interests. The engine will intelligently analyze your Curiosity Anchors to weave a personalized traveler identity.
                </p>
              </div>

              <div className="shrink-0 z-10 w-full md:w-auto flex justify-end">
                <div className={`text-xs px-5 py-3 rounded-2xl border font-bold uppercase tracking-widest transition-all ${
                  personality === "I'm not sure—help me choose"
                    ? "bg-amber-500 border-amber-500 text-black shadow-lg"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"
                }`}>
                  {personality === "I'm not sure—help me choose" ? "✓ Co-Pilot Engaged" : "Engage AI Assistant"}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Section 4: Curiosity Anchors */}
        <div className="space-y-4 pt-6 border-t border-neutral-800">
          <span className="flex items-center space-x-2.5 text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Curiosity Anchors (Select Multiples)</span>
          </span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Curiosity Anchors">
            {INTERESTS.map((item) => {
              const isSelected = selectedInterests.includes(item.value);
              return (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={isSelected}
                  disabled={isLoading}
                  onClick={() => handleInterestToggle(item.value)}
                  className={`text-xs px-4 py-2 rounded-2xl border transition-all focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${
                    isSelected
                      ? "bg-amber-500 text-black font-bold border-amber-500 hover:bg-amber-400 shadow-md"
                      : "bg-neutral-950 border-subtle text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-neutral-800">
          <button
            type="submit"
            disabled={isLoading || !destination.trim()}
            className="w-full relative overflow-hidden group bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 px-8 rounded-2xl shadow-xl transition-all tracking-[0.2em] text-xs uppercase flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isLoading ? "Spinning Cultural Threads..." : "Weave Narrative Canvas"}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
