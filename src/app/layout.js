import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Taskly",
  description: "A distraction-free task management tool.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        {children}
        <Footer />
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
