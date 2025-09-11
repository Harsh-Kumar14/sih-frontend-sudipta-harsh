"use client"
import { useState } from "react"

export default function ProfileSection({ initialProfile, onSave }) {
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
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Patient Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.age ? "border-red-500" : ""
            }`}
          />
          {errors.age && <p className="text-xs text-red-600 mt-1">{errors.age}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.gender ? "border-red-500" : ""
            }`}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-xs text-red-600 mt-1">{errors.gender}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.location ? "border-red-500" : ""
            }`}
          />
          {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile No</label>
          <input
            type="text"
            name="mobile"
            value={profile.mobile}
            onChange={handleChange}
            disabled={!isEditing}
            maxLength={10}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.mobile ? "border-red-500" : ""
            }`}
          />
          {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
        </div>

        {/* Buttons */}
        <div className="flex space-x-2 mt-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={handleEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* Success message */}
        {successMsg && <p className="text-green-600 text-sm mt-2">{successMsg}</p>}
      </form>
    </div>
  )
}
