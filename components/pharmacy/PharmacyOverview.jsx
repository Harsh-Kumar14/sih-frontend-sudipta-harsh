export default function PharmacyOverview({ user }) {
  const todayStats = {
    totalOrders: 45,
    completedOrders: 38,
    pendingOrders: 7,
    lowStockItems: 12,
  }

  const recentOrders = [
    {
      id: 1,
      patient: "John Doe",
      medicine: "Lisinopril 10mg",
      quantity: 30,
      status: "ready",
      orderTime: "2:30 PM",
      prescriptionId: "RX001",
    },
    {
      id: 2,
      patient: "Jane Smith",
      medicine: "Metformin 500mg",
      quantity: 60,
      status: "preparing",
      orderTime: "2:15 PM",
      prescriptionId: "RX002",
    },
    {
      id: 3,
      patient: "Robert Wilson",
      medicine: "Ibuprofen 200mg",
      quantity: 20,
      status: "completed",
      orderTime: "1:45 PM",
      prescriptionId: "RX003",
    },
  ]

  const lowStockAlerts = [
    { id: 1, medicine: "Amoxicillin 500mg", currentStock: 15, minStock: 50, category: "Antibiotics" },
    { id: 2, medicine: "Insulin Glargine", currentStock: 8, minStock: 25, category: "Diabetes" },
    { id: 3, medicine: "Atorvastatin 20mg", currentStock: 22, minStock: 40, category: "Cardiovascular" },
  ]

  const topSellingMedicines = [
    { name: "Lisinopril 10mg", sales: 156, category: "Cardiovascular" },
    { name: "Metformin 500mg", sales: 134, category: "Diabetes" },
    { name: "Ibuprofen 200mg", sales: 98, category: "Pain Relief" },
    { name: "Omeprazole 20mg", sales: 87, category: "Gastric" },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Welcome back, {user.name}!</h2>
        <p className="text-muted-foreground">{user.address}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Operating Hours: {user.operatingHours} • Established {user.established}
        </p>
      </div>

      {/* Today's Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold text-accent">{todayStats.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-primary">{todayStats.completedOrders}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-secondary">{todayStats.pendingOrders}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-bold text-destructive">{todayStats.lowStockItems}</p>
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
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h3>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">{order.patient}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.medicine} • Qty: {order.quantity} • {order.prescriptionId}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{order.orderTime}</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "completed"
                      ? "bg-primary/10 text-primary"
                      : order.status === "ready"
                        ? "bg-accent/10 text-accent"
                        : "bg-secondary/10 text-secondary"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Low Stock Alerts</h3>
          <div className="space-y-4">
            {lowStockAlerts.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-destructive/5 rounded-lg border border-destructive/20"
              >
                <div>
                  <p className="font-medium text-foreground">{item.medicine}</p>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-destructive">
                    {item.currentStock} / {item.minStock}
                  </p>
                  <p className="text-xs text-muted-foreground">Current / Min</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Medicines */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Selling This Month</h3>
          <div className="space-y-4">
            {topSellingMedicines.map((medicine, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{medicine.name}</p>
                    <p className="text-sm text-muted-foreground">{medicine.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{medicine.sales}</p>
                  <p className="text-xs text-muted-foreground">units sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
