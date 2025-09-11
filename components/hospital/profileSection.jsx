import React, { useState } from "react"

const HospitalProfileSection = ({ initialProfile, onSave }) => {
  const [profile, setProfile] = useState(
    initialProfile || {
      name: "",
      mobile: "",
    }
  )
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMsg, setSuccessMsg] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setProfile(initialProfile)
    setErrors({})
    setSuccessMsg("")
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
    setIsEditing(false)
    setSuccessMsg("Profile updated successfully")
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

  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Hospital Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile No</label>
          <input
            type="text"
            name="mobile"
            value={profile.mobile}
            onChange={handleChange}
            disabled={!isEditing}
            maxLength={10}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.mobile ? "border-red-500" : ""}`}
          />
          {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
        </div>
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
        {successMsg && <p className="text-green-600 text-sm mt-2">{successMsg}</p>}
      </form>
    </div>
  )
}

export default HospitalProfileSection