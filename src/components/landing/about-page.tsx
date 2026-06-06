import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Compass,
  Heart,
  Layers,
  MoveRight,
  Sparkles,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { MargaSectionRule } from "@/components/brand/marga-section-rule";
import { GetStartedButton } from "@/components/ui/get-started-button";
import {
  margaBadgeInvertedStyles,
  margaBadgeStyles,
  margaLabelStyles,
  margaLinkStyles,
  margaPrimaryButtonStyles,
} from "@/lib/brand-styles";
import { cn } from "@/lib/utils";

const pressureFactors = [
  "marks",
  "pressure",
  "prestige",
  "confusion",
  "trends",
  "fear",
  "limited exposure",
];

const margaDimensions = [
  {
    letter: "M",
    name: "Motivation",
    description: "What naturally drives and energizes you.",
    icon: Heart,
  },
  {
    letter: "A",
    name: "Ability",
    description: "How you think, solve problems, create, and learn.",
    icon: Brain,
  },
  {
    letter: "R",
    name: "Resilience",
    description:
      "How you respond to uncertainty, setbacks, and pressure.",
    icon: Sparkles,
  },
  {
    letter: "G",
    name: "Goals",
    description:
      "What kind of future, impact, and life direction matters to you.",
    icon: Target,
  },
  {
    letter: "A",
    name: "Awareness",
    description:
      "How deeply you understand yourself, your emotions, strengths, and growth areas.",
    icon: Compass,
  },
];

const psychologicalFrameworks = [
  {
    name: "Self-Determination Theory (SDT)",
    usedFor: [
      "intrinsic motivation",
      "autonomy",
      "curiosity",
      "purpose",
      "long-term engagement",
    ],
    insight:
      "Identifies what genuinely energizes a learner beyond external pressure or rewards.",
  },
  {
    name: "McClelland's Needs Theory",
    usedFor: [
      "achievement orientation",
      "leadership motivation",
      "influence",
      "ambition",
      "responsibility",
    ],
    insight:
      "Surfaces learners naturally driven toward ownership, challenge, leadership, or impact.",
  },
  {
    name: "Gardner's Multiple Intelligences",
    usedFor: [
      "different forms of intelligence",
      "cognitive diversity",
      "natural strengths",
      "learning preferences",
    ],
    insight:
      "Because intelligence is not one-dimensional — some build, analyze, communicate, create, or guide.",
  },
  {
    name: "VIA Character Strengths",
    usedFor: [
      "natural behavioral strengths",
      "positive traits",
      "emotional tendencies",
      "personal capabilities",
    ],
    insight:
      "Creates more human and growth-oriented interpretations of who you are.",
  },
  {
    name: "Growth Mindset (Carol Dweck)",
    usedFor: [
      "adaptability",
      "learning orientation",
      "response to setbacks",
      "effort beliefs",
      "improvement mindset",
    ],
    insight:
      "Evaluates how learners approach challenge and uncertainty over time.",
  },
  {
    name: "CD-RISC (Connor-Davidson Resilience Scale)",
    usedFor: [
      "resilience patterns",
      "emotional recovery",
      "persistence",
      "adaptability under stress",
    ],
    insight:
      "Future success is not only about talent — it is also about recovery, flexibility, and endurance.",
  },
  {
    name: "Holland RIASEC Model",
    usedFor: [
      "career environment preferences",
      "vocational tendencies",
      "domain alignment",
    ],
    insight:
      "Connects identity patterns with real-world industries and work environments.",
  },
  {
    name: "Maslow's Hierarchy of Needs",
    usedFor: ["purpose", "security", "esteem", "fulfillment", "meaning"],
    insight:
      "Different learners are driven by different visions of success.",
  },
  {
    name: "Big Five Personality Dimensions",
    usedFor: [
      "openness",
      "conscientiousness",
      "emotional tendencies",
      "social orientation",
      "behavioral consistency",
    ],
    insight:
      "Creates more nuanced and balanced identity interpretation.",
  },
  {
    name: "Johari Window",
    usedFor: [
      "self-awareness",
      "blind spots",
      "social perception",
      "identity reflection",
    ],
    insight:
      "Growth begins when learners better understand themselves and how they interact with the world.",
  },
];

