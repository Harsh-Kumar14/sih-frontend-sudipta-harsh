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
      price: "$15.99",
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
      price: "$12.50",
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
      price: "$8.99",
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
      price: "$18.75",
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
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
              Search Medicines
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by medicine name or description..."
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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

      {/* Medicines List */}
      <div className="grid gap-6">
        {filteredMedicines.map((medicine) => (
          <div key={medicine.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{medicine.name}</h3>
                    <p className="text-secondary font-medium">{medicine.category}</p>
                    <p className="text-muted-foreground mt-1">{medicine.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{medicine.price}</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        medicine.availability === "In Stock"
                          ? "bg-primary/10 text-primary"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {medicine.availability}
                    </span>
                  </div>
                </div>

                {/* Pharmacy Availability */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Available at nearby pharmacies:</h4>
                  <div className="space-y-3">
                    {medicine.pharmacies.map((pharmacy, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{pharmacy.name}</p>
                            <p className="text-sm text-muted-foreground">{pharmacy.distance}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              pharmacy.stock === "Available"
                                ? "bg-primary/10 text-primary"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {pharmacy.stock}
                          </span>
                          <button
                            onClick={() => handleReserve(medicine, pharmacy)}
                            disabled={pharmacy.stock === "Out of Stock"}
                            className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="text-center py-12">
          <p className="text-muted-foreground">No medicines found matching your criteria.</p>
        </div>
      )}

      {/* Emergency Contact */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-destructive mb-2">Emergency Medicine Needs?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              If you need urgent medication, contact your doctor immediately or call emergency services.
            </p>
            <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-destructive/90 transition-colors">
              Emergency Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
