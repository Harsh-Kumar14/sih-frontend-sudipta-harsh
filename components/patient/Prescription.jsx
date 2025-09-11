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
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {prescription.prescriptionId}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              prescription.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {prescription.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            Prescribed by <span className="font-medium">{prescription.doctorName}</span>
          </p>
          <p className="text-xs text-gray-500">
            {prescription.doctorSpecialty} • {new Date(prescription.prescriptionDate).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {prescription.totalMedicines} Medicine{prescription.totalMedicines > 1 ? 's' : ''}
          </p>
          <p className="text-xs text-gray-500">
            Follow-up: {new Date(prescription.followUpDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Medicines List */}
      <div className="space-y-3 mb-4">
        <h4 className="text-sm font-medium text-gray-700 border-b border-gray-100 pb-2">
          Prescribed Medicines
        </h4>
        {prescription.medicines.map((medicine) => (
          <div key={medicine.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-medium text-gray-900">{medicine.medicineName}</h5>
              {prescription.status === 'active' && medicine.remainingDays > 0 && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {medicine.remainingDays} days left
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Dosage:</span> {medicine.dosage}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Timing:</span> {medicine.timingOfTaking}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Duration:</span> {medicine.duration}
                </p>
              </div>
            </div>
            
            {medicine.instructions && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Instructions:</span> {medicine.instructions}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Notes */}
      {prescription.notes && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-1">Doctor's Notes</p>
          <p className="text-sm text-blue-800">{prescription.notes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View Full Prescription
        </button>
        <div className="flex space-x-2">
          {prescription.status === 'active' && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Set Reminder
            </button>
          )}
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
            Download PDF
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-600 mt-1">View and manage your medical prescriptions</p>
        </div>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {prescriptions.filter(p => p.status === 'active').length} Active
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            {prescriptions.filter(p => p.status === 'completed').length} Completed
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search prescriptions, doctors, or medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div className="sm:w-48">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Prescriptions</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
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
