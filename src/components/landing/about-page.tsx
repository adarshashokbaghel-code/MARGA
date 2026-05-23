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

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { DotPattern } from "@/components/ui/dot-pattern";

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

function SectionHeading({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <Badge variant="outline" className="mb-4 border-teal/30 text-teal">
        {badge}
      </Badge>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-muted/20 py-20 md:py-28">
        <DotPattern
          className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"
          width={20}
          height={20}
        />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-teal/10 text-teal hover:bg-teal/10">
              About us
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              The science behind Marga
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
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

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <Badge variant="secondary" className="mb-2 w-fit">
                  Vision
                </Badge>
                <CardTitle className="text-xl md:text-2xl">
                  A world where no one loses years of their life to the wrong
                  career
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  Career confusion is not a personal failure — it is a systemic
                  one. For too long, access to meaningful self-knowledge has
                  belonged to those with the right mentors, the right schools, or
                  the right network. Marga exists to change that. We envision a
                  future where every student, every professional, every person at
                  a crossroads has the tools to understand themselves deeply — and
                  the clarity to move forward with conviction.
                </p>
              </CardContent>
            </Card>

            <Card className="border-teal/20 bg-teal/5 shadow-sm">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-teal/20 text-teal hover:bg-teal/20">
                  Mission
                </Badge>
                <CardTitle className="text-xl md:text-2xl">
                  Deep career self-knowledge for every person, everywhere
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  We build rigorous tools with warm interfaces, so that the
                  clarity once reserved for expensive coaches and elite
                  institutions is available to anyone with a phone and a question
                  about their future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="The problem"
            title="We change the starting point of the career conversation"
            description='From "what should I do?" to "who am I?"'
          />
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted-foreground">
            Millions of students pick careers based on peer pressure, parental
            expectation, or salary alone — without ever asking who they actually
            are. Millions of professionals stay stuck in roles that drain them
            because no one ever gave them a framework to understand their own
            strengths and motivations.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-teal/30 text-teal">
                Why Marga exists
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Career discovery should begin with self-discovery
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Most students are asked one question far too early:{" "}
                <span className="font-medium text-foreground">
                  &ldquo;What do you want to become?&rdquo;
                </span>{" "}
                But very few are first helped to understand how they naturally
                think, what motivates them, how they respond to challenges, what
                environments energize them, and what kind of future actually
                aligns with who they are.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Marga was built to change that. We believe in a deeper
                understanding of identity, motivation, behavior, strengths, and
                growth — not labels, stereotypes, or one-size-fits-all aptitude
                tests.
              </p>
            </div>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">
                  As a result, millions choose careers based on:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {pressureFactors.map((factor) => (
                    <li
                      key={factor}
                      className="rounded-full bg-muted px-4 py-2 text-sm font-medium capitalize text-foreground"
                    >
                      {factor}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-y bg-navy-deep py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-teal/20 text-white hover:bg-teal/20">
              What makes us different
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Not a traditional psychometric test
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Marga is an AI-native identity and career discovery system designed
              to understand patterns across motivation, ability, resilience, goals,
              self-awareness, behavioral consistency, contextual interests, and
              future aspirations.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-lg text-white/60">
                  Instead of asking
                </CardTitle>
                <CardDescription className="text-xl font-medium text-white">
                  &ldquo;What career fits you?&rdquo;
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-teal/30 bg-teal/10 text-white">
              <CardHeader>
                <CardTitle className="text-lg text-teal">Marga asks</CardTitle>
                <CardDescription className="text-xl font-medium text-white">
                  &ldquo;What patterns consistently emerge across who you are, how
                  you think, and what kind of future energizes you?&rdquo;
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-teal">
            That distinction changes everything.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="How it works"
            title="One integrated system for alignment"
            description="The goal is not prediction. The goal is alignment."
          />

          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Layers className="h-5 w-5 text-teal" />
                  Marga combines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  {[
                    "contextual exploration",
                    "behavioral assessment",
                    "psychological pattern recognition",
                    "developmental guidance",
                    "domain and industry mapping",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      <span className="capitalize">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">To generate</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  {[
                    "primary and secondary archetypes",
                    "domain affinities",
                    "industry alignments",
                    "possible career pathways",
                    "growth recommendations",
                    "developmental insights",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 text-teal" />
                      <span className="capitalize">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="The MARGA framework"
            title="Five dimensions. One complete portrait."
            description="Together, these dimensions create a more complete picture of a learner's identity and future potential."
          />
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {margaDimensions.map((dim) => (
              <Card
                key={dim.name}
                className="border-border/60 transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-lg font-bold text-teal">
                      {dim.letter}
                    </span>
                    <dim.icon className="h-5 w-5 text-teal" />
                  </div>
                  <CardTitle className="text-lg">{dim.name}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {dim.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
            <Card className="border-teal/20 bg-teal/5 sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">45 questions · 30 minutes</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Three question formats mixed across 8 psychological models — a
                  rigorous assessment you can finish on any phone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="/#modules"
                  className="inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline"
                >
                  Explore the framework
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Psychological foundations"
            title="Built on globally respected frameworks"
            description="These models are not used to label students. They are used to better understand human behavior, motivation, learning, growth, and identity."
          />
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
            {psychologicalFrameworks.map((framework) => (
              <Card key={framework.name} className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{framework.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-teal">
                      Used to understand
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {framework.usedFor.map((item) => (
                        <li
                          key={item}
                          className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {framework.insight}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 border-teal/30 text-teal">
              Multi-framework approach
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Human beings are complex
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              No single theory can fully explain identity, ambition, creativity,
              resilience, purpose, behavior, learning, or future potential. That is
              why Marga uses a multi-framework approach — looking for repeated
              patterns, behavioral consistency, motivational alignment, contextual
              reinforcement, and developmental potential.
            </p>
            <p className="mt-4 font-medium text-foreground">
              This creates insights that feel more human, more accurate, more
              emotionally resonant, and more growth-oriented.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-4 border-teal/30 text-teal">
                What you&apos;ll discover
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Questions worth answering before choosing a path
              </h2>
              <ul className="mt-6 space-y-3">
                {discoveryQuestions.map((question) => (
                  <li
                    key={question}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    {question}
                  </li>
                ))}
              </ul>
            </div>

            <Card className="border-border/60 bg-card">
              <CardHeader>
                <CardTitle className="text-lg">
                  The careers of tomorrow will reward
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {futureSkills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-teal/20 bg-teal/5 px-4 py-2 text-sm font-medium text-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 leading-relaxed text-muted-foreground">
                  Marga exists to help learners navigate that future with greater
                  clarity, confidence, and self-understanding. Because the best
                  career decisions are not made from pressure — they are made from
                  alignment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden border-0 bg-navy-deep text-white shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal/30 via-transparent to-transparent" />
            <CardHeader className="relative z-10 max-w-2xl pb-2 text-center md:mx-auto md:pt-12">
              <CardTitle className="text-3xl font-semibold text-white md:text-4xl">
                Ready to start with who you are?
              </CardTitle>
              <CardDescription className="text-base leading-relaxed text-white/80 md:text-lg">
                Take the MARGA assessment and discover your archetypes, domain
                affinities, and exploration pathways — in about 30 minutes.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 flex flex-col items-center gap-4 pb-12">
              <GetStartedButton
                size="lg"
                className="gap-4 rounded-full bg-teal px-8 text-white hover:bg-teal/90"
              >
                Begin your journey
                <MoveRight className="h-4 w-4" />
              </GetStartedButton>
              <Link
                href="/#stages"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                See how Marga meets you at your life stage →
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
