"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FileText, 
  Package, 
  History, 
  BarChart3, 
  Settings, 
  User,
  Sparkles,
  TrendingUp
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { 
      href: "/", 
      label: "Create Invoice", 
      icon: FileText,
      description: "Generate new invoices"
    },
    { 
      href: "/dashboard", 
      label: "Inventory", 
      icon: Package,
      description: "Manage your products"
    },
    { 
      href: "/history", 
      label: "Invoice History", 
      icon: History,
      description: "View past invoices"
    },
    { 
      href: "/analytics", 
      label: "Analytics", 
      icon: BarChart3,
      description: "Business insights"
    },
  ];

  const bottomNavItems = [
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/profile", label: "Profile", icon: User },
  ];

  if (pathname === "/login") {
    return null;
  }

  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col h-screen">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform">
              Invoicezz
            </h1>
            <p className="text-xs text-gray-500 font-medium">Invoice Management</p>
          </div>
        </Link>
      </div>


      <nav className="flex-1 px-6 space-y-2 pt-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-sky-500 to-cyan-600 text-white shadow-lg" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className={`text-xs ${isActive ? 'text-sky-100' : 'text-gray-400'}`}>
                  {item.description}
                </div>
              </div>
              {isActive && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>


      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">A</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">Admin</div>
            <div className="text-xs text-gray-500">admin@shanu.dev</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
