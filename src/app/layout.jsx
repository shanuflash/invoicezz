import "../styles/globals.css";
import styles from "../styles/page.module.css";
import { Inter } from "next/font/google";
import Nav from "../components/nav";
import DataProvider from "@/context/dataProvider";
import SupabaseProvider from "./supabase-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bill Generator",
  description: "Generate bills for your business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.body}`}>
        <SupabaseProvider>
          <DataProvider>
            <Nav />
            <div className={styles.content}>{children}</div>
          </DataProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
