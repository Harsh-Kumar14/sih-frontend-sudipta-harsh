"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function PatientAuth() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    age: "",
    gender: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // For now, simulate login with contact number
      // You can implement proper login logic later
      if (formData.contact) {
        const userData = {
          name: "Demo Patient", // This would come from actual login API
          contact: formData.contact,
          id: "patient_" + Date.now()
        }
        
        localStorage.setItem("userType", "patient")
        localStorage.setItem("currentUser", JSON.stringify(userData))
        router.push("/dashboard/patient")
      } else {
        setError("Please enter your contact number")
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Validate form data
      if (!formData.name || !formData.contact || !formData.age || !formData.gender) {
        setError("Please fill in all required fields")
        setLoading(false)
        return
      }

      // Prepare data for backend API
      const userData = {
        name: formData.name,
        contact: formData.contact,
        age: parseInt(formData.age),
        gender: formData.gender,
        doctorId: "" // Optional field, empty for now
      }

      console.log('Sending user data:', userData)

      // Make API call to backend
      const response = await axios.post('http://localhost:8080/add-user', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 201) {
        setSuccess("Account created successfully! You can now login.")
        
        // Store user data for immediate login
        const createdUser = {
          name: response.data.user.name,
          contact: response.data.user.contact,
          id: response.data.userId
        }
        
        localStorage.setItem("userType", "patient")
        localStorage.setItem("currentUser", JSON.stringify(createdUser))
        
        // Redirect to dashboard after successful signup
        setTimeout(() => {
          router.push("/dashboard/patient")
        }, 1500)
      }
    } catch (err) {
      console.error('Signup error:', err)
      
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data?.message || err.response.data?.error || 'Signup failed'
        setError(`Error: ${errorMessage}`)
      } else if (err.request) {
        // Request was made but no response received
        setError('Error: Unable to connect to server. Please check your connection.')
      } else {
        // Something else happened
        setError('Error: An unexpected error occurred. Please try again.')
      }
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

  const resetForm = () => {
    setFormData({ name: "", contact: "", age: "", gender: "" })
    setError("")
    setSuccess("")
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {isLogin ? "Patient Login" : "Patient Registration"}
        </h3>
        <p className="text-muted-foreground">
          {isLogin ? "Enter your contact number to login" : "Fill in your details to create an account"}
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-md mb-4">
          {success}
        </div>
      )}

      {isLogin ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-2">
              Contact Number
            </label>
            <input
              id="contact"
              name="contact"
              type="tel"
              required
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your contact number"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-2">
              Contact Number *
            </label>
            <input
              id="contact"
              name="contact"
              type="tel"
              required
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your contact number"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-foreground mb-2">
              Age *
            </label>
            <input
              id="age"
              name="age"
              type="number"
              required
              min="1"
              max="120"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-foreground mb-2">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      )}

      <div className="mt-6 text-center">
        <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:text-primary/80 transition-colors">
          {isLogin ? "Need to register? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  )
}
