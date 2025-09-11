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
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">AI Symptom Checker</h2>
            <p className="text-muted-foreground">Get AI-powered insights about your symptoms</p>
          </div>
          
          {/* API Status Indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              apiHealth?.status === 'healthy' ? 'bg-green-500' : 
              apiHealth?.status === 'unhealthy' ? 'bg-orange-500' : 'bg-red-500'
            }`}></div>
            <span className="text-xs text-muted-foreground">
              {apiHealth?.model_loaded ? 'AI Ready' : 'AI Loading...'}
            </span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-yellow-800">Medical Disclaimer</p>
              <p className="text-sm text-yellow-700 mt-1">
                This AI tool provides preliminary insights only. Always consult with a healthcare professional for
                proper diagnosis and treatment. This is not a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800">Error</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Symptom Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Select your symptoms ({selectedSymptoms.length} selected):
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => handleSymptomToggle(symptom)}
                  className={`px-3 py-2 text-sm rounded-md border transition-all duration-200 ${
                    selectedSymptoms.includes(symptom)
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background text-foreground border-border hover:bg-muted hover:border-primary/50"
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="additional-symptoms" className="block text-sm font-medium text-foreground mb-2">
              Describe additional symptoms:
            </label>
            <textarea
              id="additional-symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe any other symptoms you're experiencing in detail..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !apiHealth?.model_loaded}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isAnalyzing && (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              )}
              {isAnalyzing ? "Analyzing..." : "Analyze Symptoms"}
            </button>
            <button
              onClick={handleReset}
              className="border border-border text-foreground px-6 py-2 rounded-md font-medium hover:bg-muted transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-foreground">Analysis Results</h3>
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(analysis.urgency)}`}>
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

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Possible Conditions:</h4>
              <div className="space-y-2">
                {analysis.possibleConditions.map((condition, index) => (
                  <div key={index} className="bg-muted rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-foreground">{condition.name}</span>
                      <span className={`text-sm font-medium ${getSeverityColor(condition.severity)}`}>
                        {condition.severity}
                      </span>
                    </div>
                    <p className="text-sm text-primary mt-1 font-medium">{condition.probability}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-3">Recommendations:</h4>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                    <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={rec.includes('⚠️') ? 'text-red-600 font-medium' : ''}>{rec}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium text-foreground">Suggested Specialist:</p>
                <p className="text-sm text-primary font-medium">{analysis.suggestedSpecialist}</p>
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

          <div className="mt-6 pt-4 border-t border-border flex gap-3">
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:bg-secondary/90 transition-colors">
              Find {analysis.suggestedSpecialist}
            </button>
            <button 
              onClick={handleReset}
              className="border border-border text-foreground px-4 py-2 rounded-md font-medium hover:bg-muted transition-colors"
            >
              New Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  )
}