import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MVP-PoloIt",
  description: "Squad-7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex w-full">
          <div className="h-screen lg:w-64 fixed">
            <Sidebar />
          </div>
          <main className="flex flex-col h-screen w-full lg:pl-64">
            {children}
            <div className="pb-10">
              <Footer />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}