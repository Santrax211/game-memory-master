"use client"

import { Pause } from "lucide-react"

interface GameHeaderProps {
  level: number
  score: number
  timeLeft: number
  moves: number
  onPause: () => void
}

export function GameHeader({ level, score, timeLeft, moves, onPause }: GameHeaderProps) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const timeColor = timeLeft <= 10 ? "text-destructive" : "text-foreground"

  return (
    <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Nivel {level}</h2>
        <button
          onClick={onPause}
          className="p-2 sm:p-3 bg-card hover:bg-muted rounded-xl border border-border transition-colors shrink-0"
          aria-label="Pausar juego"
        >
          <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        <div className="bg-card p-3 sm:p-4 rounded-xl border border-border shadow-sm">
          <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1">Puntuación</div>
          <div className="text-lg sm:text-2xl md:text-3xl font-bold text-primary truncate">{score}</div>
        </div>
        <div className="bg-card p-3 sm:p-4 rounded-xl border border-border shadow-sm">
          <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1">Tiempo</div>
          <div className={`text-lg sm:text-2xl md:text-3xl font-bold font-mono ${timeColor} truncate`}>
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        </div>
        <div className="bg-card p-3 sm:p-4 rounded-xl border border-border shadow-sm">
          <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1">Movimientos</div>
          <div className="text-lg sm:text-2xl md:text-3xl font-bold text-secondary truncate">{moves}</div>
        </div>
      </div>
    </div>
  )
}
