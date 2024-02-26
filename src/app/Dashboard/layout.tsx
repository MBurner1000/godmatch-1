import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidenav from "../ui/sidenav";
import Header from "../ui/dashboard-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meet New People",
  description: "GodMatch is a place to find others online and connect in person.",
  icons: {
    icon: "../favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Desktop layout */}
        <div className="hidden md:flex h-screen">
          <div className="w-full flex-none md:w-64">
            <Sidenav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden">
          <Header />
          <div className="p-6">{children}</div>
        </div>
      </body>
    </html>
  );
}