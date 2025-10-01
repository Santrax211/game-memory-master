"use client"

import { useState, useEffect } from "react"
import { GameBoard } from "@/components/game-board"
import { GameHeader } from "@/components/game-header"
import { Tutorial } from "@/components/tutorial"
import { GameOver } from "@/components/game-over"
import { LevelComplete } from "@/components/level-complete"
import { ThemeToggle } from "@/components/theme-toggle"

export type GameState = "menu" | "tutorial" | "playing" | "paused" | "gameover" | "levelcomplete"

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("menu")
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [moves, setMoves] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [lastTimeBonus, setLastTimeBonus] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem("memoryGameBestScore")
    if (saved) setBestScore(Number.parseInt(saved))
  }, [])

  const startGame = () => {
    setGameState("tutorial")
    setLevel(1)
    setScore(0)
    setMoves(0)
    setTimeLeft(60)
  }

  const startPlaying = () => {
    setGameState("playing")
  }

  const completeLevel = (timeBonus: number) => {
    setLastTimeBonus(timeBonus)
    setGameState("levelcomplete")
  }

  const nextLevel = () => {
    const newLevel = level + 1
    setLevel(newLevel)
    setTimeLeft(60 + (newLevel - 1) * 10)
    setMoves(0)
    setGameState("playing")
  }

  const gameOver = (won: boolean) => {
    if (won && score > bestScore) {
      setBestScore(score)
      localStorage.setItem("memoryGameBestScore", score.toString())
    }
    setGameState("gameover")
  }

  const returnToMenu = () => {
    setGameState("menu")
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {(gameState === "menu" || gameState === "playing") && (
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
        )}

        {gameState === "menu" && (
          <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
            <div className="text-center space-y-6 md:space-y-8 max-w-2xl">
              <div className="space-y-3 md:space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance text-foreground drop-shadow-lg">
                  Memory Master
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-balance px-4">
                  Pon a prueba tu memoria encontrando todos los pares de cartas
                </p>
              </div>

              {bestScore > 0 && (
                <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-card rounded-full border border-border shadow-lg">
                  <span className="text-xs sm:text-sm text-muted-foreground">Mejor puntuación:</span>
                  <span className="text-xl sm:text-2xl font-bold text-primary">{bestScore}</span>
                </div>
              )}

              <button
                onClick={startGame}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Comenzar Juego</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-8 px-2">
                <div className="p-4 md:p-6 bg-card rounded-xl border border-border shadow-sm">
                  <div className="text-2xl md:text-3xl mb-2">🎯</div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base text-card-foreground">Niveles Progresivos</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Aumenta la dificultad con cada nivel</p>
                </div>
                <div className="p-4 md:p-6 bg-card rounded-xl border border-border shadow-sm">
                  <div className="text-2xl md:text-3xl mb-2">⏱️</div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base text-card-foreground">Contra el Reloj</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Completa antes de que se acabe el tiempo</p>
                </div>
                <div className="p-4 md:p-6 bg-card rounded-xl border border-border shadow-sm">
                  <div className="text-2xl md:text-3xl mb-2">🏆</div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base text-card-foreground">Sistema de Puntos</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Gana puntos por velocidad y precisión</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {gameState === "tutorial" && <Tutorial onComplete={startPlaying} level={level} />}

        {gameState === "playing" && (
          <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-6xl">
            <GameHeader
              level={level}
              score={score}
              timeLeft={timeLeft}
              moves={moves}
              onPause={() => setGameState("paused")}
            />
            <GameBoard
              level={level}
              score={score}
              setScore={setScore}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              moves={moves}
              setMoves={setMoves}
              onLevelComplete={completeLevel}
              onGameOver={gameOver}
            />
          </div>
        )}

        {gameState === "paused" && (
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-2xl border border-border max-w-md w-full text-center space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">Juego Pausado</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setGameState("playing")}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-transform"
                >
                  Continuar
                </button>
                <button
                  onClick={returnToMenu}
                  className="w-full px-6 py-3 bg-muted text-muted-foreground rounded-xl font-semibold hover:scale-105 transition-transform"
                >
                  Menú Principal
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState === "levelcomplete" && (
          <LevelComplete level={level} score={score} moves={moves} timeBonus={lastTimeBonus} onNextLevel={nextLevel} />
        )}

        {gameState === "gameover" && (
          <GameOver
            score={score}
            level={level}
            moves={moves}
            bestScore={bestScore}
            onRestart={startGame}
            onMenu={returnToMenu}
          />
        )}
      </div>
    </div>
  )
}
