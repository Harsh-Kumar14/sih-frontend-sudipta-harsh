"use client"

import { useState } from "react"
import { z } from "zod"

// Doctor Schema using Zod
export const DoctorSchemaZod = z.object({
  name: z.string().min(1, "Name is required"),
  specialization: z.string().min(1, "Specialization is required"),
  experience: z.string().min(1, "Experience is required"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  contact: z.string().min(1, "Contact is required"),
  email: z.string().email("Invalid email format"),
  location: z.string().min(1, "Location is required"),
  consultationFee: z.string().min(1, "Consultation fee is required"),
  availability: z.string().min(1, "Availability is required")
})

export default function DoctorsSection() {
  // Mock data for existing doctors
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Emily Rodriguez",
      specialization: "Cardiology",
      experience: "8 years",
      rating: 4.8,
      contact: "+1 (555) 234-5678",
      email: "emily.rodriguez@healthcarePlus.com",
      location: "Downtown Medical Center",
      consultationFee: "$150",
      availability: "Available",
      dateAdded: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      name: "Dr. James Park",
      specialization: "Dermatology",
      experience: "6 years",
      rating: 4.6,
      contact: "+1 (555) 345-6789",
      email: "james.park@healthcarePlus.com",
      location: "Westside Clinic",
      consultationFee: "$120",
      availability: "Busy",
      dateAdded: "2024-01-12T14:30:00Z"
    },
    {
      id: 3,
      name: "Dr. Sarah Kim",
      specialization: "Pediatrics",
      experience: "10 years",
      rating: 4.9,
      contact: "+1 (555) 456-7890",
      email: "sarah.kim@healthcarePlus.com",
      location: "Children's Medical Center",
      consultationFee: "$130",
      availability: "Available",
      dateAdded: "2024-01-10T09:15:00Z"
    },
    {
      id: 4,
      name: "Dr. Michael Chen",
      specialization: "Orthopedics",
      experience: "12 years",
      rating: 4.7,
      contact: "+1 (555) 567-8901",
      email: "michael.chen@healthcarePlus.com",
      location: "Sports Medicine Institute",
      consultationFee: "$180",
      availability: "On Leave",
      dateAdded: "2024-01-08T16:45:00Z"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialization, setFilterSpecialization] = useState("all")
  const [editingDoctor, setEditingDoctor] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [notification, setNotification] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const [addFormData, setAddFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    rating: "",
    contact: "",
    email: "",
    location: "",
    consultationFee: "",
    availability: "Available"
  })
  const [errors, setErrors] = useState({})

  const specializations = [
    "Cardiology", "Dermatology", "Pediatrics", "Orthopedics", "Neurology",
    "Psychiatry", "Gynecology", "Urology", "Oncology", "Emergency Medicine",
    "Internal Medicine", "General Practice"
  ]

  const availabilityOptions = ["Available", "Busy", "On Leave", "Part-time"]

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = filterSpecialization === "all" || doctor.specialization === filterSpecialization
    return matchesSearch && matchesSpecialty
  })

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor)
    setEditFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      rating: doctor.rating.toString(),
      contact: doctor.contact,
      email: doctor.email,
      location: doctor.location,
      consultationFee: doctor.consultationFee,
      availability: doctor.availability
    })
    setShowEditModal(true)
    setErrors({})
  }

  const handleCloseModal = () => {
    setShowEditModal(false)
    setShowAddModal(false)
    setEditingDoctor(null)
    setEditFormData({})
    setAddFormData({
      name: "",
      specialization: "",
      experience: "",
      rating: "",
      contact: "",
      email: "",
      location: "",
      consultationFee: "",
      availability: "Available"
    })
    setErrors({})
  }

  const validateEditForm = () => {
    try {
      const validatedData = DoctorSchemaZod.parse({
        ...editFormData,
        rating: parseFloat(editFormData.rating) || 0
      })
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {}
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const validateAddForm = () => {
    try {
      const validatedData = DoctorSchemaZod.parse({
        ...addFormData,
        rating: parseFloat(addFormData.rating) || 0
      })
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {}
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleUpdateDoctor = (e) => {
    e.preventDefault()
    
    if (!validateEditForm()) {
      return
    }

    const updatedDoctor = {
      ...editingDoctor,
      ...editFormData,
      rating: parseFloat(editFormData.rating) || 0,
      dateUpdated: new Date().toISOString()
    }

    setDoctors(prev => 
      prev.map(doctor => 
        doctor.id === editingDoctor.id ? updatedDoctor : doctor
      )
    )

    handleCloseModal()
    // Show success message
    alert("Doctor information updated successfully!")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (showEditModal) {
      setEditFormData(prev => ({
        ...prev,
        [name]: value
      }))
    } else if (showAddModal) {
      setAddFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const handleAddDoctor = (e) => {
    e.preventDefault()
    
    if (!validateAddForm()) {
      return
    }

    const newDoctor = {
      id: Date.now(),
      ...addFormData,
      rating: parseFloat(addFormData.rating) || 0,
      dateAdded: new Date().toISOString()
    }

    setDoctors(prev => [...prev, newDoctor])
    handleCloseModal()
    alert("Doctor added successfully!")
  }

  const handleOpenAddModal = () => {
    setIsButtonLoading(true)
    // Add a small delay for visual feedback
    setTimeout(() => {
      setShowAddModal(true)
      setErrors({})
      setIsButtonLoading(false)
    }, 200)
  }

  const handleDeleteDoctor = (doctorId) => {
    if (window.confirm("Are you sure you want to remove this doctor from the network?")) {
      setDoctors(prev => prev.filter(doctor => doctor.id !== doctorId))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Doctors Network</h2>
          <p className="text-muted-foreground mt-1">
            Manage and view all healthcare providers in your network
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            onClick={handleOpenAddModal}
            disabled={isButtonLoading}
            className={`px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 transform ${
              isButtonLoading 
                ? 'scale-95 opacity-70 cursor-not-allowed' 
                : 'hover:bg-primary/90 hover:scale-105 hover:shadow-lg active:scale-95'
            }`}
          >
            {isButtonLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Doctor</span>
              </>
            )}
          </button>
          <span className="text-sm text-muted-foreground">
            {filteredDoctors.length} doctors found
          </span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search doctors by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={filterSpecialization}
          onChange={(e) => setFilterSpecialization(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Specializations</option>
          {specializations.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor, index) => (
          <div 
            key={doctor.id} 
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4 fade-in-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Doctor Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                doctor.availability === "Available" 
                  ? "bg-green-100 text-green-800" 
                  : doctor.availability === "Busy"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {doctor.availability}
              </span>
            </div>

            {/* Doctor Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Experience:</span>
                <span className="text-sm font-medium text-foreground">{doctor.experience}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Rating:</span>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Fee:</span>
                <span className="text-sm font-medium text-foreground">{doctor.consultationFee}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Contact:</span>
                <span className="text-sm text-foreground">{doctor.contact}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Email:</span>
                <span className="text-sm text-foreground truncate max-w-[150px]" title={doctor.email}>
                  {doctor.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Location:</span>
                <span className="text-sm text-foreground text-right flex-1 ml-2 truncate" title={doctor.location}>
                  {doctor.location}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditDoctor(doctor)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-1 hover:scale-105 active:scale-95 transform hover:shadow-md"
              >
                <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDeleteDoctor(doctor.id)}
                className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-all duration-200 flex items-center justify-center space-x-1 hover:scale-105 active:scale-95 transform hover:shadow-md"
              >
                <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No doctors found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or add new doctors to your network.
          </p>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in-0 duration-300">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Edit Doctor Information</h3>
              <button
                onClick={handleCloseModal}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-muted rounded-full p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdateDoctor} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium text-foreground mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={editFormData.name || ""}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.name ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Specialization */}
                <div>
                  <label htmlFor="edit-specialization" className="block text-sm font-medium text-foreground mb-1">
                    Specialization *
                  </label>
                  <select
                    id="edit-specialization"
                    name="specialization"
                    value={editFormData.specialization || ""}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.specialization ? 'border-red-500' : 'border-border'
                    }`}
                  >
                    <option value="">Select Specialization</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                  {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
                </div>

                {/* Experience */}
                <div>
                  <label htmlFor="edit-experience" className="block text-sm font-medium text-foreground mb-1">
                    Experience *
                  </label>
                  <input
                    type="text"
                    id="edit-experience"
                    name="experience"
                    value={editFormData.experience || ""}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.experience ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                </div>

                {/* Rating */}
                <div>
                  <label htmlFor="edit-rating" className="block text-sm font-medium text-foreground mb-1">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    id="edit-rating"
                    name="rating"
                    value={editFormData.rating || ""}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.rating ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                </div>

                {/* Contact */}
                <div>
                  <label htmlFor="edit-contact" className="block text-sm font-medium text-foreground mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="text"
                    id="edit-contact"
                    name="contact"
                    value={editFormData.contact || ""}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.contact ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="edit-email" className="block text-sm font-medium text-foreground mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="edit-email"
                    name="email"
                    value={editFormData.email || ""}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="edit-location" className="block text-sm font-medium text-foreground mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="edit-location"
                    name="location"
                    value={editFormData.location || ""}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.location ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                {/* Consultation Fee */}
                <div>
                  <label htmlFor="edit-consultationFee" className="block text-sm font-medium text-foreground mb-1">
                    Consultation Fee *
                  </label>
                  <input
                    type="text"
                    id="edit-consultationFee"
                    name="consultationFee"
                    value={editFormData.consultationFee || ""}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.consultationFee ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.consultationFee && <p className="text-red-500 text-sm mt-1">{errors.consultationFee}</p>}
                </div>

                {/* Availability */}
                <div>
                  <label htmlFor="edit-availability" className="block text-sm font-medium text-foreground mb-1">
                    Availability *
                  </label>
                  <select
                    id="edit-availability"
                    name="availability"
                    value={editFormData.availability || ""}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.availability ? 'border-red-500' : 'border-border'
                    }`}
                  >
                    {availabilityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-all duration-200 hover:scale-105 active:scale-95 transform"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 transform hover:shadow-lg"
                >
                  Update Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in-0 duration-300">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Add New Doctor</h3>
              <button
                onClick={handleCloseModal}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-muted rounded-full p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddDoctor} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="add-name" className="block text-sm font-medium text-foreground mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="add-name"
                    name="name"
                    value={addFormData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.name ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Dr. John Smith"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Specialization */}
                <div>
                  <label htmlFor="add-specialization" className="block text-sm font-medium text-foreground mb-1">
                    Specialization *
                  </label>
                  <select
                    id="add-specialization"
                    name="specialization"
                    value={addFormData.specialization}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.specialization ? 'border-red-500' : 'border-border'
                    }`}
                  >
                    <option value="">Select Specialization</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                  {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
                </div>

                {/* Experience */}
                <div>
                  <label htmlFor="add-experience" className="block text-sm font-medium text-foreground mb-1">
                    Experience *
                  </label>
                  <input
                    type="text"
                    id="add-experience"
                    name="experience"
                    value={addFormData.experience}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.experience ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="5 years"
                  />
                  {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                </div>

                {/* Rating */}
                <div>
                  <label htmlFor="add-rating" className="block text-sm font-medium text-foreground mb-1">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    id="add-rating"
                    name="rating"
                    value={addFormData.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.rating ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="4.5"
                  />
                  {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                </div>

                {/* Contact */}
                <div>
                  <label htmlFor="add-contact" className="block text-sm font-medium text-foreground mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="text"
                    id="add-contact"
                    name="contact"
                    value={addFormData.contact}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.contact ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="add-email" className="block text-sm font-medium text-foreground mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="add-email"
                    name="email"
                    value={addFormData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="doctor@hospital.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="add-location" className="block text-sm font-medium text-foreground mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="add-location"
                    name="location"
                    value={addFormData.location}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.location ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="City Hospital, New York"
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                {/* Consultation Fee */}
                <div>
                  <label htmlFor="add-consultationFee" className="block text-sm font-medium text-foreground mb-1">
                    Consultation Fee *
                  </label>
                  <input
                    type="text"
                    id="add-consultationFee"
                    name="consultationFee"
                    value={addFormData.consultationFee}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.consultationFee ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="$150"
                  />
                  {errors.consultationFee && <p className="text-red-500 text-sm mt-1">{errors.consultationFee}</p>}
                </div>

                {/* Availability */}
                <div>
                  <label htmlFor="add-availability" className="block text-sm font-medium text-foreground mb-1">
                    Availability *
                  </label>
                  <select
                    id="add-availability"
                    name="availability"
                    value={addFormData.availability}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.availability ? 'border-red-500' : 'border-border'
                    }`}
                  >
                    {availabilityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-all duration-200 hover:scale-105 active:scale-95 transform"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 transform hover:shadow-lg"
                >
                  Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
