"use client"

export default function DepartmentManagement() {
  const departments = [
    {
      id: 1,
      name: "Emergency Department",
      head: "Dr. Michael Chen",
      staff: 25,
      beds: 20,
      occupancy: "85%",
      status: "active",
    },
    {
      id: 2,
      name: "Cardiology",
      head: "Dr. Sarah Johnson",
      staff: 18,
      beds: 23,
      occupancy: "78%",
      status: "active",
    },
    {
      id: 3,
      name: "Pediatrics",
      head: "Dr. Emily Rodriguez",
      staff: 15,
      beds: 20,
      occupancy: "65%",
      status: "active",
    },
    {
      id: 4,
      name: "Orthopedics",
      head: "Dr. James Wilson",
      staff: 12,
      beds: 18,
      occupancy: "72%",
      status: "active",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Department Management</h1>
          <p className="text-muted-foreground mt-2">Manage hospital departments and resources</p>
        </div>
        <button className="bg-chart-1 text-white px-4 py-2 rounded-lg font-medium hover:bg-chart-1/90 transition-colors">
          Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{dept.name}</h3>
                <p className="text-muted-foreground">Head: {dept.head}</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                {dept.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{dept.staff}</div>
                <div className="text-sm text-muted-foreground">Staff</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{dept.beds}</div>
                <div className="text-sm text-muted-foreground">Beds</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{dept.occupancy}</div>
                <div className="text-sm text-muted-foreground">Occupancy</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-chart-1/10 text-chart-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-chart-1/20 transition-colors">
                View Details
              </button>
              <button className="flex-1 bg-muted text-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-muted/80 transition-colors">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
