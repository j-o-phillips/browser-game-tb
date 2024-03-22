import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { UserProvider } from "@/context/UserContext";
import { SessionProvider } from "next-auth/react";
import LogoutButton from "@/components/navbar/LogoutButton";
import { GlobalProvider } from "@/context/GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalProvider>
        <UserProvider>
          <body className={inter.className}>
            <LogoutButton />
            <div>{children}</div>
          </body>
        </UserProvider>
      </GlobalProvider>
    </html>
  );
}
