import "../styles/globals.css";
import styles from "../styles/page.module.css";
import Nav from "../components/nav";

import { Inter } from "next/font/google";
import Providers from "@/redux/provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "Invoice Generator",
  description: "Generate invoices and manage inventory for your business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className} ${styles.body}`}>
          <Nav />
          <div className={styles.content}>{children}</div>
        </body>
      </Providers>
    </html>
  );
}
