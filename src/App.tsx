import React, { useState, useEffect } from "react";
import { Sparkles, History, Compass, ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";
import { SutradharSchema, TravelInputs } from "./types";
import IntakeForm from "./components/IntakeForm";
import ModuleRenderer from "./components/ModuleRenderer";

interface SavedJourney {
  destination: string;
  timestamp: string;
  data: SutradharSchema;
}

const LOADING_STEPS = [
  "Awakening the Sutradhar persona...",
  "Consulting ancient chronicles & dynastic histories...",
  "Tracing forgotten paths and local resident paths...",
  "Brewing culinary tea rituals & spices...",
  "Gathering architectural geometry & sacred folklore...",
  "Spinning local etiquette & conversational courtesies...",
  "Dipping the threads into our custom visual palette...",
  "Completing the cultural tapestry..."
];

export default function App() {
  const [view, setView] = useState<"home" | "loading" | "canvas">("home");
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [narrativeData, setNarrativeData] = useState<SutradharSchema | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastInputs, setLastInputs] = useState<TravelInputs | null>(null);
  const [savedJourneys, setSavedJourneys] = useState<SavedJourney[]>([]);
  const [activeSection, setActiveSection] = useState("narrative-canvas");

  // Scrollspy effect to track visible sections on the narrative canvas
  useEffect(() => {
    if (view !== "canvas" || !narrativeData) return;

    const handleScroll = () => {
      const sections = ["narrative-canvas", "historical-depth", "local-rhythms", "cultural-protocol"];
      const scrollPosition = window.scrollY + 180; // offset of the sticky header

      let active = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            active = id;
          }
        }
      }
      setActiveSection(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [view, narrativeData]);

  // Load saved journeys from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sutradhar_journeys");
      if (stored) {
        setSavedJourneys(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load local journeys", e);
    }
  }, []);

  // Set up sequential updates for the loader to make the latency feel immersive and meditative
  useEffect(() => {
    let interval: any;
    if (view === "loading") {
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 2200);
    } else {
      setLoadingStepIdx(0);
    }
    return () => clearInterval(interval);
  }, [view]);

  const handleWeaveNarrative = async (inputs: TravelInputs) => {
    setView("loading");
    setError(null);
    setLastInputs(inputs);

    try {
      const response = await fetch("/api/narrative", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "The synthesis pipeline encountered a fault. Please try again.");
      }

      const parsed: SutradharSchema = await response.json();
      
      setNarrativeData(parsed);

      // Save to localStorage histories
      const newJourney: SavedJourney = {
        destination: parsed.meta.destination,
        timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
        data: parsed,
      };

      const updatedList = [newJourney, ...savedJourneys.filter((j) => j.destination !== parsed.meta.destination)].slice(0, 5);
      setSavedJourneys(updatedList);
      localStorage.setItem("sutradhar_journeys", JSON.stringify(updatedList));

      setView("canvas");
    } catch (err: any) {
      console.error("Synthesis failed:", err);
      setError(err.message || "We could not construct the cultural narrative. The Sutradhar's thread snapped.");
      setView("home");
    }
  };

  const handleSelectSaved = (journey: SavedJourney) => {
    setNarrativeData(journey.data);
    setView("canvas");
  };

  const handleDeleteSaved = (e: React.MouseEvent, dest: string) => {
    e.stopPropagation();
    const updated = savedJourneys.filter((j) => j.destination !== dest);
    setSavedJourneys(updated);
    localStorage.setItem("sutradhar_journeys", JSON.stringify(updated));
  };

  const handleRetry = () => {
    if (lastInputs) {
      handleWeaveNarrative(lastInputs);
    }
  };

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-300">
      
      {/* Editorial Navigation Header */}
      <nav className="border-b border-subtle bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-50 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <button 
            onClick={() => setView("home")} 
            className="flex flex-col items-start bg-transparent border-0 cursor-pointer focus:outline-none text-left"
          >
            <h1 className="text-amber-500 font-bold tracking-[0.3em] text-xs uppercase">Sutradhar AI</h1>
            <p className="serif italic text-2xl mt-1 text-white font-light">Every Place Has a Story.</p>
          </button>
          
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <div className="hidden sm:flex gap-6 md:gap-8 text-[10px] uppercase tracking-widest font-semibold text-neutral-500">
              {view === "canvas" && narrativeData ? (
                <>
                  <button 
                    onClick={() => handleScrollTo("narrative-canvas")}
                    className={`cursor-pointer transition-colors font-semibold uppercase tracking-widest text-[10px] bg-transparent border-0 focus:outline-none ${
                      activeSection === "narrative-canvas"
                        ? "text-amber-500 underline underline-offset-8 decoration-2 font-bold"
                        : "text-neutral-500 hover:text-amber-400 font-normal"
                    }`}
                  >
                    Narrative Canvas
                  </button>
                  <button 
                    onClick={() => handleScrollTo("historical-depth")}
                    className={`cursor-pointer transition-colors font-semibold uppercase tracking-widest text-[10px] bg-transparent border-0 focus:outline-none ${
                      activeSection === "historical-depth"
                        ? "text-amber-500 underline underline-offset-8 decoration-2 font-bold"
                        : "text-neutral-500 hover:text-amber-400 font-normal"
                    }`}
                  >
                    Historical Depth
                  </button>
                  <button 
                    onClick={() => handleScrollTo("local-rhythms")}
                    className={`cursor-pointer transition-colors font-semibold uppercase tracking-widest text-[10px] bg-transparent border-0 focus:outline-none ${
                      activeSection === "local-rhythms"
                        ? "text-amber-500 underline underline-offset-8 decoration-2 font-bold"
                        : "text-neutral-500 hover:text-amber-400 font-normal"
                    }`}
                  >
                    Local Rhythms
                  </button>
                  <button 
                    onClick={() => handleScrollTo("cultural-protocol")}
                    className={`cursor-pointer transition-colors font-semibold uppercase tracking-widest text-[10px] bg-transparent border-0 focus:outline-none ${
                      activeSection === "cultural-protocol"
                        ? "text-amber-500 underline underline-offset-8 decoration-2 font-bold"
                        : "text-neutral-500 hover:text-amber-400 font-normal"
                    }`}
                  >
                    Cultural Protocol
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                  <div className="flex gap-4 sm:gap-6 md:gap-8">
                    <button
                      disabled
                      aria-disabled="true"
                      className="opacity-40 text-neutral-600 cursor-not-allowed font-semibold uppercase tracking-widest text-[10px] bg-transparent border-0 focus:outline-none"
                    >
                      Narrative Canvas
                    </button>
                    <button
                      disabled
                      aria-disabled="true"
                      className="opacity-40 text-neutral-600 cursor-not-allowed font-semibold uppercase tracking-widest text-[10px] bg-transparent border-0 focus:outline-none"
                    >
                      Historical Depth
                    </button>
                    <button
                      disabled
                      aria-disabled="true"
                      className="opacity-40 text-neutral-600 cursor-not-allowed font-semibold uppercase tracking-widest text-[10px] bg-transparent border-0 focus:outline-none"
                    >
                      Local Rhythms
                    </button>
                    <button
                      disabled
                      aria-disabled="true"
                      className="opacity-40 text-neutral-600 cursor-not-allowed font-semibold uppercase tracking-widest text-[10px] bg-transparent border-0 focus:outline-none"
                    >
                      Cultural Protocol
                    </button>
                  </div>
                  <span className="text-[9px] lowercase tracking-normal font-mono text-neutral-600 bg-neutral-900/60 px-2.5 py-1 rounded-full border border-subtle/50 whitespace-nowrap">
                    (generate a narrative to unlock sections)
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 ml-auto">
              {view === "canvas" && narrativeData && (
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setView("home")}
                    className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-neutral-950 border border-subtle hover:border-neutral-700 hover:text-white transition-all rounded-xl"
                  >
                    New Destination
                  </button>
                </div>
              )}
              
              {view === "home" && savedJourneys.length > 0 && (
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 bg-neutral-900 px-3 py-1.5 rounded-full border border-subtle">
                  {savedJourneys.length} Saved Threads
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative min-h-[calc(100vh-6rem)]">
        
        {/* View 1: Intake / Home View */}
        {view === "home" && (
          <div className="space-y-12">
            
            {/* Display Errors if last execution crashed with thematic messaging */}
            {error && (
              <div className="max-w-2xl mx-auto mt-8 p-6 bg-rose-950/20 border border-rose-900/40 rounded-3xl flex items-start space-x-4 text-rose-300 shadow-xl">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
                <div className="space-y-3 flex-1 text-left">
                  <h4 className="serif text-lg font-light text-rose-200 italic">"The thread has frayed temporarily, but the loom remains..."</h4>
                  <p className="text-xs text-rose-300 leading-relaxed font-light">{error}</p>
                  {lastInputs && (
                    <button 
                      onClick={handleRetry}
                      className="text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Re-weave the Thread</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            <IntakeForm onSubmit={handleWeaveNarrative} isLoading={false} />

            {/* Display Journey History section */}
            {savedJourneys.length > 0 ? (
              <section className="max-w-4xl mx-auto px-4 pb-20 space-y-6">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold border-b border-subtle pb-3">
                  <History className="w-4 h-4 text-amber-500/50" />
                  <span>Your Woven Journeys (Local Archives)</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {savedJourneys.map((journey, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectSaved(journey)}
                      className="group bg-card border border-subtle hover:border-neutral-700 p-6 rounded-3xl flex justify-between items-center cursor-pointer transition-all hover:bg-neutral-900/40"
                    >
                      <div className="space-y-1.5 flex-1 pr-4">
                        <span className="text-[10px] text-neutral-500 font-mono block">{journey.timestamp}</span>
                        <h3 className="serif text-2xl text-neutral-100 group-hover:text-amber-500 transition-colors font-light">
                          {journey.destination}
                        </h3>
                        <p className="text-xs text-neutral-400 italic line-clamp-1 font-serif">
                          "{journey.data?.soul?.thesis || "A beautiful journey."}"
                        </p>
                      </div>
                      
                      <button
                        onClick={(e) => handleDeleteSaved(e, journey.destination)}
                        className="p-2 text-neutral-600 hover:text-rose-500 rounded-xl hover:bg-rose-500/10 transition-colors border-0 bg-transparent shrink-0"
                        title="Delete journey"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              /* Thematic Empty State */
              <div className="max-w-md mx-auto text-center space-y-2 pt-4 pb-16 opacity-60">
                <p className="serif italic text-neutral-400">"An unmapped path is simply a story waiting for its narrator."</p>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">Your woven journeys will appear here once synthesized</p>
              </div>
            )}

          </div>
        )}

        {/* View 2: Immersive Loading Canvas */}
        {view === "loading" && (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-6 space-y-8">
            <div className="space-y-8 max-w-md">
              
              {/* Spinner */}
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 border-4 border-neutral-900 rounded-full" />
                <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-4 bg-neutral-950 rounded-full flex items-center justify-center">
                  <Compass className="w-5 h-5 text-amber-500/60 animate-pulse" />
                </div>
              </div>

              {/* Status messaging */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-white italic">
                  Weaving your journey's thread...
                </h3>
                <p className="text-xs text-amber-500 font-mono tracking-widest uppercase transition-opacity duration-500 bg-neutral-900/60 border border-neutral-850 px-4 py-2.5 rounded-full inline-block">
                  {LOADING_STEPS[loadingStepIdx]}
                </p>
                <p className="text-xs text-neutral-500 font-light max-w-sm leading-relaxed mx-auto pt-2">
                  Gemini is constructing an independent cultural thesis, identifying hidden gems, translating folklore, and adjusting the visual mood.
                </p>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-2xl max-w-sm mx-auto italic serif text-amber-300/80 text-sm">
                "The thread of a story is the shortest path between two minds."
              </div>

            </div>
          </div>
        )}

        {/* View 3: Structured Experience Canvas */}
        {view === "canvas" && narrativeData && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            {/* Back to Home Button */}
            <div className="mb-6">
              <button
                onClick={() => setView("home")}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors bg-transparent border-0 cursor-pointer font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Begin another journey</span>
              </button>
            </div>

            <ModuleRenderer data={narrativeData} />
          </div>
        )}

      </main>

      {/* Deep Footer with requested Google Gemini attribution */}
      <footer className="border-t border-subtle bg-[#0a0a0a] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-neutral-500 text-xs gap-4">
          <div className="flex items-center space-x-1.5 font-light">
            <span>© 2026 Sutradhar AI. Powered by Sutradhar Intelligence • Generative AI by Google Gemini.</span>
          </div>
          <div className="flex space-x-4">
            <span className="font-mono text-[10px] uppercase tracking-wider">Server-Side GenAI Model Active</span>
            <span className="text-amber-500/40">•</span>
            <span className="font-mono text-[10px] uppercase tracking-wider">Google AI Studio Build</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
