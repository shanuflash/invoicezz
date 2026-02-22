import numWords from "num-words";

const InvoiceTemplate = ({ formData, items, total, invoiceno }) => {
  const filteredItems = items?.filter(item => item.count > 0) || [];
  const year = formData.date
    ? new Date(formData.date).getFullYear()
    : new Date().getFullYear();

  return (
    <div className="card p-6 max-w-3xl print-only" id="invoice-print-area">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-lg font-bold text-zinc-900 mb-1">YOUR COMPANY NAME</h1>
          <div className="text-xs text-zinc-500 space-y-0.5">
            <div>Your Company Address Line 1</div>
            <div>Your City, State - Postal Code, Country</div>
            <div className="mt-1.5">
              <div>Tax ID: YOUR-TAX-ID-HERE</div>
              <div>Email: your-email@example.com</div>
            </div>
          </div>
        </div>
        <div className="text-right text-xs text-zinc-500 space-y-0.5">
          <div><strong className="text-zinc-700">Date:</strong> {new Date(formData.date).toLocaleDateString()}</div>
          <div><strong className="text-zinc-700">Invoice:</strong> INV/{invoiceno}/{year}</div>
          <div><strong className="text-zinc-700">Payment:</strong> {formData.paymed}</div>
          {formData.payref && <div><strong className="text-zinc-700">Ref:</strong> {formData.payref}</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 address-grid">
        <div className="address-section">
          <h3 className="text-xs font-semibold text-zinc-900 mb-1.5 uppercase tracking-wide">Bill To</h3>
          <div className="text-xs text-zinc-600 address-content">
            <div className="font-medium text-zinc-900">{formData.customer_name}</div>
            <div className="whitespace-pre-line mt-0.5">{formData.billing_address}</div>
            {formData.tax_id && <div className="mt-1"><strong>Tax ID:</strong> {formData.tax_id}</div>}
          </div>
        </div>
        <div className="address-section">
          <h3 className="text-xs font-semibold text-zinc-900 mb-1.5 uppercase tracking-wide">Ship To</h3>
          <div className="text-xs text-zinc-600 address-content">
            {formData.shipping_contact && <div className="font-medium text-zinc-900">{formData.shipping_contact}</div>}
            <div className="whitespace-pre-line mt-0.5">
              {formData.shipping_address || formData.billing_address}
            </div>
            {formData.shipping_method && <div className="mt-1"><strong>Shipping:</strong> {formData.shipping_method}</div>}
          </div>
        </div>
      </div>

      <div className="border border-zinc-200 rounded-md overflow-hidden mb-5">
        <div className="bg-zinc-50 px-4 py-2 border-b border-zinc-200">
          <div className="grid grid-cols-4 gap-4 text-xs font-medium text-zinc-700">
            <div>Item</div>
            <div className="text-center">Qty</div>
            <div className="text-right">Unit Price</div>
            <div className="text-right">Total</div>
          </div>
        </div>

        <div className="divide-y divide-zinc-100">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="px-4 py-2.5">
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div className="font-medium text-zinc-900">{item.name}</div>
                <div className="text-center text-zinc-600">{item.count}</div>
                <div className="text-right text-zinc-600">₹{item.price}</div>
                <div className="text-right font-medium text-zinc-900">₹{(item.price * item.count).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-50 p-4 rounded-md mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-zinc-900">Total</span>
          <span className="text-lg font-bold text-zinc-900">₹{total?.toLocaleString("en-IN")}</span>
        </div>
        <div className="text-xs text-zinc-500">
          {total > 0 ? numWords(parseInt(total)).toUpperCase() + " ONLY" : ""}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-200">
        <div>
          <h3 className="text-xs font-semibold text-zinc-900 mb-1.5 uppercase tracking-wide">Payment Info</h3>
          <div className="text-xs text-zinc-500 space-y-0.5">
            <div>Bank Name: Your Bank Name</div>
            <div>Account: XXXX-XXXX-XXXX</div>
            <div>Routing/SWIFT: YOUR-ROUTING-CODE</div>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-zinc-900 mb-1.5 uppercase tracking-wide">Terms</h3>
          <p className="text-xs text-zinc-500">
            Payment due within 30 days of invoice date.
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-200 flex justify-between items-end">
        <div className="text-[10px] text-zinc-400">
          Computer generated invoice
        </div>
        <div className="text-right">
          <div className="text-xs font-medium text-zinc-900">YOUR COMPANY NAME</div>
          <div className="text-[10px] text-zinc-400 mt-0.5">Authorized Signature</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
