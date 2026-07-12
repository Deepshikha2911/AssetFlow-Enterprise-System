import { useEffect, useState } from 'react';

const STORAGE_KEY = 'assetflow-categories';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', status: 'Active' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const savedCategories = localStorage.getItem(STORAGE_KEY);
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
    } catch (err) {
      console.error('Unable to load categories:', err);
    }
  }, []);

  const resetForm = () => {
    setFormData({ name: '', description: '', status: 'Active' });
    setEditingId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (message) setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      setError('Please fill in the category name and description.');
      setMessage('');
      return;
    }

    if (editingId) {
      const updated = categories.map((category) =>
        category.id === editingId
          ? { ...category, ...formData, name: formData.name.trim(), description: formData.description.trim() }
          : category
      );
      setCategories(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setMessage('Category updated successfully.');
    } else {
      const newCategory = {
        id: Date.now(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        assets: 0,
        status: formData.status,
      };
      const updated = [newCategory, ...categories];
      setCategories(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setMessage('Category added successfully.');
    }

    resetForm();
    setError('');
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({ name: category.name, description: category.description, status: category.status });
  };

  const handleDelete = (categoryId) => {
    const updated = categories.filter((category) => category.id !== categoryId);
    setCategories(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setMessage('Category deleted.');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Asset Categories</h1>
          <p className="text-gray-500">Manage categories of organization assets.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Category' : 'Add Category'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Category name"
            className="border rounded-lg p-3"
          />
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded-lg p-3"
          />
          <select name="status" value={formData.status} onChange={handleChange} className="border rounded-lg p-3">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="md:col-span-3 flex gap-3">
            <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              {editingId ? 'Update Category' : 'Add Category'}
            </button>
            {editingId ? (
              <button type="button" onClick={resetForm} className="bg-gray-300 px-5 py-2 rounded-lg">
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>

      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
      {message ? <p className="mb-4 text-sm text-green-600">{message}</p> : null}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Description</th>
              <th className="text-left p-4">Assets</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No categories added yet.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="border-t">
                  <td className="p-4">{category.name}</td>
                  <td className="p-4">{category.description}</td>
                  <td className="p-4">{category.assets}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${category.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    <button onClick={() => handleEdit(category)} className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;