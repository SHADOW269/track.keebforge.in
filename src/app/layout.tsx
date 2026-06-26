import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
 
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--ff-d",
});
 
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--ff-b",
});

export const metadata: Metadata = {
  title: {
    default: "KeebForge Order Tracking",
    template: "%s | KeebForge",
  },
  description:
    "Track your custom mechanical keyboard order, monitor build progress, shipping updates, and warranty status with KeebForge.",
  applicationName: "KeebForge Order Tracking",
  keywords: [
    "KeebForge",
    "Mechanical Keyboard",
    "Keyboard Build",
    "Order Tracking",
    "Custom Keyboard",
    "Keyboard Modding",
    "India",
  ],
  authors: [{ name: "KeebForge" }],
  creator: "KeebForge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
