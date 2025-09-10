import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary">HealthCare+</h1>
              </div>
            </div>
            <nav className="flex space-x-8">
              <Link href="/login" className="text-foreground hover:text-primary transition-colors">
                Login
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Your Complete Healthcare Solution
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty">
            Connect patients, doctors, and pharmacies in one comprehensive platform. Experience seamless healthcare
            management with video consultations, prescription tracking, and real-time availability.
          </p>

          {/* User Type Cards */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
            {/* Patient Card */}
            <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">For Patients</h3>
              <p className="text-muted-foreground mb-6">
                Book appointments, consult with doctors via video calls, and track your prescriptions all in one place.
              </p>
              <Link
                href="/login?type=patient"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Patient Login
              </Link>
            </div>

            {/* Doctor Card */}
            <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">For Doctors</h3>
              <p className="text-muted-foreground mb-6">
                Manage your patient queue, update availability, and conduct secure video consultations.
              </p>
              <Link
                href="/login?type=doctor"
                className="inline-block bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              >
                Doctor Login
              </Link>
            </div>

            {/* Pharmacy Card */}
            <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">For Pharmacies</h3>
              <p className="text-muted-foreground mb-6">
                Manage inventory, track prescriptions, and update your location for easy patient access.
              </p>
              <Link
                href="/login?type=pharmacy"
                className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Pharmacy Login
              </Link>
            </div>

            {/* Hospital Card */}
            <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-chart-1/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-chart-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3m-6 6h12"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">For Hospitals</h3>
              <p className="text-muted-foreground mb-6">
                Manage hospital operations, staff, departments, and coordinate patient care across all units.
              </p>
              <Link
                href="/login?type=hospital"
                className="inline-block bg-chart-1 text-white px-6 py-3 rounded-lg font-medium hover:bg-chart-1/90 transition-colors"
              >
                Hospital Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose HealthCare+?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform brings together all aspects of healthcare management in one secure, easy-to-use solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Video Consultations</h3>
              <p className="text-muted-foreground">Secure, high-quality video calls between patients and doctors</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Real-time Scheduling</h3>
              <p className="text-muted-foreground">Dynamic appointment booking with live availability updates</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Prescription Tracking</h3>
              <p className="text-muted-foreground">Track prescriptions from doctor to pharmacy seamlessly</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">HIPAA-compliant security for all your healthcare data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">HealthCare+</h3>
              <p className="text-muted-foreground">
                Connecting healthcare providers and patients through innovative technology.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">For Patients</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/features/appointments" className="hover:text-primary transition-colors">
                    Book Appointments
                  </Link>
                </li>
                <li>
                  <Link href="/features/consultations" className="hover:text-primary transition-colors">
                    Video Consultations
                  </Link>
                </li>
                <li>
                  <Link href="/features/prescriptions" className="hover:text-primary transition-colors">
                    Prescription Tracking
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">For Providers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/features/scheduling" className="hover:text-primary transition-colors">
                    Schedule Management
                  </Link>
                </li>
                <li>
                  <Link href="/features/patient-queue" className="hover:text-primary transition-colors">
                    Patient Queue
                  </Link>
                </li>
                <li>
                  <Link href="/features/inventory" className="hover:text-primary transition-colors">
                    Inventory Management
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 HealthCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
