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
    <div className="space-y-8">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Video Consultations</h2>
            <p className="text-lg text-muted-foreground">Connect with your doctors through secure video calls</p>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground">Quick Actions</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule New Call
            </button>
            <button className="border-2 border-border text-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 transition-all duration-300 hover:shadow-md hover:scale-105 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Join with Meeting ID
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Scheduled Calls */}
      <div className="bg-gradient-to-r from-card to-card/50 border-2 border-primary/20 rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-foreground">Your Video Consultations</h3>
        </div>
        <div className="space-y-6">
          {scheduledCalls.map((call) => (
            <div key={call.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-6 mb-4 lg:mb-0">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{call.doctor}</p>
                  <p className="text-lg text-muted-foreground mb-1">{call.specialization}</p>
                  <p className="text-base text-muted-foreground">
                    {call.date} at {call.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${
                    call.status === "upcoming"
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-gray-100 text-gray-600 border-gray-300"
                  }`}
                >
                  {call.status}
                </span>
                {call.status === "upcoming" && (
                  <button
                    onClick={() => handleJoinCall(call)}
                    className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-xl text-base font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Join Call
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Call History */}
      <div className="bg-gradient-to-r from-card to-card/50 border-2 border-secondary/20 rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-foreground">Recent Call History</h3>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gradient-to-r from-secondary/5 to-secondary/10 border border-secondary/20 rounded-xl">
            <div>
              <p className="text-lg font-bold text-foreground">Dr. Emily Rodriguez</p>
              <p className="text-base text-muted-foreground">Jan 10, 2024 • 25 minutes</p>
            </div>
            <span className="text-base font-bold text-green-600 bg-green-100 px-4 py-2 rounded-full border border-green-300 mt-2 sm:mt-0 self-start sm:self-center">
              Completed
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gradient-to-r from-secondary/5 to-secondary/10 border border-secondary/20 rounded-xl">
            <div>
              <p className="text-lg font-bold text-foreground">Dr. James Wilson</p>
              <p className="text-base text-muted-foreground">Jan 8, 2024 • 30 minutes</p>
            </div>
            <span className="text-base font-bold text-green-600 bg-green-100 px-4 py-2 rounded-full border border-green-300 mt-2 sm:mt-0 self-start sm:self-center">
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
