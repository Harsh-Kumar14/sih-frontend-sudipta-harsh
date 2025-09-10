"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import PatientAuth from "../../components/auth/PatientAuth"
import ProviderAuth from "../../components/auth/ProviderAuth"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const [userType, setUserType] = useState("patient")

  useEffect(() => {
    const type = searchParams.get("type")
    if (type && ["patient", "doctor", "pharmacy", "hospital"].includes(type)) {
      setUserType(type)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">
              HealthCare+
            </Link>
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* User Type Selector */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Sign In</h2>

            <div className="flex bg-muted rounded-lg p-1 mb-8">
              <button
                onClick={() => setUserType("patient")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  userType === "patient"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Patient
              </button>
              <button
                onClick={() => setUserType("doctor")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  userType === "doctor"
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Doctor
              </button>
              <button
                onClick={() => setUserType("pharmacy")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  userType === "pharmacy"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Pharmacy
              </button>
              <button
                onClick={() => setUserType("hospital")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  userType === "hospital" ? "bg-chart-1 text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Hospital
              </button>
            </div>
          </div>

          {/* Auth Forms */}
          {userType === "patient" ? <PatientAuth /> : <ProviderAuth userType={userType} />}
        </div>
      </div>
    </div>
  )
}
