"use client";

import Link from "next/link";

import { MargaLogo } from "@/components/brand/marga-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
  onGoogleSignIn?: () => void;
  onResetSignupPreview?: () => void;
  onSkip?: () => void;
}

function LoginForm({ onGoogleSignIn, onResetSignupPreview, onSkip }: LoginFormProps) {
  const handleGoogle = () => {
    onGoogleSignIn?.();
  };

  return (
    <form
      action="#"
      onSubmit={(e) => e.preventDefault()}
      className="font-montserrat w-full rounded-lg border-0 bg-card shadow-none"
    >
      <div className="p-8">
        <div>
          <Link href="/" aria-label="Go home" className="inline-block">
            <MargaLogo />
          </Link>
          <h2 className="mt-6 text-2xl leading-snug font-semibold text-pretty">
            <span className="block text-muted-foreground">
              Welcome back to Marga
            </span>
            Sign in to continue your assessment
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            New users complete a one-time profile after Google sign-in.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="flex w-full items-center gap-3"
            onClick={handleGoogle}
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="flex w-full items-center gap-3"
            disabled
            title="Coming soon"
          >
            <FacebookIcon />
            <span>Continue with Facebook</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="flex w-full items-center gap-3"
            disabled
            title="Coming soon"
          >
            <MicrosoftIcon />
            <span>Continue with Microsoft</span>
          </Button>
        </div>

        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-border" />
          <span className="px-3 text-sm text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              type="email"
              required
              name="email"
              id="login-email"
              placeholder="you@example.com"
              className="border-input ring-1 ring-foreground/15"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-teal font-montserrat text-white hover:bg-teal/90"
            size="lg"
          >
            Continue
          </Button>
        </div>

        {onResetSignupPreview && (
          <button
            type="button"
            onClick={onResetSignupPreview}
            className="mt-4 w-full text-center text-xs text-muted-foreground underline-offset-2 hover:text-teal hover:underline"
          >
            UI preview: reset first-time signup
          </button>
        )}

        {onSkip && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-2 w-full text-muted-foreground"
            onClick={onSkip}
          >
            Skip for now — start assessment
          </Button>
        )}
      </div>

      <div className="border-t border-border px-8 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Button asChild variant="link" size="sm" className="h-auto px-1">
            <Link href="#">Create one</Link>
          </Button>
        </p>
      </div>
    </form>
  );
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 shrink-0"
      viewBox="0 0 256 262"
      aria-hidden
    >
      <path
        fill="#4285f4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      />
      <path
        fill="#34a853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      />
      <path
        fill="#fbbc05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
      />
      <path
        fill="#eb4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 shrink-0"
      viewBox="0 0 256 256"
      aria-hidden
    >
      <path
        fill="#1877f2"
        d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
      />
      <path
        fill="#fff"
        d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
      />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 shrink-0"
      viewBox="0 0 256 256"
      aria-hidden
    >
      <path fill="#f1511b" d="M121.666 121.666H0V0h121.666z" />
      <path fill="#80cc28" d="M256 121.666H134.335V0H256z" />
      <path fill="#00adef" d="M121.663 256.002H0V134.336h121.663z" />
      <path fill="#fbbc09" d="M256 256.002H134.335V134.336H256z" />
    </svg>
  );
}

export { LoginForm };
