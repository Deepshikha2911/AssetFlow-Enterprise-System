function EmployeeTable() {
  const employees = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'Rahul Sharma',
      email: 'rahul@gmail.com',
      department: 'IT',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Priya Patel',
      email: 'priya@gmail.com',
      department: 'HR',
      role: 'Manager',
      status: 'Active',
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Amit Verma',
      email: 'amit@gmail.com',
      department: 'Finance',
      role: 'Employee',
      status: 'Inactive',
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search Employee..."
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 md:max-w-sm"
        />

        <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700">
          + Add Employee
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left font-semibold text-slate-700">Employee ID</th>
              <th className="p-4 text-left font-semibold text-slate-700">Name</th>
              <th className="p-4 text-left font-semibold text-slate-700">Email</th>
              <th className="p-4 text-left font-semibold text-slate-700">Department</th>
              <th className="p-4 text-left font-semibold text-slate-700">Role</th>
              <th className="p-4 text-left font-semibold text-slate-700">Status</th>
              <th className="p-4 text-left font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="p-4 text-slate-700">{employee.employeeId}</td>
                <td className="p-4 text-slate-700">{employee.name}</td>
                <td className="p-4 text-slate-600">{employee.email}</td>
                <td className="p-4 text-slate-600">{employee.department}</td>
                <td className="p-4 text-slate-600">{employee.role}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      employee.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
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
        <p className="text-sm text-slate-500">Showing 1–3 of 3 Employees</p>

        <div className="flex flex-wrap gap-2">
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Previous</button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white">1</button>
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Next</button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTable;