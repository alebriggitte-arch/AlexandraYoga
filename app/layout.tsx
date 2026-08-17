import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const protocol = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og-warm.png`;
  const title = "Alexandra Huaman — Danza, circo e movimento";
  const description = "Artista performativa peruviana con base a Roma: danza, circo, movimento, formazione e progetti internazionali.";
  return { title, description, openGraph: { title, description, images: [{ url: image, width: 1729, height: 910, alt: "Alexandra Huaman — danza, circo e movimento" }] }, twitter: { card: "summary_large_image", title, description, images: [image] } };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
