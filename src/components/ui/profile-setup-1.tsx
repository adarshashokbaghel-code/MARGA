"use client";

import { useState } from "react";

import { MargaLogo } from "@/components/brand/marga-logo";
import type { UserProfile } from "@/lib/auth-mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const LIFE_STAGES = [
  { value: "mirror", label: "Grades 8–10 (13–16) — Identity discovery" },
  { value: "mindset", label: "Grades 11–12 (16–18) — Direction & decisions" },
  { value: "motion", label: "College / early graduate (18–24)" },
  { value: "meaning", label: "Working professional (24+)" },
];

interface ProfileSetupFormProps {
  defaultEmail?: string;
  onComplete: (profile: UserProfile) => void;
  onBack?: () => void;
}

function ProfileSetupForm({
  defaultEmail = "",
  onComplete,
  onBack,
}: ProfileSetupFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [lifeStage, setLifeStage] = useState("");
  const [city, setCity] = useState("");
  const [education, setEducation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !lifeStage) {
      setError("Please fill in name, email, and life stage.");
      return;
    }
    setError("");
    onComplete({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dateOfBirth,
      lifeStage,
      city: city.trim(),
      education: education.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="font-montserrat w-full rounded-lg border-0 bg-card shadow-none"
    >
      <div className="p-8">
        <MargaLogo />
        <h2 className="mt-6 text-2xl leading-snug font-semibold text-pretty">
          <span className="block text-muted-foreground">One last step</span>
          Tell us about you
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          This appears only once when you sign up. Returning logins go straight
          to your assessment — no profile form again.
        </p>

        {error && (
          <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-6 space-y-4">
          <Field label="Full name" id="profile-name" required>
            <Input
              id="profile-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Adarsh Singh"
              required
              className="border-input ring-1 ring-foreground/15"
            />
          </Field>

          <Field label="Email" id="profile-email" required>
            <Input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              readOnly={Boolean(defaultEmail)}
              className={cn(
                "border-input ring-1 ring-foreground/15",
                defaultEmail && "bg-muted/50",
              )}
            />
          </Field>

          <Field label="Phone" id="profile-phone">
            <Input
              id="profile-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="border-input ring-1 ring-foreground/15"
            />
          </Field>

          <Field label="Date of birth" id="profile-dob">
            <Input
              id="profile-dob"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="border-input ring-1 ring-foreground/15"
            />
          </Field>

          <Field label="Where are you in your journey?" id="profile-stage" required>
            <select
              id="profile-stage"
              value={lifeStage}
              onChange={(e) => setLifeStage(e.target.value)}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-1 ring-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="" disabled>
                Select your life stage
              </option>
              {LIFE_STAGES.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="City" id="profile-city">
            <Input
              id="profile-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Mumbai, India"
              className="border-input ring-1 ring-foreground/15"
            />
          </Field>

          <Field label="School / college / organisation" id="profile-education">
            <Input
              id="profile-education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Where you study or work"
              className="border-input ring-1 ring-foreground/15"
            />
          </Field>
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-6 w-full bg-teal font-montserrat text-white hover:bg-teal/90"
        >
          Save & continue to assessment
        </Button>

        {onBack && (
          <Button
            type="button"
            variant="ghost"
            className="mt-2 w-full"
            onClick={onBack}
          >
            Back to sign in
          </Button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-teal"> *</span>}
      </Label>
      {children}
    </div>
  );
}

export { ProfileSetupForm };
