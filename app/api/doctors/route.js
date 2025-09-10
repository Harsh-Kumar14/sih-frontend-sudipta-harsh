import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { z } from 'zod'

// Doctor schema validation
const DoctorSchemaZod = z.object({
  name: z.string().min(1, "Name is required"),
  specialization: z.string().min(1, "Specialization is required"),
  experience: z.string().min(1, "Experience is required"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  contact: z.string().min(1, "Contact is required"),
  email: z.string().email("Invalid email format"),
  location: z.string().min(1, "Location is required"),
  consultationFee: z.string().min(1, "Consultation fee is required"),
  availability: z.string().min(1, "Availability is required")
})

// MongoDB connection URI
const uri = "mongodb+srv://hraj98097_db_user:pbL3F2UDbnxHzKyz@doctor-details.q8vf2ol.mongodb.net/"

let client = null

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }
  return client.db('healthcare-platform')
}

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate the incoming data
    const validatedData = DoctorSchemaZod.parse(body)
    
    // Connect to MongoDB
    const db = await connectToDatabase()
    const doctorsCollection = db.collection('doctors')
    
    // Check if doctor with same email already exists
    const existingDoctor = await doctorsCollection.findOne({ email: validatedData.email })
    if (existingDoctor) {
      return NextResponse.json(
        { error: 'A doctor with this email already exists' },
        { status: 400 }
      )
    }
    
    // Add additional fields
    const doctorData = {
      ...validatedData,
      joinedDate: new Date().toISOString(),
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    // Insert doctor into database
    const result = await doctorsCollection.insertOne(doctorData)
    
    return NextResponse.json(
      { 
        message: 'Doctor added successfully',
        doctorId: result.insertedId
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Error adding doctor:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation error',
          details: error.errors
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const specialization = searchParams.get('specialization')
    const search = searchParams.get('search')
    
    // Connect to MongoDB
    const db = await connectToDatabase()
    const doctorsCollection = db.collection('doctors')
    
    // Build query
    let query = {}
    
    if (specialization && specialization !== 'all') {
      query.specialization = specialization
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } }
      ]
    }
    
    // Fetch doctors
    const doctors = await doctorsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()
    
    return NextResponse.json(doctors, { status: 200 })
    
  } catch (error) {
    console.error('Error fetching doctors:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
