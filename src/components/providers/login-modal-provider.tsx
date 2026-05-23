"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { LoginForm } from "@/components/ui/login-1";
import { ProfileSetupForm } from "@/components/ui/profile-setup-1";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  isProfileComplete,
  resetOnboardingForTesting,
  saveProfile,
  type UserProfile,
} from "@/lib/auth-mock";

type AuthModalStep = "login" | "profile";

interface LoginModalContextValue {
  open: boolean;
  step: AuthModalStep;
  openLogin: () => void;
  closeLogin: () => void;
  /** UI testing: clear stored profile so Google sign-in shows onboarding again */
  resetSignupPreview: () => void;
}

const LoginModalContext = createContext<LoginModalContextValue | null>(null);

const MOCK_GOOGLE_EMAIL = "you@gmail.com";

function LoginModalProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<AuthModalStep>("login");
  const [pendingEmail, setPendingEmail] = useState(MOCK_GOOGLE_EMAIL);

  const closeLogin = useCallback(() => {
    setOpen(false);
    setStep("login");
  }, []);

  const openLogin = useCallback(() => {
    setStep("login");
    setOpen(true);
  }, []);

  const resetSignupPreview = useCallback(() => {
    resetOnboardingForTesting();
    setStep("login");
  }, []);

  const handleGoogleSignIn = useCallback(() => {
    setPendingEmail(MOCK_GOOGLE_EMAIL);
    if (isProfileComplete()) {
      closeLogin();
      router.push("/assessment");
      return;
    }
    setStep("profile");
  }, [closeLogin, router]);

  const handleProfileComplete = useCallback(
    (profile: UserProfile) => {
      saveProfile(profile);
      closeLogin();
      router.push("/assessment");
    },
    [closeLogin, router],
  );

  const handleSkip = useCallback(() => {
    saveProfile({
      fullName: "Guest",
      email: "guest@marga.me",
      phone: "",
      dateOfBirth: "",
      lifeStage: "mirror",
      city: "",
      education: "",
    });
    closeLogin();
    router.push("/assessment");
  }, [closeLogin, router]);

  const handleDialogChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setStep("login");
    }
  }, []);

  const value = useMemo(
    () => ({
      open,
      step,
      openLogin,
      closeLogin,
      resetSignupPreview,
    }),
    [open, step, openLogin, closeLogin, resetSignupPreview],
  );

  return (
    <LoginModalContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto border-border p-0 sm:rounded-xl">
          {step === "login" ? (
            <LoginForm
              onGoogleSignIn={handleGoogleSignIn}
              onResetSignupPreview={resetSignupPreview}
              onSkip={handleSkip}
            />
          ) : (
            <ProfileSetupForm
              defaultEmail={pendingEmail}
              onComplete={handleProfileComplete}
              onBack={() => setStep("login")}
            />
          )}
        </DialogContent>
      </Dialog>
    </LoginModalContext.Provider>
  );
}

function useLoginModal() {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error("useLoginModal must be used within LoginModalProvider");
  }
  return context;
}

export { LoginModalProvider, useLoginModal };
