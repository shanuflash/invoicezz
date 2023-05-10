import "../styles/globals.css";
import { Inter } from "next/font/google";
import Nav from "../components/nav";
import DataProvider from "@/context/dataProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bill Generator",
  description: "Generate bills for your business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
          <Nav />
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
