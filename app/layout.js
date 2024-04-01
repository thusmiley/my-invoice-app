import NavBar from "@/components/NavBar";
import "./styles/globals.css";
import { InvoiceProvider } from "@/context/InvoiceContext";
import NextTopLoader from "nextjs-toploader";

// export const metadata = {
//   description: "Made by Thu Smiley @Naughty Cat",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg" href="/logo.svg" />
        <meta property="og:image" content="/preview.jpg" />
        <title>My Invoice App</title>
        <meta
          name="description"
          content="Made by Thu Smiley @Naughty Cat"
          key="desc"
        />
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
          <NextTopLoader
            color="#7C5DFA"
            initialPosition={0.08}
            crawlSpeed={200}
            height={5}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            // shadow="0 0 10px #7C5DFA,0 0 5px #7C5DFA"
            zIndex={1600}
            showAtBottom={true}
          />
          {children}
        </InvoiceProvider>
      </body>
    </html>
  );
}
