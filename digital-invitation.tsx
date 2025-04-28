"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function DigitalInvitation() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setHasResponded(true)
  }

  return (
    <div className="flex min-h-[600px] w-full items-center justify-center p-4 md:p-8">
      <div className="relative w-full max-w-3xl">
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Card className="w-full overflow-hidden border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-rose-100 shadow-lg">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 text-rose-400">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h1 className="mb-2 font-serif text-3xl font-bold text-rose-800">You're Invited</h1>
                <p className="mb-6 text-rose-600">Please open to view your invitation</p>
                <Button onClick={handleOpen} className="bg-rose-500 hover:bg-rose-600">
                  Open Invitation
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <Card className="overflow-hidden border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-rose-100 shadow-xl">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden bg-rose-200 sm:h-64">
                  <img
                    src="/placeholder.svg?height=400&width=800"
                    alt="Event decoration"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-500/50 to-transparent"></div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="mb-8 text-center">
                    <h2 className="mb-1 font-serif text-sm font-medium uppercase tracking-wider text-rose-600">
                      You are cordially invited to
                    </h2>
                    <h1 className="mb-3 font-serif text-4xl font-bold text-rose-800 sm:text-5xl">
                      Sarah & Michael's Wedding
                    </h1>
                    <p className="text-rose-600">Join us as we celebrate our special day</p>
                  </div>

                  <div className="mb-8 grid gap-4 sm:grid-cols-3">
                    <div className="flex flex-col items-center rounded-lg bg-white/80 p-4 text-center shadow-sm">
                      <Calendar className="mb-2 h-6 w-6 text-rose-500" />
                      <h3 className="mb-1 font-medium text-rose-800">Date</h3>
                      <p className="text-sm text-rose-600">June 15, 2025</p>
                    </div>

                    <div className="flex flex-col items-center rounded-lg bg-white/80 p-4 text-center shadow-sm">
                      <Clock className="mb-2 h-6 w-6 text-rose-500" />
                      <h3 className="mb-1 font-medium text-rose-800">Time</h3>
                      <p className="text-sm text-rose-600">4:00 PM</p>
                    </div>

                    <div className="flex flex-col items-center rounded-lg bg-white/80 p-4 text-center shadow-sm">
                      <MapPin className="mb-2 h-6 w-6 text-rose-500" />
                      <h3 className="mb-1 font-medium text-rose-800">Location</h3>
                      <p className="text-sm text-rose-600">Rosewood Gardens</p>
                    </div>
                  </div>

                  <div className="mb-6 rounded-lg bg-white/80 p-5 shadow-sm">
                    <h3 className="mb-3 text-center font-serif text-xl font-semibold text-rose-800">
                      {hasResponded ? "Thank You!" : "RSVP"}
                    </h3>

                    {!hasResponded ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-rose-700">
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              placeholder="Your name"
                              required
                              className="border-rose-200 focus-visible:ring-rose-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-rose-700">
                              Email
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Your email"
                              required
                              className="border-rose-200 focus-visible:ring-rose-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-rose-700">Will you attend?</Label>
                          <RadioGroup defaultValue="yes" className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="yes" className="text-rose-500" />
                              <Label htmlFor="yes" className="text-rose-700">
                                Yes, I'll be there
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="no" className="text-rose-500" />
                              <Label htmlFor="no" className="text-rose-700">
                                Sorry, I can't make it
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="guests" className="text-rose-700">
                            Number of Guests
                          </Label>
                          <Input
                            id="guests"
                            type="number"
                            min="1"
                            max="5"
                            defaultValue="1"
                            className="border-rose-200 focus-visible:ring-rose-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-rose-700">
                            Message (Optional)
                          </Label>
                          <Textarea
                            id="message"
                            placeholder="Any dietary restrictions or special notes"
                            className="border-rose-200 focus-visible:ring-rose-500"
                          />
                        </div>

                        <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600">
                          <Send className="mr-2 h-4 w-4" />
                          Send RSVP
                        </Button>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <p className="mb-4 text-rose-700">
                          Thank you for your response! We've received your RSVP and look forward to celebrating with
                          you.
                        </p>
                        <p className="text-sm text-rose-600">
                          A confirmation has been sent to your email with additional details.
                        </p>
                      </motion.div>
                    )}
                  </div>

                  <div className="text-center text-sm text-rose-600">
                    <p>For any questions, please contact us at:</p>
                    <p className="font-medium">wedding@sarahandmichael.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
