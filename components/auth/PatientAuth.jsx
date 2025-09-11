"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function PatientAuth() {
  // SMS Configuration - 2Factor.in integration
  const SMS_CONFIG = {
    provider: '2factor', // Using 2Factor.in
    apiKeys: {
      twofactor: '5137f3aa-8f29-11f0-a562-0200cd936042', // Replace with your actual 2Factor.in API key
      templateName: 'YOUR_TEMPLATE_NAME' // Optional: if you have a custom template
    }
  }

  const [isLogin, setIsLogin] = useState(true)
  const [showOtpSection, setShowOtpSection] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    age: "",
    gender: "",
  })
  const [otpData, setOtpData] = useState({
    otp: "",
    generatedOtp: "",
    userInfo: null
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
      if (!formData.contact) {
        setError("Please enter your contact number")
        setLoading(false)
        return
      }

      // Validate mobile number - must be exactly 10 digits
      if (!/^\d{10}$/.test(formData.contact)) {
        setError("Please enter a valid 10-digit mobile number")
        setLoading(false)
        return
      }

      // Check if user exists in database
      const response = await axios.get('http://localhost:8080/get-users')
      const users = response.data // Direct array from the endpoint

      // Find user by contact number
      const existingUser = users.find(user => user.contact === formData.contact)

      if (!existingUser) {
        setError("User not found. Please sign up first.")
        setLoading(false)
        return
      }

      // User exists, generate and send OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString() // 6-digit OTP
      
      // Send OTP to user's mobile (using demo for now)
      await sendOtpToMobile(formData.contact, generatedOtp)
      
      // Store OTP and user info for verification
      setOtpData({
        otp: "",
        generatedOtp: generatedOtp,
        userInfo: existingUser
      })

      setShowOtpSection(true)
      setSuccess(`OTP sent to ${formData.contact}. Please check your messages.`)
      
    } catch (err) {
      console.error('Login error:', err)
      if (err.response) {
        setError(`Error: ${err.response.data?.message || 'Failed to connect to server'}`)
      } else if (err.request) {
        setError('Error: Unable to connect to server. Please check your connection.')
      } else {
        setError('Error: An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const sendOtpToMobile = async (mobileNumber, otp) => {
    try {
      // Always log for demo/testing purposes
      console.log(`OTP for ${mobileNumber}: ${otp}`)
      
      // Handle different SMS providers based on configuration
      switch (SMS_CONFIG.provider) {
        case '2factor':
          return await sendVia2Factor(mobileNumber, otp);
        
        case 'demo':
        default:
          // Demo mode - just simulate delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          console.log('Demo mode: SMS would be sent in production');
          return true;
      }
      
    } catch (error) {
      console.error('SMS sending error:', error)
      // Don't fail the login process, continue in demo mode
      console.log('SMS sending failed, continuing in demo mode');
      return true;
    }
  }

  // 2Factor.in SMS provider function
  const sendVia2Factor = async (mobileNumber, otp) => {
    try {
      // 2Factor.in API endpoint structure: https://2factor.in/API/V1/{api_key}/SMS/{phone_number}/{otp}
      const apiUrl = `https://2factor.in/API/V1/${SMS_CONFIG.apiKeys.twofactor}/SMS/${mobileNumber}/${otp}`;
      
      console.log('Sending OTP via 2Factor.in to:', mobileNumber);
      
      const response = await axios.get(apiUrl);

      console.log('2Factor.in API Response:', response.data);

      // Check if SMS was sent successfully
      if (response.data && response.data.Status === 'Success') {
        console.log('SMS sent successfully via 2Factor.in');
        console.log('Session ID:', response.data.Details); // Store this for verification if needed
        return true;
      } else {
        console.error('2Factor.in API Error:', response.data);
        throw new Error(`2Factor.in API failed: ${response.data?.Details || 'Unknown error'}`);
      }
      
    } catch (error) {
      console.error('2Factor.in SMS sending error:', error);
      
      if (error.response) {
        console.error('2Factor.in API Response Error:', error.response.data);
        // Common 2Factor.in error codes:
        // "Invalid API Key" - Check your API key
        // "Invalid Mobile Number" - Check mobile number format
        // "Insufficient Balance" - Top up your account
        throw new Error(`2Factor.in API Error: ${error.response.data?.Details || error.response.status}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to reach 2Factor.in API');
      } else {
        throw new Error(`2Factor.in Error: ${error.message}`);
      }
    }
  }

  const handleOtpVerification = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!otpData.otp) {
        setError("Please enter the OTP")
        setLoading(false)
        return
      }

      if (otpData.otp !== otpData.generatedOtp) {
        setError("Invalid OTP. Please try again.")
        setLoading(false)
        return
      }

      // OTP verified successfully, log in the user
      const userData = {
        name: otpData.userInfo.name,
        contact: otpData.userInfo.contact,
        id: otpData.userInfo._id || otpData.userInfo.id
      }
      
      localStorage.setItem("userType", "patient")
      localStorage.setItem("currentUser", JSON.stringify(userData))
      
      setSuccess("Login successful! Redirecting...")
      setTimeout(() => {
        router.push("/dashboard/patient")
      }, 1500)

    } catch (err) {
      console.error('OTP verification error:', err)
      setError('OTP verification failed. Please try again.')
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

      // Validate mobile number - must be exactly 10 digits
      if (!/^\d{10}$/.test(formData.contact)) {
        setError("Please enter a valid 10-digit mobile number")
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
        setSuccess("Account created successfully! Please login with your mobile number.")
        
        // Clear the form
        setFormData({ name: "", contact: "", age: "", gender: "" })
        
        // Switch to login mode after successful signup
        setTimeout(() => {
          setIsLogin(true) // Switch to login form
          setSuccess("Registration successful! Please login to continue.")
        }, 2000)
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
    const { name, value } = e.target
    
    // For contact field, only allow digits and limit to 10 characters
    if (name === 'contact') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10)
      setFormData({
        ...formData,
        [name]: numericValue,
      })
      
      // Clear error if user is typing valid number
      if (error && numericValue.length <= 10) {
        setError("")
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const resetForm = () => {
    setFormData({ name: "", contact: "", age: "", gender: "" })
    setOtpData({ otp: "", generatedOtp: "", userInfo: null })
    setShowOtpSection(false)
    setError("")
    setSuccess("")
  }

  const handleResendOtp = async () => {
    setLoading(true)
    setError("")
    
    try {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
      await sendOtpToMobile(formData.contact, newOtp)
      
      setOtpData(prev => ({
        ...prev,
        generatedOtp: newOtp,
        otp: ""
      }))
      
      setSuccess("New OTP sent successfully!")
    } catch (err) {
      setError("Failed to resend OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {!isLogin ? "Patient Registration" : showOtpSection ? "Verify OTP" : "Patient Login"}
        </h3>
        <p className="text-muted-foreground">
          {!isLogin 
            ? "Fill in your details to create an account" 
            : showOtpSection 
            ? "Enter the OTP sent to your mobile number" 
            : "Enter your contact number to login"
          }
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
        !showOtpSection ? (
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
                maxLength="10"
                pattern="[0-9]{10}"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter 10-digit mobile number"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter mobile number without country code (10 digits)
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerification} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-foreground mb-2">
                Enter OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength="6"
                value={otpData.otp}
                onChange={(e) => setOtpData(prev => ({ ...prev, otp: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-center text-lg tracking-widest"
                placeholder="000000"
              />
              <p className="text-sm text-muted-foreground mt-2">
                OTP sent to {formData.contact}
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
              >
                Resend OTP
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowOtpSection(false)
                  setOtpData({ otp: "", generatedOtp: "", userInfo: null })
                  setError("")
                  setSuccess("")
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Change Number
              </button>
            </div>
          </form>
        )
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
              maxLength="10"
              pattern="[0-9]{10}"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter 10-digit mobile number"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter mobile number without country code (10 digits)
            </p>
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
        {!showOtpSection && (
          <button 
            onClick={() => {
              setIsLogin(!isLogin)
              resetForm()
            }} 
            className="text-primary hover:text-primary/80 transition-colors"
          >
            {isLogin ? "Need to register? Sign up" : "Already have an account? Sign in"}
          </button>
        )}
      </div>
    </div>
  )
}
