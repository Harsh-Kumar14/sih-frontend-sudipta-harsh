"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import PatientProfileSection from "../patient/profileSection"
import DoctorProfileSection from "../doctor/profileSection"
import HospitalProfileSection from "../hospital/profileSection"
import PharmacyProfileSection from "../pharmacy/ProfileSection"
export default function DashboardLayout({
  user,
  userType,
  navigationItems,
  activeSection,
  onSectionChange,
  onLogout,
  notificationComponent,
  children,
}) {
  const [currentUser, setCurrentUser] = useState(user)
  const [isUserLoaded, setIsUserLoaded] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)

  useEffect(() => {
    if (user) {
      setCurrentUser(user)
      setIsUserLoaded(true)
    } else {
      try {
        const storedUser = localStorage.getItem("currentUser")
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          setCurrentUser(parsedUser)
          setIsUserLoaded(true)
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error)
      }
    }
  }, [user])

  useEffect(() => {
    if (currentUser && isUserLoaded) {
      try {
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
      } catch (error) {
        console.error("Error saving user data to localStorage:", error)
      }
    }
  }, [currentUser, isUserLoaded])

  const handleLogout = () => {
    setCurrentUser(null)
    setIsUserLoaded(false)
    try {
      localStorage.removeItem("currentUser")
    } catch (error) {
      console.error("Error clearing user data from localStorage:", error)
    }
    if (onLogout) onLogout()
  }

  const getIcon = (iconName) => {
    switch (iconName) {
      case "overview":
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9v8a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 01-2 2H3z" />
          </svg>
        )
      case "patient-queue":
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth={2} />
            <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth={2} />
            <circle cx="12" cy="16" r="3" stroke="currentColor" strokeWidth={2} />
          </svg>
        )
      case "schedule":
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3v4M8 3v4M3 11h18" />
          </svg>
        )
      case "brain":
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4a8 8 0 018 8v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1a8 8 0 018-8z" />
          </svg>
        )
      case "doctor":
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
          </svg>
        )
      case "video":
        return (
          <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="7" width="15" height="10" rx="2" stroke="currentColor" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 7v10l-5-5z" />
          </svg>
        )
      case "pill":
        return (
          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="7" y="7" width="10" height="10" rx="5" stroke="currentColor" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l10 10" />
          </svg>
        )
      case "file-text":
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      default:
        return null
    }
  }

  const getUserTypeColor = () => {
    switch (userType) {
      case "patient":
        return "text-primary"
      case "doctor":
        return "text-secondary"
      case "pharmacy":
        return "text-accent"
      default:
        return "text-primary"
    }
  }

  // Function to render the correct ProfileSection based on userType
  const renderProfileSection = () => {
    if (userType === "doctor") {
      return <DoctorProfileSection initialProfile={currentUser} />
    } 
    else if (userType === "hospital"){
      return <HospitalProfileSection initialProfile={currentUser} />
    }
    else if (userType === "pharmacy"){
      return <PharmacyProfileSection initialProfile={currentUser} />
    }
    
    else {
      return <PatientProfileSection initialProfile={currentUser} />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="text-xl font-bold text-primary">
            HealthCare+
          </Link>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center ${getUserTypeColor()}`}
            >
              {!isUserLoaded ? (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              ) : (
                currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U"
              )}
            </div>
            {/* Visually appealing name + edit section */}
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg shadow-sm">
              <span className="font-semibold text-blue-700 text-lg tracking-wide">
                {!isUserLoaded ? "Loading..." : currentUser?.name || "Guest User"}
              </span>
              <button
                type="button"
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors focus:outline-none flex items-center justify-center"
                title="Edit Profile"
                onClick={() => setShowProfileModal(true)}
              >
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {getIcon(item.icon)}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4M21 12H7" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with notifications */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground capitalize">
              {navigationItems.find((item) => item.id === activeSection)?.label || "Dashboard"}
            </h1>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notification Component */}
              {notificationComponent && <div className="flex items-center">{notificationComponent}</div>}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowProfileModal(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Use the function to render correct profile section */}
            {renderProfileSection()}
          </div>
        </div>
      )}
    </div>
  )
}
