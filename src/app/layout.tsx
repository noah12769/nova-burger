import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOVA BURGER | Smash burgers & sandwiches généreux — Guadeloupe",
  description:
    "Nova Burger Guadeloupe : Des bons burgers smashés, des sandwiches généreux et des frites croustillantes. Peu de choses, mais bien faites & toujours avec le sourire. En livraison.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
