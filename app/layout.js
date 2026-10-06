import "./globals.css";
import WhatsAppFab from "../components/WhatsAppFab";

export const metadata = {
  title: "CICO — Centro Immagine e Comunicazione per l'Ospitalità",
  description:
    "Fotografia, video e contenuti social per hotel, host e progetti di architettura in Sicilia e oltre.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/oep4mbq.css" />
      </head>
      <body>
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
