"use client"

import { useState } from "react"

export default function DoctorsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@hospital.com",
      specialization: "Cardiology",
      department: "Cardiology",
      licenseNumber: "DOC001",
      status: "available",
      patientsToday: 12,
      nextAppointment: "2:30 PM",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      email: "michael.chen@hospital.com",
      specialization: "Emergency Medicine",
      department: "Emergency",
      licenseNumber: "DOC002",
      status: "busy",
      patientsToday: 8,
      nextAppointment: "1:15 PM",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@hospital.com",
      specialization: "Pediatrics",
      department: "Pediatrics",
      licenseNumber: "DOC003",
      status: "available",
      patientsToday: 6,
      nextAppointment: "3:00 PM",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      email: "james.wilson@hospital.com",
      specialization: "Orthopedics",
      department: "Orthopedics",
      licenseNumber: "DOC004",
      status: "off-duty",
      patientsToday: 0,
      nextAppointment: "Tomorrow 9:00 AM",
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      email: "lisa.thompson@hospital.com",
      specialization: "Neurology",
      department: "Neurology",
      licenseNumber: "DOC005",
      status: "available",
      patientsToday: 4,
      nextAppointment: "4:15 PM",
    },
  ]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment =
      selectedDepartment === "all" || doctor.department.toLowerCase() === selectedDepartment.toLowerCase()
    return matchesSearch && matchesDepartment
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "off-duty":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Doctor Management</h1>
          <p className="text-muted-foreground mt-2">Manage hospital doctors and their schedules</p>
        </div>
        <button className="bg-chart-1 text-white px-4 py-2 rounded-lg font-medium hover:bg-chart-1/90 transition-colors">
          Add New Doctor
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Departments</option>
          <option value="cardiology">Cardiology</option>
          <option value="emergency">Emergency</option>
          <option value="pediatrics">Pediatrics</option>
          <option value="orthopedics">Orthopedics</option>
          <option value="neurology">Neurology</option>
        </select>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
                <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                <p className="text-sm text-muted-foreground">{doctor.department}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doctor.status)}`}>
                {doctor.status.replace("-", " ")}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">License:</span>
                <span className="text-foreground">{doctor.licenseNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Patients Today:</span>
                <span className="text-foreground">{doctor.patientsToday}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Appointment:</span>
                <span className="text-foreground">{doctor.nextAppointment}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-chart-1/10 text-chart-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-chart-1/20 transition-colors">
                View Schedule
              </button>
              <button className="flex-1 bg-muted text-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-muted/80 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">{doctors.length}</div>
          <div className="text-sm text-muted-foreground">Total Doctors</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">
            {doctors.filter((d) => d.status === "available").length}
          </div>
          <div className="text-sm text-muted-foreground">Available Now</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">
            {doctors.reduce((sum, d) => sum + d.patientsToday, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Patients Today</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">{new Set(doctors.map((d) => d.department)).size}</div>
          <div className="text-sm text-muted-foreground">Departments</div>
        </div>
      </div>
    </div>
  )
}
