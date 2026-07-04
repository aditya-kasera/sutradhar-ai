import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

let aiInstance: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please set your Gemini API key in the Settings > Secrets tab.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Define the schema using @google/genai Type enum to enforce perfect schema contract.
const sutradharResponseSchema = {
  type: Type.OBJECT,
  properties: {
    meta: {
      type: Type.OBJECT,
      properties: {
        destination: { type: Type.STRING },
        thematic_vibe: { type: Type.STRING },
        visual_palette: {
          type: Type.OBJECT,
          properties: {
            primary: { type: Type.STRING, description: "HEX color code reflecting the visual style of the destination (e.g. #D97706)" },
            secondary: { type: Type.STRING, description: "HEX color code reflecting the secondary visual style (e.g. #059669)" },
            accent: { type: Type.STRING, description: "HEX color code reflecting the accent detail style (e.g. #B45309)" }
          },
          required: ["primary", "secondary", "accent"]
        }
      },
      required: ["destination", "thematic_vibe", "visual_palette"]
    },
    soul: {
      type: Type.OBJECT,
      properties: {
        thesis: { type: Type.STRING, description: "A poetic, deeply insightful cultural thesis (not generic Wikipedia, emotionally resonance)." },
        emotional_hook: { type: Type.STRING, description: "A paragraph that invites the traveler to connect with the underlying spirit, history, or values of the place." }
      },
      required: ["thesis", "emotional_hook"]
    },
    personalization_rationale: {
      type: Type.OBJECT,
      properties: {
        traveler_archetype_label: { type: Type.STRING, description: "The Traveler Personality/Archetype (e.g. Mindful Explorer, Culinary Initiate, Time Traveler, Shadow & Light Collector, Sacred Pilgrim, or Active Anthropologist). If the user selected 'I'm not sure—help me choose', analyze their selected interests to infer the most fitting archetype." },
        explanation: { type: Type.STRING, description: "A warm, personalized paragraph explaining why these specific recommendations and lenses were woven to match their archetype and curiosity anchors." }
      },
      required: ["traveler_archetype_label", "explanation"]
    },
    local_rhythms: {
      type: Type.ARRAY,
      description: "A curated list of 3-4 recurring cultural traditions, localized market cycles, or seasonal events/rituals without hardcoded calendar dates.",
      items: {
        type: Type.OBJECT,
        properties: {
          season: { type: Type.STRING, description: "The seasonal or recurring window (e.g. 'Early Autumn', 'Mid-Spring Monsoon', 'Vernal Equinox', 'Winter Solstice Transition')" },
          tradition_or_event: { type: Type.STRING, description: "Name of the tradition, localized market, or sacred ritual." },
          description: { type: Type.STRING, description: "A vivid, brief, scannable description of what occurs, what locals do, and the general feeling." },
          verification_note: { type: Type.STRING, description: "A friendly reminder on how/where the traveler can verify exact timing when traveling (e.g. check local lunar calendars, community boards, or with guesthouse hosts)." }
        },
        required: ["season", "tradition_or_event", "description", "verification_note"]
      }
    },
    modules: {
      type: Type.OBJECT,
      properties: {
        hidden_gems: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              why_it_matters: { type: Type.STRING, description: "Explain the deep meaning, why locals love it, and why tourist guides usually miss it." },
              local_tip: { type: Type.STRING, description: "Inside advice on what to look for, specific times, or respectful behavior." },
              vibe: { type: Type.STRING }
            },
            required: ["name", "why_it_matters", "local_tip", "vibe"]
          }
        },
        stories: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              narrative: { type: Type.STRING, description: "An engaging, well-written story, legend, folklore, historical episode, or local anecdote." },
              type: { type: Type.STRING, description: "Must be: folklore, history, legend, or perspective" },
              era: { type: Type.STRING, description: "The period or historical context of this story." }
            },
            required: ["title", "narrative", "type"]
          }
        },
        heritage: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              site_or_tradition: { type: Type.STRING },
              significance: { type: Type.STRING, description: "UNESCO relevance, structural story, architecture, or intangible tradition importance." },
              unesco_status: { type: Type.STRING, description: "UNESCO World Heritage, Living Tradition, or Historically Significant" }
            },
            required: ["site_or_tradition", "significance", "unesco_status"]
          }
        },
        food: {
          type: Type.OBJECT,
          properties: {
            rituals: { type: Type.STRING, description: "Explain culinary philosophy, gathering customs, tea rituals, or market philosophies." },
            dining_customs: { type: Type.STRING, description: "Unwritten dining etiquette, tipping, eating gestures, or respect guidelines around food." },
            must_try: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dish: { type: Type.STRING },
                  description: { type: Type.STRING },
                  cultural_origin: { type: Type.STRING, description: "The cultural story or history behind this specific dish." }
                },
                required: ["dish", "description", "cultural_origin"]
              }
            }
          },
          required: ["rituals", "dining_customs", "must_try"]
        },
        live_like_local: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              activity: { type: Type.STRING },
              description: { type: Type.STRING },
              cultural_connect: { type: Type.STRING, description: "How this fosters local connection, respect, or community support." }
            },
            required: ["activity", "description", "cultural_connect"]
          }
        },
        lens: {
          type: Type.OBJECT,
          properties: {
            historian_view: { type: Type.STRING, description: "Describe the destination as seen by a passionate, analytical historian focusing on layers of time and empires." },
            local_resident_view: { type: Type.STRING, description: "Describe the destination as seen by a lifelong resident, focusing on childhood memories, sounds of the neighborhood, and daily rhythms." },
            chef_view: { type: Type.STRING, description: "Describe the destination as seen by a local chef, focusing on smells, spices, sizzling street stalls, and generational recipes." },
            artist_view: { type: Type.STRING, description: "Describe the destination as seen by a local visual artist or poet, focusing on colors, architectures, mood, and abstract inspiration." },
            photographer_view: { type: Type.STRING, description: "Describe the destination as seen by a documentary photographer, focusing on light, shadows, textures, raw human expressions, and fleeting moments." }
          },
          required: ["historian_view", "local_resident_view", "chef_view", "artist_view", "photographer_view"]
        },
        protocol: {
          type: Type.OBJECT,
          properties: {
            etiquette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  rule: { type: Type.STRING },
                  type: { type: Type.STRING, description: "Must be 'do' or 'dont'" },
                  reason: { type: Type.STRING }
                },
                required: ["rule", "type", "reason"]
              }
            },
            greetings: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            phrases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phrase: { type: Type.STRING },
                  pronunciation: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                  usage: { type: Type.STRING }
                },
                required: ["phrase", "pronunciation", "meaning", "usage"]
              }
            }
          },
          required: ["etiquette", "greetings", "phrases"]
        }
      },
      required: ["hidden_gems", "stories", "heritage", "food", "live_like_local", "lens", "protocol"]
    }
  },
  required: ["meta", "soul", "personalization_rationale", "local_rhythms", "modules"]
};