const discoveryQuestions = [
  "What naturally motivates me?",
  "What environments bring out my best?",
  "What kind of work feels meaningful to me?",
  "Which domains align with my thinking style?",
  "What strengths should I build on?",
  "What blind spots should I improve?",
  "Which future pathways deserve deeper exploration?",
];

const futureSkills = [
  "adaptability",
  "self-awareness",
  "creativity",
  "problem-solving",
  "emotional intelligence",
  "interdisciplinary thinking",
];

const labelStyles = margaLabelStyles;

function SectionBadge({
  children,
  inverted,
}: {
  children: React.ReactNode;
  inverted?: boolean;
}) {
  return (
    <p
      className={cn(
        "mb-6",
        inverted ? margaBadgeInvertedStyles : cn(margaBadgeStyles, "px-4 py-2 text-xs"),
      )}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  badge,
  title,
  description,
  inverted,
  align = "center",
}: {
  badge: string;
  title: string;
  description?: string;
  inverted?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl",
      )}
    >
      <SectionBadge inverted={inverted}>{badge}</SectionBadge>
      <MargaSectionRule inverted={inverted} />
      <h2
        className={cn(
          "font-display text-3xl leading-[1.1] tracking-tighter md:text-4xl",
          inverted && "text-white",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            inverted ? "text-white/70" : "text-[#525252]",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Panel({
  children,
  className,
  inverted,
}: {
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <div
      className={cn(
        "border border-black p-5 sm:p-6",
        inverted ? "bg-black text-white" : "bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-black bg-[#F5F5F5] px-3 py-1.5 text-sm capitalize">
      {children}
    </span>
  );
}

function MargaDimensionCard({
  letter,
  name,
  description,
  icon: Icon,
}: {
  letter: string;
  name: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Panel className="group border-l-4 border-l-transparent transition-colors duration-100 hover:border-l-marga-yellow hover:bg-black hover:text-white">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center border border-black bg-marga-yellow-muted text-lg font-semibold group-hover:border-marga-yellow group-hover:bg-marga-yellow group-hover:text-black">
          {letter}
        </span>
        <Icon
          className="size-5 text-black group-hover:text-white"
          strokeWidth={1.5}
        />
      </div>
      <h3 className="mt-4 font-display text-lg tracking-tight">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#525252] group-hover:text-white/70">
        {description}
      </p>
    </Panel>
  );
}

export function AboutPage() {
  return (
    <div className="bg-white text-black">
      {/* Hero */}
      <section className="relative overflow-hidden border-b-4 border-black">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(#00000008 1px, transparent 1px),
              linear-gradient(90deg, #00000008 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            opacity: 0.5,
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24 xl:px-16">
          <SectionBadge>About us</SectionBadge>
          <MargaSectionRule />
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl leading-[1.05] tracking-tighter md:text-5xl lg:text-6xl">
              The science behind Marga
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[#525252] md:text-lg">
              Marga.me combines psychometric science, skill assessment, and
              psychological profiling into one honest, human portrait of who you
              are — and where you could go. We build rigorous tools with warm
              interfaces, so clarity once reserved for expensive coaches and elite
              institutions is available to anyone with a phone and a question about
              their future.
            </p>
          </div>
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="border-b-4 border-black py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid gap-4 md:grid-cols-2">
            <Panel>
              <p className={labelStyles}>Vision</p>
              <h2 className="mt-3 font-display text-xl tracking-tight md:text-2xl">
                A world where no one loses years of their life to the wrong
                career
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#525252] md:text-base">
                Career confusion is not a personal failure — it is a systemic
                one. For too long, access to meaningful self-knowledge has
                belonged to those with the right mentors, the right schools, or
                the right network. Marga exists to change that. We envision a
                future where every student, every professional, every person at
                a crossroads has the tools to understand themselves deeply — and
                the clarity to move forward with conviction.
              </p>
            </Panel>

            <Panel inverted>
              <p className={cn(labelStyles, "text-white/60")}>Mission</p>
              <h2 className="mt-3 font-display text-xl tracking-tight text-white md:text-2xl">
                Deep career self-knowledge for every person, everywhere
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
                We build rigorous tools with warm interfaces, so that the
                clarity once reserved for expensive coaches and elite
                institutions is available to anyone with a phone and a question
                about their future.
              </p>
            </Panel>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="border-b-4 border-black bg-[#F5F5F5] py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16">
          <SectionHeading
            badge="The problem"
            title="We change the starting point of the career conversation"
            description='From "what should I do?" to "who am I?"'
          />
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-[#525252] md:text-lg">
            Millions of students pick careers based on peer pressure, parental
            expectation, or salary alone — without ever asking who they actually
            are. Millions of professionals stay stuck in roles that drain them
            because no one ever gave them a framework to understand their own
            strengths and motivations.
          </p>
        </div>
      </section>

      {/* Why Marga exists */}
      <section className="border-b-4 border-black py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionBadge>Why Marga exists</SectionBadge>
              <MargaSectionRule />
              <h2 className="font-display text-3xl leading-[1.1] tracking-tighter md:text-4xl">
                Career discovery should begin with self-discovery
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#525252] md:text-base">
                Most students are asked one question far too early:{" "}
                <span className="font-medium text-black">
                  &ldquo;What do you want to become?&rdquo;
                </span>{" "}
                But very few are first helped to understand how they naturally
                think, what motivates them, how they respond to challenges, what
                environments energize them, and what kind of future actually
                aligns with who they are.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#525252] md:text-base">
                Marga was built to change that. We believe in a deeper
                understanding of identity, motivation, behavior, strengths, and
                growth — not labels, stereotypes, or one-size-fits-all aptitude
                tests.
              </p>
            </div>

            <Panel>
              <h3 className="font-display text-lg tracking-tight">
                As a result, millions choose careers based on:
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {pressureFactors.map((factor) => (
                  <li key={factor}>
                    <Tag>{factor}</Tag>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="border-b-4 border-black bg-black py-16 text-white md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16">
          <SectionHeading
            badge="What makes us different"
            title="Not a traditional psychometric test"
            description="Marga is an AI-native identity and career discovery system designed to understand patterns across motivation, ability, resilience, goals, self-awareness, behavioral consistency, contextual interests, and future aspirations."
            inverted
          />

          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            <Panel className="border-white/20 bg-white/5">
              <p className={cn(labelStyles, "text-white/50")}>Instead of asking</p>
              <p className="mt-3 font-display text-xl tracking-tight text-white/80">
                &ldquo;What career fits you?&rdquo;
              </p>
            </Panel>
            <Panel className="border-white bg-white text-black">
              <p className={labelStyles}>Marga asks</p>
              <p className="mt-3 font-display text-xl tracking-tight">
                &ldquo;What patterns consistently emerge across who you are, how
                you think, and what kind of future energizes you?&rdquo;
              </p>
            </Panel>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center font-display text-lg italic text-white/80">
            That distinction changes <span className="text-marga-yellow">everything</span>.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b-4 border-black py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16">
          <SectionHeading
            badge="How it works"
            title="One integrated system for alignment"
            description="The goal is not prediction. The goal is alignment."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <h3 className="flex items-center gap-2 font-display text-lg tracking-tight">
                <Layers className="size-5" strokeWidth={1.5} />
                Marga combines
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-[#525252]">
                {[
                  "contextual exploration",
                  "behavioral assessment",
                  "psychological pattern recognition",
                  "developmental guidance",
                  "domain and industry mapping",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1.5 shrink-0 bg-black" />
                    <span className="capitalize">{item}</span>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel>
              <h3 className="font-display text-lg tracking-tight">To generate</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#525252]">
                {[
                  "primary and secondary archetypes",
                  "domain affinities",
                  "industry alignments",
                  "possible career pathways",
                  "growth recommendations",
                  "developmental insights",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <ArrowRight className="size-4 shrink-0 text-black" strokeWidth={1.5} />
                    <span className="capitalize">{item}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </section>

      {/* MARGA framework */}
      <section className="border-b-4 border-black bg-[#F5F5F5] py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16">
          <SectionHeading
            badge="The MARGA framework"
            title="Five dimensions. One complete portrait."
            description="Together, these dimensions create a more complete picture of a learner's identity and future potential."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {margaDimensions.map((dim) => (
              <MargaDimensionCard key={dim.name} {...dim} />
            ))}
            <Panel className="flex flex-col justify-between border-2 border-black bg-black text-white sm:col-span-2 lg:col-span-1">
              <div>
                <p className={cn(labelStyles, "text-white/60")}>Assessment</p>
                <h3 className="mt-3 font-display text-lg tracking-tight">
                  45 questions · 30 minutes
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Three question formats mixed across 8 psychological models — a
                  rigorous assessment you can finish on any phone.
                </p>
              </div>
              <Link
                href="/#modules"
                className={cn(
                  "mt-6 inline-flex items-center gap-1 font-label text-xs uppercase tracking-widest text-white",
                  margaLinkStyles,
                )}
              >
                Explore the framework
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
            </Panel>
          </div>
        </div>
      </section>

      {/* Psychological foundations */}
      <section className="border-b-4 border-black py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16">
          <SectionHeading
            badge="Psychological foundations"
            title="Built on globally respected frameworks"
            description="These models are not used to label students. They are used to better understand human behavior, motivation, learning, growth, and identity."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {psychologicalFrameworks.map((framework) => (
              <Panel key={framework.name}>
                <h3 className="font-display text-base tracking-tight">
                  {framework.name}
                </h3>
                <div className="mt-4">
                  <p className={labelStyles}>Used to understand</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {framework.usedFor.map((item) => (
                      <li
                        key={item}
                        className="border border-[#E5E5E5] bg-[#F5F5F5] px-2 py-1 text-xs text-[#525252]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-4 border-l-4 border-marga-yellow pl-3 text-sm leading-relaxed text-[#525252]">
                  {framework.insight}
                </p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-framework */}
      <section className="border-b-4 border-black bg-[#F5F5F5] py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <SectionBadge>Multi-framework approach</SectionBadge>
            <MargaSectionRule />
            <h2 className="font-display text-3xl leading-[1.1] tracking-tighter md:text-4xl">
              Human beings are complex
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#525252] md:text-base">
              No single theory can fully explain identity, ambition, creativity,
              resilience, purpose, behavior, learning, or future potential. That is
              why Marga uses a multi-framework approach — looking for repeated
              patterns, behavioral consistency, motivational alignment, contextual
              reinforcement, and developmental potential.
            </p>
            <p className="mt-4 font-medium text-black">
              This creates insights that feel more human, more accurate, more
              emotionally resonant, and more growth-oriented.
            </p>
          </div>
        </div>
      </section>

      {/* Discovery + future skills */}
      <section className="border-b-4 border-black py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <SectionBadge>What you&apos;ll discover</SectionBadge>
              <MargaSectionRule />
              <h2 className="font-display text-3xl leading-[1.1] tracking-tighter md:text-4xl">
                Questions worth answering before choosing a path
              </h2>
              <ul className="mt-6 space-y-3">
                {discoveryQuestions.map((question) => (
                  <li
                    key={question}
                    className="flex items-start gap-3 text-sm text-[#525252] md:text-base"
                  >
                    <span className="mt-2 size-1.5 shrink-0 bg-marga-yellow" />
                    {question}
                  </li>
                ))}
              </ul>
            </div>

            <Panel>
              <h3 className="font-display text-lg tracking-tight">
                The careers of tomorrow will reward
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {futureSkills.map((skill) => (
                  <li key={skill}>
                    <Tag>{skill}</Tag>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-[#525252] md:text-base">
                Marga exists to help learners navigate that future with greater
                clarity, confidence, and self-understanding. Because the best
                career decisions are not made from pressure — they are made from
                alignment.
              </p>
            </Panel>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="relative overflow-hidden border-2 border-black bg-black p-8 text-center text-white sm:p-12 md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 1px,
                  #fff 1px,
                  #fff 2px
                )`,
                backgroundSize: "4px 100%",
                opacity: 0.03,
              }}
            />
            <div className="relative z-10">
              <h2 className="font-display text-3xl leading-[1.1] tracking-tighter md:text-4xl">
                Ready to start with who you are?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                Take the MARGA assessment and discover your archetypes, domain
                affinities, and exploration pathways — in about 30 minutes.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4">
                <GetStartedButton
                  size="lg"
                  className={cn(
                    margaPrimaryButtonStyles,
                    "h-auto gap-3 border-white bg-white px-8 py-4 text-black hover:border-marga-yellow hover:bg-marga-yellow",
                  )}
                >
                  Begin your journey
                  <MoveRight className="size-4" strokeWidth={1.5} />
                </GetStartedButton>
                <Link
                  href="/#stages"
                  className={cn(
                    "font-label text-xs uppercase tracking-widest text-white/60",
                    margaLinkStyles,
                  )}
                >
                  See how Marga meets you at your life stage →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
