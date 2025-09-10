"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Phone, User, Calendar, Clock, Stethoscope, UserCircle } from "lucide-react"

export default function UserSection() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      contact: "+1 (555) 123-4567",
      age: 28,
      gender: "Female",
      disease: "Hypertension",
      doctorName: "Dr. Smith",
      timeSlot: "10:00 AM - 10:30 AM",
      date: "2024-01-15",
      status: "Active"
    },
    {
      id: 2,
      name: "Michael Chen",
      contact: "+1 (555) 234-5678",
      age: 45,
      gender: "Male",
      disease: "Diabetes Type 2",
      doctorName: "Dr. Williams",
      timeSlot: "2:00 PM - 2:30 PM",
      date: "2024-01-15",
      status: "Pending"
    },
    {
      id: 3,
      name: "Emily Davis",
      contact: "+1 (555) 345-6789",
      age: 35,
      gender: "Female",
      disease: "Migraine",
      doctorName: "Dr. Brown",
      timeSlot: "11:00 AM - 11:30 AM",
      date: "2024-01-16",
      status: "Completed"
    },
    {
      id: 4,
      name: "David Wilson",
      contact: "+1 (555) 456-7890",
      age: 52,
      gender: "Male",
      disease: "Arthritis",
      doctorName: "Dr. Taylor",
      timeSlot: "3:30 PM - 4:00 PM",
      date: "2024-01-16",
      status: "Active"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      contact: "+1 (555) 567-8901",
      age: 29,
      gender: "Female",
      disease: "Anxiety Disorder",
      doctorName: "Dr. Garcia",
      timeSlot: "9:00 AM - 9:30 AM",
      date: "2024-01-17",
      status: "Active"
    },
    {
      id: 6,
      name: "Robert Martinez",
      contact: "+1 (555) 678-9012",
      age: 41,
      gender: "Male",
      disease: "High Cholesterol",
      doctorName: "Dr. Thompson",
      timeSlot: "1:00 PM - 1:30 PM",
      date: "2024-01-17",
      status: "Pending"
    }
  ]

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Directory</h1>
          <p className="text-muted-foreground">
            Manage and view all patients in the system
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patients, diseases, or doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <UserCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                <p className="text-2xl font-bold">{patients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Cases</p>
                <p className="text-2xl font-bold">
                  {patients.filter(p => p.status === "Active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-yellow-100 p-3">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">
                  {patients.filter(p => p.status === "Pending").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{patient.name}</CardTitle>
                <Badge className={getStatusColor(patient.status)}>
                  {patient.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Information */}
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{patient.contact}</span>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Age</p>
                    <p className="text-sm font-medium">{patient.age}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Gender</p>
                  <p className="text-sm font-medium">{patient.gender}</p>
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Condition</p>
                    <p className="text-sm font-medium">{patient.disease}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Assigned Doctor</p>
                  <p className="text-sm font-medium">{patient.doctorName}</p>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="border-t pt-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Next Appointment</p>
                    <p className="text-sm font-medium">{patient.date}</p>
                    <p className="text-xs text-blue-600">{patient.timeSlot}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <UserCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No patients found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria to find more patients.
          </p>
        </div>
      )}
    </div>
  )
}
