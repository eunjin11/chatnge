import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const notoSansKr = localFont({
  src: "../public/NotoSansKR-VariableFont_wght.ttf",
  display: "swap",
  weight: "45 920",
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansKr.variable} h-screen max-w-md mx-auto`}>
        {children}
      </body>
    </html>
  );
}