// Narrative Generation API endpoint
app.post("/api/narrative", async (req, res) => {
  try {
    const { destination, duration, style, travelerCount, personality, interests } = req.body;

    if (!destination) {
      return res.status(400).json({ error: "Destination is required." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `
You are 'Sutradhar', a masterful narrator and cultural threads companion.
Your mission is to guide curious travelers away from 'Checklist Tourism' (Layer 1) and reveal the 'Undercurrents and Deeper Meanings' (Layer 2) of a place.
Provide rich, emotionally engaging, narrative-driven content but strictly prevent reading fatigue:
- Keep all narrative blocks, explanations, and descriptions highly scannable, punchy, and concise (maximum 2 to 3 sentences per block).
- Avoid long paragraphs; use rich sensory keywords, vivid short sentences, and structured highlights.
- Weave history, folklore, culinary traditions, and sensory details into an evocative but highly scannable story.
Adhere strictly to the requested output format. Return exactly valid JSON matching the schema structure.
Do not include any festivals with specific calendar dates to prevent hallucinating temporary/unavailable information; instead, describe recurring seasonal rhythms, traditional harvest times, local market cycles, or historical/spiritual rituals under 'local_rhythms'.
If the traveler's archetype/personality is 'I'm not sure—help me choose' or is vague, analyze their curiosity anchors/interests to intelligently select the most fitting archetype from: Mindful Explorer, Culinary Initiate, Time Traveler, Shadow & Light Collector, Sacred Pilgrim, or Active Anthropologist. State this inferred archetype in personalization_rationale.traveler_archetype_label and justify your choice.
    `.trim();

    const userPrompt = `
Generate a cultural narrative companion for:
Destination: ${destination}
Trip Duration context: ${duration}
Traveler Constellation: ${style} (${travelerCount ? travelerCount : 1} traveler${travelerCount && travelerCount > 1 ? "s" : ""})
Traveler Personality Archetype: ${personality}
Curiosity Anchors / Interests: ${interests && interests.length > 0 ? interests.join(", ") : "Heritage, Local Food, History, Architecture, Art"}

Ensure the response strictly complies with the requested schema format. Primary, secondary and accent colors should be visually beautiful, coordinating with the location's personality (e.g. warm terracotta for Jaipur, deep sage for Kyoto, marine blue for Lisbon, golden sand for Cairo).
In 'personalization_rationale', speak directly to why this weave fits their profile (including interests like ${interests && interests.length > 0 ? interests.join(", ") : "Heritage"}). If their personality was 'I'm not sure—help me choose', start the explanation by saying you have analyzed their interests and chosen the [Inferred Archetype Name] for them.
In 'local_rhythms', list 3 to 4 recurring traditions or seasonal event sequences (like moon phases, monsoon, harvest cycles, daily temple bells, dusk chants, floating markets) with general timing (no specific dates) and localized instructions on how they can verify schedules on-site. Make these extremely scannable, concise, and engaging!
    `.trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: sutradharResponseSchema,
        temperature: 1.0,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response returned from the synthesis engine.");
    }

    const parsedData = JSON.parse(text);
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Narrative generation error:", error);
    return res.status(500).json({
      error: error.message || "The cultural threads have snapped. Please verify your destination or try again.",
    });
  }
});

// App Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sutradhar AI backend running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
  });
}

startServer();
