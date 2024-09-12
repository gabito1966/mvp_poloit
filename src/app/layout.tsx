import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";


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
      <body className={`${inter.className}`}>
            <Sidebar />
          <main className="flex flex-col h-full w-full lg:pl-60 max-lg:ml-10  items-center justify-center">
            {children}       
          </main>
              <Footer />
      </body>
    </html>
  );
}