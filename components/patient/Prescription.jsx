"use client"
import { useState, useEffect } from "react"

export default function Prescription() {
  const [prescriptions, setPrescriptions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Mock prescriptions data
  useEffect(() => {
    const mockPrescriptions = [
      {
        id: 1,
        prescriptionId: "PRE-2024-001",
        doctorName: "Dr. Sarah Wilson",
        doctorSpecialty: "General Physician",
        prescriptionDate: "2024-01-15",
        status: "active",
        medicines: [
          {
            id: 1,
            medicineName: "Paracetamol 500mg",
            dosage: "1 tablet",
            timingOfTaking: "After breakfast",
            instructions: "Take with plenty of water",
            duration: "7 days",
            remainingDays: 5
          },
          {
            id: 2,
            medicineName: "Vitamin D3 1000IU",
            dosage: "1 capsule",
            timingOfTaking: "After dinner",
            instructions: "Take with milk or fatty food",
            duration: "30 days",
            remainingDays: 25
          }
        ],
        totalMedicines: 2,
        followUpDate: "2024-01-22",
        notes: "Monitor symptoms and return if condition worsens"
      },
      {
        id: 2,
        prescriptionId: "PRE-2024-002",
        doctorName: "Dr. Michael Chen",
        doctorSpecialty: "Cardiologist",
        prescriptionDate: "2024-01-10",
        status: "completed",
        medicines: [
          {
            id: 3,
            medicineName: "Amoxicillin 250mg",
            dosage: "2 capsules",
            timingOfTaking: "Twice daily before meals",
            instructions: "Complete the full course",
            duration: "10 days",
            remainingDays: 0
          },
          {
            id: 4,
            medicineName: "Omeprazole 20mg",
            dosage: "1 capsule",
            timingOfTaking: "Before breakfast",
            instructions: "Take on empty stomach",
            duration: "14 days",
            remainingDays: 0
          }
        ],
        totalMedicines: 2,
        followUpDate: "2024-01-24",
        notes: "Course completed successfully. No side effects reported."
      },
      {
        id: 3,
        prescriptionId: "PRE-2024-003",
        doctorName: "Dr. Emily Johnson",
        doctorSpecialty: "Pediatrician",
        prescriptionDate: "2024-01-12",
        status: "active",
        medicines: [
          {
            id: 5,
            medicineName: "Ibuprofen 400mg",
            dosage: "1 tablet",
            timingOfTaking: "After meals when needed",
            instructions: "Do not exceed 3 tablets per day",
            duration: "As needed",
            remainingDays: 10
          }
        ],
        totalMedicines: 1,
        followUpDate: "2024-01-26",
        notes: "Take only when experiencing pain or fever"
      }
    ]

    setTimeout(() => {
      setPrescriptions(mockPrescriptions)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter prescriptions based on search term and status
  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = 
      prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.prescriptionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medicines.some(medicine => 
        medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    
    const matchesStatus = filterStatus === "all" || prescription.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const PrescriptionCard = ({ prescription }) => (
    <div className="bg-gradient-to-r from-card to-card/50 border-2 border-primary/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 gap-4">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <h3 className="text-2xl font-bold text-foreground">
              {prescription.prescriptionId}
            </h3>
            <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 self-start ${
              prescription.status === 'active' 
                ? 'bg-green-100 text-green-800 border-green-300' 
                : 'bg-gray-100 text-gray-800 border-gray-300'
            }`}>
              {prescription.status.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">
                Dr. {prescription.doctorName}
              </p>
              <p className="text-base text-muted-foreground">
                {prescription.doctorSpecialty} • {new Date(prescription.prescriptionDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="text-center lg:text-right bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20 rounded-xl p-4">
          <p className="text-lg font-bold text-foreground mb-1">
            {prescription.totalMedicines} Medicine{prescription.totalMedicines > 1 ? 's' : ''}
          </p>
          <p className="text-base text-muted-foreground">
            Follow-up: {new Date(prescription.followUpDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Enhanced Medicines List */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-foreground">
            Prescribed Medicines
          </h4>
        </div>
        {prescription.medicines.map((medicine) => (
          <div key={medicine.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
              <h5 className="text-xl font-bold text-foreground">{medicine.medicineName}</h5>
              {prescription.status === 'active' && medicine.remainingDays > 0 && (
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-bold border border-blue-300 self-start">
                  {medicine.remainingDays} days left
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <p className="text-base font-bold text-foreground mb-1">Dosage:</p>
                <p className="text-base text-muted-foreground">{medicine.dosage}</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <p className="text-base font-bold text-foreground mb-1">Timing:</p>
                <p className="text-base text-muted-foreground">{medicine.timingOfTaking}</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <p className="text-base font-bold text-foreground mb-1">Duration:</p>
                <p className="text-base text-muted-foreground">{medicine.duration}</p>
              </div>
            </div>
            
            {medicine.instructions && (
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <p className="text-base font-bold text-foreground mb-2">Instructions:</p>
                <p className="text-base text-muted-foreground">{medicine.instructions}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced Notes Section */}
      {prescription.notes && (
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-foreground">
              Doctor's Notes
            </h4>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-200">
            <p className="text-base text-foreground leading-relaxed font-medium">{prescription.notes}</p>
          </div>
        </div>
      )}

      {/* Enhanced Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
        <button className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 rounded-xl hover:from-blue-200 hover:to-blue-100 transition-all duration-200 text-base font-bold border-2 border-blue-300 shadow-lg hover:shadow-xl">
          <span className="flex items-center justify-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Full Prescription
          </span>
        </button>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          {prescription.status === 'active' && (
            <button className="px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:from-green-700 hover:to-green-600 transition-all duration-200 text-base font-bold shadow-lg hover:shadow-xl">
              <span className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Set Reminder
              </span>
            </button>
          )}
          <button className="px-6 py-4 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground rounded-xl hover:from-secondary/90 hover:to-secondary/70 transition-all duration-200 text-base font-bold border-2 border-border shadow-lg hover:shadow-xl">
            <span className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </span>
          </button>
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
            <p className="text-gray-600 mt-1">View and manage your medical prescriptions</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Your Prescriptions</h1>
              <p className="text-lg text-muted-foreground">View and manage your medical prescriptions</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <span className="px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-xl text-lg font-bold border-2 border-green-300 text-center">
              {prescriptions.filter(p => p.status === 'active').length} Active
            </span>
            <span className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-xl text-lg font-bold border-2 border-gray-300 text-center">
              {prescriptions.filter(p => p.status === 'completed').length} Completed
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-foreground">Search & Filter</h3>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Enhanced Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search prescriptions, doctors, or medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border-2 border-border rounded-xl text-base focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
            />
          </div>

          {/* Enhanced Status Filter */}
          <div className="lg:w-64">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full px-4 py-4 border-2 border-border rounded-xl text-base focus:ring-2 focus:ring-secondary focus:border-secondary shadow-sm"
            >
              <option value="all">All Prescriptions</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prescriptions List */}
      {filteredPrescriptions.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No prescriptions found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Try adjusting your search terms." : "You don't have any prescriptions yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Prescriptions ({filteredPrescriptions.length})
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPrescriptions.map((prescription) => (
              <PrescriptionCard key={prescription.id} prescription={prescription} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
