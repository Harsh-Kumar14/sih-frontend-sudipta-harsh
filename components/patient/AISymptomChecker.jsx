"use client"

import { useState } from "react"

export default function AISymptomChecker() {
  const [symptoms, setSymptoms] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

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
  ]

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0 && !symptoms.trim()) {
      alert("Please select or describe your symptoms first.")
      return
    }

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        possibleConditions: [
          { name: "Common Cold", probability: "High (85%)", severity: "Mild" },
          { name: "Viral Infection", probability: "Medium (60%)", severity: "Mild to Moderate" },
          { name: "Allergic Reaction", probability: "Low (25%)", severity: "Mild" },
        ],
        recommendations: [
          "Rest and stay hydrated",
          "Monitor symptoms for 24-48 hours",
          "Consider over-the-counter pain relievers if needed",
          "Consult a doctor if symptoms worsen or persist beyond 7 days",
        ],
        urgency: "Low",
        suggestedSpecialist: "General Practitioner",
      }
      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleReset = () => {
    setSymptoms("")
    setSelectedSymptoms([])
    setAnalysis(null)
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
          <div>
            <h2 className="text-2xl font-bold text-foreground">AI Symptom Checker</h2>
            <p className="text-muted-foreground">Get preliminary insights about your symptoms</p>
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
                proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Symptom Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Select your symptoms:</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => handleSymptomToggle(symptom)}
                  className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    selectedSymptoms.includes(symptom)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:bg-muted"
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
              placeholder="Describe any other symptoms you're experiencing..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
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
          <h3 className="text-xl font-semibold text-foreground mb-4">Analysis Results</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Possible Conditions:</h4>
              <div className="space-y-2">
                {analysis.possibleConditions.map((condition, index) => (
                  <div key={index} className="bg-muted rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-foreground">{condition.name}</span>
                      <span className="text-sm text-muted-foreground">{condition.severity}</span>
                    </div>
                    <p className="text-sm text-primary mt-1">{condition.probability}</p>
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
                    {rec}
                  </li>
                ))}
              </ul>

              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium text-foreground">Suggested Specialist:</p>
                <p className="text-sm text-primary">{analysis.suggestedSpecialist}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:bg-secondary/90 transition-colors">
              Find {analysis.suggestedSpecialist}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
