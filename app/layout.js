import NavBar from "@/components/NavBar";
import "./styles/globals.css";
import { InvoiceProvider } from "@/context/InvoiceContext";
import dynamic from "next/dynamic";

export const metadata = {
  title: {
    template: "%s | My Invoice App",
    default: "My Invoice App",
  },
  openGraph: {
    description: "Made by Thu Smiley @Naughty Cat",
    url: "https://my-invoice-app.vercel.app/",
    siteName: "My Invoice App",
    images: [],
    locale: "en_US",
    type: "website",
  },
  keywords: ["Next.js", "React", "JavaScript", "Tailwind", 'SASS'],
  authors: [
    { name: "Thu Smiley @Naughty Cat", url: "https://thusmiley.com/" },
    { name: "Brenden Gerber", url: "https://blgerber.com/" },
  ],
};

const DynamicHeader = dynamic(() => import("@/components/NavBar"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg" href="/logo.svg" />
        <meta property="og:image" content="/preview.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <InvoiceProvider>
          <DynamicHeader />
          {children}
        </InvoiceProvider>
      </body>
    </html>
  );
}
