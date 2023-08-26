import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Provider from "@/redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nesmaspoint",
  description: "Sell and buy everything by advertising",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#ebf2f7] `}>
        <Provider>
          <Header />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
