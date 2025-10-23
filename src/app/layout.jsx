import "../styles/globals.css";
import Sidebar from "../components/sidebar";
import Providers from "@/redux/provider";

export const metadata = {
  title: "Invoicezz",
  description: "Professional invoice generator and inventory management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
              {children}
            </main>
          </div>
        </body>
      </Providers>
    </html>
  );
}
