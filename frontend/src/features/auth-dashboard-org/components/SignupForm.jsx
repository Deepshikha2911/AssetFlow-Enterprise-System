import { useState } from 'react';

const initialFormData = {
  fullName: '',
  employeeId: '',
  email: '',
  phone: '',
  department: '',
  role: 'Employee',
  password: '',
  confirmPassword: '',
};

function SignupForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (message) {
      setMessage('');
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Full name is required';
    }

    if (!formData.employeeId.trim()) {
      nextErrors.employeeId = 'Employee ID is required';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email';
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'Phone number is required';
    }

    if (!formData.department) {
      nextErrors.department = 'Please select a department';
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = 'Passwords do not match';
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

    console.log('Signup submitted:', formData);
    setMessage(`Account for ${formData.fullName} created successfully.`);
    setFormData(initialFormData);
    setErrors({});
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setMessage('');
  };

  const inputClasses = (fieldName) =>
    `w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500 ${errors[fieldName] ? 'border-red-400' : 'border-slate-300'}`;

  return (
    <div className="mx-auto max-w-lg rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-2 text-3xl font-bold">Create Account</h2>
      <p className="mb-6 text-gray-500">Register a new employee</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className={inputClasses('fullName')}
          />
          {errors.fullName ? <p className="mt-1 text-sm text-red-500">{errors.fullName}</p> : null}
        </div>

        <div>
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            className={inputClasses('employeeId')}
          />
          {errors.employeeId ? <p className="mt-1 text-sm text-red-500">{errors.employeeId}</p> : null}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
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
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses('phone')}
          />
          {errors.phone ? <p className="mt-1 text-sm text-red-500">{errors.phone}</p> : null}
        </div>

        <div>
          <select name="department" value={formData.department} onChange={handleChange} className={inputClasses('department')}>
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
          {errors.department ? <p className="mt-1 text-sm text-red-500">{errors.department}</p> : null}
        </div>

        <select name="role" value={formData.role} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3">
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
        </select>

        <div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={inputClasses('password')}
            />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-4 top-3 text-sm font-medium text-blue-600">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password ? <p className="mt-1 text-sm text-red-500">{errors.password}</p> : null}
        </div>

        <div>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputClasses('confirmPassword')}
            />
            <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-4 top-3 text-sm font-medium text-blue-600">
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.confirmPassword ? <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p> : null}
        </div>

        {message ? <p className="text-sm text-green-600">{message}</p> : null}

        <div className="flex gap-3">
          <button type="button" onClick={handleReset} className="flex-1 rounded-lg border border-slate-300 px-4 py-3 hover:bg-slate-50">
            Reset
          </button>
          <button type="submit" className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;