import NavBar from "@/components/NavBar";
import "./styles/globals.css";
import { InvoiceProvider } from "@/context/InvoiceContext";
export const metadata = {
  description: "Made by Thu Smiley @Naughty Cat",
};

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
          <NavBar />
          {children}
        </InvoiceProvider>
      </body>
    </html>
  );
}
