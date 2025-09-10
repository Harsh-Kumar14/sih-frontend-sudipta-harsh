"use client"

import { useState } from "react"

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")

  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Lisinopril 10mg",
      category: "Cardiovascular",
      currentStock: 150,
      minStock: 50,
      maxStock: 200,
      price: 15.99,
      supplier: "PharmaCorp",
      expiryDate: "2025-06-15",
      batchNumber: "LC001",
      lastRestocked: "2024-01-10",
    },
    {
      id: 2,
      name: "Metformin 500mg",
      category: "Diabetes",
      currentStock: 89,
      minStock: 40,
      maxStock: 150,
      price: 12.5,
      supplier: "MediSupply",
      expiryDate: "2025-03-20",
      batchNumber: "MF002",
      lastRestocked: "2024-01-08",
    },
    {
      id: 3,
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      currentStock: 15,
      minStock: 50,
      maxStock: 100,
      price: 18.75,
      supplier: "PharmaCorp",
      expiryDate: "2024-12-30",
      batchNumber: "AM003",
      lastRestocked: "2023-12-15",
    },
    {
      id: 4,
      name: "Ibuprofen 200mg",
      category: "Pain Relief",
      currentStock: 200,
      minStock: 75,
      maxStock: 250,
      price: 8.99,
      supplier: "HealthDist",
      expiryDate: "2026-01-10",
      batchNumber: "IB004",
      lastRestocked: "2024-01-12",
    },
    {
      id: 5,
      name: "Insulin Glargine",
      category: "Diabetes",
      currentStock: 8,
      minStock: 25,
      maxStock: 50,
      price: 89.99,
      supplier: "DiabetesCare",
      expiryDate: "2024-08-15",
      batchNumber: "IG005",
      lastRestocked: "2023-11-20",
    },
  ])

  const categories = ["all", "Cardiovascular", "Diabetes", "Antibiotics", "Pain Relief"]

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

  const handleUpdateStock = (itemId, newStock) => {
    setInventory(inventory.map((item) => (item.id === itemId ? { ...item, currentStock: newStock } : item)))
  }

  const handleReorder = (item) => {
    alert(`Reorder request sent for ${item.name}. This would integrate with supplier systems in a real application.`)
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
              <p className="text-2xl font-bold text-primary">${inventoryStats.totalValue.toLocaleString()}</p>
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
                  </div>

                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current Stock</p>
                      <p className="font-medium text-foreground">{item.currentStock} units</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Min / Max</p>
                      <p className="font-medium text-foreground">
                        {item.minStock} / {item.maxStock}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-medium text-foreground">${item.price}</p>
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
                      <p className="text-muted-foreground">Batch Number</p>
                      <p className="font-medium text-foreground">{item.batchNumber}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Restocked</p>
                      <p className="font-medium text-foreground">{item.lastRestocked}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Value</p>
                      <p className="font-medium text-foreground">${(item.currentStock * item.price).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 xl:w-48">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      value={item.currentStock}
                      onChange={(e) => handleUpdateStock(item.id, Number.parseInt(e.target.value) || 0)}
                      className="flex-1 px-2 py-1 border border-border rounded text-sm bg-input text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                    <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90 transition-colors">
                      Update
                    </button>
                  </div>
                  {stockStatus === "low" && (
                    <button
                      onClick={() => handleReorder(item)}
                      className="w-full bg-accent text-accent-foreground px-3 py-2 rounded text-sm font-medium hover:bg-accent/90 transition-colors"
                    >
                      Reorder Now
                    </button>
                  )}
                  <button className="w-full border border-border text-foreground px-3 py-2 rounded text-sm font-medium hover:bg-muted transition-colors">
                    View Details
                  </button>
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
    </div>
  )
}
