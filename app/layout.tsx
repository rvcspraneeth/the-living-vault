import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Living Vault | Fresh Polyhouse Crops",
  description:
    "Fresh spices, herbs, greens, and vegetables grown in a warm protected polyhouse for flavor, color, freshness, and dependable harvest handling.",
};

export const viewport: Viewport = {
  themeColor: "#120b07",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
