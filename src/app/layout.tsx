import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";

import { LoginModalProvider } from "@/components/providers/login-modal-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Marga.me — Join the waitlist",
  description:
    "Know yourself. Choose your path. Join the Marga waitlist for early access to deep career self-knowledge — psychometric science, skill assessment, and psychological profiling for everyone.",
  icons: {
    icon: "/icon-navy.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LoginModalProvider>{children}</LoginModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
