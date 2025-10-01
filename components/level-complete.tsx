"use client"

import { Trophy, Star, Zap } from "lucide-react"

interface LevelCompleteProps {
  level: number
  score: number
  moves: number
  timeBonus: number
  onNextLevel: () => void
}

export function LevelComplete({ level, score, moves, timeBonus, onNextLevel }: LevelCompleteProps) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-2xl border border-border max-w-md w-full text-center space-y-4 sm:space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary/20 rounded-full animate-ping" />
          </div>
          <div className="relative flex items-center justify-center">
            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">¡Nivel Completado!</h2>
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            Has superado el <span className="font-semibold text-primary">Nivel {level}</span>
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3 py-2 sm:py-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
              <span className="text-xs sm:text-sm text-muted-foreground">Puntuación Total</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-primary">{score}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" />
              <span className="text-xs sm:text-sm text-muted-foreground">Bonus de Tiempo</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-secondary">+{timeBonus}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-xs sm:text-sm text-muted-foreground">Movimientos</span>
            <span className="text-base sm:text-lg font-semibold text-card-foreground">{moves}</span>
          </div>
        </div>

        <div className="pt-2 sm:pt-4">
          <button
            onClick={onNextLevel}
            className="w-full px-6 py-3 sm:py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-base sm:text-lg hover:scale-105 transition-transform shadow-lg"
          >
            Continuar al Nivel {level + 1}
          </button>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground px-2">
          ¡Prepárate! El siguiente nivel será más desafiante
        </p>
      </div>
    </div>
  )
}
