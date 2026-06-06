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
        <DialogContent className="!rounded-none max-h-[90vh] max-w-md overflow-y-auto border-2 border-black bg-white p-0 shadow-none duration-100 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 [&>button]:top-4 [&>button]:right-4 [&>button]:flex [&>button]:size-9 [&>button]:items-center [&>button]:justify-center [&>button]:!rounded-none [&>button]:border [&>button]:border-black [&>button]:bg-white [&>button]:opacity-100 [&>button]:ring-0 [&>button]:transition-colors [&>button]:duration-100 hover:[&>button]:bg-black hover:[&>button]:text-white [&>button]:focus:ring-0 [&>button]:focus-visible:outline [&>button]:focus-visible:outline-2 [&>button]:focus-visible:outline-black">
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
