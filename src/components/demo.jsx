import React, { useState } from "react";

function Demo() {
  const [assets, setAssets] = useState({
    cash: 0,
    jewelry: 0,
    investments: 0,
    assets: 0,
    receivable: 0,
    rental_income: 0,
    livestock: 0,
    liabilities: 0,
  });

  const [data, setData] = useState({ zakatable: 0, zakat: 0 });

  const handleSubmit = (event) => {
    event.preventDefault();

    const totalAssets =
      assets.cash +
      assets.jewelry +
      assets.investments +
      assets.assets +
      assets.receivable +
      assets.rental_income +
      assets.livestock;

    const zakatableAmount = totalAssets - assets.liabilities;
    const zakat = zakatableAmount > 0 ? zakatableAmount * 0.025 : 0;

    setData({ zakatable: zakatableAmount, zakat });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAssets((prevAssets) => ({
      ...prevAssets,
      [name]: Number(value),
    }));
  };

  const fields = [
    { label: "Cash", name: "cash" },
    { label: "Gold and Silver", name: "jewelry" },
    { label: "Investments", name: "investments" },
    { label: "Business Assets", name: "assets" },
    { label: "Receivables", name: "receivable" },
    { label: "Rental Income (unspent)", name: "rental_income" },
    { label: "Agricultural Income / Livestock", name: "livestock" },
    { label: "Liabilities", name: "liabilities" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">🕌 Zakat Calculator</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="number"
                name={field.name}
                value={assets[field.name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={field.label}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Calculate Zakat
          </button>
        </form>

        <div className="mt-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">📊 Results</h2>
          <p><strong>Zakatable Amount:</strong> ${data.zakatable.toFixed(2)}</p>
          <p><strong>Zakat Due (2.5%):</strong> ${data.zakat.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Demo;
