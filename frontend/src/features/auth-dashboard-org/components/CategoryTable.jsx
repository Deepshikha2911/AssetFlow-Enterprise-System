function CategoryTable() {
  const categories = [
    {
      id: 1,
      name: 'Laptops',
      code: 'CAT001',
      assets: 42,
      status: 'Active',
      created: '12 July 2026',
    },
    {
      id: 2,
      name: 'Furniture',
      code: 'CAT002',
      assets: 18,
      status: 'Active',
      created: '10 July 2026',
    },
    {
      id: 3,
      name: 'Printers',
      code: 'CAT003',
      assets: 8,
      status: 'Inactive',
      created: '08 July 2026',
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search Category..."
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 md:max-w-sm"
        />

        <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700">
          + Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left font-semibold text-slate-700">Category</th>
              <th className="p-4 text-left font-semibold text-slate-700">Code</th>
              <th className="p-4 text-left font-semibold text-slate-700">Assets</th>
              <th className="p-4 text-left font-semibold text-slate-700">Status</th>
              <th className="p-4 text-left font-semibold text-slate-700">Created</th>
              <th className="p-4 text-left font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="p-4 text-slate-700">{category.name}</td>
                <td className="p-4 text-slate-600">{category.code}</td>
                <td className="p-4 text-slate-600">{category.assets}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      category.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {category.status}
                  </span>
                </td>
                <td className="p-4 text-slate-600">{category.created}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-3 text-sm">
                    <button className="text-blue-600 hover:underline">View</button>
                    <button className="text-emerald-600 hover:underline">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-500">Showing 1–3 of 3 Categories</p>

        <div className="flex flex-wrap gap-2">
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Previous</button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white">1</button>
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Next</button>
        </div>
      </div>
    </div>
  );
}

export default CategoryTable;