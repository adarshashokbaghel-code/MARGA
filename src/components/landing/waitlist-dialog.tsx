"use client";

import { CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inputClass =
  "h-9 rounded-sm border-neutral-300/90 bg-neutral-50/80 text-sm text-neutral-950 placeholder:text-neutral-400 focus-visible:border-cyan-500/60 focus-visible:ring-1 focus-visible:ring-cyan-500/30";

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  function resetForm() {
    setFormState("idle");
    setName("");
    setPhone("");
    setError(null);
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      window.setTimeout(resetForm, 300);
    }
    onOpenChange(next);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim().replace(/\s/g, "");

    if (!trimmedName) {
      setError("Enter your name.");
      return;
    }
    if (!trimmedPhone || trimmedPhone.length < 8) {
      setError("Enter a valid phone number.");
      return;
    }

    setFormState("submitting");
    window.setTimeout(() => {
      setFormState("success");
    }, 600);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "max-w-[400px] gap-0 overflow-hidden rounded-sm border border-neutral-200/90 bg-white p-0 shadow-[0_28px_70px_rgba(0,0,0,0.35)] sm:max-w-[420px]",
          "[&>button.absolute]:top-2.5 [&>button.absolute]:right-2.5 [&>button.absolute]:z-10 [&>button.absolute]:flex [&>button.absolute]:h-7 [&>button.absolute]:w-7 [&>button.absolute]:items-center [&>button.absolute]:justify-center [&>button.absolute]:rounded-sm [&>button.absolute]:border [&>button.absolute]:border-neutral-200 [&>button.absolute]:bg-neutral-50 [&>button.absolute]:text-neutral-800 [&>button.absolute]:opacity-100 [&>button.absolute]:hover:border-cyan-500/40 [&>button.absolute]:hover:bg-cyan-50/50",
          "[&>button.absolute>svg]:h-3.5 [&>button.absolute>svg]:w-3.5",
        )}
      >
        <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-orange-500" />
        <div className="px-5 pt-5 pr-11 pb-5">
          <DialogTitle className="sr-only">Waitlist signup</DialogTitle>
          <DialogDescription className="sr-only">
            Sign up for early access.
          </DialogDescription>

          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-1 text-center"
              >
                <CheckCircle2
                  className="mx-auto h-9 w-9 text-cyan-600"
                  strokeWidth={1.5}
                />
                <p className="mt-3 text-base font-semibold tracking-tight text-neutral-950">
                  You&apos;re in
                  {name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  We&apos;ll text you when early access opens.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 h-9 w-full rounded-sm border-neutral-300 text-sm font-medium text-white hover:border-cyan-500/50 hover:bg-cyan-50/40"
                  onClick={() => handleOpenChange(false)}
                >
                  Got it!
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-[10px] font-semibold tracking-[0.14em] text-cyan-600 uppercase">
                  Waitlist
                </p>
                <h2 className="mt-1 text-[1.25rem] font-semibold tracking-[-0.03em] text-neutral-950">
                  Early access
                </h2>
                <p className="mt-1 text-xs leading-snug text-neutral-500">
                  Leave your details — we&apos;ll notify you at launch.
                </p>

                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <div className="space-y-1">
                    <Label
                      htmlFor="waitlist-name"
                      className="text-[11px] font-medium tracking-wide text-neutral-600 uppercase"
                    >
                      Name
                    </Label>
                    <Input
                      id="waitlist-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={formState === "submitting"}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="waitlist-phone"
                      className="text-[11px] font-medium tracking-wide text-neutral-600 uppercase"
                    >
                      Phone
                    </Label>
                    <Input
                      id="waitlist-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 00000 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={formState === "submitting"}
                      className={inputClass}
                    />
                  </div>
                  {error && (
                    <p className="text-[11px] text-orange-600" role="alert">
                      {error}
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="mt-0.5 h-9 w-full rounded-sm bg-gradient-to-r from-cyan-600 to-cyan-500 text-sm font-semibold tracking-tight text-white shadow-sm hover:from-cyan-500 hover:to-orange-500 disabled:opacity-60"
                  >
                    {formState === "submitting" ? "Joining…" : "Join waitlist"}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
