import type { ArchetypeId, ArchetypeCombination } from "./types";

export const ARCHETYPE_LABELS: Record<
  ArchetypeId,
  { name: string; tagline: string; combines: string }
> = {
  builder: {
    name: "The Builder",
    tagline: "Creates, improves, solves",
    combines: "Inventor + Architect",
  },
  thinker: {
    name: "The Thinker",
    tagline: "Analyzes, plans, understands",
    combines: "Strategist + Curator",
  },
  creator: {
    name: "The Creator",
    tagline: "Expresses, imagines, communicates",
    combines: "Creator",
  },
  leader: {
    name: "The Leader",
    tagline: "Influences, drives, mobilizes",
    combines: "Catalyst",
  },
  guide: {
    name: "The Guide",
    tagline: "Supports, empathizes, nurtures",
    combines: "Guide",
  },
};

export const MODULE_META = {
  context: { letter: "C", name: "Context", time: "3 min" },
  motivation: { letter: "M", name: "Motivation", time: "6 min" },
  ability: { letter: "A", name: "Ability", time: "6 min" },
  resilience: { letter: "R", name: "Resilience", time: "6 min" },
  goals: { letter: "G", name: "Goals", time: "6 min" },
  awareness: { letter: "A", name: "Awareness", time: "6 min" },
} as const;

export const DOMAINS = [
  "Technology & AI",
  "Engineering & Systems",
  "Design & Creativity",
  "Media & Communication",
  "Business & Entrepreneurship",
  "Psychology & Human Behavior",
  "Education & Learning",
  "Health & Wellness",
  "Science & Research",
  "Sustainability & Climate",
  "Social Impact",
] as const;

export const INDUSTRIES = [
  "AI & Technology",
  "Gaming & Interactive Media",
  "Healthcare & Wellness",
  "Media & Entertainment",
  "Design Services",
  "Education & Learning",
  "Startups & Entrepreneurship",
  "Research & Science",
  "Sustainability & Climate",
  "Finance & Consulting",
  "Social Impact & NGOs",
] as const;

/** C3 activity → archetype reinforcement (Mirror + shared keys) */
export const C3_ARCHETYPE_MAP: Record<string, ArchetypeId[]> = {
  gaming: ["builder", "thinker"],
  drawing_design: ["creator"],
  building: ["builder"],
  sports: ["leader", "builder"],
  reading: ["thinker"],
  content_creation: ["creator", "leader"],
  helping: ["guide"],
  debating: ["leader", "thinker"],
  coding: ["builder", "thinker"],
  music_dance: ["creator"],
  // Mindset flow activities (MC3)
  coding_building: ["builder", "thinker"],
  researching: ["thinker"],
  public_speaking: ["leader", "creator"],
  organizing: ["leader", "builder"],
  designing: ["creator"],
  teaching: ["guide"],
  problem_solving: ["thinker", "builder"],
  videos: ["creator", "leader"],
  business_ideas: ["builder", "leader"],
};

/** C4 future world → domain confidence boost (Mirror C4 + Mindset MC5) */
export const C4_DOMAIN_MAP: Record<string, string[]> = {
  technology: ["Technology & AI", "Engineering & Systems"],
  business: ["Business & Entrepreneurship"],
  design: ["Design & Creativity"],
  psychology: ["Psychology & Human Behavior", "Education & Learning"],
  science: ["Science & Research", "Engineering & Systems"],
  media: ["Media & Communication", "Design & Creativity"],
  engineering: ["Engineering & Systems", "Technology & AI"],
  helping: ["Education & Learning", "Health & Wellness", "Social Impact"],
  sustainability: ["Sustainability & Climate", "Social Impact"],
  // Mindset MC5
  ai_technology: ["Technology & AI", "Engineering & Systems"],
  entrepreneurship: ["Business & Entrepreneurship"],
  finance: ["Business & Entrepreneurship", "Finance & Economics"],
  healthcare: ["Health & Wellness", "Social Impact"],
  gaming: ["Design & Creativity", "Technology & AI"],
  research: ["Science & Research"],
  education: ["Education & Learning", "Psychology & Human Behavior"],
  law_policy: ["Business & Entrepreneurship", "Social Impact"],
};

function comboKey(primary: ArchetypeId, secondary: ArchetypeId) {
  return `${primary}+${secondary}`;
}

