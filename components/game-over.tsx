"use client"

import { Trophy, RotateCcw, Home } from "lucide-react"

interface GameOverProps {
  score: number
  level: number
  moves: number
  bestScore: number
  onRestart: () => void
  onMenu: () => void
}

export function GameOver({ score, level, moves, bestScore, onRestart, onMenu }: GameOverProps) {
  const isNewRecord = score > bestScore

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="bg-card p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl border border-border max-w-2xl w-full text-center space-y-6 sm:space-y-8">
        <div className="space-y-3 sm:space-y-4">
          {isNewRecord && (
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full text-xs sm:text-sm font-semibold">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
              ¡Nuevo Récord!
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-card-foreground">¡Juego Terminado!</h2>
          <p className="text-base sm:text-lg text-muted-foreground">Llegaste al nivel {level}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 sm:p-6 bg-muted rounded-xl">
            <div className="text-xs sm:text-sm text-muted-foreground mb-2">Puntuación Final</div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">{score}</div>
          </div>
          <div className="p-4 sm:p-6 bg-muted rounded-xl">
            <div className="text-xs sm:text-sm text-muted-foreground mb-2">Nivel Alcanzado</div>
            <div className="text-2xl sm:text-3xl font-bold text-secondary">{level}</div>
          </div>
          <div className="p-4 sm:p-6 bg-muted rounded-xl">
            <div className="text-xs sm:text-sm text-muted-foreground mb-2">Movimientos</div>
            <div className="text-2xl sm:text-3xl font-bold text-accent">{moves}</div>
          </div>
        </div>

        {bestScore > 0 && (
          <div className="p-3 sm:p-4 bg-muted/50 rounded-xl border border-border">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Mejor Puntuación</div>
            <div className="text-xl sm:text-2xl font-bold text-foreground">{bestScore}</div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
          <button
            onClick={onMenu}
            className="flex-1 px-6 py-3 bg-muted text-muted-foreground rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            Menú Principal
          </button>
          <button
            onClick={onRestart}
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            Jugar de Nuevo
          </button>
        </div>
      </div>
    </div>
  )
}
