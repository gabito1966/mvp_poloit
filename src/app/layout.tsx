import Footer from "@/components/Footer";
import Sidebar from "@/components/SideBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MVP-PoloIt",
  description: "Polo It",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            {children}
            <div className="block absolute bottom-0">
              <Footer />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}