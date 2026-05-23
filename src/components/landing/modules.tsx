import {
  Brain,
  Compass,
  Heart,
  Sparkles,
  Target,
} from "lucide-react";

import { Feature108 } from "@/components/ui/shadcnblocks-com-feature108";

const margaFrameworkTabs = [
  {
    value: "motivation",
    icon: <Heart className="h-4 w-4 shrink-0 text-teal" />,
    label: "Motivation",
    content: {
      badge: "M — Motivation",
      title: "What drives you from within.",
      questions: 9,
      formats: "Forced choice, Likert, Scenario",
      models: "SDT, McClelland",
      time: "6 min",
      description:
        "Maps intrinsic drivers — autonomy, mastery, and purpose — using validated motivation science so career choices align with what actually energizes you, not external pressure alone.",
      insight:
        "Students often pick paths for parents or peers; this module surfaces what genuinely motivates you before any career label is applied.",
      buttonText: "Start Motivation module",
      imageSrc:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
      imageAlt: "Group collaborating with shared purpose",
    },
  },
  {
    value: "ability",
    icon: <Brain className="h-4 w-4 shrink-0 text-teal" />,
    label: "Ability",
    content: {
      badge: "A — Ability",
      title: "How you're built to learn and contribute.",
      questions: 9,
      formats: "Mini-task, Forced choice, Likert",
      models: "Gardner MI, VIA",
      time: "6 min",
      description:
        "Mini-tasks and structured choices reveal natural intelligences and character strengths — the abilities that predict where you will learn fastest and add the most value.",
      insight:
        "Aptitude is not one score; this module shows your unique blend of strengths so you can match work to how you are actually wired.",
      buttonText: "Start Ability module",
      imageSrc:
        "https://images.unsplash.com/photo-1456513080510-7bf93a614e73?w=1200&q=80",
      imageAlt: "Student engaged in focused study",
    },
  },
  {
    value: "resilience",
    icon: <Sparkles className="h-4 w-4 shrink-0 text-teal" />,
    label: "Resilience",
    content: {
      badge: "R — Resilience",
      title: "How you respond when things get hard.",
      questions: 9,
      formats: "Scenario, Likert, Forced choice",
      models: "Dweck, CD-RISC",
      time: "6 min",
      description:
        "Scenario-based items measure growth mindset and psychological resilience — essential for careers that demand persistence, setbacks, and long uncertainty.",
      insight:
        "The right career fit must survive stress; resilience data helps you choose paths you can sustain, not just paths that look impressive on paper.",
      buttonText: "Start Resilience module",
      imageSrc:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
      imageAlt: "Person demonstrating focus and determination",
    },
  },
  {
    value: "goals",
    icon: <Target className="h-4 w-4 shrink-0 text-teal" />,
    label: "Goals",
    content: {
      badge: "G — Goals",
      title: "Environments where you thrive.",
      questions: 9,
      formats: "Forced choice, Scenario, Likert",
      models: "Holland RIASEC, Maslow",
      time: "6 min",
      description:
        "Holland interest codes and need hierarchies point toward work settings, roles, and domains that fit your interests — not just a job title or salary band.",
      insight:
        "Two people with the same degree need different environments; this module clarifies the settings where your goals and needs are most likely met.",
      buttonText: "Start Goals module",
      imageSrc:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80",
      imageAlt: "Planning career direction on a laptop",
    },
  },
  {
    value: "awareness",
    icon: <Compass className="h-4 w-4 shrink-0 text-teal" />,
    label: "Awareness",
    content: {
      badge: "A — Awareness",
      title: "The personality others experience.",
      questions: 9,
      formats: "Likert, Scenario, Forced choice",
      models: "Big Five, Johari",
      time: "6 min",
      description:
        "Likert and scenario items surface Big Five traits and Johari-window blind spots — completing one honest, integrated portrait of who you are.",
      insight:
        "Self-awareness closes the gap between how you see yourself and how you show up — the foundation for every confident career decision that follows.",
      buttonText: "Start Awareness module",
      imageSrc:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80",
      imageAlt: "Professional reflecting thoughtfully",
    },
  },
];

function Modules() {
  return (
    <Feature108
      badge="M.A.R.G.A. framework"
      heading="Rigorous science. One human portrait."
      description="Marga.me combines five evidence-based modules into a single assessment — psychometric science, skill mapping, and psychological profiling you can finish in about 30 minutes on any phone."
      summary={{
        questions: 45,
        models: 5,
        minutes: 30,
        formats: "3 types mixed",
      }}
      tabs={margaFrameworkTabs}
    />
  );
}

export { Modules, margaFrameworkTabs };
