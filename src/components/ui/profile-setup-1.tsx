"use client";

import { useState } from "react";

import { MargaLogo } from "@/components/brand/marga-logo";
import type { UserProfile } from "@/lib/auth-mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  margaGhostLinkStyles,
  margaInputFocusStyles,
  margaPrimaryButtonStyles,
} from "@/lib/brand-styles";
import { cn } from "@/lib/utils";

const LIFE_STAGES = [
  { value: "mirror", label: "Grades 8–10 (13–16) — Identity discovery" },
  { value: "mindset", label: "Grades 11–12 (16–18) — Direction & decisions" },
  { value: "motion", label: "College / early graduate (18–24)" },
  { value: "meaning", label: "Working professional (24+)" },
];

const primaryButtonStyles = margaPrimaryButtonStyles;
const ghostLinkStyles = margaGhostLinkStyles;
const inputStyles = cn(
  "!rounded-none border-0 border-b-2 border-black bg-transparent px-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#525252] placeholder:italic",
  margaInputFocusStyles,
);
const selectStyles = cn(
  "flex h-10 w-full !rounded-none border-0 border-b-2 border-black bg-transparent px-0 text-sm shadow-none ring-0 focus-visible:outline-none focus-visible:ring-0",
  margaInputFocusStyles,
);

const labelStyles = "font-label text-[10px] uppercase tracking-widest text-[#525252]";

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
    <form onSubmit={handleSubmit} className="w-full bg-white text-black">
      <div className="p-8">
        <MargaLogo variant="monochrome" />

        <p className={cn(labelStyles, "mt-8 w-fit border border-black px-3 py-1.5")}>
          Profile setup
        </p>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-1 w-16 bg-black" />
          <div className="size-2.5 border-2 border-black" />
        </div>

        <h2 className="mt-6 font-display text-2xl leading-tight tracking-tight md:text-3xl">
          One last step
        </h2>
        <p className="mt-3 font-serif text-sm leading-relaxed text-[#525252] md:text-base">
          This appears only once when you sign up. Returning logins go straight
          to your assessment — no profile form again.
        </p>

        {error && (
          <p className="mt-5 border-l-4 border-black py-1 pl-4 font-serif text-sm text-black">
            {error}
          </p>
        )}

        <div className="mt-6 space-y-5">
          <Field label="Full name" id="profile-name" required>
            <Input
              id="profile-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Adarsh Singh"
              required
              className={inputStyles}
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
              className={cn(inputStyles, defaultEmail && "text-[#525252]")}
            />
          </Field>

          <Field label="Phone" id="profile-phone">
            <Input
              id="profile-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className={inputStyles}
            />
          </Field>

          <Field label="Date of birth" id="profile-dob">
            <Input
              id="profile-dob"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className={inputStyles}
            />
          </Field>

          <Field label="Where are you in your journey?" id="profile-stage" required>
            <select
              id="profile-stage"
              value={lifeStage}
              onChange={(e) => setLifeStage(e.target.value)}
              required
              className={selectStyles}
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
              className={inputStyles}
            />
          </Field>

          <Field label="School / college / organisation" id="profile-education">
            <Input
              id="profile-education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Where you study or work"
              className={inputStyles}
            />
          </Field>
        </div>

        <Button type="submit" size="lg" className={cn(primaryButtonStyles, "mt-6 h-12 w-full")}>
          Save & continue to assessment
        </Button>

        {onBack && (
          <button type="button" onClick={onBack} className={cn(ghostLinkStyles, "mt-4 w-full")}>
            Back to sign in
          </button>
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
      <Label htmlFor={id} className={labelStyles}>
        {label}
        {required && <span className="text-black"> *</span>}
      </Label>
      {children}
    </div>
  );
}

export { ProfileSetupForm };
