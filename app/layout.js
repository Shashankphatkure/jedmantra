import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./components/AuthProvider";

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

export const metadata = {
  title: "JedMantra",
  description: "JedMantra is a job search platform designed specifically for students and recent graduates, offering personalized job matches, career resources, and networking opportunities.",
};

export default function RootLayout({ children }) {
  // Add client-side script to handle reload parameter
  const reloadScript = `
    (function() {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('reload')) {
        // Remove the reload parameter to avoid infinite reloads
        urlParams.delete('reload');
        const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
        window.history.replaceState({}, document.title, newUrl);
      }
    })();
  `;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          {children}
          <Footer />
          <Toaster position="top-center" />
        </AuthProvider>
        <script dangerouslySetInnerHTML={{ __html: reloadScript }} />
      </body>
    </html>
  );
}
