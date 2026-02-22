"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { empty, change } from "@/redux/formSlice";

function Details() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const router = useRouter();

  const handleNext = (e) => {
    e.preventDefault();
    router.push("/preview");
  };

  const fillSampleData = () => {
    const sampleData = {
      date: new Date().toISOString().split('T')[0],
      paymed: "Credit Card",
      customer_name: "John Smith",
      tax_id: "VAT123456789",
      billing_address: "123 Business Street\nNew York, NY 10001\nUnited States",
      shipping_address: "456 Delivery Avenue\nNew York, NY 10002\nUnited States",
      shipping_contact: "Jane Doe",
      payref: "TXN-2024-001234",
      shipping_method: "Express Shipping"
    };

    Object.entries(sampleData).forEach(([key, value]) => {
      dispatch(change({ name: key, value }));
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-900">Invoice Details</h1>
        <button
          type="button"
          className="btn btn-secondary text-[13px]"
          onClick={fillSampleData}
        >
          Fill Sample Data
        </button>
      </div>

      <form onSubmit={handleNext} className="max-w-3xl">
        <div className="card overflow-hidden">
          <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-2.5">
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Customer & Payment</span>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Invoice Date</label>
                <input
                  className="input w-full text-[13px]"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    dispatch(change({ name: "date", value: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Payment Method</label>
                <select
                  className="input w-full text-[13px]"
                  value={formData.paymed}
                  onChange={(e) =>
                    dispatch(change({ name: "paymed", value: e.target.value }))
                  }
                  required
                >
                  <option value="">Select method</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Check">Check</option>
                  <option value="Digital Payment">Digital Payment</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Customer Name</label>
                <input
                  className="input w-full text-[13px]"
                  type="text"
                  placeholder="Customer name"
                  value={formData.customer_name}
                  onChange={(e) =>
                    dispatch(change({ name: "customer_name", value: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Tax ID</label>
                <input
                  className="input w-full text-[13px]"
                  type="text"
                  placeholder="VAT/Tax ID"
                  value={formData.tax_id}
                  onChange={(e) =>
                    dispatch(change({ name: "tax_id", value: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Payment Reference</label>
                <input
                  className="input w-full text-[13px]"
                  type="text"
                  placeholder="Transaction ID, check no., etc."
                  value={formData.payref}
                  onChange={(e) =>
                    dispatch(change({ name: "payref", value: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Shipping Method</label>
                <input
                  className="input w-full text-[13px]"
                  type="text"
                  placeholder="Standard, Express, Pickup, etc."
                  value={formData.shipping_method}
                  onChange={(e) =>
                    dispatch(change({ name: "shipping_method", value: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="border-t border-b border-zinc-200 bg-zinc-50 px-5 py-2.5">
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Addresses</span>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Billing Address</label>
                <textarea
                  className="input w-full h-28 resize-none text-[13px]"
                  placeholder="Billing address"
                  value={formData.billing_address}
                  onChange={(e) =>
                    dispatch(change({ name: "billing_address", value: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Shipping Address</label>
                <textarea
                  className="input w-full h-28 resize-none text-[13px]"
                  placeholder="Same as billing if empty"
                  value={formData.shipping_address}
                  onChange={(e) =>
                    dispatch(change({ name: "shipping_address", value: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Shipping Contact</label>
                <input
                  className="input w-full text-[13px]"
                  type="text"
                  placeholder="Contact person for delivery"
                  value={formData.shipping_contact}
                  onChange={(e) =>
                    dispatch(change({ name: "shipping_contact", value: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-5 mt-5 border-t border-zinc-200">
          <Link href="/" className="btn btn-secondary text-[13px]">
            Back
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-ghost text-[13px] text-zinc-500"
              onClick={() => dispatch(empty())}
            >
              Clear
            </button>
            <button type="submit" className="btn btn-primary text-[13px]">
              Preview Invoice
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Details;
