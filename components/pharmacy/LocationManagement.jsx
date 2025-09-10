"use client"

import { useState } from "react"

export default function LocationManagement({ user }) {
  const [locationData, setLocationData] = useState({
    name: user.name,
    address: user.address,
    phone: user.phone,
    email: user.email,
    operatingHours: {
      monday: { open: "08:00", close: "22:00", isOpen: true },
      tuesday: { open: "08:00", close: "22:00", isOpen: true },
      wednesday: { open: "08:00", close: "22:00", isOpen: true },
      thursday: { open: "08:00", close: "22:00", isOpen: true },
      friday: { open: "08:00", close: "22:00", isOpen: true },
      saturday: { open: "09:00", close: "20:00", isOpen: true },
      sunday: { open: "10:00", close: "18:00", isOpen: true },
    },
    services: {
      prescriptionFilling: true,
      vaccinations: true,
      healthScreenings: false,
      deliveryService: true,
      consultations: false,
    },
    visibility: {
      showOnMap: true,
      acceptNewPatients: true,
      showPricing: true,
      showInventory: false,
    },
    deliverySettings: {
      deliveryRadius: 5,
      deliveryFee: 2.99,
      freeDeliveryMinimum: 25,
      estimatedDeliveryTime: "30-45 minutes",
    },
  })

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ]

  const handleBasicInfoChange = (field, value) => {
    setLocationData({
      ...locationData,
      [field]: value,
    })
  }

  const handleHoursChange = (day, field, value) => {
    setLocationData({
      ...locationData,
      operatingHours: {
        ...locationData.operatingHours,
        [day]: {
          ...locationData.operatingHours[day],
          [field]: value,
        },
      },
    })
  }

  const handleServiceChange = (service, value) => {
    setLocationData({
      ...locationData,
      services: {
        ...locationData.services,
        [service]: value,
      },
    })
  }

  const handleVisibilityChange = (setting, value) => {
    setLocationData({
      ...locationData,
      visibility: {
        ...locationData.visibility,
        [setting]: value,
      },
    })
  }

  const handleDeliveryChange = (field, value) => {
    setLocationData({
      ...locationData,
      deliverySettings: {
        ...locationData.deliverySettings,
        [field]: value,
      },
    })
  }

  const handleSaveChanges = () => {
    alert("Location settings updated successfully! This would save to the backend in a real application.")
  }

  const nearbyCompetitors = [
    { name: "MediCare Pharmacy", distance: "0.3 miles", rating: 4.2 },
    { name: "QuickMeds", distance: "0.7 miles", rating: 4.0 },
    { name: "Family Pharmacy", distance: "1.2 miles", rating: 4.5 },
  ]

  return (
    <div className="space-y-6">
      {/* Location Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Location Overview</h3>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Pharmacy Name</label>
              <input
                type="text"
                value={locationData.name}
                onChange={(e) => handleBasicInfoChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Address</label>
              <textarea
                value={locationData.address}
                onChange={(e) => handleBasicInfoChange("address", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  value={locationData.phone}
                  onChange={(e) => handleBasicInfoChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={locationData.email}
                  onChange={(e) => handleBasicInfoChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Map Preview</h4>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-sm">Interactive map would appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Operating Hours</h3>
        <div className="space-y-4">
          {days.map((day) => (
            <div key={day.key} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="w-24">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={locationData.operatingHours[day.key].isOpen}
                    onChange={(e) => handleHoursChange(day.key, "isOpen", e.target.checked)}
                    className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-ring"
                  />
                  <span className="text-sm font-medium text-foreground">{day.label}</span>
                </label>
              </div>
              {locationData.operatingHours[day.key].isOpen ? (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={locationData.operatingHours[day.key].open}
                    onChange={(e) => handleHoursChange(day.key, "open", e.target.value)}
                    className="px-2 py-1 border border-border rounded bg-input text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                  <span className="text-muted-foreground">to</span>
                  <input
                    type="time"
                    value={locationData.operatingHours[day.key].close}
                    onChange={(e) => handleHoursChange(day.key, "close", e.target.value)}
                    className="px-2 py-1 border border-border rounded bg-input text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              ) : (
                <span className="text-muted-foreground">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Services & Visibility */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Services Offered</h3>
          <div className="space-y-3">
            {Object.entries(locationData.services).map(([service, enabled]) => (
              <label key={service} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => handleServiceChange(service, e.target.checked)}
                  className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-ring"
                />
                <span className="text-sm text-foreground">
                  {service
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())
                    .trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Visibility Settings</h3>
          <div className="space-y-3">
            {Object.entries(locationData.visibility).map(([setting, enabled]) => (
              <label key={setting} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => handleVisibilityChange(setting, e.target.checked)}
                  className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-ring"
                />
                <span className="text-sm text-foreground">
                  {setting
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())
                    .trim()}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Settings */}
      {locationData.services.deliveryService && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Delivery Settings</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Delivery Radius (miles)</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={locationData.deliverySettings.deliveryRadius}
                  onChange={(e) => handleDeliveryChange("deliveryRadius", Number.parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Delivery Fee ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={locationData.deliverySettings.deliveryFee}
                  onChange={(e) => handleDeliveryChange("deliveryFee", Number.parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Free Delivery Minimum ($)</label>
                <input
                  type="number"
                  min="0"
                  value={locationData.deliverySettings.freeDeliveryMinimum}
                  onChange={(e) => handleDeliveryChange("freeDeliveryMinimum", Number.parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Estimated Delivery Time</label>
                <input
                  type="text"
                  value={locationData.deliverySettings.estimatedDeliveryTime}
                  onChange={(e) => handleDeliveryChange("estimatedDeliveryTime", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nearby Competitors */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Nearby Competitors</h3>
        <div className="space-y-3">
          {nearbyCompetitors.map((competitor, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-foreground">{competitor.name}</p>
                <p className="text-sm text-muted-foreground">{competitor.distance} away</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-foreground">{competitor.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveChanges}
          className="bg-accent text-accent-foreground px-6 py-3 rounded-md font-medium hover:bg-accent/90 transition-colors"
        >
          Save Location Settings
        </button>
      </div>
    </div>
  )
}
