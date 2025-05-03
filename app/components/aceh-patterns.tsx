interface AcehPatternsProps {
  className?: string
}

export default function AcehPatterns({ className = "" }: AcehPatternsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-0 left-0 w-32 h-32 bg-[url('/patterns/aceh-corner-flipped.png')] bg-no-repeat bg-contain"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-[url('/patterns/aceh-corner.png')] bg-no-repeat bg-contain transform rotate-90"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[url('/patterns/aceh-corner.png')] bg-no-repeat bg-contain transform -rotate-90"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[url('/patterns/aceh-corner-flipped.png')] bg-no-repeat bg-contain transform rotate-180"></div>
    </div>
  )
}
