"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProviderAuth({ userType }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    licenseNumber: "",
    specialization: "",
    experience: "",
    rating: "0",
    contact: "",
    email: "",
    location: "",
    consultationFee: "",
    availability: "available",
    password: "",
    confirmPassword: ""
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
        // Doctor sign-in using /doctor-signin
        const response = await fetch("http://localhost:8080/doctor-signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            licenseNumber: formData.licenseNumber,
            password: formData.password
          })
        });
        if (response.ok) {
          const data = await response.json();
          // Store authentication data (doctorId, userType, and full doctor object)
          localStorage.setItem("userType", userType);
          localStorage.setItem("doctorId", data.doctor._id);
          localStorage.setItem("userId", `${userType}_${Date.now()}`);
          localStorage.setItem("doctorData", JSON.stringify(data.doctor));
          router.push(`/dashboard/${userType}`);
        } else {
          const errorData = await response.json();
          setError(errorData.error || errorData.message || "Invalid license number or password");
        }
      } else {
        // Registration for doctor
        if (userType === "doctor") {
          // Prepare doctor data with all required fields
          const doctorData = {
            name: formData.name,
            licenseNumber: formData.licenseNumber,
            specialization: formData.specialization,
            experience: Number(formData.experience),
            rating: Number(formData.rating),
            contact: formData.contact,
            email: formData.email,
            location: formData.location,
            consultationFee: formData.consultationFee,
            availability: formData.availability,
            password: formData.password
          };
          const response = await fetch("http://localhost:8080/add-doctor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(doctorData)
          });
          if (response.ok) {
            const data = await response.json();
            // After registration, fetch the full doctor object for storage
            const doctorId = data.doctorId;
            localStorage.setItem("userType", userType);
            localStorage.setItem("doctorId", doctorId);
            localStorage.setItem("userId", `${userType}_${Date.now()}`);
            // Fetch doctor details and store
            try {
              const res = await fetch(`http://localhost:8080/doctor/${doctorId}`);
              if (res.ok) {
                const docData = await res.json();
                if (docData && docData.doctor) {
                  localStorage.setItem("doctorData", JSON.stringify(docData.doctor));
                }
              }
            } catch {}
            router.push(`/dashboard/${userType}`);
          } else {
            const errorData = await response.json();
            setError(errorData.message || "Registration failed");
          }
        } else {
          // Registration for other provider types (pharmacy/hospital) - keep existing logic or add as needed
          setError("Registration for this provider type is not implemented yet.");
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
  <div className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto">
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
  {!isLogin && userType === "doctor" && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Doctor Name *</label>
              <input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter doctor name" />
            </div>
            <div>
              <label htmlFor="licenseNumber" className="block text-sm font-medium text-foreground mb-2">Medical License Number *</label>
              <input id="licenseNumber" name="licenseNumber" type="text" required value={formData.licenseNumber} onChange={handleInputChange} className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter license number" />
            </div>
            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-foreground mb-2">Specialization *</label>
              <input id="specialization" name="specialization" type="text" required value={formData.specialization} onChange={handleInputChange} className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g., Cardiology, General Practice" />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-foreground mb-2">Experience (years) *</label>
              <input id="experience" name="experience" type="number" required min="0" value={formData.experience} onChange={handleInputChange} className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter experience in years" />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-foreground mb-2">Rating</label>
              <input id="rating" name="rating" type="number" min="0" max="5" value={formData.rating} onChange={handleInputChange} className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter rating (0-5)" />
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-2">Contact Number *</label>
              <input id="contact" name="contact" type="tel" required value={formData.contact} onChange={handleInputChange} className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter contact number" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email *</label>
              <input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter email address" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">Location</label>
              <input id="location" name="location" type="text" value={formData.location} onChange={handleInputChange} className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter location" />
            </div>
            <div>
              <label htmlFor="consultationFee" className="block text-sm font-medium text-foreground mb-2">Consultation Fee *</label>
              <input id="consultationFee" name="consultationFee" type="text" required value={formData.consultationFee} onChange={handleInputChange} className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter consultation fee" />
            </div>
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-foreground mb-2">Availability *</label>
              <select id="availability" name="availability" required value={formData.availability} onChange={handleInputChange} className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="available">Available</option>
                <option value="not available">Not Available</option>
              </select>
            </div>
          </>
        )}

        {isLogin && (
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
        )}

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
