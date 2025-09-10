export default function PatientOverview({ user }) {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "Video Consultation",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialization: "General Practice",
      date: "2024-01-18",
      time: "2:30 PM",
      type: "In-Person",
    },
  ]

  const recentPrescriptions = [
    {
      id: 1,
      medicine: "Lisinopril 10mg",
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-10",
      status: "Available",
    },
    {
      id: 2,
      medicine: "Metformin 500mg",
      doctor: "Dr. Michael Chen",
      date: "2024-01-08",
      status: "Dispensed",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Welcome back, {user.name}!</h2>
        <p className="text-muted-foreground">Here's an overview of your healthcare activities.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Appointments</p>
              <p className="text-2xl font-bold text-primary">{upcomingAppointments.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Prescriptions</p>
              <p className="text-2xl font-bold text-secondary">3</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Video Consultations</p>
              <p className="text-2xl font-bold text-accent">12</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Appointments</h3>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">{appointment.doctor}</p>
                  <p className="text-sm text-muted-foreground">{appointment.specialization}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{appointment.date}</p>
                <p className="text-sm text-muted-foreground">
                  {appointment.time} • {appointment.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Prescriptions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Prescriptions</h3>
        <div className="space-y-4">
          {recentPrescriptions.map((prescription) => (
            <div key={prescription.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">{prescription.medicine}</p>
                  <p className="text-sm text-muted-foreground">Prescribed by {prescription.doctor}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{prescription.date}</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    prescription.status === "Available"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted-foreground/10 text-muted-foreground"
                  }`}
                >
                  {prescription.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
