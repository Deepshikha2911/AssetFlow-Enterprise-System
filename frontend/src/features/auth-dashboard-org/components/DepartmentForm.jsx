import { useState } from 'react';

const initialDepartment = {
  name: '',
  code: '',
  manager: '',
  description: '',
  status: 'Active',
};

function DepartmentForm() {
  const [department, setDepartment] = useState(initialDepartment);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (message) {
      setMessage('');
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!department.name.trim()) {
      nextErrors.name = 'Department name is required';
    }

    if (!department.code.trim()) {
      nextErrors.code = 'Department code is required';
    }

    if (!department.manager) {
      nextErrors.manager = 'Please select a manager';
    }

    if (!department.description.trim()) {
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

    console.log('Department submitted:', department);
    setMessage(`Department ${department.name} saved successfully.`);
    setDepartment(initialDepartment);
    setErrors({});
  };

  const handleReset = () => {
    setDepartment(initialDepartment);
    setErrors({});
    setMessage('');
  };

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Add Department</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block font-medium">Department Name</label>
          <input
            type="text"
            name="name"
            value={department.name}
            onChange={handleChange}
            placeholder="Enter Department Name"
            className={`w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-400' : 'border-slate-300'}`}
          />
          {errors.name ? <p className="mt-1 text-sm text-red-500">{errors.name}</p> : null}
        </div>

        <div>
          <label className="mb-2 block font-medium">Department Code</label>
          <input
            type="text"
            name="code"
            value={department.code}
            onChange={handleChange}
            placeholder="Example: IT001"
            className={`w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500 ${errors.code ? 'border-red-400' : 'border-slate-300'}`}
          />
          {errors.code ? <p className="mt-1 text-sm text-red-500">{errors.code}</p> : null}
        </div>

        <div>
          <label className="mb-2 block font-medium">Department Manager</label>
          <select
            name="manager"
            value={department.manager}
            onChange={handleChange}
            className={`w-full rounded-lg border p-3 ${errors.manager ? 'border-red-400' : 'border-slate-300'}`}
          >
            <option value="">Select Manager</option>
            <option value="Rahul Sharma">Rahul Sharma</option>
            <option value="Priya Patel">Priya Patel</option>
            <option value="Amit Shah">Amit Shah</option>
          </select>
          {errors.manager ? <p className="mt-1 text-sm text-red-500">{errors.manager}</p> : null}
        </div>

        <div>
          <label className="mb-2 block font-medium">Description</label>
          <textarea
            rows="4"
            name="description"
            value={department.description}
            onChange={handleChange}
            placeholder="Department Description"
            className={`w-full rounded-lg border p-3 ${errors.description ? 'border-red-400' : 'border-slate-300'}`}
          />
          {errors.description ? <p className="mt-1 text-sm text-red-500">{errors.description}</p> : null}
        </div>

        <div>
          <label className="mb-2 block font-medium">Status</label>
          <select
            name="status"
            value={department.status}
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
            Save Department
          </button>
        </div>
      </form>
    </div>
  );
}

export default DepartmentForm;