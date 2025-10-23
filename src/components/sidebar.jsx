"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Invoice", icon: "📄" },
    { href: "/dashboard", label: "Inventory", icon: "📦" },
    { href: "/history", label: "History", icon: "📊" },
  ];

  if (pathname === "/login") {
    return null;
  }

  return (
    <aside className="w-56 bg-white border-r border-gray-200 p-6 flex-shrink-0">
      <Link href="/" className="text-xl font-bold text-gray-900 mb-8 block">
        Invoicezz
      </Link>
      
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === item.href 
                ? "bg-gray-100 text-gray-900" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
