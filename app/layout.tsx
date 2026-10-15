import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jewelry | Hyper Inkers",
  description: "Get the look: jewelry worn by Hyper Inkers clients.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <header className="border-b border-cream/10">
          <div className="mx-auto flex h-14 w-full max-w-6xl items-center px-4">
            <a href="https://hyperinkers.com" aria-label="Hyper Inkers home">
              <Image
                src="/hyperinkers-logo.png"
                alt="Hyper Inkers"
                width={1024}
                height={192}
                priority
                className="h-6 w-auto"
              />
            </a>
          </div>
        </header>
        {children}
        {modal}
      </body>
    </html>
  );
}
