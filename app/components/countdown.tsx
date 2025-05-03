"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CountdownProps {
  targetDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <CountdownItem value={timeLeft.days} label="Hari" />
      <CountdownItem value={timeLeft.hours} label="Jam" />
      <CountdownItem value={timeLeft.minutes} label="Menit" />
      <CountdownItem value={timeLeft.seconds} label="Detik" />
    </div>
  )
}

interface CountdownItemProps {
  value: number
  label: string
}

function CountdownItem({ value, label }: CountdownItemProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center"
    >
      <div className="w-20 h-20 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white mb-2">
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <span className="text-sm font-medium text-white/80">{label}</span>
    </motion.div>
  )
}
