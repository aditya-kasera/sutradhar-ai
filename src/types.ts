export interface HiddenGem {
  name: string;
  why_it_matters: string;
  local_tip: string;
  vibe: string;
}

export interface Story {
  title: string;
  narrative: string;
  type: 'folklore' | 'history' | 'legend' | 'perspective';
  era?: string;
}

export interface HeritageItem {
  site_or_tradition: string;
  significance: string;
  unesco_status: string;
}

export interface FoodDishes {
  dish: string;
  description: string;
  cultural_origin: string;
}

export interface FoodRituals {
  rituals: string;
  dining_customs: string;
  must_try: FoodDishes[];
}

export interface LocalExperience {
  activity: string;
  description: string;
  cultural_connect: string;
}

export interface CulturalLens {
  historian_view: string;
  local_resident_view: string;
  chef_view: string;
  artist_view: string;
  photographer_view: string;
}

export interface EtiquetteItem {
  rule: string;
  type: 'do' | 'dont';
  reason: string;
}

export interface LocalPhrase {
  phrase: string;
  pronunciation: string;
  meaning: string;
  usage: string;
}

export interface Protocol {
  etiquette: EtiquetteItem[];
  greetings: string[];
  phrases: LocalPhrase[];
}

export interface LocalRhythm {
  season: string;
  tradition_or_event: string;
  description: string;
  verification_note: string;
}

export interface PersonalizationRationale {
  traveler_archetype_label: string;
  explanation: string;
}

export interface SutradharSchema {
  meta: {
    destination: string;
    thematic_vibe: string;
    visual_palette: {
      primary: string; // e.g. #d97706
      secondary: string; // e.g. #059669
      accent: string; // e.g. #b45309
    };
  };
  soul: {
    thesis: string;
    emotional_hook: string;
  };
  personalization_rationale?: PersonalizationRationale;
  local_rhythms?: LocalRhythm[];
  modules: {
    hidden_gems: HiddenGem[];
    stories: Story[];
    heritage: HeritageItem[];
    food: FoodRituals;
    live_like_local: LocalExperience[];
    lens: CulturalLens;
    protocol: Protocol;
  };
}

export interface TravelInputs {
  destination: string;
  duration: string;
  style: string;
  personality: string;
  interests: string[];
  travelerCount?: number;
}
