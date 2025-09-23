import { useState, useEffect } from "react"

export default function DoctorOverview({ user }) {
  const [todayStats, setTodayStats] = useState({
    totalAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
    videoConsultations: 0,
  })
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [recentPatients, setRecentPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDoctorConsultations()
  }, [])

  const fetchDoctorConsultations = async () => {
    try {
      setLoading(true)
      
      // Get doctor ID from localStorage
      const doctorId = localStorage.getItem("doctorId")
      
      if (!doctorId) {
        console.error('No doctor ID found')
        return
      }

      console.log('Fetching consultations for doctor ID:', doctorId)
      
      // Fetch doctor consultations from your backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'}/doctor-consultations/${doctorId}`)
      
      if (response.ok) {
        const consultationsData = await response.json()
        console.log('Doctor consultations received:', consultationsData)
        
        // Process the consultations data
        if (Array.isArray(consultationsData)) {
          // Calculate today's stats
          const today = new Date().toISOString().split('T')[0]
          const todayConsultations = consultationsData.filter(consultation => {
            const consultationDate = consultation.date || consultation.scheduledDate
            return consultationDate === today
          })
          
          setTodayStats({
            totalAppointments: todayConsultations.length,
            completedAppointments: todayConsultations.filter(c => c.status === 'completed').length,
            pendingAppointments: todayConsultations.filter(c => c.status === 'pending' || c.status === 'scheduled').length,
            videoConsultations: todayConsultations.filter(c => c.type === 'video' || c.consultationType === 'video').length,
          })
          
          // Set upcoming appointments
          const upcoming = consultationsData
            .filter(c => c.status !== 'completed' && c.status !== 'cancelled')
            .slice(0, 3)
            .map(consultation => ({
              id: consultation.id || consultation._id,
              patient: consultation.patientName || consultation.patient?.name || 'Unknown Patient',
              time: consultation.time || consultation.scheduledTime || 'TBD',
              type: consultation.type === 'video' ? 'Video Consultation' : 'In-Person',
              reason: consultation.reason || consultation.description || 'General consultation',
              status: consultation.status || 'pending'
            }))
          
          setUpcomingAppointments(upcoming)
          
          // Extract recent patients
          const recentPatientsList = consultationsData
            .filter(c => c.patientName || c.patient?.name)
            .slice(0, 5)
            .map(consultation => ({
              id: consultation.patientId || consultation.patient?.id || Math.random(),
              name: consultation.patientName || consultation.patient?.name,
              lastVisit: consultation.date || consultation.scheduledDate,
              condition: consultation.reason || consultation.description || 'General consultation',
              status: consultation.patientStatus || 'Active'
            }))
          
          setRecentPatients(recentPatientsList)
        }
      } else {
        console.error('Failed to fetch doctor consultations:', response.status)
      }
      
    } catch (error) {
      console.error('Error fetching doctor consultations:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fallback hardcoded data for display when no data is available
  const fallbackUpcomingAppointments = [
    {
      id: 1,
      patient: "John Doe",
      time: "10:00 AM",
      type: "Video Consultation",
      reason: "Follow-up checkup",
      status: "confirmed",
    },
    {
      id: 2,
      patient: "Jane Smith",
      time: "11:30 AM",
      type: "In-Person",
      reason: "Chest pain evaluation",
      status: "confirmed",
    },
    {
      id: 3,
      patient: "Robert Wilson",
      time: "2:00 PM",
      type: "Video Consultation",
      reason: "Medication review",
      status: "pending",
    },
  ]

  const fallbackRecentPatients = [
    {
      id: 1,
      name: "Emily Davis",
      lastVisit: "2024-01-12",
      condition: "Hypertension",
      status: "Stable",
    },
    {
      id: 2,
      name: "Michael Brown",
      lastVisit: "2024-01-11",
      condition: "Diabetes Type 2",
      status: "Monitoring",
    },
    {
      id: 3,
      name: "Lisa Anderson",
      lastVisit: "2024-01-10",
      condition: "Heart Arrhythmia",
      status: "Follow-up needed",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Welcome back, Dr.{user.name}!</h2>
        <p className="text-muted-foreground">
          {user.specialization} • {user.location}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{user.experience} years of experience</p>
      </div>

      {/* Today's Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Appointments</p>
              <p className="text-2xl font-bold text-secondary">{todayStats.totalAppointments}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-primary">{todayStats.completedAppointments}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-accent">{todayStats.pendingAppointments}</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Video Calls</p>
              <p className="text-2xl font-bold text-secondary">{todayStats.videoConsultations}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <h3 className="text-lg font-semibold text-foreground mb-4">Next Appointments</h3>
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-muted-foreground/20 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-muted-foreground/20 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-muted-foreground/20 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (upcomingAppointments.length > 0 ? upcomingAppointments : fallbackUpcomingAppointments).map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">{appointment.patient}</p>
                  <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{appointment.time}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{appointment.type}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === "confirmed" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Patients */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Patients</h3>
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-muted-foreground/20 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-muted-foreground/20 rounded w-28 mb-2"></div>
                      <div className="h-3 bg-muted-foreground/20 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (recentPatients.length > 0 ? recentPatients : fallbackRecentPatients).map((patient) => (
            <div key={patient.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.condition}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last visit: {patient.lastVisit}</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    patient.status === "Stable"
                      ? "bg-primary/10 text-primary"
                      : patient.status === "Monitoring"
                        ? "bg-accent/10 text-accent"
                        : "bg-secondary/10 text-secondary"
                  }`}
                >
                  {patient.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
