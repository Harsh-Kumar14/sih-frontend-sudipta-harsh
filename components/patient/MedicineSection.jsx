"use client" // Added semicolon after use client directive

import { useState } from "react"

export default function MedicineSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const medicines = [
    {
      id: 1,
      name: "Lisinopril 10mg",
      category: "Cardiovascular",
      description: "ACE inhibitor for high blood pressure",
      price: "₹299.99",
      availability: "In Stock",
      pharmacies: [
        { name: "CVS Pharmacy", distance: "0.5 miles", stock: "Available" },
        { name: "Walgreens", distance: "0.8 miles", stock: "Available" },
        { name: "Rite Aid", distance: "1.2 miles", stock: "Low Stock" },
      ],
    },
    {
      id: 2,
      name: "Metformin 500mg",
      category: "Diabetes",
      description: "Type 2 diabetes medication",
      price: "₹250.00",
      availability: "In Stock",
      pharmacies: [
        { name: "CVS Pharmacy", distance: "0.5 miles", stock: "Available" },
        { name: "Target Pharmacy", distance: "1.0 miles", stock: "Available" },
      ],
    },
    {
      id: 3,
      name: "Ibuprofen 200mg",
      category: "Pain Relief",
      description: "Anti-inflammatory pain reliever",
      price: "₹179.99",
      availability: "In Stock",
      pharmacies: [
        { name: "Walgreens", distance: "0.8 miles", stock: "Available" },
        { name: "CVS Pharmacy", distance: "0.5 miles", stock: "Available" },
        { name: "Rite Aid", distance: "1.2 miles", stock: "Available" },
      ],
    },
    {
      id: 4,
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      description: "Antibiotic for bacterial infections",
      price: "₹375.00",
      availability: "Limited Stock",
      pharmacies: [
        { name: "CVS Pharmacy", distance: "0.5 miles", stock: "Low Stock" },
        { name: "Target Pharmacy", distance: "1.0 miles", stock: "Available" },
      ],
    },
  ]

  const categories = ["all", "Cardiovascular", "Diabetes", "Pain Relief", "Antibiotics"]

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleReserve = (medicine, pharmacy) => {
    alert(`Reserving ${medicine.name} at ${pharmacy.name}. This would open a reservation modal in a real app.`)
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Find Your Medicine</h2>
            <p className="text-lg text-muted-foreground">Search for medicines and locate nearby pharmacies</p>
          </div>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <label htmlFor="search" className="text-lg font-bold text-foreground">
                  Search Medicines
                </label>
              </div>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by medicine name or description..."
                className="w-full px-4 py-3 border-2 border-border rounded-xl bg-input text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <label htmlFor="category" className="text-lg font-bold text-foreground">
                  Category
                </label>
              </div>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-border rounded-xl bg-input text-foreground text-base focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary shadow-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Medicines List */}
      <div className="grid gap-8">
        {filteredMedicines.map((medicine) => (
          <div key={medicine.id} className="bg-gradient-to-r from-card to-card/50 border-2 border-primary/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{medicine.name}</h3>
                    <p className="text-xl text-secondary font-bold mb-2">{medicine.category}</p>
                    <p className="text-base text-muted-foreground">{medicine.description}</p>
                  </div>
                  <div className="text-center lg:text-right mt-4 lg:mt-0">
                    <p className="text-3xl font-bold text-primary mb-2">{medicine.price}</p>
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-bold border-2 ${
                        medicine.availability === "In Stock"
                          ? "bg-primary/10 text-primary"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {medicine.availability}
                    </span>
                  </div>
                </div>

                {/* Enhanced Pharmacy Availability */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-foreground">Available at nearby pharmacies:</h4>
                  </div>
                  <div className="space-y-4">
                    {medicine.pharmacies.map((pharmacy, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white border border-green-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-foreground">{pharmacy.name}</p>
                            <p className="text-base text-muted-foreground">{pharmacy.distance}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${
                              pharmacy.stock === "Available"
                                ? "bg-green-100 text-green-700 border-green-300"
                                : "bg-yellow-100 text-yellow-700 border-yellow-300"
                            }`}
                          >
                            {pharmacy.stock}
                          </span>
                          <button
                            onClick={() => handleReserve(medicine, pharmacy)}
                            disabled={pharmacy.stock === "Out of Stock"}
                            className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-2 rounded-xl text-base font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Reserve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-r from-card to-card/50 border-2 border-border rounded-xl p-12 shadow-lg max-w-md mx-auto">
            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-xl font-bold text-muted-foreground mb-2">No medicines found</p>
            <p className="text-base text-muted-foreground">Try adjusting your search criteria or browse all categories.</p>
          </div>
        </div>
      )}

      {/* Enhanced Emergency Contact */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-xl p-8 shadow-lg">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-red-800 mb-3">Emergency Medicine Needs?</h4>
            <p className="text-lg text-red-700 mb-6">
              If you need urgent medication, contact your doctor immediately or call emergency services.
            </p>
            <button className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Emergency Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
