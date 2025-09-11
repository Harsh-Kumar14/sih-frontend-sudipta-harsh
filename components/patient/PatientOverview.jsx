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
      {/* Welcome Section - Enhanced for accessibility */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back, {user.name}!</h2>
            <p className="text-lg text-muted-foreground">Here's your health summary</p>
          </div>
        </div>
      </div>

      {/* Quick Stats - Enhanced for better visibility */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-card border-2 border-primary/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-muted-foreground mb-2">Upcoming Appointments</p>
            <p className="text-4xl font-bold text-primary">{upcomingAppointments.length}</p>
          </div>
        </div>

        <div className="bg-card border-2 border-secondary/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
          <div className="text-center">
            <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-muted-foreground mb-2">Active Prescriptions</p>
            <p className="text-4xl font-bold text-secondary">3</p>
          </div>
        </div>

        <div className="bg-card border-2 border-accent/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
          <div className="text-center">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-muted-foreground mb-2">Video Consultations</p>
            <p className="text-4xl font-bold text-accent">12</p>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments - Enhanced for accessibility */}
      <div className="bg-card border-2 border-border rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-foreground">Upcoming Appointments</h3>
        </div>
        <div className="space-y-6">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{appointment.doctor}</p>
                  <p className="text-base text-muted-foreground">{appointment.specialization}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-foreground">{appointment.date}</p>
                <p className="text-base text-muted-foreground">
                  {appointment.time} • {appointment.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Prescriptions - Enhanced for accessibility */}
      <div className="bg-card border-2 border-border rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-foreground">Recent Prescriptions</h3>
        </div>
        <div className="space-y-6">
          {recentPrescriptions.map((prescription) => (
            <div key={prescription.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{prescription.medicine}</p>
                  <p className="text-base text-muted-foreground">Prescribed by {prescription.doctor}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-foreground">{prescription.date}</p>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    prescription.status === "Available"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-gray-100 text-gray-600 border border-gray-300"
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
