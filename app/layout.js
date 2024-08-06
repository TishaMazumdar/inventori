import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Navigation";
import PantryContextProvider from "@/lib/store/pantry-context";
import AuthContextProvider from "@/lib/store/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "inventori",
  description: "Created by Tisha Mazumdar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <PantryContextProvider>
            <Nav />{children}
          </PantryContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