export const ARCHETYPE_COMBINATIONS: Record<string, ArchetypeCombination> = {
  [comboKey("builder", "thinker")]: {
    identity: "Analytical Problem Solver",
    pattern:
      "Strong systems orientation + execution drive. Enjoys solving structured real-world problems through applied logic.",
    domains: [
      "Technology & AI",
      "Engineering & Systems",
      "Science & Research",
    ],
    industries: ["AI & Technology", "Research & Science", "Engineering"],
    exitRoles: [
      "Robotics Engineer",
      "AI Engineer",
      "Product Engineer",
      "Systems Designer",
      "Data Engineer",
    ],
    logic:
      "Combines execution energy with deep analytical cognition for scalable systems and optimization.",
  },
  [comboKey("builder", "creator")]: {
    identity: "Creative Builder",
    pattern:
      "Hands-on creation blended with imagination. Strong novelty-seeking and visual interaction orientation.",
    domains: ["Design & Creativity", "Technology & AI", "Media & Communication"],
    industries: ["Gaming & Interactive Media", "Design Services", "AI & Technology"],
    exitRoles: [
      "Game Designer",
      "UX Designer",
      "Creative Technologist",
      "AR/VR Designer",
      "Product Designer",
    ],
    logic:
      "Turns imagination into tangible, interactive products and experiences.",
  },
  [comboKey("builder", "leader")]: {
    identity: "Execution-Oriented Builder",
    pattern:
      "High initiative + execution energy. Enjoys driving progress and taking responsibility under ambiguity.",
    domains: ["Business & Entrepreneurship", "Technology & AI"],
    industries: ["Startups & Entrepreneurship", "AI & Technology"],
    exitRoles: [
      "Startup Founder",
      "Product Manager",
      "Operations Lead",
      "Innovation Manager",
    ],
    logic: "Ownership orientation with action bias toward measurable impact.",
  },
  [comboKey("builder", "guide")]: {
    identity: "Human-Centered Builder",
    pattern:
      "Empathy blended with applied problem-solving. Values usefulness and impact over status.",
    domains: ["Education & Learning", "Health & Wellness", "Social Impact"],
    industries: ["Education & Learning", "Healthcare & Wellness", "Social Impact & NGOs"],
    exitRoles: [
      "EdTech Builder",
      "Healthcare Innovator",
      "Accessibility Designer",
      "Social-Tech Founder",
    ],
    logic: "Practical innovation that directly improves human experiences.",
  },
  [comboKey("thinker", "builder")]: {
    identity: "Systems Thinker",
    pattern:
      "Deep analytical orientation combined with execution capability and persistence.",
    domains: ["Engineering & Systems", "Technology & AI", "Science & Research"],
    industries: ["AI & Technology", "Research & Science"],
    exitRoles: [
      "Data Analyst",
      "Systems Engineer",
      "Research Scientist",
      "Solutions Architect",
    ],
    logic: "Structured thinking meets technical mastery and optimization.",
  },
  [comboKey("thinker", "creator")]: {
    identity: "Strategic Creator",
    pattern:
      "Enjoys understanding people, ideas, and patterns while expressing them meaningfully.",
    domains: ["Design & Creativity", "Media & Communication", "Psychology & Human Behavior"],
    industries: ["Design Services", "Media & Entertainment"],
    exitRoles: [
      "UX Researcher",
      "Brand Strategist",
      "Design Researcher",
      "Creative Strategist",
    ],
    logic: "Psychology, storytelling, and strategy intersect in insight-driven creativity.",
  },
  [comboKey("thinker", "leader")]: {
    identity: "Strategic Decision Maker",
    pattern:
      "Analytical planning blended with ambition and leadership orientation.",
    domains: ["Business & Entrepreneurship", "Science & Research"],
    industries: ["Finance & Consulting", "Research & Science"],
    exitRoles: [
      "Consultant",
      "Policy Analyst",
      "Business Strategist",
      "Management Professional",
    ],
    logic: "Structured decision-making in environments requiring responsibility.",
  },
  [comboKey("thinker", "guide")]: {
    identity: "Reflective Mentor",
    pattern:
      "Reflection + empathy. Values insight, emotional understanding, and thoughtful support.",
    domains: ["Psychology & Human Behavior", "Education & Learning"],
    industries: ["Education & Learning", "Healthcare & Wellness"],
    exitRoles: [
      "Psychologist",
      "Educator",
      "Behavioral Researcher",
      "Learning Designer",
    ],
    logic: "Human-centered professions requiring patience and understanding.",
  },
  [comboKey("creator", "builder")]: {
    identity: "Experimental Creator",
    pattern:
      "Visual imagination combined with practical making orientation.",
    domains: ["Design & Creativity", "Engineering & Systems"],
    industries: ["Design Services", "Gaming & Interactive Media"],
    exitRoles: [
      "Industrial Designer",
      "Architect",
      "Creative Technologist",
      "Experience Designer",
    ],
    logic: "Manifesting ideas into physical or digital reality.",
  },
  [comboKey("creator", "thinker")]: {
    identity: "Conceptual Storyteller",
    pattern:
      "Combines imagination with pattern recognition and conceptual thinking.",
    domains: ["Media & Communication", "Design & Creativity"],
    industries: ["Media & Entertainment", "Design Services"],
    exitRoles: [
      "Creative Director",
      "UX Writer",
      "Brand Strategist",
      "Communication Designer",
    ],
    logic: "Ideas, emotion, and communication intersect with strategic depth.",
  },
  [comboKey("creator", "leader")]: {
    identity: "Expressive Influencer",
    pattern:
      "High expressive energy + social influence orientation.",
    domains: ["Media & Communication", "Business & Entrepreneurship"],
    industries: ["Media & Entertainment", "Startups & Entrepreneurship"],
    exitRoles: [
      "Media Entrepreneur",
      "Content Creator",
      "Marketing Lead",
      "Brand Builder",
    ],
    logic: "Audience engagement and public communication drive motivation.",
  },
  [comboKey("creator", "guide")]: {
    identity: "Emotional Storyteller",
    pattern:
      "Creativity as a tool for emotional connection, teaching, and guidance.",
    domains: ["Education & Learning", "Media & Communication"],
    industries: ["Education & Learning", "Media & Entertainment"],
    exitRoles: [
      "Educator",
      "Storytelling Coach",
      "Content Educator",
      "Communication Specialist",
    ],
    logic: "Emotionally resonant communication-heavy environments.",
  },
  [comboKey("leader", "builder")]: {
    identity: "Action-Oriented Leader",
    pattern:
      "Ownership orientation + action bias toward responsibility and achievement.",
    domains: ["Business & Entrepreneurship", "Technology & AI"],
    industries: ["Startups & Entrepreneurship", "AI & Technology"],
    exitRoles: [
      "Founder",
      "Operations Manager",
      "Startup Operator",
      "Product Lead",
    ],
    logic: "Fast-moving environments requiring initiative and leadership.",
  },
  [comboKey("leader", "thinker")]: {
    identity: "Strategic Leader",
    pattern:
      "Combines analytical thinking with ambition and structured leadership.",
    domains: ["Business & Entrepreneurship", "Science & Research"],
    industries: ["Finance & Consulting"],
    exitRoles: [
      "Strategy Consultant",
      "Business Leader",
      "Policy Advisor",
      "Organizational Strategist",
    ],
    logic: "Strategic environments where decisions shape outcomes.",
  },
  [comboKey("leader", "creator")]: {
    identity: "Visionary Communicator",
    pattern:
      "Influence through storytelling and vision rather than technical depth.",
    domains: ["Media & Communication", "Business & Entrepreneurship"],
    industries: ["Media & Entertainment", "Startups & Entrepreneurship"],
    exitRoles: [
      "Campaign Strategist",
      "Media Leader",
      "Creative Entrepreneur",
      "Public Speaker",
    ],
    logic: "High-visibility, fast-moving communication environments.",
  },
  [comboKey("leader", "guide")]: {
    identity: "Mission-Driven Leader",
    pattern:
      "Leadership energy blended with empathy and social responsibility.",
    domains: ["Social Impact", "Education & Learning"],
    industries: ["Social Impact & NGOs", "Education & Learning"],
    exitRoles: [
      "NGO Founder",
      "Education Leader",
      "Community Organizer",
      "Social Entrepreneur",
    ],
    logic: "Impact-oriented and mission-driven ecosystems.",
  },
  [comboKey("guide", "builder")]: {
    identity: "Practical Helper",
    pattern:
      "Values practical usefulness and human-centered innovation.",
    domains: ["Education & Learning", "Health & Wellness"],
    industries: ["Education & Learning", "Healthcare & Wellness"],
    exitRoles: [
      "Learning Experience Designer",
      "Healthcare Innovator",
      "Community-Tech Builder",
    ],
    logic: "Assistive and accessibility-oriented innovation ecosystems.",
  },
  [comboKey("guide", "thinker")]: {
    identity: "Insight-Oriented Helper",
    pattern:
      "Deep empathy combined with reflection and curiosity about human behavior.",
    domains: ["Psychology & Human Behavior", "Education & Learning"],
    industries: ["Healthcare & Wellness", "Education & Learning"],
    exitRoles: [
      "Counselor",
      "Behavioral Scientist",
      "Career Coach",
      "Psychologist",
    ],
    logic: "Professions involving listening, understanding, and personal growth.",
  },
  [comboKey("guide", "creator")]: {
    identity: "Meaning Maker",
    pattern:
      "Emotional resonance and communication as central motivational drivers.",
    domains: ["Education & Learning", "Media & Communication"],
    industries: ["Education & Learning", "Media & Entertainment"],
    exitRoles: [
      "Teacher",
      "Therapist",
      "Podcast Host",
      "Writer",
      "Emotional Storyteller",
    ],
    logic: "Emotionally meaningful and expressive environments.",
  },
  [comboKey("guide", "leader")]: {
    identity: "Compassionate Organizer",
    pattern:
      "Purpose-driven leadership with strong empathy and collective orientation.",
    domains: ["Social Impact", "Education & Learning"],
    industries: ["Social Impact & NGOs", "Education & Learning"],
    exitRoles: [
      "Community Leader",
      "NGO Manager",
      "Education Program Lead",
      "Impact Entrepreneur",
    ],
    logic: "Systems that help communities grow together.",
  },
};

