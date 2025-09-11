"use client"
import { useState } from "react"

export default function ProfileSection({ initialProfile, onSave, onClose }) {
  const [profile, setProfile] = useState(
    initialProfile || {
      name: "",
      age: "",
      gender: "",
      location: "",
      mobile: "",
    }
  )
  const [savedProfile, setSavedProfile] = useState(initialProfile || {})
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMsg, setSuccessMsg] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!(profile.name ?? "").trim()) newErrors.name = "Name is required"
    if (!profile.age || isNaN(profile.age) || profile.age < 0) newErrors.age = "Valid age required"
    if (!profile.gender) newErrors.gender = "Gender is required"
    if (!(profile.location ?? "").trim()) newErrors.location = "Location is required"
    if (!/^\d{10}$/.test(profile.mobile ?? "")) newErrors.mobile = "Valid 10-digit mobile number required"
    return newErrors
  }

  const handleEdit = () => {
    setIsEditing(true)
    setSuccessMsg("")
  }

  const handleCancel = () => {
    setIsEditing(false)
    setErrors({})
    setSuccessMsg("")
    setProfile(savedProfile) // reset to last saved profile
  }

  const handleSave = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    if (onSave) {
      onSave(profile)
    }

    setSavedProfile(profile)
    setIsEditing(false)
    setSuccessMsg("Profile updated successfully")
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Patient Profile</h2>
      </div>
      <form onSubmit={handleSave} className="space-y-4">
        {/* Name */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`block w-full px-3 py-2 text-base rounded-md border shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.name ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
            } ${!isEditing ? "bg-gray-100 text-gray-600" : ""}`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
        </div>

        {/* Age */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age (Years)
          </label>
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            disabled={!isEditing}
            min="0"
            max="120"
            className={`block w-full px-3 py-2 text-base rounded-md border shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
              errors.age ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
            } ${!isEditing ? "bg-gray-100 text-gray-600" : ""}`}
            placeholder="Enter your age"
          />
          {errors.age && <p className="text-sm text-red-600 mt-1">{errors.age}</p>}
        </div>

        {/* Gender */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            disabled={!isEditing}
            className={`block w-full px-3 py-2 text-base rounded-md border shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              errors.gender ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
            } ${!isEditing ? "bg-gray-100 text-gray-600" : ""}`}
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-sm text-red-600 mt-1">{errors.gender}</p>}
        </div>

        {/* Location */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location (Village/City)
          </label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            disabled={!isEditing}
            className={`block w-full px-3 py-2 text-base rounded-md border shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
              errors.location ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
            } ${!isEditing ? "bg-gray-100 text-gray-600" : ""}`}
            placeholder="Enter your village or city name"
          />
          {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location}</p>}
        </div>

        {/* Mobile */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <input
            type="text"
            name="mobile"
            value={profile.mobile}
            onChange={handleChange}
            disabled={!isEditing}
            maxLength={10}
            className={`block w-full px-3 py-2 text-base rounded-md border shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
              errors.mobile ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
            } ${!isEditing ? "bg-gray-100 text-gray-600" : ""}`}
            placeholder="Enter 10-digit mobile number"
          />
          {errors.mobile && <p className="text-sm text-red-600 mt-1">{errors.mobile}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-200">
          {!isEditing ? (
            <button
              type="button"
              onClick={handleEdit}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-medium flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-base font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-base font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </>
          )}
        </div>

        {/* Success Message */}
        {successMsg && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-700 text-sm font-medium">{successMsg}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
