import "../styles/globals.css";
import Sidebar from "../components/sidebar";
import Providers from "@/redux/provider";

export const metadata = {
  title: "Invoicezz",
  description: "Invoice generator and inventory management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <Providers>
        <body className="h-full">
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden bg-zinc-50">
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 max-w-5xl">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </body>
      </Providers>
    </html>
  );
}
