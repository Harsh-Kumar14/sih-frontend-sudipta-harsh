"use client";

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "../../../components/dashboard/DashboardLayout"
import DoctorsSection from "../../../components/patient/DoctorsSection"
import VideoSection from "../../../components/patient/VideoSection"
import MedicineSection from "../../../components/patient/MedicineSection"
import PatientOverview from "../../../components/patient/PatientOverview"
import AISymptomChecker from "../../../components/patient/AISymptomChecker"

export default function PatientDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const userType = localStorage.getItem("userType")
    const userId = localStorage.getItem("userId")

    if (!userType || userType !== "patient") {
      router.push("/login?type=patient")
      return
    }

    // Mock user data
    setUser({
      id: userId,
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      email: "john.doe@email.com",
      dateOfBirth: "1990-05-15",
      bloodGroup: "O+",
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userId")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const navigationItems = [
    { id: "overview", label: "Overview", icon: "home" },
    { id: "ai-checker", label: "AI Symptom Checker", icon: "brain" },
    { id: "doctors", label: "Find Doctors", icon: "doctor" },
    { id: "video", label: "Video Calls", icon: "video" },
    { id: "medicines", label: "Medicines", icon: "pill" },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <PatientOverview user={user} />
      case "ai-checker":
        return <AISymptomChecker />
      case "doctors":
        return <DoctorsSection />
      case "video":
        return <VideoSection />
      case "medicines":
        return <MedicineSection />
      default:
        return <PatientOverview user={user} />
    }
  }

  return (
    <DashboardLayout
      user={user}
      userType="patient"
      navigationItems={navigationItems}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onLogout={handleLogout}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
