"use client"

import { useState, useEffect } from "react"

export default function AISymptomChecker() {
  const [symptoms, setSymptoms] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState(null)
  const [apiHealth, setApiHealth] = useState(null)

  // API configuration
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

  const commonSymptoms = [
    "Headache",
    "Fever", 
    "Cough",
    "Sore throat",
    "Fatigue",
    "Nausea",
    "Chest pain",
    "Shortness of breath",
    "Dizziness",
    "Back pain",
    "Stomach pain", 
    "Joint pain",
    "Skin rash",
    "Loss of appetite",
    "Muscle pain",
    "Vomiting",
    "Diarrhea",
    "Constipation",
    "Insomnia",
    "Weight loss"
  ]

  // Check API health on component mount
  useEffect(() => {
    checkApiHealth()
  }, [])

  const checkApiHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`)
      if (response.ok) {
        const health = await response.json()
        setApiHealth(health)
        console.log('✅ API is healthy:', health)
      } else {
        setApiHealth({ status: 'unhealthy', model_loaded: false })
      }
    } catch (error) {
      console.error('❌ API health check failed:', error)
      setApiHealth({ status: 'unreachable', model_loaded: false })
    }
  }

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms((prev) => 
      prev.includes(symptom) 
        ? prev.filter((s) => s !== symptom) 
        : [...prev, symptom]
    )
    // Clear any previous errors when user interacts
    setError(null)
  }

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0 && !symptoms.trim()) {
      setError("Please select or describe your symptoms first.")
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch(`${API_BASE_URL}/analyze-symptoms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selected_symptoms: selectedSymptoms,
          symptoms_text: symptoms
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const result = await response.json()
      
      // Transform the API response to match the frontend format
      const transformedAnalysis = {
        possibleConditions: result.possible_conditions || [],
        recommendations: result.recommendations || [],
        urgency: result.urgency || "Unknown",
        suggestedSpecialist: result.suggested_specialist || "General Practitioner",
        confidence: result.confidence || "Unknown",
        processedSymptoms: result.processed_symptoms || ""
      }

      setAnalysis(transformedAnalysis)
      
    } catch (error) {
      console.error('Analysis error:', error)
      setError(
        error.message.includes('Failed to fetch') 
          ? "Unable to connect to the analysis service. Please check your connection and try again."
          : error.message || "An unexpected error occurred during analysis."
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setSymptoms("")
    setSelectedSymptoms([])
    setAnalysis(null)
    setError(null)
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'emergency':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default:
        return 'text-green-600 bg-green-50 border-green-200'
    }
  }

  const getSeverityColor = (severity) => {
    if (severity?.toLowerCase().includes('high')) {
      return 'text-red-600'
    } else if (severity?.toLowerCase().includes('moderate')) {
      return 'text-orange-600'
    } else {
      return 'text-green-600'
    }
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-foreground mb-2">AI Symptom Checker</h2>
            <p className="text-lg text-muted-foreground">Get AI-powered insights about your symptoms</p>
          </div>
          
          {/* Enhanced API Status Indicator */}
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${
              apiHealth?.status === 'healthy' ? 'bg-green-500' : 
              apiHealth?.status === 'unhealthy' ? 'bg-orange-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm font-medium text-muted-foreground">
              {apiHealth?.model_loaded ? 'AI Ready' : 'AI Loading...'}
            </span>
          </div>
        </div>

        {/* Enhanced Medical Disclaimer */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6 mb-8 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold text-yellow-800 mb-2">Medical Disclaimer</p>
              <p className="text-base text-yellow-700">
                This AI tool provides preliminary insights only. Always consult with a healthcare professional for
                proper diagnosis and treatment. This is not a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Error Display */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-xl p-6 mb-8 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-red-800 mb-2">Error</p>
                <p className="text-base text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Symptom Selection */}
        <div className="bg-card border-2 border-border rounded-xl p-8 shadow-lg space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <label className="text-xl font-bold text-foreground">
                Select your symptoms ({selectedSymptoms.length} selected)
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => handleSymptomToggle(symptom)}
                  className={`px-6 py-4 text-base font-medium rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    selectedSymptoms.includes(symptom)
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-primary shadow-lg"
                      : "bg-background text-foreground border-border hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:border-primary/50 hover:shadow-md"
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <label htmlFor="additional-symptoms" className="text-lg font-bold text-foreground">
                Describe additional symptoms:
              </label>
            </div>
            <textarea
              id="additional-symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe any other symptoms you're experiencing in detail..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-border rounded-xl bg-input text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none shadow-sm"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !apiHealth?.model_loaded}
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 hover:scale-105"
            >
              {isAnalyzing && (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              )}
              {isAnalyzing ? "Analyzing..." : "Analyze Symptoms"}
            </button>
            <button
              onClick={handleReset}
              className="border-2 border-border text-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 transition-all duration-300 hover:shadow-md hover:scale-105"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Analysis Results */}
      {analysis && (
        <div className="bg-gradient-to-r from-card to-card/50 border-2 border-primary/20 rounded-xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Analysis Results</h3>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getUrgencyColor(analysis.urgency)}`}>
              Urgency: {analysis.urgency}
            </div>
          </div>

          {/* Confidence Level and Model Info */}
          <div className="mb-4 grid md:grid-cols-2 gap-3">
            {analysis.confidence && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">
                  Analysis Confidence: <span className="text-blue-600">{analysis.confidence}</span>
                </p>
              </div>
            )}
            {analysis.recognized_features !== undefined && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">
                  Recognized Features: <span className="text-green-600">
                    {analysis.recognized_features}/{analysis.total_features || 'Unknown'}
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-foreground">Possible Conditions:</h4>
              </div>
              <div className="space-y-4">
                {analysis.possibleConditions.map((condition, index) => (
                  <div key={index} className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-foreground text-base">{condition.name}</span>
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${getSeverityColor(condition.severity)}`}>
                        {condition.severity}
                      </span>
                    </div>
                    <p className="text-base text-primary font-bold">{condition.probability}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-foreground">Recommendations:</h4>
              </div>
              <ul className="space-y-3">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 text-base text-foreground bg-white border border-green-200 rounded-lg p-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={rec.includes('⚠️') ? 'text-red-600 font-bold' : 'font-medium'}>{rec}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl">
                <p className="text-base font-bold text-foreground mb-2">Suggested Specialist:</p>
                <p className="text-lg text-primary font-bold">{analysis.suggestedSpecialist}</p>
              </div>
            </div>
          </div>

          {/* Processed Symptoms Display */}
          {analysis.processedSymptoms && (
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Analyzed symptoms:</p>
              <p className="text-sm bg-muted p-2 rounded text-foreground">{analysis.processedSymptoms}</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t-2 border-border flex gap-4">
            <button className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
              Find {analysis.suggestedSpecialist}
            </button>
            <button 
              onClick={handleReset}
              className="border-2 border-border text-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 transition-all duration-300 hover:shadow-md hover:scale-105"
            >
              New Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  )
}