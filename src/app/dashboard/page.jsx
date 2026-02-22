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
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-900">Inventory</h1>
        <div className="flex items-center gap-4 text-[13px] text-zinc-500">
          <span>{items.length} products</span>
          <span className="text-zinc-300">|</span>
          <span>₹{totalValue.toLocaleString('en-IN')} value</span>
          {lowStockItems > 0 && (
            <>
              <span className="text-zinc-300">|</span>
              <span className="text-amber-600">{lowStockItems} low stock</span>
            </>
          )}
        </div>
      </div>

      <div>
        <Add />
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-2.5">Product</th>
              <th className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-2.5">Status</th>
              <th className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-2.5">Value</th>
              <th className="text-right text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-2.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-14 text-center">
                  <Package className="w-7 h-7 text-zinc-300 mx-auto mb-2" />
                  <p className="text-sm text-zinc-400 mb-3">No items in inventory.</p>
                  <Add />
                </td>
              </tr>
            ) : items.map((item, index) => (
              <tr className="hover:bg-zinc-50/50 transition-colors" key={item.id}>
                <td className="px-5 py-3">
                  <div className="text-[13px] font-medium text-zinc-900">{item?.name}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">ID: {item?.id}</div>
                </td>
                <td className="px-5 py-3">
                  <span className={`badge ${
                    item?.stock > 10
                      ? 'badge-success'
                      : item?.stock > 0
                      ? 'badge-warning'
                      : 'badge-danger'
                  }`}>
                    {item?.stock > 10 ? 'In stock' : item?.stock > 0 ? 'Low stock' : 'Out of stock'}
                  </span>
                </td>
                <td className="px-5 py-3 text-[13px] text-zinc-600">
                  ₹{(item?.price * item?.stock)?.toLocaleString('en-IN')}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Price price={item?.price} id={item?.id} />
                    <Buttons itemdata={items[index]} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
