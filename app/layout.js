import { Outfit } from "next/font/google";
import AuthProvider from "@/utils/AuthProvider";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "Expensify",
  description: "Create and Manage your Expenses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
