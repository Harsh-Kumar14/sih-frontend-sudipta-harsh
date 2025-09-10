"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProviderAuth({ userType }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    licenseNumber: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    specialization: "",
    location: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      if (isLogin) {
        // Send POST request with credentials to get doctor ID
        const doctorIdResponse = await fetch("http://localhost:8080/doctorId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            licenseNumber: formData.licenseNumber,
            password: formData.password,
          }),
        })

        if (doctorIdResponse.ok) {
          const doctorIdData = await doctorIdResponse.json()
          const doctorId = doctorIdData.doctorId || doctorIdData.id || doctorIdData

          // Store authentication data
          localStorage.setItem("userType", userType)
          localStorage.setItem("doctorId", doctorId)
          localStorage.setItem("userId", `${userType}_${Date.now()}`)

          console.log("Doctor ID fetched:", doctorId)
          router.push(`/dashboard/${userType}`)
        } else {
          const errorData = await doctorIdResponse.json()
          setError(errorData.message || "Invalid license number or password")
        }
      } else {
        // Registration success - also fetch doctor ID
        const doctorIdResponse = await fetch("http://localhost:8080/doctorId")

        if (doctorIdResponse.ok) {
          const doctorIdData = await doctorIdResponse.json()
          const doctorId = doctorIdData.doctorId || doctorIdData.id || doctorIdData

          localStorage.setItem("userType", userType)
          localStorage.setItem("doctorId", doctorId)
          localStorage.setItem("userId", `${userType}_${Date.now()}`)

          router.push(`/dashboard/${userType}`)
        } else {
          setError("Registration successful but failed to fetch doctor information")
        }
      }
    } catch (error) {
      console.error("Authentication error:", error)
      setError("Authentication failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const getTitle = () => {
    const type = userType === "doctor" ? "Doctor" : userType === "pharmacy" ? "Pharmacy" : "Hospital"
    return isLogin ? `${type} Login` : `${type} Registration`
  }

  const getLicenseLabel = () => {
    if (userType === "doctor") return "Medical License Number"
    if (userType === "pharmacy") return "Pharmacy License Number"
    return "Hospital License Number"
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">{getTitle()}</h3>
        <p className="text-muted-foreground">
          {isLogin ? "Enter your credentials to access your dashboard" : "Create your professional account"}
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                {userType === "doctor" ? "Doctor Name" : userType === "pharmacy" ? "Pharmacy Name" : "Hospital Name"}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required={!isLogin}
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder={`Enter ${userType === "doctor" ? "doctor" : userType === "pharmacy" ? "pharmacy" : "hospital"} name`}
              />
            </div>
            {userType === "pharmacy" && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required={!isLogin}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter email address"
                />
              </div>
            )}
            {userType === "doctor" && (
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-foreground mb-2">
                  Specialization
                </label>
                <input
                  id="specialization"
                  name="specialization"
                  type="text"
                  required={!isLogin}
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="e.g., Cardiology, General Practice"
                />
              </div>
            )}
            {userType === "hospital" && (
              <>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                    Hospital Address
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required={!isLogin}
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter hospital address"
                  />
                </div>
                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium text-foreground mb-2">
                    Hospital Type
                  </label>
                  <input
                    id="specialization"
                    name="specialization"
                    type="text"
                    required={!isLogin}
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., General Hospital, Specialty Center"
                  />
                </div>
              </>
            )}
          </>
        )}

        <div>
          <label htmlFor="licenseNumber" className="block text-sm font-medium text-foreground mb-2">
            {getLicenseLabel()}
          </label>
          <input
            id="licenseNumber"
            name="licenseNumber"
            type="text"
            required
            value={formData.licenseNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder={isLogin ? "Demo: DOC123" : "Enter license number"}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder={isLogin ? "Demo: password" : "Create a password"}
          />
        </div>

        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required={!isLogin}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Confirm your password"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50 ${
            userType === "doctor"
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              : userType === "pharmacy"
                ? "bg-accent text-accent-foreground hover:bg-accent/90"
                : "bg-chart-1 text-white hover:bg-chart-1/90"
          }`}
        >
          {loading ? "Processing..." : isLogin ? "Sign In" : "Register"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:text-primary/80 transition-colors">
          {isLogin ? "Need to register? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>

      {isLogin && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Demo Credentials:</strong>
            <br />
            License: {userType === "hospital" ? "HOSP123" : "DOC123"} | Password: password
          </p>
        </div>
      )}
    </div>
  )
}
