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
    const userId = localStorage.getItem("userId")

    if (!userType || userType !== "doctor") {
      router.push("/login?type=doctor")
      return
    }

    // Mock doctor data
    setUser({
      id: userId,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      licenseNumber: "DOC123",
      email: "sarah.johnson@hospital.com",
      phone: "+1 (555) 987-6543",
      experience: "15 years",
      hospital: "New York Medical Center",
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userId")
    localStorage.removeItem("doctorId")
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
