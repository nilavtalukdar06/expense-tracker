import { Outfit } from "next/font/google";
import AuthProvider from "@/utils/AuthProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";

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
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
