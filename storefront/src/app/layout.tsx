import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Inter, Oswald } from "next/font/google"
import "styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "Strikerz. | Maillots Premium Football & Basketball",
  description:
    "Boutique en ligne de maillots de football et basketball. Équipez-vous aux couleurs de vos équipes préférées.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-mode="light">
      <body className={`${inter.variable} ${oswald.variable} font-sans`}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
