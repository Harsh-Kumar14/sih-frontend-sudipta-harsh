"use client";

import { useState, useEffect } from "react"

export default function PatientQueue() {
  const [queueFilter, setQueueFilter] = useState("all")
  const [activeChatPatient, setActiveChatPatient] = useState(null)
  const [chatMessages, setChatMessages] = useState({})
  const [newMessage, setNewMessage] = useState("")
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch doctor consultations from backend
  useEffect(() => {
    const fetchDoctorConsultations = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Get doctor ID from localStorage
        const doctorId = localStorage.getItem("doctorId")
        
        if (!doctorId) {
          setError("No doctor ID found. Please login again.")
          return
        }

        console.log('Fetching consultations for doctor ID:', doctorId)
        
        // Fetch doctor consultations from your backend
        const response = await fetch(`http://localhost:8080/doctor-consultations/${doctorId}`)
        
        if (response.ok) {
          const data = await response.json()
          console.log('Doctor consultations response:', data)
          
          // Transform the API response to match your patient queue format
          if (data.patients && Array.isArray(data.patients)) {
            const transformedPatients = data.patients.map((consultation, index) => ({
              id: consultation.id || consultation._id || index + 1,
              name: consultation.patientName || consultation.patient?.name || 'Unknown Patient',
              appointmentTime: consultation.time || consultation.scheduledTime || 'TBD',
              type: consultation.type === 'video' ? 'Video Consultation' : 
                    consultation.type === 'chat' ? 'Chat Consultation' : 'In-Person',
              reason: consultation.reason || consultation.description || 'General consultation',
              status: consultation.status || 'waiting',
              priority: consultation.priority || 'normal',
              phone: consultation.patientPhone || consultation.patient?.phone || 'N/A',
              age: consultation.patientAge || consultation.patient?.age || 'N/A',
              lastVisit: consultation.date || consultation.scheduledDate || 'N/A',
              patientId: consultation.patientId || consultation.patient?.id
            }))
            
            setPatients(transformedPatients)
            console.log('Transformed patients:', transformedPatients)
          } else {
            console.warn('No patients array found in response')
            setPatients([])
          }
        } else {
          const errorData = await response.json()
          setError(errorData.message || 'Failed to fetch consultations')
          console.error('API Error:', errorData)
        }
        
      } catch (error) {
        console.error('Error fetching doctor consultations:', error)
        setError('Network error: Unable to fetch consultations')
      } finally {
        setLoading(false)
      }
    }

    fetchDoctorConsultations()
  }, [])

  // Fallback hardcoded patients for demonstration when no data is available
  const fallbackPatients = [
    {
      id: 1,
      name: "John Doe",
      appointmentTime: "10:00 AM",
      type: "Video Consultation",
      reason: "Follow-up checkup",
      status: "waiting",
      priority: "normal",
      phone: "+1 (555) 123-4567",
      age: 45,
      lastVisit: "2024-01-05",
    },
    {
      id: 2,
      name: "Jane Smith",
      appointmentTime: "10:30 AM",
      type: "In-Person",
      reason: "Chest pain evaluation",
      status: "in-progress",
      priority: "urgent",
      phone: "+1 (555) 234-5678",
      age: 52,
      lastVisit: "2023-12-20",
    },
  ]

  // Use fetched patients or fallback data
  const displayPatients = patients.length > 0 ? patients : (loading ? [] : fallbackPatients)

  const handleStatusChange = (patientId, newStatus) => {
    setPatients(patients.map((patient) => (patient.id === patientId ? { ...patient, status: newStatus } : patient)))
  }

  const handleStartConsultation = (patient) => {
    handleStatusChange(patient.id, "in-progress")
    if (patient.type === "Video Consultation") {
      alert(`Starting video consultation with ${patient.name}. This would open the video call interface.`)
    } else {
      alert(`Patient ${patient.name} is ready for in-person consultation.`)
    }
  }

  const handleCompleteConsultation = (patient) => {
    handleStatusChange(patient.id, "completed")
    alert(`Consultation with ${patient.name} marked as completed.`)
  }

  // Chat functionality
  const handleStartChat = (patient) => {
    setActiveChatPatient(patient)
    if (!chatMessages[patient.id]) {
      setChatMessages((prev) => ({
        ...prev,
        [patient.id]: [
          {
            id: 1,
            sender: "doctor",
            message: `Hello ${patient.name}! I'm ready to assist you with your ${patient.reason}. How are you feeling?`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ],
      }))
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChatPatient) return

    const message = {
      id: Date.now(),
      sender: "doctor",
      message: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    }

    setChatMessages((prev) => ({
      ...prev,
      [activeChatPatient.id]: [...(prev[activeChatPatient.id] || []), message],
    }))

    setNewMessage("")

    // Simulate patient response
    setTimeout(() => {
      const patientResponse = {
        id: Date.now() + 1,
        sender: "patient",
        message: "Thank you doctor. I'll provide more details about my condition.",
        timestamp: new Date().toLocaleTimeString(),
      }

      setChatMessages((prev) => ({
        ...prev,
        [activeChatPatient.id]: [...(prev[activeChatPatient.id] || []), patientResponse],
      }))
    }, 1000)
  }

  const handleCloseChat = () => {
    setActiveChatPatient(null)
    setNewMessage("")
  }

  const filteredPatients = displayPatients.filter((patient) => {
    if (queueFilter === "all") return true
    return patient.status === queueFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "waiting":
        return "bg-accent/10 text-accent"
      case "in-progress":
        return "bg-secondary/10 text-secondary"
      case "completed":
        return "bg-primary/10 text-primary"
      default:
        return "bg-muted-foreground/10 text-muted-foreground"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-destructive/10 text-destructive"
      case "high":
        return "bg-yellow-100 text-yellow-800"
      case "normal":
        return "bg-muted-foreground/10 text-muted-foreground"
      default:
        return "bg-muted-foreground/10 text-muted-foreground"
    }
  }

  const queueStats = {
    waiting: displayPatients.filter((p) => p.status === "waiting").length,
    inProgress: displayPatients.filter((p) => p.status === "in-progress").length,
    completed: displayPatients.filter((p) => p.status === "completed").length,
  }

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground mt-2">Loading patient queue...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-12">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-destructive font-medium">⚠️ {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Queue Stats */}
      {!loading && !error && (
        <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Waiting</p>
              <p className="text-2xl font-bold text-accent">{queueStats.waiting}</p>
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
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold text-secondary">{queueStats.inProgress}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-primary">{queueStats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      )}
      {/* Filter Controls */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Patient Queue</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setQueueFilter("all")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                queueFilter === "all"
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({displayPatients.length})
            </button>
            <button
              onClick={() => setQueueFilter("waiting")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                queueFilter === "waiting"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Waiting ({queueStats.waiting})
            </button>
            <button
              onClick={() => setQueueFilter("in-progress")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                queueFilter === "in-progress"
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              In Progress ({queueStats.inProgress})
            </button>
            <button
              onClick={() => setQueueFilter("completed")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                queueFilter === "completed"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Completed ({queueStats.completed})
            </button>
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="space-y-4">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  {patient.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-foreground">{patient.name}</h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(patient.priority)}`}
                    >
                      {patient.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <p>
                      <strong>Time:</strong> {patient.appointmentTime}
                    </p>
                    <p>
                      <strong>Type:</strong> {patient.type}
                    </p>
                    <p>
                      <strong>Reason:</strong> {patient.reason}
                    </p>
                    <p>
                      <strong>Age:</strong> {patient.age} years
                    </p>
                    <p>
                      <strong>Phone:</strong> {patient.phone}
                    </p>
                    <p>
                      <strong>Last Visit:</strong> {patient.lastVisit}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {patient.status === "waiting" && (
                  <button
                    onClick={() => handleStartConsultation(patient)}
                    className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:bg-secondary/90 transition-colors"
                  >
                    Start Consultation
                  </button>
                )}
                {patient.status === "in-progress" && (
                  <>
                    <button
                      onClick={() => handleStartChat(patient)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Chat
                    </button>
                    <button
                      onClick={() => handleCompleteConsultation(patient)}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                      Complete
                    </button>
                  </>
                )}
                <button className="border border-border text-foreground px-4 py-2 rounded-md font-medium hover:bg-muted transition-colors">
                  View History
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No patients found in the selected queue.</p>
        </div>
      )}

      {/* Chat Modal */}
      {activeChatPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md h-96 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{activeChatPatient.name}</h3>
                  <p className="text-sm text-muted-foreground">{activeChatPatient.reason}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    activeChatPatient.status === "in-progress" 
                      ? "bg-secondary/10 text-secondary" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {activeChatPatient.status}
                  </span>
                </div>
              </div>
              <button onClick={handleCloseChat} className="text-muted-foreground hover:text-foreground">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(chatMessages[activeChatPatient.id] || []).map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "doctor" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.sender === "doctor" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

