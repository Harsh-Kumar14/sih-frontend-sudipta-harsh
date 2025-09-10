"use client";

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "../../../components/dashboard/DashboardLayout"
import PharmacyOverview from "../../../components/pharmacy/PharmacyOverview"
import InventoryManagement from "../../../components/pharmacy/InventoryManagement"
import LocationManagement from "../../../components/pharmacy/LocationManagement"
// import DoctorsSection from "../../../components/pharmacy/DoctorsSection"
// import UserSection from "../../../components/pharmacy/UserSection"

export default function PharmacyDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const userType = localStorage.getItem("userType")
    const userId = localStorage.getItem("userId")

    if (!userType || userType !== "pharmacy") {
      router.push("/login?type=pharmacy")
      return
    }

    // Mock pharmacy data
    setUser({
      id: userId,
      name: "HealthPlus Pharmacy",
      licenseNumber: "PHARM456",
      email: "contact@healthplus.com",
      phone: "+1 (555) 789-0123",
      address: "123 Main Street, New York, NY 10001",
      established: "2015",
      operatingHours: "8:00 AM - 10:00 PM",
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
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const navigationItems = [
    { id: "overview", label: "Overview", icon: "home" },
    { id: "inventory", label: "Inventory", icon: "inventory" },
    { id: "location", label: "Location", icon: "location" },
    
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <PharmacyOverview user={user} />
      case "inventory":
        return <InventoryManagement />
      case "location":
        return <LocationManagement user={user} />
     
      default:
        return <PharmacyOverview user={user} />
    }
  }

  return (
    <DashboardLayout
      user={user}
      userType="pharmacy"
      navigationItems={navigationItems}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onLogout={handleLogout}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
  