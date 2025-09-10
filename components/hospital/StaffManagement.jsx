"use client"

export default function StaffManagement() {
  const staff = [
    {
      id: 1,
      name: "Nurse Jennifer Adams",
      role: "Head Nurse",
      department: "Emergency",
      shift: "Day Shift",
      status: "on-duty",
    },
    {
      id: 2,
      name: "Tech Robert Kim",
      role: "Lab Technician",
      department: "Laboratory",
      shift: "Night Shift",
      status: "off-duty",
    },
    {
      id: 3,
      name: "Admin Maria Garcia",
      role: "Administrator",
      department: "Administration",
      shift: "Day Shift",
      status: "on-duty",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground mt-2">Manage hospital staff and schedules</p>
        </div>
        <button className="bg-chart-1 text-white px-4 py-2 rounded-lg font-medium hover:bg-chart-1/90 transition-colors">
          Add Staff Member
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Shift</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {staff.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 text-foreground">{member.name}</td>
                <td className="px-6 py-4 text-foreground">{member.role}</td>
                <td className="px-6 py-4 text-foreground">{member.department}</td>
                <td className="px-6 py-4 text-foreground">{member.shift}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      member.status === "on-duty" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-chart-1 hover:text-chart-1/80 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
