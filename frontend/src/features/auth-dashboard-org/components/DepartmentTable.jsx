function DepartmentTable() {
  const departments = [
    {
      id: 1,
      name: "IT",
      manager: "Rahul Sharma",
      employees: 45,
      status: "Active",
    },
    {
      id: 2,
      name: "HR",
      manager: "Priya Patel",
      employees: 12,
      status: "Active",
    },
    {
      id: 3,
      name: "Finance",
      manager: "Amit Shah",
      employees: 18,
      status: "Inactive",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between mb-5">

        <input
          type="text"
          placeholder="Search Department..."
          className="border rounded-lg px-4 py-2 w-72"
        />

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          + Add Department
        </button>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">Department</th>

            <th className="p-3 text-left">Manager</th>

            <th className="p-3 text-left">Employees</th>

            <th className="p-3 text-left">Status</th>

            <th className="p-3 text-left">Actions</th>

          </tr>

        </thead>

        <tbody>

          {departments.map((dept) => (

            <tr key={dept.id} className="border-b">

              <td className="p-3">{dept.name}</td>

              <td className="p-3">{dept.manager}</td>

              <td className="p-3">{dept.employees}</td>

              <td className="p-3">

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    dept.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {dept.status}
                </span>

              </td>

              <td className="p-3">

                <button className="text-blue-600 mr-3">
                  Edit
                </button>

                <button className="text-red-600">
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default DepartmentTable;