import "./globals.css";
import { Inter } from "next/font/google";
import AppCtxProvider from "@/app-context/AppContext";
import Provider from "@/redux/Provider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
          <AppCtxProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </AppCtxProvider>
        </Provider>
      </body>
    </html>
  );
}
