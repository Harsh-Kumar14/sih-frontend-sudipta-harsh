"use client" 
import { useState } from "react"

export default function VideoSection() {
  const [activeCall, setActiveCall] = useState(null)

  const scheduledCalls = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "upcoming",
      meetingId: "123-456-789",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialization: "General Practice",
      date: "2024-01-12",
      time: "2:30 PM",
      status: "completed",
      meetingId: "987-654-321",
    },
  ]

  const handleJoinCall = (call) => {
    setActiveCall(call)
  }

  const handleEndCall = () => {
    setActiveCall(null)
  }

  if (activeCall) {
    return (
      <div className="space-y-6">
        {/* Video Call Interface */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="bg-gray-900 aspect-video flex items-center justify-center relative">
            <div className="text-center text-white">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Video Call with {activeCall.doctor}</h3>
              <p className="text-gray-300">Call in progress...</p>
            </div>

            {/* Call Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
              <button className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <button
                onClick={handleEndCall}
                className="w-12 h-12 bg-destructive hover:bg-destructive/90 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 3l1.5 1.5M4.5 4.5l1.5 1.5M6 6l6 6m6 6l1.5 1.5M19.5 19.5L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-4 bg-card">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground">{activeCall.doctor}</h4>
                <p className="text-sm text-muted-foreground">{activeCall.specialization}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Meeting ID</p>
                <p className="font-mono text-sm text-foreground">{activeCall.meetingId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
            Schedule New Call
          </button>
          <button className="border border-border text-foreground px-4 py-2 rounded-md font-medium hover:bg-muted transition-colors">
            Join with Meeting ID
          </button>
        </div>
      </div>

      {/* Scheduled Calls */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Video Consultations</h3>
        <div className="space-y-4">
          {scheduledCalls.map((call) => (
            <div key={call.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">{call.doctor}</p>
                  <p className="text-sm text-muted-foreground">{call.specialization}</p>
                  <p className="text-sm text-muted-foreground">
                    {call.date} at {call.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    call.status === "upcoming"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted-foreground/10 text-muted-foreground"
                  }`}
                >
                  {call.status}
                </span>
                {call.status === "upcoming" && (
                  <button
                    onClick={() => handleJoinCall(call)}
                    className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Join Call
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Call History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-foreground">Dr. Emily Rodriguez</p>
              <p className="text-sm text-muted-foreground">Jan 10, 2024 • 25 minutes</p>
            </div>
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-foreground">Dr. James Wilson</p>
              <p className="text-sm text-muted-foreground">Jan 8, 2024 • 30 minutes</p>
            </div>
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
