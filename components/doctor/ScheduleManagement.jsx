"use client"

import { useState } from "react"

export default function ScheduleManagement({ user }) {
  const [selectedDay, setSelectedDay] = useState("monday")
  const [scheduleData, setScheduleData] = useState({
    monday: { isAvailable: true, startTime: "09:00", endTime: "17:00", breakStart: "12:00", breakEnd: "13:00" },
    tuesday: { isAvailable: true, startTime: "09:00", endTime: "17:00", breakStart: "12:00", breakEnd: "13:00" },
    wednesday: { isAvailable: true, startTime: "09:00", endTime: "17:00", breakStart: "12:00", breakEnd: "13:00" },
    thursday: { isAvailable: true, startTime: "09:00", endTime: "17:00", breakStart: "12:00", breakEnd: "13:00" },
    friday: { isAvailable: true, startTime: "09:00", endTime: "17:00", breakStart: "12:00", breakEnd: "13:00" },
    saturday: { isAvailable: false, startTime: "10:00", endTime: "14:00", breakStart: "", breakEnd: "" },
    sunday: { isAvailable: false, startTime: "10:00", endTime: "14:00", breakStart: "", breakEnd: "" },
  })

  const [consultationSettings, setConsultationSettings] = useState({
    appointmentDuration: 30,
    videoConsultationEnabled: true,
    inPersonEnabled: true,
    advanceBookingDays: 30,
    consultationFee: 150,
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

  const handleScheduleChange = (day, field, value) => {
    setScheduleData({
      ...scheduleData,
      [day]: {
        ...scheduleData[day],
        [field]: value,
      },
    })
  }

  const handleSettingsChange = (field, value) => {
    setConsultationSettings({
      ...consultationSettings,
      [field]: value,
    })
  }

  const handleSaveSchedule = () => {
    alert("Schedule updated successfully! This would save to the backend in a real application.")
  }

  const upcomingWeekSchedule = [
    { date: "2024-01-15", day: "Monday", appointments: 8, available: "9:00 AM - 5:00 PM" },
    { date: "2024-01-16", day: "Tuesday", appointments: 6, available: "9:00 AM - 5:00 PM" },
    { date: "2024-01-17", day: "Wednesday", appointments: 10, available: "9:00 AM - 5:00 PM" },
    { date: "2024-01-18", day: "Thursday", appointments: 7, available: "9:00 AM - 5:00 PM" },
    { date: "2024-01-19", day: "Friday", appointments: 9, available: "9:00 AM - 5:00 PM" },
  ]

  return (
    <div className="space-y-6">
      {/* Current Week Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">This Week's Schedule</h3>
        <div className="grid gap-4">
          {upcomingWeekSchedule.map((day) => (
            <div key={day.date} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-foreground">
                  {day.day}, {day.date}
                </p>
                <p className="text-sm text-muted-foreground">{day.available}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-secondary">{day.appointments} appointments</p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Schedule Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Schedule Settings</h3>

        {/* Day Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {days.map((day) => (
            <button
              key={day.key}
              onClick={() => setSelectedDay(day.key)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedDay === day.key
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Day Schedule Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={`available-${selectedDay}`}
                checked={scheduleData[selectedDay].isAvailable}
                onChange={(e) => handleScheduleChange(selectedDay, "isAvailable", e.target.checked)}
                className="w-4 h-4 text-secondary bg-input border-border rounded focus:ring-ring"
              />
              <label htmlFor={`available-${selectedDay}`} className="text-sm font-medium text-foreground">
                Available on {days.find((d) => d.key === selectedDay)?.label}
              </label>
            </div>

            {scheduleData[selectedDay].isAvailable && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Start Time</label>
                    <input
                      type="time"
                      value={scheduleData[selectedDay].startTime}
                      onChange={(e) => handleScheduleChange(selectedDay, "startTime", e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">End Time</label>
                    <input
                      type="time"
                      value={scheduleData[selectedDay].endTime}
                      onChange={(e) => handleScheduleChange(selectedDay, "endTime", e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Break Start</label>
                    <input
                      type="time"
                      value={scheduleData[selectedDay].breakStart}
                      onChange={(e) => handleScheduleChange(selectedDay, "breakStart", e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Break End</label>
                    <input
                      type="time"
                      value={scheduleData[selectedDay].breakEnd}
                      onChange={(e) => handleScheduleChange(selectedDay, "breakEnd", e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-3">
              {days.find((d) => d.key === selectedDay)?.label} Schedule Preview
            </h4>
            {scheduleData[selectedDay].isAvailable ? (
              <div className="space-y-2 text-sm">
                <p className="text-foreground">
                  <strong>Working Hours:</strong> {scheduleData[selectedDay].startTime} -{" "}
                  {scheduleData[selectedDay].endTime}
                </p>
                {scheduleData[selectedDay].breakStart && scheduleData[selectedDay].breakEnd && (
                  <p className="text-muted-foreground">
                    <strong>Break:</strong> {scheduleData[selectedDay].breakStart} -{" "}
                    {scheduleData[selectedDay].breakEnd}
                  </p>
                )}
                <p className="text-muted-foreground">
                  <strong>Available Slots:</strong> ~
                  {Math.floor(
                    ((new Date(`1970-01-01T${scheduleData[selectedDay].endTime}:00`) -
                      new Date(`1970-01-01T${scheduleData[selectedDay].startTime}:00`)) /
                      1000 /
                      60 -
                      60) /
                      consultationSettings.appointmentDuration,
                  )}{" "}
                  appointments
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Not available on this day</p>
            )}
          </div>
        </div>
      </div>

      {/* Consultation Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Consultation Settings</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Appointment Duration (minutes)</label>
              <select
                value={consultationSettings.appointmentDuration}
                onChange={(e) => handleSettingsChange("appointmentDuration", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Consultation Fee ($)</label>
              <input
                type="number"
                value={consultationSettings.consultationFee}
                onChange={(e) => handleSettingsChange("consultationFee", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                min="0"
                step="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Advance Booking (days)</label>
              <select
                value={consultationSettings.advanceBookingDays}
                onChange={(e) => handleSettingsChange("advanceBookingDays", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value={7}>1 week</option>
                <option value={14}>2 weeks</option>
                <option value={30}>1 month</option>
                <option value={60}>2 months</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="video-enabled"
                checked={consultationSettings.videoConsultationEnabled}
                onChange={(e) => handleSettingsChange("videoConsultationEnabled", e.target.checked)}
                className="w-4 h-4 text-secondary bg-input border-border rounded focus:ring-ring"
              />
              <label htmlFor="video-enabled" className="text-sm font-medium text-foreground">
                Enable Video Consultations
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="inperson-enabled"
                checked={consultationSettings.inPersonEnabled}
                onChange={(e) => handleSettingsChange("inPersonEnabled", e.target.checked)}
                className="w-4 h-4 text-secondary bg-input border-border rounded focus:ring-ring"
              />
              <label htmlFor="inperson-enabled" className="text-sm font-medium text-foreground">
                Enable In-Person Consultations
              </label>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Current Settings Summary</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Duration: {consultationSettings.appointmentDuration} minutes</p>
                <p>Fee: ${consultationSettings.consultationFee}</p>
                <p>Booking window: {consultationSettings.advanceBookingDays} days</p>
                <p>
                  Types:{" "}
                  {[
                    consultationSettings.videoConsultationEnabled && "Video",
                    consultationSettings.inPersonEnabled && "In-Person",
                  ]
                    .filter(Boolean)
                    .join(", ") || "None"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSchedule}
          className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/90 transition-colors"
        >
          Save Schedule Changes
        </button>
      </div>
    </div>
  )
}
