"use client"

import { useState, useRef, useEffect } from "react"
import { Music, Pause, Play } from "lucide-react"

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    try {
      const audio = new Audio()
      audio.src = "/audio/aceh-music.mp3"
      audio.loop = true

      // Add error handling
      audio.addEventListener("error", (e) => {
        console.error("Audio error:", e)
        setAudioLoaded(false)
      })

      // Add loaded data handling
      audio.addEventListener("loadeddata", () => {
        setAudioLoaded(true)
      })

      audioRef.current = audio

      return () => {
        audio.pause()
        audio.src = ""
      }
    } catch (error) {
      console.error("Error initializing audio:", error)
      setAudioLoaded(false)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current || !audioLoaded) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        // Use a user interaction to start playing
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
            })
            .catch((error) => {
              // Auto-play was prevented
              console.error("Playback prevented:", error)
              setIsPlaying(false)
            })
        }
      }
      setIsPlaying(!isPlaying)
    } catch (error) {
      console.error("Error playing audio:", error)
    }
  }

  const hidePlayer = () => {
    setIsVisible(false)
    // Make sure to pause audio when hiding player
    if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  // If audio failed to load, don't show the player
  if (!audioLoaded && audioRef.current?.error) {
    return null
  }

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 p-3 bg-[#0c4a34] text-white rounded-full shadow-lg">
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#d4af37] text-[#0c4a34] hover:bg-[#c9a633] transition-colors"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2 pr-2">
            <Music className="w-4 h-4" />
            <span className="text-sm font-medium">Musik Aceh</span>
          </div>
          <button
            onClick={hidePlayer}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Hide music player"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
