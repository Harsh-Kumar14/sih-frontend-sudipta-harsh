"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "../../../components/dashboard/DashboardLayout"
import HospitalOverview from "../../../components/hospital/HospitalOverview"
import DepartmentManagement from "../../../components/hospital/DepartmentManagement"
import StaffManagement from "../../../components/hospital/StaffManagement"
import DoctorsSection from "../../../components/pharmacy/DoctorsSection"
import UserSection from "../../../components/pharmacy/UserSection"

export default function HospitalDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const userType = localStorage.getItem("userType")
    const userId = localStorage.getItem("userId")

    if (!userType || userType !== "hospital") {
      router.push("/login?type=hospital")
      return
    }

    // Mock hospital data
    setUser({
      id: userId,
      name: "City General Hospital",
      licenseNumber: "HOSP123",
      email: "admin@citygeneral.com",
      phone: "+1 (555) 123-4567",
      address: "456 Healthcare Blvd, Medical District, NY 10002",
      established: "1985",
      type: "General Hospital",
      beds: 350,
      departments: 12,
      staff: 850,
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
          <div className="w-8 h-8 border-4 border-chart-1 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const navigationItems = [
    { id: "overview", label: "Overview", icon: "home" },
    { id: "departments", label: "Departments", icon: "department" },
    { id: "staff", label: "Staff", icon: "staff" },
    { id: "users", label: "Users", icon: "users" },
    { id: "doctors", label: "Doctors", icon: "stethoscope" },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <HospitalOverview user={user} />
      case "departments":
        return <DepartmentManagement />
      case "staff":
        return <StaffManagement />
      case "users":
        return <UserSection />
      case "doctors":
        return <DoctorsSection />
      default:
        return <HospitalOverview user={user} />
    }
  }

  return (
    <DashboardLayout
      user={user}
      userType="hospital"
      navigationItems={navigationItems}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onLogout={handleLogout}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
