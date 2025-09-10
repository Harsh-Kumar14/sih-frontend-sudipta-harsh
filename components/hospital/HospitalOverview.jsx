"use client"

export default function HospitalOverview({ user }) {
  const stats = [
    {
      title: "Total Beds",
      value: user.beds,
      change: "+5%",
      changeType: "positive",
      icon: "bed",
    },
    {
      title: "Departments",
      value: user.departments,
      change: "+2",
      changeType: "positive",
      icon: "department",
    },
    {
      title: "Total Staff",
      value: user.staff,
      change: "+12%",
      changeType: "positive",
      icon: "staff",
    },
    {
      title: "Occupancy Rate",
      value: "87%",
      change: "-3%",
      changeType: "negative",
      icon: "chart",
    },
  ]

  const recentAdmissions = [
    { id: 1, patient: "John Smith", department: "Emergency", time: "2 hours ago", status: "admitted" },
    { id: 2, patient: "Sarah Johnson", department: "Cardiology", time: "4 hours ago", status: "admitted" },
    { id: 3, patient: "Mike Wilson", department: "Orthopedics", time: "6 hours ago", status: "admitted" },
    { id: 4, patient: "Emily Davis", department: "Pediatrics", time: "8 hours ago", status: "discharged" },
  ]

  const departmentStatus = [
    { name: "Emergency", capacity: "85%", available: 3, total: 20 },
    { name: "ICU", capacity: "92%", available: 2, total: 25 },
    { name: "Cardiology", capacity: "78%", available: 5, total: 23 },
    { name: "Orthopedics", capacity: "65%", available: 7, total: 20 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Hospital Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user.name}. Here's what's happening at your hospital today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-chart-1/10 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-chart-1 rounded"></div>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-muted-foreground ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity and Department Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admissions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Admissions</h2>
          <div className="space-y-4">
            {recentAdmissions.map((admission) => (
              <div key={admission.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{admission.patient}</p>
                  <p className="text-sm text-muted-foreground">
                    {admission.department} • {admission.time}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    admission.status === "admitted" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {admission.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Status */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Department Status</h2>
          <div className="space-y-4">
            {departmentStatus.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{dept.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {dept.available} of {dept.total} available
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-chart-1 h-2 rounded-full" style={{ width: dept.capacity }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
