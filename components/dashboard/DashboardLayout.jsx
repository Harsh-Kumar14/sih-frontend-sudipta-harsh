"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function DashboardLayout({
  user,
  userType,
  navigationItems,
  activeSection,
  onSectionChange,
  onLogout,
  children,
}) {
  const [currentUser, setCurrentUser] = useState(user)
  const [isUserLoaded, setIsUserLoaded] = useState(false)

  useEffect(() => {
    // Update the user when the user prop changes (after login)
    if (user) {
      setCurrentUser(user)
      setIsUserLoaded(true)
    } else {
      // If no user is provided, check localStorage for persisted user data
      try {
        const storedUser = localStorage.getItem('currentUser')
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          setCurrentUser(parsedUser)
          setIsUserLoaded(true)
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error)
      }
    }
  }, [user])

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser && isUserLoaded) {
      try {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
      } catch (error) {
        console.error('Error saving user data to localStorage:', error)
      }
    }
  }, [currentUser, isUserLoaded])

  const handleLogout = () => {
    // Clear user data from state and localStorage
    setCurrentUser(null)
    setIsUserLoaded(false)
    try {
      localStorage.removeItem('currentUser')
    } catch (error) {
      console.error('Error clearing user data from localStorage:', error)
    }
    // Call the original logout handler
    if (onLogout) {
      onLogout()
    }
  }

  const getIcon = (iconName) => {
    const icons = {
      home: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      doctor: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      video: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      pill: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      queue: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      schedule: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      inventory: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      location: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    }
    return icons[iconName] || icons.home
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
                currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'
              )}
            </div>
            <div>
              <p className="font-medium text-foreground">
                {!isUserLoaded ? 'Loading...' : (currentUser?.name || 'Guest User')}
              </p>
              <p className="text-sm text-muted-foreground capitalize">{userType}</p>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground capitalize">
              {navigationItems.find((item) => item.id === activeSection)?.label || "Dashboard"}
            </h1>
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