export function getCombination(
  primary: ArchetypeId,
  secondary: ArchetypeId,
): ArchetypeCombination {
  const key = comboKey(primary, secondary);
  const combo = ARCHETYPE_COMBINATIONS[key];
  if (combo) return combo;

  const fallback = ARCHETYPE_COMBINATIONS[comboKey(secondary, primary)];
  if (fallback) return fallback;

  return {
    identity: `${ARCHETYPE_LABELS[primary].name} + ${ARCHETYPE_LABELS[secondary].name}`,
    pattern: `A blend of ${ARCHETYPE_LABELS[primary].tagline.toLowerCase()} and ${ARCHETYPE_LABELS[secondary].tagline.toLowerCase()}.`,
    domains: ["Technology & AI", "Design & Creativity"],
    industries: ["AI & Technology", "Design Services"],
    exitRoles: ["Explorer", "Innovator", "Future Builder"],
    logic: "Your unique combination suggests broad exploration across multiple domains.",
  };
}

export const MARGA_REPORT_SECTIONS = [
  {
    letter: "M",
    name: "Mindscape",
    meaning:
      "Your natural inner world: how you think, feel, learn, and respond to the world around you.",
    example:
      "You naturally enjoy solving meaningful problems, thinking independently, and exploring ideas deeply.",
  },
  {
    letter: "A",
    name: "Alignment",
    meaning:
      "The strengths, skills, and capabilities that align best with your personality, energy, and future potential.",
    example:
      "Systems thinking, communication, storytelling, research, leadership, creativity",
  },
  {
    letter: "R",
    name: "Routes",
    meaning:
      "Future pathways, industries, ecosystems, and opportunities where your strengths may thrive.",
    example:
      "AI & Automation, Climate Tech, Creator Economy, Human Wellness, Education Innovation",
  },
  {
    letter: "G",
    name: "Gateway",
    meaning:
      "Real-world actions, projects, habits, communities, and experiences you can start exploring right now.",
    example:
      "Start a blog, build a mini app, join robotics club, volunteer, create content, interview professionals",
  },
  {
    letter: "A",
    name: "Avoidances",
    meaning:
      "Blind spots, habits, emotional patterns, or behaviors that may quietly limit your growth if ignored.",
    example:
      "Overthinking, perfectionism, fear of visibility, inconsistency, avoiding collaboration",
  },
] as const;
