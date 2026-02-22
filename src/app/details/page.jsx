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
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900">Invoice Details</h1>
          <button
            type="button"
            className="btn btn-secondary text-sm"
            onClick={fillSampleData}
          >
            Fill Sample Data
          </button>
        </div>
      </div>

      <form onSubmit={handleNext} className="max-w-3xl">
        <div className="card p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Invoice Date</label>
              <input
                className="input w-full"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  dispatch(change({ name: "date", value: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Payment Method</label>
              <select
                className="input w-full"
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
              <label className="block text-sm font-medium text-zinc-700 mb-1">Customer Name</label>
              <input
                className="input w-full"
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
              <label className="block text-sm font-medium text-zinc-700 mb-1">Tax ID</label>
              <input
                className="input w-full"
                type="text"
                placeholder="VAT/Tax ID"
                value={formData.tax_id}
                onChange={(e) =>
                  dispatch(change({ name: "tax_id", value: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Billing Address</label>
              <textarea
                className="input w-full h-24 resize-none"
                placeholder="Billing address"
                value={formData.billing_address}
                onChange={(e) =>
                  dispatch(change({ name: "billing_address", value: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Shipping Address</label>
              <textarea
                className="input w-full h-24 resize-none"
                placeholder="Same as billing if empty"
                value={formData.shipping_address}
                onChange={(e) =>
                  dispatch(change({ name: "shipping_address", value: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Shipping Contact</label>
              <input
                className="input w-full"
                type="text"
                placeholder="Contact person"
                value={formData.shipping_contact}
                onChange={(e) =>
                  dispatch(change({ name: "shipping_contact", value: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Payment Reference</label>
              <input
                className="input w-full"
                type="text"
                placeholder="Transaction ID, check no., etc."
                value={formData.payref}
                onChange={(e) =>
                  dispatch(change({ name: "payref", value: e.target.value }))
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-700 mb-1">Shipping Method</label>
              <input
                className="input w-full"
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

        <div className="flex items-center justify-between pt-5 mt-5 border-t border-zinc-200">
          <Link href="/" className="btn btn-secondary">
            Back
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-ghost text-zinc-500"
              onClick={() => dispatch(empty())}
            >
              Clear
            </button>
            <button type="submit" className="btn btn-primary">
              Preview Invoice
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Details;
