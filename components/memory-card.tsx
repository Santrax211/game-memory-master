"use client"

interface Card {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

interface MemoryCardProps {
  card: Card
  onClick: () => void
}

export function MemoryCard({ card, onClick }: MemoryCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={card.isMatched}
      className={`
        aspect-square rounded-xl transition-all duration-300 transform
        ${card.isMatched ? "opacity-50 scale-95" : "hover:scale-105"}
        ${card.isFlipped || card.isMatched ? "bg-gradient-to-br from-primary to-secondary" : "bg-card border-2 border-border"}
        shadow-lg hover:shadow-xl
        ${card.isMatched ? "match-animation" : ""}
      `}
      aria-label={card.isFlipped ? `Carta ${card.symbol}` : "Carta oculta"}
    >
      <div className="w-full h-full flex items-center justify-center">
        {card.isFlipped || card.isMatched ? (
          <span className="text-4xl md:text-5xl lg:text-6xl">{card.symbol}</span>
        ) : (
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-muted to-muted-foreground/20" />
        )}
      </div>
    </button>
  )
}
