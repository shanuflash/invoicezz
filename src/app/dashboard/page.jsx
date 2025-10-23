import { supabase } from "@/app/supabase";
import Add from "./add";
import Buttons from "./buttons";
import Price from "./price";
import { Package, TrendingUp, AlertTriangle, Plus } from "lucide-react";

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
  
  // Calculate stats
  const totalItems = items.length;
  const totalValue = items.reduce((sum, item) => sum + (item.price * item.stock), 0);
  const lowStockItems = items.filter(item => item.stock <= 5).length;
  const outOfStockItems = items.filter(item => item.stock === 0).length;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Inventory Management</h1>
          <p className="text-gray-600">Manage your product inventory and stock levels efficiently</p>
        </div>
        <Add />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="badge badge-info">Total</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-gray-900">{totalItems}</div>
            <div className="text-sm text-gray-500">Total Products</div>
          </div>
        </div>

        <div className="card p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="badge badge-success">Value</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-gray-900">₹{totalValue.toLocaleString('en-IN')}</div>
            <div className="text-sm text-gray-500">Inventory Value</div>
          </div>
        </div>

        <div className="card p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <span className="badge badge-warning">Low Stock</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-gray-900">{lowStockItems}</div>
            <div className="text-sm text-gray-500">Items Low Stock</div>
          </div>
        </div>

        <div className="card p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="badge badge-danger">Out of Stock</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-gray-900">{outOfStockItems}</div>
            <div className="text-sm text-gray-500">Out of Stock</div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Product Inventory</h2>
              <p className="text-sm text-gray-500 mt-1">Manage and track your product stock levels</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </div>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items in inventory</h3>
            <p className="text-gray-500 mb-6">Start by adding your first product to the inventory.</p>
            <Add />
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((item, index) => (
              <div className="p-6 hover:bg-gray-50/50 transition-colors animate-slide-up" key={item.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-sky-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{item?.name}</h3>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                          ID: {item?.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Price: ₹{item?.price?.toLocaleString('en-IN')}</span>
                        <span>•</span>
                        <span>Stock: {item?.stock} units</span>
                        <span>•</span>
                        <span>Value: ₹{(item?.price * item?.stock)?.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`badge ${
                      item?.stock > 10 
                        ? 'badge-success' 
                        : item?.stock > 0 
                        ? 'badge-warning' 
                        : 'badge-danger'
                    }`}>
                      {item?.stock > 0 ? `${item?.stock} in stock` : 'Out of stock'}
                    </span>
                    <div className="flex items-center gap-2">
                      <Price price={item?.price} id={item?.id} />
                      <Buttons itemdata={items[index]} />
                    </div>
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
