import { useState } from 'react';

const initialEmployee = {
  employeeId: '',
  name: '',
  email: '',
  phone: '',
  department: '',
  role: '',
  address: '',
  status: 'Active',
};

function EmployeeForm() {
  const [employee, setEmployee] = useState(initialEmployee);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (message) {
      setMessage('');
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!employee.employeeId.trim()) {
      nextErrors.employeeId = 'Employee ID is required';
    }

    if (!employee.name.trim()) {
      nextErrors.name = 'Full name is required';
    }

    if (!employee.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
      nextErrors.email = 'Enter a valid email';
    }

    if (!employee.phone.trim()) {
      nextErrors.phone = 'Phone number is required';
    }

    if (!employee.department) {
      nextErrors.department = 'Please select a department';
    }

    if (!employee.role) {
      nextErrors.role = 'Please select a role';
    }

    if (!employee.address.trim()) {
      nextErrors.address = 'Address is required';
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

    console.log('Employee submitted:', employee);
    setMessage(`Employee ${employee.name} saved successfully.`);
    setEmployee(initialEmployee);
    setErrors({});
  };

  const handleReset = () => {
    setEmployee(initialEmployee);
    setErrors({});
    setMessage('');
  };

  const inputClasses = (fieldName) =>
    `w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500 ${errors[fieldName] ? 'border-red-400' : 'border-slate-300'}`;

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-3xl font-bold">Add Employee</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={employee.employeeId}
            onChange={handleChange}
            className={inputClasses('employeeId')}
          />
          {errors.employeeId ? <p className="mt-1 text-sm text-red-500">{errors.employeeId}</p> : null}
        </div>

        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={employee.name}
            onChange={handleChange}
            className={inputClasses('name')}
          />
          {errors.name ? <p className="mt-1 text-sm text-red-500">{errors.name}</p> : null}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={employee.email}
            onChange={handleChange}
            className={inputClasses('email')}
          />
          {errors.email ? <p className="mt-1 text-sm text-red-500">{errors.email}</p> : null}
        </div>

        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={employee.phone}
            onChange={handleChange}
            className={inputClasses('phone')}
          />
          {errors.phone ? <p className="mt-1 text-sm text-red-500">{errors.phone}</p> : null}
        </div>

        <div>
          <select name="department" value={employee.department} onChange={handleChange} className={inputClasses('department')}>
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
          {errors.department ? <p className="mt-1 text-sm text-red-500">{errors.department}</p> : null}
        </div>

        <div>
          <select name="role" value={employee.role} onChange={handleChange} className={inputClasses('role')}>
            <option value="">Select Role</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
          {errors.role ? <p className="mt-1 text-sm text-red-500">{errors.role}</p> : null}
        </div>

        <div className="md:col-span-2">
          <textarea
            name="address"
            rows="4"
            placeholder="Address"
            value={employee.address}
            onChange={handleChange}
            className={inputClasses('address')}
          />
          {errors.address ? <p className="mt-1 text-sm text-red-500">{errors.address}</p> : null}
        </div>

        <div className="md:col-span-2">
          <select name="status" value={employee.status} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {message ? <p className="md:col-span-2 text-sm text-green-600">{message}</p> : null}

        <div className="flex justify-end gap-4 md:col-span-2">
          <button type="button" onClick={handleReset} className="rounded-lg border px-5 py-2 hover:bg-gray-100">
            Cancel
          </button>

          <button type="submit" className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
            Save Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;