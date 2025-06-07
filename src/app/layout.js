import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainContainer from "@/components/MainContainer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'FilmFlow - Filmes e Séries',
    template: '%s | FilmFlow'
  },
  description: "FilmFlow: filmes e séries",
  icons: {
    icon: '/filmflow-ico.svg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
          <MainContainer>
          {children}
          </MainContainer>
        
        
      </body>
    </html>
  );
}
