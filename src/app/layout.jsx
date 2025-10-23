import "../styles/globals.css";
import Sidebar from "../components/sidebar";
import Providers from "@/redux/provider";

export const metadata = {
  title: "Invoicezz - Professional Invoice Management",
  description: "Modern invoice generator and inventory management system with beautiful UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <Providers>
        <body className="h-full">
          <div className="flex h-screen bg-gray-50/50">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden">
              <header className="bg-white border-b border-gray-100 px-8 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
                    <p className="text-sm text-gray-500">Manage your business efficiently</p>
                  </div>
                </div>
              </header>
              
              <div className="flex-1 overflow-y-auto">
                <div className="p-8 animate-fade-in">
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
