import { useEffect, useState } from 'react';

const STORAGE_KEY = 'assetflow-employees';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', department: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const savedEmployees = localStorage.getItem(STORAGE_KEY);
      if (savedEmployees) {
        setEmployees(JSON.parse(savedEmployees));
      }
    } catch (err) {
      console.error('Unable to load employees:', err);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (message) setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.department.trim()) {
      setError('Please fill in all fields.');
      setMessage('');
      return;
    }

    const newEmployee = {
      id: Date.now(),
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      department: formData.department.trim(),
    };

    const updatedEmployees = [newEmployee, ...employees];
    setEmployees(updatedEmployees);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEmployees));
    setFormData({ name: '', email: '', department: '' });
    setMessage(`Employee ${newEmployee.name} added successfully.`);
    setError('');
  };

  const handleDelete = (employeeId) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== employeeId);
    setEmployees(updatedEmployees);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEmployees));
    setMessage('Employee removed.');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Employees</h1>
            <p className="text-gray-600">Manage employee records for your organization.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Employee name"
            className="border rounded-lg p-3"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-lg p-3"
          />
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="border rounded-lg p-3"
          />
          <div className="md:col-span-3">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add Employee
            </button>
          </div>
        </form>

        {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
        {message ? <p className="mb-4 text-sm text-green-600">{message}</p> : null}

        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                    No employees added yet.
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr key={employee.id} className="border-t">
                    <td className="px-4 py-3">{employee.name}</td>
                    <td className="px-4 py-3">{employee.email}</td>
                    <td className="px-4 py-3">{employee.department}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(employee.id)} className="text-red-600 hover:underline">
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
    </div>
  );
}

export default Employees;
