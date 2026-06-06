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
  title: "Marga.me — Know yourself. Choose your path.",
  description:
    "Deep career self-knowledge for every person, everywhere. Psychometric science, skill assessment, and psychological profiling in one honest portrait of who you are.",
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
