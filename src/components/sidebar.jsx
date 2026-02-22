"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Package, History, Lock } from "lucide-react";

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
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-zinc-900 rounded flex items-center justify-center">
            <FileText className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[15px] font-semibold text-zinc-900 tracking-tight">Invoicezz</span>
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
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-colors duration-100 ${
                isActive
                  ? "bg-zinc-900 text-white font-medium"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-zinc-300" : "text-zinc-400"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-3">
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-md bg-zinc-50 border border-zinc-100">
          <Lock className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] leading-relaxed text-zinc-500">
            Auth disabled for demo. All features are publicly accessible.
          </p>
        </div>
      </div>

      <div className="px-3 py-3 border-t border-zinc-200">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center">
            <span className="text-white text-[10px] font-medium">A</span>
          </div>
          <span className="text-[13px] text-zinc-600">Admin</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
