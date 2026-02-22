import { supabase } from "@/app/supabase";
import Add from "./add";
import Buttons from "./buttons";
import Price from "./price";
import { Package } from "lucide-react";

export const revalidate = 0;

const Dashboard = async () => {
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching inventory:", error);
  }

  const items = data || [];

  const totalValue = items.reduce((sum, item) => sum + (item.price * item.stock), 0);
  const lowStockItems = items.filter(item => item.stock <= 5).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900">Inventory</h1>
        <Add />
      </div>

      <div className="flex items-center gap-6 text-sm">
        <div>
          <span className="text-zinc-500">Products </span>
          <span className="font-medium text-zinc-900">{items.length}</span>
        </div>
        <div>
          <span className="text-zinc-500">Value </span>
          <span className="font-medium text-zinc-900">₹{totalValue.toLocaleString('en-IN')}</span>
        </div>
        {lowStockItems > 0 && (
          <div>
            <span className="text-zinc-500">Low stock </span>
            <span className="font-medium text-amber-600">{lowStockItems}</span>
          </div>
        )}
      </div>

      <div className="card">
        {items.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <Package className="w-8 h-8 text-zinc-300 mx-auto mb-3" />
            <p className="text-sm text-zinc-500 mb-4">No items in inventory yet.</p>
            <Add />
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {items.map((item, index) => (
              <div className="px-5 py-3 hover:bg-zinc-50/60 transition-colors" key={item.id}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-zinc-900">{item?.name}</span>
                      <span className={`badge ${
                        item?.stock > 10
                          ? 'badge-success'
                          : item?.stock > 0
                          ? 'badge-warning'
                          : 'badge-danger'
                      }`}>
                        {item?.stock > 0 ? `${item?.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <span>₹{item?.price?.toLocaleString('en-IN')}</span>
                      <span className="text-zinc-300">/</span>
                      <span>₹{(item?.price * item?.stock)?.toLocaleString('en-IN')} total value</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Price price={item?.price} id={item?.id} />
                    <Buttons itemdata={items[index]} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
