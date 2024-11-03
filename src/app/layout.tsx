import WalletContext from "@/contexts/walletContext";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: 'super user',
  description: "Track your activities on solana superteam"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WalletContext>
          {children}
        </WalletContext>
      </body>
    </html>
  );
}
