"use client";

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "../../../components/dashboard/DashboardLayout"
import DoctorOverview from "../../../components/doctor/DoctorOverview"
import PatientQueue from "../../../components/doctor/PatientQueue"
import ScheduleManagement from "../../../components/doctor/ScheduleManagement"

export default function DoctorDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const userType = localStorage.getItem("userType")
    const doctorId = localStorage.getItem("doctorId")
    if (!userType || userType !== "doctor" || !doctorId) {
      router.push("/login?type=doctor")
      return
    }

    // Try to get doctor details from localStorage (set after login)
    const doctorData = localStorage.getItem("doctorData")
    if (doctorData) {
      try {
        const parsed = JSON.parse(doctorData)
        setUser(parsed)
        return
      } catch (e) {
        // fallback to fetch
      }
    }

    // Fallback: fetch doctor details from backend
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'}/doctor/${doctorId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.doctor) {
          setUser(data.doctor)
          localStorage.setItem("doctorData", JSON.stringify(data.doctor))
        }
      })
      .catch(() => {})
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userId")
    localStorage.removeItem("doctorId")
    localStorage.removeItem("doctorData")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const navigationItems = [
    { id: "overview", label: "Overview", icon: "home" },
    { id: "queue", label: "Patient Queue", icon: "queue" },
    { id: "schedule", label: "My Schedule", icon: "schedule" },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DoctorOverview user={user} />
      case "queue":
        return <PatientQueue />
      case "schedule":
        return <ScheduleManagement user={user} />
      default:
        return <DoctorOverview user={user} />
    }
  }

  return (
    <DashboardLayout
      user={user}
      userType="doctor"
      navigationItems={navigationItems}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onLogout={handleLogout}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
