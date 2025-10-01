"use client"

import { useState, useEffect, useCallback } from "react"
import { MemoryCard } from "@/components/memory-card"

interface Card {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

interface GameBoardProps {
  level: number
  score: number
  setScore: (score: number) => void
  timeLeft: number
  setTimeLeft: (time: number) => void
  moves: number
  setMoves: (moves: number) => void
  onLevelComplete: (timeBonus: number) => void
  onGameOver: (won: boolean) => void
}

const SYMBOLS = [
  "🎮",
  "🎯",
  "🎨",
  "🎭",
  "🎪",
  "🎸",
  "🎺",
  "🎹",
  "🎲",
  "🎰",
  "🏆",
  "🏅",
  "⚡",
  "🌟",
  "💎",
  "🔥",
  "🌈",
  "🦄",
]

export function GameBoard({
  level,
  score,
  setScore,
  timeLeft,
  setTimeLeft,
  moves,
  setMoves,
  onLevelComplete,
  onGameOver,
}: GameBoardProps) {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [isChecking, setIsChecking] = useState(false)

  const pairsCount = Math.min(4 + level, 9)
  const gridCols =
    pairsCount <= 6
      ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-4"
      : "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"

  const initializeCards = useCallback(() => {
    const selectedSymbols = SYMBOLS.slice(0, pairsCount)
    const cardPairs = [...selectedSymbols, ...selectedSymbols]
    const shuffled = cardPairs
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5)

    setCards(shuffled)
    setFlippedCards([])
  }, [pairsCount])

  useEffect(() => {
    initializeCards()
  }, [initializeCards])

  useEffect(() => {
    if (timeLeft <= 0) {
      onGameOver(false)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, setTimeLeft, onGameOver])

  useEffect(() => {
    const matchedCount = cards.filter((card) => card.isMatched).length
    if (matchedCount === cards.length && cards.length > 0) {
      const timeBonus = timeLeft * 10
      setTimeout(() => {
        onLevelComplete(timeBonus)
      }, 1000)
    }
  }, [cards, onLevelComplete, timeLeft])

  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.length >= 2) return

    const card = cards.find((c) => c.id === id)
    if (!card || card.isFlipped || card.isMatched) return

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c)))

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      setIsChecking(true)

      const [firstId, secondId] = newFlippedCards
      const firstCard = cards.find((c) => c.id === firstId)
      const secondCard = cards.find((c) => c.id === secondId)

      if (firstCard?.symbol === secondCard?.symbol) {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c)))
          const points = Math.max(100 - moves * 5, 50) + timeLeft * 2
          setScore(score + points)
          setFlippedCards([])
          setIsChecking(false)
        }, 600)
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c)))
          setFlippedCards([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }

  return (
    <div className={`grid ${gridCols} gap-2 sm:gap-3 md:gap-4 max-w-3xl lg:max-w-4xl mx-auto`}>
      {cards.map((card) => (
        <MemoryCard key={card.id} card={card} onClick={() => handleCardClick(card.id)} />
      ))}
    </div>
  )
}
