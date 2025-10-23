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
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice Details</h1>
            <p className="text-gray-600">Add customer and invoice information</p>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={fillSampleData}
          >
            Fill Sample Data
          </button>
        </div>
      </div>

      <form onSubmit={handleNext} className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              className="input w-full"
              value={formData.paymed}
              onChange={(e) =>
                dispatch(change({ name: "paymed", value: e.target.value }))
              }
              required
            >
              <option value="">Select payment method</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Check">Check</option>
              <option value="Digital Payment">Digital Payment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input
              className="input w-full"
              type="text"
              placeholder="Enter customer name"
              value={formData.customer_name}
              onChange={(e) =>
                dispatch(change({ name: "customer_name", value: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID (Optional)</label>
            <input
              className="input w-full"
              type="text"
              placeholder="VAT/Tax ID number"
              value={formData.tax_id}
              onChange={(e) =>
                dispatch(change({ name: "tax_id", value: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
            <textarea
              className="input w-full h-24 resize-none"
              placeholder="Enter billing address"
              value={formData.billing_address}
              onChange={(e) =>
                dispatch(change({ name: "billing_address", value: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
            <textarea
              className="input w-full h-24 resize-none"
              placeholder="Enter shipping address (leave blank if same as billing)"
              value={formData.shipping_address}
              onChange={(e) =>
                dispatch(change({ name: "shipping_address", value: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Contact (Optional)</label>
            <input
              className="input w-full"
              type="text"
              placeholder="Contact person for delivery"
              value={formData.shipping_contact}
              onChange={(e) =>
                dispatch(change({ name: "shipping_contact", value: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Reference (Optional)</label>
            <input
              className="input w-full"
              type="text"
              placeholder="Transaction ID, Check number, etc."
              value={formData.payref}
              onChange={(e) =>
                dispatch(change({ name: "payref", value: e.target.value }))
              }
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Method (Optional)</label>
            <input
              className="input w-full"
              type="text"
              placeholder="e.g., Standard Shipping, Express, Pickup"
              value={formData.shipping_method}
              onChange={(e) =>
                dispatch(change({ name: "shipping_method", value: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Link href="/" className="btn btn-secondary">
            Previous
          </Link>
          <div className="flex gap-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => dispatch(empty())}
            >
              Clear All
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
