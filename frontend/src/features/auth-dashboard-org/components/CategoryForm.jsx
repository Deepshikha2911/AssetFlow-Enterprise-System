import { useState } from 'react';

const initialCategory = {
  name: '',
  code: '',
  description: '',
  status: 'Active',
};

function CategoryForm() {
  const [category, setCategory] = useState(initialCategory);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategory((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (message) {
      setMessage('');
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!category.name.trim()) {
      nextErrors.name = 'Category name is required';
    }

    if (!category.code.trim()) {
      nextErrors.code = 'Category code is required';
    }

    if (!category.description.trim()) {
      nextErrors.description = 'Description is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      setMessage('');
      return;
    }

    console.log('Category submitted:', category);
    setMessage(`Category ${category.name} saved successfully.`);
    setCategory(initialCategory);
    setErrors({});
  };

  const handleReset = () => {
    setCategory(initialCategory);
    setErrors({});
    setMessage('');
  };

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Add Asset Category</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block font-medium">Category Name</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            placeholder="Enter Category Name"
            className={`w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-400' : 'border-slate-300'}`}
          />
          {errors.name ? <p className="mt-1 text-sm text-red-500">{errors.name}</p> : null}
        </div>

        <div>
          <label className="mb-2 block font-medium">Category Code</label>
          <input
            type="text"
            name="code"
            value={category.code}
            onChange={handleChange}
            placeholder="Example: CAT001"
            className={`w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500 ${errors.code ? 'border-red-400' : 'border-slate-300'}`}
          />
          {errors.code ? <p className="mt-1 text-sm text-red-500">{errors.code}</p> : null}
        </div>

        <div>
          <label className="mb-2 block font-medium">Description</label>
          <textarea
            rows="4"
            name="description"
            value={category.description}
            onChange={handleChange}
            placeholder="Category Description"
            className={`w-full rounded-lg border p-3 ${errors.description ? 'border-red-400' : 'border-slate-300'}`}
          />
          {errors.description ? <p className="mt-1 text-sm text-red-500">{errors.description}</p> : null}
        </div>

        <div>
          <label className="mb-2 block font-medium">Status</label>
          <select
            name="status"
            value={category.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {message ? <p className="text-sm text-green-600">{message}</p> : null}

        <div className="flex justify-end gap-4">
          <button type="button" onClick={handleReset} className="rounded-lg border px-5 py-2 hover:bg-gray-100">
            Cancel
          </button>

          <button type="submit" className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;