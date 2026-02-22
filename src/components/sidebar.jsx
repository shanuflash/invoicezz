"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Package, History } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Create Invoice", icon: FileText },
    { href: "/dashboard", label: "Inventory", icon: Package },
    { href: "/history", label: "History", icon: History },
  ];

  if (pathname === "/login") {
    return null;
  }

  return (
    <aside className="w-56 bg-white border-r border-zinc-200 flex-shrink-0 flex flex-col h-screen">
      <div className="px-5 py-5 border-b border-zinc-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-semibold text-zinc-900">Invoicezz</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors duration-100 ${
                isActive
                  ? "bg-zinc-100 text-zinc-900 font-medium"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-zinc-900" : "text-zinc-400"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-zinc-200">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-7 h-7 bg-zinc-200 rounded-full flex items-center justify-center">
            <span className="text-zinc-600 text-xs font-medium">A</span>
          </div>
          <div className="text-sm text-zinc-600">Admin</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
