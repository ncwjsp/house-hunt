import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import Footer from "@/app/ui/footer";
import { AuthProvider } from "@/app/Providers";
import AuthLayout from "@/app/AuthLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HouseHunt",
  description: "Real Estate App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AuthLayout>{children}</AuthLayout>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
