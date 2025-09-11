"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export default function DoctorsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("all")
  const [activeChatDoctor, setActiveChatDoctor] = useState(null)
  const [chatMessages, setChatMessages] = useState({})
  const [newMessage, setNewMessage] = useState("")
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [appointmentForm, setAppointmentForm] = useState({
    patientContact: "",
    patientName: "",
    reason: "",
    consultationType: "general"
  })

  // Fetch doctors data from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:8080/get-doctors')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log('Doctors data received from backend:', data)
        console.log('First doctor structure:', data[0])
        setDoctors(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching doctors:', err)
        setError('Failed to load doctors. Please try again later.')
        // Fallback to empty array or you could set some default doctors here
        setDoctors([])
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  // Generate specializations dynamically from doctors data
  const specializations = ["all", ...new Set(doctors.map(doctor => doctor.specialization))]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialization = selectedSpecialization === "all" || doctor.specialization === selectedSpecialization
    return matchesSearch && matchesSpecialization
  })

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor)
    setShowAppointmentModal(true)
    // Reset form
    setAppointmentForm({
      patientContact: "",
      patientName: "",
      reason: "",
      consultationType: "general"
    })
  }

  const handleCloseAppointmentModal = () => {
    setShowAppointmentModal(false)
    setSelectedDoctor(null)
    setAppointmentForm({
      patientContact: "",
      patientName: "",
      reason: "",
      consultationType: "general"
    })
  }

  const handleAppointmentFormChange = (e) => {
    const { name, value } = e.target
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitAppointment = async (e) => {
    e.preventDefault()
    
    try {
      console.log('Selected doctor object:', selectedDoctor)
      console.log('Available fields in selectedDoctor:', Object.keys(selectedDoctor))
      
      // Check if doctor has a license number
      if (!selectedDoctor.licenseNumber) {
        alert('Error: This doctor does not have a license number in the system. Please contact administration.')
        return
      }
      
      // Prepare the data for the backend API
      const appointmentData = {
        doctorLicenseNumber: selectedDoctor.licenseNumber,
        patientContact: appointmentForm.patientContact,
        patientName: appointmentForm.patientName,
        reason: appointmentForm.reason,
        consultationType: appointmentForm.consultationType
      }

      console.log('Sending appointment data:', appointmentData)

      // Send POST request to backend
      const response = await axios.post('http://localhost:8080/book-consultation', appointmentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 201) {
        alert(`Appointment booked successfully with ${selectedDoctor.name}!\n\nDetails:\nPatient: ${appointmentForm.patientName}\nContact: ${appointmentForm.patientContact}\nReason: ${appointmentForm.reason}\nConsultation Type: ${appointmentForm.consultationType}`)
        handleCloseAppointmentModal()
      }
    } catch (error) {
      console.error('Error booking appointment:', error)
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to book appointment'
        alert(`Error: ${errorMessage}`)
      } else if (error.request) {
        // Request was made but no response received
        alert('Error: Unable to connect to server. Please check your connection and try again.')
      } else {
        // Something else happened
        alert('Error: An unexpected error occurred. Please try again.')
      }
    }
  }

  const handleStartChat = (doctor) => {
    setActiveChatDoctor(doctor)
    if (!chatMessages[doctor.id]) {
      setChatMessages((prev) => ({
        ...prev,
        [doctor.id]: [
          {
            id: 1,
            sender: "doctor",
            message: `Hello! I'm ${doctor.name}. How can I help you today?`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ],
      }))
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChatDoctor) return

    const message = {
      id: Date.now(),
      sender: "patient",
      message: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    }

    setChatMessages((prev) => ({
      ...prev,
      [activeChatDoctor.id]: [...(prev[activeChatDoctor.id] || []), message],
    }))

    setNewMessage("")

    // Simulate doctor response
    setTimeout(() => {
      const doctorResponse = {
        id: Date.now() + 1,
        sender: "doctor",
        message: "Thank you for your message. I'll review your symptoms and get back to you shortly.",
        timestamp: new Date().toLocaleTimeString(),
      }

      setChatMessages((prev) => ({
        ...prev,
        [activeChatDoctor.id]: [...(prev[activeChatDoctor.id] || []), doctorResponse],
      }))
    }, 1000)
  }

  const handleCloseChat = () => {
    setActiveChatDoctor(null)
    setNewMessage("")
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Find Your Doctor</h2>
            <p className="text-lg text-muted-foreground">Search and connect with qualified healthcare professionals</p>
          </div>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <label htmlFor="search" className="text-lg font-bold text-foreground">
                  Search Doctors
                </label>
              </div>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or specialization..."
                className="w-full px-4 py-3 border-2 border-border rounded-xl bg-input text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <label htmlFor="specialization" className="text-lg font-bold text-foreground">
                  Specialization
                </label>
              </div>
              <select
                id="specialization"
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-4 py-3 border-2 border-border rounded-xl bg-input text-foreground text-base focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary shadow-sm"
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec === "all" ? "All Specializations" : spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Loading State */}
      {loading && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-r from-card to-card/50 border-2 border-primary/20 rounded-xl p-12 shadow-lg max-w-md mx-auto">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-lg font-bold text-muted-foreground">Loading doctors...</p>
            <p className="text-base text-muted-foreground mt-2">Please wait while we fetch the best doctors for you</p>
          </div>
        </div>
      )}

      {/* Enhanced Error State */}
      {error && !loading && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-xl p-8 max-w-md mx-auto shadow-lg">
            <p className="text-destructive font-medium">⚠️ {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Doctors List */}
      {!loading && !error && (
        <div className="grid gap-8">
          {filteredDoctors.map((doctor) => (
          <div key={doctor.id || doctor._id} className="bg-gradient-to-r from-card to-card/50 border-2 border-primary/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <div className="relative">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{doctor.name}</h3>
                    <p className="text-xl text-secondary font-bold mb-4">{doctor.specialization}</p>
                    <div className="flex items-center justify-center lg:justify-start gap-6 text-base text-muted-foreground">
                      <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold text-yellow-700">{doctor.rating}</span>
                      </div>
                      <span>{doctor.experience} experience</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{doctor.location}</p>
                    {!doctor.licenseNumber && (
                      <p className="text-xs text-orange-600 mt-1">⚠️ License number not available</p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">
                      {doctor.consultationFee ? 
                        (doctor.consultationFee.toString().startsWith('$') ? 
                          doctor.consultationFee.replace('$', '₹') : 
                          (doctor.consultationFee.toString().includes('₹') ? 
                            doctor.consultationFee : 
                            `₹${doctor.consultationFee}`
                          )
                        ) : 
                        '₹500'
                      }
                    </p>
                    <p className="text-sm text-muted-foreground">Consultation Fee</p>
                    <p
                      className={`text-sm font-medium mt-2 ${
                        doctor.availability && doctor.availability.includes("available") ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {doctor.availability}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    onClick={() => handleBookAppointment(doctor)}
                    disabled={!doctor.licenseNumber}
                    className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                      doctor.licenseNumber 
                        ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:scale-105' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    title={!doctor.licenseNumber ? 'Doctor license number not available' : 'Book appointment'}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {doctor.licenseNumber ? 'Book Appointment' : 'Unavailable'}
                  </button>
                  
                  <button className="border-2 border-border text-foreground px-6 py-3 rounded-xl font-bold text-lg hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 transition-all duration-300 hover:shadow-md hover:scale-105 flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    View Profile
                  </button>
                  
                  <button
                    onClick={() => handleStartChat(doctor)}
                    className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground px-6 py-3 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {!loading && !error && filteredDoctors.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-r from-card to-card/50 border-2 border-border rounded-xl p-12 shadow-lg max-w-md mx-auto">
            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-xl font-bold text-muted-foreground mb-2">No doctors found</p>
            <p className="text-base text-muted-foreground">Try adjusting your search criteria or browse all doctors.</p>
          </div>
        </div>
      )}

      {activeChatDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md h-96 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <img
                  src={activeChatDoctor.image || "/placeholder.svg"}
                  alt={activeChatDoctor.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-foreground">{activeChatDoctor.name}</h3>
                  <p className="text-sm text-muted-foreground">{activeChatDoctor.specialization}</p>
                </div>
              </div>
              <button onClick={handleCloseChat} className="text-muted-foreground hover:text-foreground">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(chatMessages[activeChatDoctor.id || activeChatDoctor._id] || []).map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.sender === "patient" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Booking Modal */}
      {showAppointmentModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDoctor.image || "/placeholder.svg"}
                  alt={selectedDoctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Book Appointment</h3>
                  <p className="text-sm text-muted-foreground">with {selectedDoctor.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedDoctor.specialization}</p>
                </div>
              </div>
              <button 
                onClick={handleCloseAppointmentModal}
                className="text-muted-foreground hover:text-foreground"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Appointment Form */}
            <form onSubmit={handleSubmitAppointment} className="p-6 space-y-4">
              {/* Patient Name */}
              <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-foreground mb-2">
                  Patient Name *
                </label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  required
                  value={appointmentForm.patientName}
                  onChange={handleAppointmentFormChange}
                  placeholder="Enter patient name"
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>

              {/* Patient Contact */}
              <div>
                <label htmlFor="patientContact" className="block text-sm font-medium text-foreground mb-2">
                  Patient Contact *
                </label>
                <input
                  type="tel"
                  id="patientContact"
                  name="patientContact"
                  required
                  value={appointmentForm.patientContact}
                  onChange={handleAppointmentFormChange}
                  placeholder="Enter contact number"
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>

              {/* Reason */}
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-foreground mb-2">
                  Reason for Consultation *
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  required
                  value={appointmentForm.reason}
                  onChange={handleAppointmentFormChange}
                  rows={3}
                  placeholder="Please describe your symptoms or the reason for consultation..."
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>

              {/* Consultation Type */}
              <div>
                <label htmlFor="consultationType" className="block text-sm font-medium text-foreground mb-2">
                  Consultation Type *
                </label>
                <select
                  id="consultationType"
                  name="consultationType"
                  required
                  value={appointmentForm.consultationType}
                  onChange={handleAppointmentFormChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                >
                  <option value="general">General</option>
                  <option value="emergency">Emergency</option>
                  <option value="followup">Follow-up</option>
                  <option value="checkup">Check-up</option>
                </select>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseAppointmentModal}
                  className="flex-1 px-4 py-2 border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
