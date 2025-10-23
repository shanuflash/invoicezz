import { supabase } from "@/app/supabase";
import Add from "./add";
import Buttons from "./buttons";
import Price from "./price";

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

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
        <p className="text-gray-600">Manage your product inventory and stock levels</p>
      </div>

      <div className="flex gap-3 mb-6">
        <Add />
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items in inventory</h3>
          <p className="text-sm">Start by adding items to your inventory.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div className="card p-5 flex items-center justify-between hover:shadow-md transition-shadow" key={item.id}>
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">{item?.name}</div>
                  <div className="text-sm text-gray-500">
                    ID {item?.id}
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900 mr-6">₹{item?.price}</div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 text-xs font-medium rounded uppercase tracking-wide ${
                  item?.stock > 10 
                    ? 'bg-green-100 text-green-700' 
                    : item?.stock > 0 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {item?.stock > 0 ? `${item?.stock} in stock` : 'Out of stock'}
                </span>
                <div className="flex gap-2">
                  <Price price={item?.price} id={item?.id} />
                  <Buttons itemdata={items[index]} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;
