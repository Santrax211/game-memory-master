"use client"

import { useState } from "react"
import { ArrowRight, Target, Clock, Zap } from "lucide-react"

interface TutorialProps {
  onComplete: () => void
  level: number
}

export function Tutorial({ onComplete, level }: TutorialProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      icon: Target,
      title: "¡Bienvenido a Memory Master!",
      description:
        "Tu objetivo es encontrar todos los pares de cartas idénticas. Haz clic en dos cartas para voltearlas.",
      color: "text-primary",
    },
    {
      icon: Clock,
      title: "Juega Contra el Reloj",
      description:
        "Tienes tiempo limitado para completar cada nivel. ¡Encuentra los pares rápidamente para ganar más puntos!",
      color: "text-secondary",
    },
    {
      icon: Zap,
      title: "Gana Puntos",
      description: "Menos movimientos y más tiempo restante = más puntos. ¡Intenta superar tu mejor puntuación!",
      color: "text-accent",
    },
  ]

  const currentStep = steps[step]
  const Icon = currentStep.icon

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="bg-card p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl border border-border max-w-2xl w-full">
        <div className="text-center space-y-4 sm:space-y-6">
          <div className={`inline-flex p-4 sm:p-6 rounded-full bg-muted ${currentStep.color}`}>
            <Icon className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-card-foreground text-balance px-2">
              {currentStep.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed px-2">
              {currentStep.description}
            </p>
          </div>

          <div className="flex gap-2 justify-center pt-2 sm:pt-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === step ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6">
            <button
              onClick={handleSkip}
              className="flex-1 px-6 py-3 bg-muted text-muted-foreground rounded-xl font-semibold hover:scale-105 transition-transform text-sm sm:text-base"
            >
              Saltar Tutorial
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {step < steps.length - 1 ? "Siguiente" : "¡Comenzar!"}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
