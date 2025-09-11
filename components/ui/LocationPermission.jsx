"use client"

import { useState } from 'react'
import { getCurrentLocation, getCurrentLocationAndUpdate } from '@/lib/locationService'

export default function LocationPermission({ 
  userId = null, 
  onLocationUpdate = null, 
  showCoordinates = true,
  className = "",
  variant = "default" // "default", "compact", "button-only"
}) {
  const [location, setLocation] = useState(null)
  const [locationPermission, setLocationPermission] = useState(null) // null, 'granted', 'denied'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Function to validate MongoDB ObjectId
  const isValidObjectId = (id) => {
    return id && typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id)
  }

  const handleGetLocation = async () => {
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (userId) {
        // Validate userId format (should be MongoDB ObjectId)
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
          setError("Invalid user ID. Location will be captured locally only.")
          // Just get location without updating backend for invalid user IDs
          const locationData = await getCurrentLocation()
          setLocation(locationData)
          setLocationPermission('granted')
          setSuccess("Location access granted! (Local only due to invalid user ID)")
          
          if (onLocationUpdate) {
            onLocationUpdate(locationData)
          }
          return
        }
        
        // Update location for existing user with valid ID
        const result = await getCurrentLocationAndUpdate(userId)
        
        if (result.success) {
          setLocation(result.location)
          setLocationPermission('granted')
          setSuccess("Location updated successfully!")
          
          if (onLocationUpdate) {
            onLocationUpdate(result.location, result.user)
          }
        } else {
          setError(result.error)
          setLocationPermission('denied')
        }
      } else {
        // Just get location without updating backend
        const locationData = await getCurrentLocation()
        setLocation(locationData)
        setLocationPermission('granted')
        setSuccess("Location access granted!")
        
        if (onLocationUpdate) {
          onLocationUpdate(locationData)
        }
      }
    } catch (err) {
      setError(err.message)
      setLocationPermission('denied')
    } finally {
      setLoading(false)
    }
  }

  if (variant === "button-only") {
    return (
      <button
        type="button"
        onClick={handleGetLocation}
        disabled={loading || locationPermission === 'granted'}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 ${className}`}
      >
        {loading ? "Getting Location..." : 
         locationPermission === 'granted' ? "✅ Location Enabled" : 
         "📍 Enable Location"}
      </button>
    )
  }

  if (variant === "compact") {
    return (
      <div className={`border rounded-md p-3 ${className}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">📍 Location Access</span>
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={loading || locationPermission === 'granted'}
            className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Getting..." : 
             locationPermission === 'granted' ? "✅ Enabled" : "Enable"}
          </button>
        </div>
        
        {locationPermission === 'granted' && location && showCoordinates && (
          <div className="text-xs text-green-600 mt-1">
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </div>
        )}
        
        {error && (
          <div className="text-xs text-red-600 mt-1">{error}</div>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-md p-4 ${className}`}>
      <h4 className="text-sm font-medium text-blue-800 mb-2">📍 Location Access</h4>
      <p className="text-xs text-blue-600 mb-3">
        {userId ? 
          "Update your location to help find nearby doctors and pharmacies." :
          "Allow location access to help find nearby doctors and pharmacies."
        }
      </p>
      
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-md text-xs mb-3">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-300 text-green-700 px-3 py-2 rounded-md text-xs mb-3">
          {success}
        </div>
      )}
      
      {!locationPermission && (
        <button
          type="button"
          onClick={handleGetLocation}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Getting Location..." : 
           userId ? "Update Location" : "Enable Location Access"}
        </button>
      )}
      
      {locationPermission === 'granted' && location && (
        <div className="text-green-700 text-sm">
          ✅ Location access granted
          {showCoordinates && (
            <div className="text-xs text-green-600 mt-1">
              Coordinates: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </div>
          )}
          
          {userId && (
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={loading}
              className="mt-2 w-full bg-green-600 text-white py-1 px-3 rounded text-xs hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Updating..." : "Refresh Location"}
            </button>
          )}
        </div>
      )}
      
      {locationPermission === 'denied' && (
        <div className="text-orange-700 text-sm">
          ⚠️ Location access denied - Some features may be limited
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={loading}
            className="mt-2 w-full bg-orange-600 text-white py-1 px-3 rounded text-xs hover:bg-orange-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Retrying..." : "Try Again"}
          </button>
        </div>
      )}
    </div>
  )
}
