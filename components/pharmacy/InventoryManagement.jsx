"use client"

import { useState, useEffect } from "react"

// API base URL for the pharmacy backend
const API_BASE_URL = `${process.env.NEXT_PUBLIC_PHARMACY_API_URL || 'http://localhost:8000'}/api/medicines`

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingMedicine, setEditingMedicine] = useState(null)
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [addFormData, setAddFormData] = useState({
    name: "",
    currentStock: "",
    diseases: "",
    expiryDate: "",
    price: "",
    supplier: "",
    lastRestocked: ""
  })
  const [editFormData, setEditFormData] = useState({})
  const [errors, setErrors] = useState({})

  const [inventory, setInventory] = useState([])

  // API Functions
  const fetchMedicines = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(API_BASE_URL)
      const result = await response.json()
      
      if (result.success && result.data) {
        // Transform backend data to match frontend format
        const transformedData = result.data.map((medicine, index) => ({
          id: medicine._id || index + 1,
          name: medicine.Medicinename,
          category: medicine.disease?.[0] || "General", // Use first disease as category
          currentStock: medicine.currentstock,
          minStock: 50, // Default values since not in backend model
          maxStock: 200,
          price: medicine.price,
          supplier: medicine.supplier,
          expiryDate: new Date(medicine.expirydate).toISOString().split('T')[0],
          batchNumber: `BATCH-${index + 1}`, // Generated since not in backend
          lastRestocked: new Date(medicine.lastrestock).toISOString().split('T')[0],
          diseases: medicine.disease || []
        }))
        setInventory(transformedData)
      }
    } catch (error) {
      console.error('Error fetching medicines:', error)
      // Keep empty array on error
      setInventory([])
    } finally {
      setIsLoading(false)
    }
  }

  const addMedicineToBackend = async (medicineData) => {
    try {
      const backendData = {
        Medicinename: medicineData.name,
        currentstock: parseInt(medicineData.currentStock),
        disease: medicineData.diseases.split(',').map(d => d.trim()),
        expirydate: new Date(medicineData.expiryDate),
        price: parseFloat(medicineData.price),
        supplier: medicineData.supplier,
        lastrestock: new Date(medicineData.lastRestocked),
        users: [] // Empty array as default
      }

      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData)
      })

      const result = await response.json()
      if (!result.success) {
        throw new Error(result.message || 'Failed to add medicine')
      }
      return result.data
    } catch (error) {
      console.error('Error adding medicine:', error)
      throw error
    }
  }

  const updateMedicineInBackend = async (originalName, medicineData) => {
    try {
      const backendData = {
        Medicinename: medicineData.name,
        currentstock: parseInt(medicineData.currentStock),
        disease: medicineData.diseases.split(',').map(d => d.trim()),
        expirydate: new Date(medicineData.expiryDate),
        price: parseFloat(medicineData.price),
        supplier: medicineData.supplier,
        lastrestock: new Date(medicineData.lastRestocked),
        users: [] // Keep existing or empty array
      }

      const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(originalName)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData)
      })

      const result = await response.json()
      if (!result.success) {
        throw new Error(result.message || 'Failed to update medicine')
      }
      return result.data
    } catch (error) {
      console.error('Error updating medicine:', error)
      throw error
    }
  }

  // Fetch medicines on component mount
  useEffect(() => {
    fetchMedicines()
  }, [])

  // Dynamic categories based on fetched medicines
  const categories = ["all", ...new Set(inventory.map(item => item.category).filter(Boolean))]

  const getStockStatus = (item) => {
    if (item.currentStock <= item.minStock) return "low"
    if (item.currentStock >= item.maxStock * 0.9) return "high"
    return "normal"
  }

  const getStockColor = (status) => {
    switch (status) {
      case "low":
        return "bg-destructive/10 text-destructive"
      case "high":
        return "bg-primary/10 text-primary"
      case "normal":
        return "bg-accent/10 text-accent"
      default:
        return "bg-muted-foreground/10 text-muted-foreground"
    }
  }

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && getStockStatus(item) === "low") ||
      (stockFilter === "normal" && getStockStatus(item) === "normal") ||
      (stockFilter === "high" && getStockStatus(item) === "high")
    return matchesSearch && matchesCategory && matchesStock
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAddFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditMedicine = (medicine) => {
    setEditingMedicine(medicine)
    setEditFormData({
      name: medicine.name,
      currentStock: medicine.currentStock.toString(),
      diseases: Array.isArray(medicine.diseases) ? medicine.diseases.join(', ') : (medicine.diseases || ''),
      expiryDate: medicine.expiryDate,
      price: medicine.price.toString(),
      supplier: medicine.supplier || '',
      lastRestocked: medicine.lastRestocked
    })
    setShowEditModal(true)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!addFormData.name.trim()) newErrors.name = "Medicine name is required"
    if (!addFormData.currentStock || addFormData.currentStock <= 0) newErrors.currentStock = "Current stock must be greater than 0"
    if (!addFormData.diseases.trim()) newErrors.diseases = "Diseases field is required"
    if (!addFormData.expiryDate) newErrors.expiryDate = "Expiry date is required"
    if (!addFormData.price || addFormData.price <= 0) newErrors.price = "Price must be greater than 0"
    if (!addFormData.supplier.trim()) newErrors.supplier = "Supplier is required"
    if (!addFormData.lastRestocked) newErrors.lastRestocked = "Last restocked date is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateEditForm = () => {
    const newErrors = {}
    if (!editFormData.name?.trim()) newErrors.name = "Medicine name is required"
    if (!editFormData.currentStock || editFormData.currentStock <= 0) newErrors.currentStock = "Current stock must be greater than 0"
    if (!editFormData.diseases?.trim()) newErrors.diseases = "Diseases field is required"
    if (!editFormData.expiryDate) newErrors.expiryDate = "Expiry date is required"
    if (!editFormData.price || editFormData.price <= 0) newErrors.price = "Price must be greater than 0"
    if (!editFormData.supplier?.trim()) newErrors.supplier = "Supplier is required"
    if (!editFormData.lastRestocked) newErrors.lastRestocked = "Last restocked date is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddMedicine = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsButtonLoading(true)

    try {
      await addMedicineToBackend(addFormData)
      
      // Refresh the medicines list from backend
      await fetchMedicines()
      
      // Reset form and close modal
      setAddFormData({
        name: "",
        currentStock: "",
        diseases: "",
        expiryDate: "",
        price: "",
        supplier: "",
        lastRestocked: ""
      })
      setErrors({})
      setShowAddModal(false)
      
      // Show success message (you can add a toast notification here)
      console.log('Medicine added successfully!')
      
    } catch (error) {
      console.error('Failed to add medicine:', error)
      // You can add error handling UI here
      setErrors({ submit: 'Failed to add medicine. Please try again.' })
    } finally {
      setIsButtonLoading(false)
    }
  }

  const handleUpdateMedicine = async (e) => {
    e.preventDefault()
    
    if (!validateEditForm()) {
      return
    }

    setIsButtonLoading(true)

    try {
      const originalName = editingMedicine.name
      await updateMedicineInBackend(originalName, editFormData)
      
      // Refresh the medicines list from backend
      await fetchMedicines()
      
      // Reset form and close modal
      setEditFormData({})
      setErrors({})
      setShowEditModal(false)
      setEditingMedicine(null)
      
      // Show success message (you can add a toast notification here)
      console.log('Medicine updated successfully!')
      
    } catch (error) {
      console.error('Failed to update medicine:', error)
      // You can add error handling UI here
      setErrors({ submit: 'Failed to update medicine. Please try again.' })
    } finally {
      setIsButtonLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowAddModal(false)
    setShowEditModal(false)
    setEditingMedicine(null)
    setAddFormData({
      name: "",
      currentStock: "",
      diseases: "",
      expiryDate: "",
      price: "",
      supplier: "",
      lastRestocked: ""
    })
    setEditFormData({})
    setErrors({})
  }

  const inventoryStats = {
    totalItems: inventory.length,
    lowStock: inventory.filter((item) => getStockStatus(item) === "low").length,
    totalValue: inventory.reduce((sum, item) => sum + item.currentStock * item.price, 0),
    expiringItems: inventory.filter(
      (item) => new Date(item.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    ).length,
  }

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading medicines...</p>
          </div>
        </div>
      ) : (
        <>
      {/* Inventory Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-bold text-accent">{inventoryStats.totalItems}</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-bold text-destructive">{inventoryStats.lowStock}</p>
            </div>
            <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold text-primary">₹{inventoryStats.totalValue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Expiring Soon</p>
              <p className="text-2xl font-bold text-secondary">{inventoryStats.expiringItems}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
              Search Inventory
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by medicine name or category..."
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
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-foreground mb-2">
              Stock Level
            </label>
            <select
              id="stock"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Levels</option>
              <option value="low">Low Stock</option>
              <option value="normal">Normal Stock</option>
              <option value="high">High Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Header with Add Medicine Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Medicine Inventory</h2>
          <p className="text-muted-foreground">Manage your medicine stock and inventory</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="group bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            {isButtonLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Medicine</span>
              </>
            )}
          </button>
          <span className="text-sm text-muted-foreground">
            {filteredInventory.length} medicines found
          </span>
        </div>
      </div>

      {/* Inventory List */}
      <div className="space-y-4">
        {filteredInventory.map((item) => {
          const stockStatus = getStockStatus(item)
          return (
            <div key={item.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-lg font-semibold text-foreground">{item.name}</h4>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">{item.category}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockColor(stockStatus)}`}>
                      {stockStatus} stock
                    </span>
                    <button 
                      onClick={() => handleEditMedicine(item)}
                      className="p-1.5 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                      title="Edit Medicine"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current Stock</p>
                      <p className="font-medium text-foreground">{item.currentStock} units</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-medium text-foreground">₹{item.price}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Supplier</p>
                      <p className="font-medium text-foreground">{item.supplier}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium text-foreground">{item.expiryDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Restocked</p>
                      <p className="font-medium text-foreground">{item.lastRestocked}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Value</p>
                      <p className="font-medium text-foreground">₹{(item.currentStock * item.price).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredInventory.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No inventory items found matching your criteria.</p>
        </div>
      )}

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in-0 duration-300">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Add New Medicine</h3>
              <button
                onClick={handleCloseModal}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-muted rounded-full p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddMedicine} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Medicine Name */}
                <div>
                  <label htmlFor="add-name" className="block text-sm font-medium text-foreground mb-1">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    id="add-name"
                    name="name"
                    value={addFormData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.name ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="e.g., Paracetamol 500mg"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Current Stock */}
                <div>
                  <label htmlFor="add-stock" className="block text-sm font-medium text-foreground mb-1">
                    Current Stock *
                  </label>
                  <input
                    type="number"
                    id="add-stock"
                    name="currentStock"
                    min="1"
                    value={addFormData.currentStock}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.currentStock ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="e.g., 100"
                  />
                  {errors.currentStock && <p className="text-red-500 text-sm mt-1">{errors.currentStock}</p>}
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="add-price" className="block text-sm font-medium text-foreground mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    id="add-price"
                    name="price"
                    min="0"
                    step="0.01"
                    value={addFormData.price}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.price ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="e.g., 299.99"
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                {/* Supplier */}
                <div>
                  <label htmlFor="add-supplier" className="block text-sm font-medium text-foreground mb-1">
                    Supplier *
                  </label>
                  <input
                    type="text"
                    id="add-supplier"
                    name="supplier"
                    value={addFormData.supplier}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.supplier ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="e.g., PharmaCorp"
                  />
                  {errors.supplier && <p className="text-red-500 text-sm mt-1">{errors.supplier}</p>}
                </div>

                {/* Expiry Date */}
                <div>
                  <label htmlFor="add-expiry" className="block text-sm font-medium text-foreground mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    id="add-expiry"
                    name="expiryDate"
                    value={addFormData.expiryDate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.expiryDate ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                </div>

                {/* Last Restocked */}
                <div>
                  <label htmlFor="add-restocked" className="block text-sm font-medium text-foreground mb-1">
                    Last Restocked *
                  </label>
                  <input
                    type="date"
                    id="add-restocked"
                    name="lastRestocked"
                    value={addFormData.lastRestocked}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.lastRestocked ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.lastRestocked && <p className="text-red-500 text-sm mt-1">{errors.lastRestocked}</p>}
                </div>
              </div>

              {/* Diseases (full width) */}
              <div>
                <label htmlFor="add-diseases" className="block text-sm font-medium text-foreground mb-1">
                  Diseases/Conditions *
                </label>
                <textarea
                  id="add-diseases"
                  name="diseases"
                  value={addFormData.diseases}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.diseases ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="e.g., Fever, Pain, Headache (separate with commas)"
                />
                {errors.diseases && <p className="text-red-500 text-sm mt-1">{errors.diseases}</p>}
                <p className="text-xs text-muted-foreground mt-1">Enter diseases/conditions separated by commas</p>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isButtonLoading}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                >
                  {isButtonLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Adding...
                    </>
                  ) : (
                    'Add Medicine'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Medicine Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in-0 duration-300">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Edit Medicine</h3>
              <button
                onClick={handleCloseModal}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-muted rounded-full p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdateMedicine} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Medicine Name */}
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium text-foreground mb-1">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={editFormData.name || ''}
                    onChange={handleEditInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.name ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="e.g., Paracetamol 500mg"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Current Stock */}
                <div>
                  <label htmlFor="edit-stock" className="block text-sm font-medium text-foreground mb-1">
                    Current Stock *
                  </label>
                  <input
                    type="number"
                    id="edit-stock"
                    name="currentStock"
                    min="1"
                    value={editFormData.currentStock || ''}
                    onChange={handleEditInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.currentStock ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="e.g., 100"
                  />
                  {errors.currentStock && <p className="text-red-500 text-sm mt-1">{errors.currentStock}</p>}
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="edit-price" className="block text-sm font-medium text-foreground mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    id="edit-price"
                    name="price"
                    min="0"
                    step="0.01"
                    value={editFormData.price || ''}
                    onChange={handleEditInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.price ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="e.g., 299.99"
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                {/* Supplier */}
                <div>
                  <label htmlFor="edit-supplier" className="block text-sm font-medium text-foreground mb-1">
                    Supplier *
                  </label>
                  <input
                    type="text"
                    id="edit-supplier"
                    name="supplier"
                    value={editFormData.supplier || ''}
                    onChange={handleEditInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.supplier ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="e.g., PharmaCorp"
                  />
                  {errors.supplier && <p className="text-red-500 text-sm mt-1">{errors.supplier}</p>}
                </div>

                {/* Expiry Date */}
                <div>
                  <label htmlFor="edit-expiry" className="block text-sm font-medium text-foreground mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    id="edit-expiry"
                    name="expiryDate"
                    value={editFormData.expiryDate || ''}
                    onChange={handleEditInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.expiryDate ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                </div>

                {/* Last Restocked */}
                <div>
                  <label htmlFor="edit-restocked" className="block text-sm font-medium text-foreground mb-1">
                    Last Restocked *
                  </label>
                  <input
                    type="date"
                    id="edit-restocked"
                    name="lastRestocked"
                    value={editFormData.lastRestocked || ''}
                    onChange={handleEditInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.lastRestocked ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.lastRestocked && <p className="text-red-500 text-sm mt-1">{errors.lastRestocked}</p>}
                </div>
              </div>

              {/* Diseases (full width) */}
              <div>
                <label htmlFor="edit-diseases" className="block text-sm font-medium text-foreground mb-1">
                  Diseases/Conditions *
                </label>
                <textarea
                  id="edit-diseases"
                  name="diseases"
                  value={editFormData.diseases || ''}
                  onChange={handleEditInputChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.diseases ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="e.g., Fever, Pain, Headache (separate with commas)"
                />
                {errors.diseases && <p className="text-red-500 text-sm mt-1">{errors.diseases}</p>}
                <p className="text-xs text-muted-foreground mt-1">Enter diseases/conditions separated by commas</p>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isButtonLoading}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                >
                  {isButtonLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    'Update Medicine'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  )
}
