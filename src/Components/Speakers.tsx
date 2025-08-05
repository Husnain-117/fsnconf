"use client"

import type React from "react"
import { useState } from "react"
import { Users, Star, ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react"
import { Button } from "@/Components/ui/button"

interface Speaker {
  id: string
  name: string
  title: string
  company: string
  image: string
  bio: string
  expertise: string[]
  social: {
    linkedin?: string
    twitter?: string
    website?: string
  }
  featured: boolean
  talkTitle: string
  talkDescription: string
}

const speakers: Speaker[] = [
  // Keynote Speakers
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Chief Food Scientist",
    company: "Global Nutrition Institute",
    image: "/placeholder.svg?height=300&width=300&text=Dr.+Sarah+Chen",
    bio: "Leading food science researcher with 15+ years of experience in nutritional fortification and food safety.",
    expertise: ["Food Science", "Nutrition", "Food Safety"],
    social: { linkedin: "#", twitter: "#", website: "#" },
    featured: true,
    talkTitle: "Future of Nutritional Fortification",
    talkDescription: "Exploring innovative approaches to combat malnutrition through food fortification.",
  },
  {
    id: "2",
    name: "Prof. Michael Rodriguez",
    title: "Director of Research",
    company: "International Food Policy Institute",
    image: "/placeholder.svg?height=300&width=300&text=Prof.+Michael+Rodriguez",
    bio: "Renowned expert in food policy and sustainable food systems with extensive research background.",
    expertise: ["Food Policy", "Sustainability", "Research"],
    social: { linkedin: "#", twitter: "#" },
    featured: true,
    talkTitle: "Sustainable Food Systems for Future",
    talkDescription: "Addressing climate change challenges in global food production and distribution.",
  },
  // Session Chairs
  {
    id: "7",
    name: "Dr. Robert Johnson",
    title: "Conference Chair",
    company: "COMSATS University",
    image: "/placeholder.svg?height=300&width=300&text=Dr.+Robert+Johnson",
    bio: "Distinguished professor with 20+ years in food science education and conference management.",
    expertise: ["Food Science Education", "Conference Management", "Academic Leadership"],
    social: { linkedin: "#", twitter: "#" },
    featured: false,
    talkTitle: "Welcome and Conference Overview",
    talkDescription: "Opening remarks and overview of conference themes and schedule.",
  },
  {
    id: "8",
    name: "Prof. Emily Wilson",
    title: "Session Moderator",
    company: "Food Research Institute",
    image: "/placeholder.svg?height=300&width=300&text=Prof.+Emily+Wilson",
    bio: "Leading researcher in food technology with extensive conference organization experience.",
    expertise: ["Food Technology", "Research", "Conference Organization"],
    social: { linkedin: "#", website: "#" },
    featured: false,
    talkTitle: "Panel Discussion: Future of Food Tech",
    talkDescription: "Moderating expert panel on innovations in food technology.",
  },
  // Invited Speakers
  {
    id: "3",
    name: "Dr. James Park",
    title: "Research Scientist",
    company: "Nutrition Research Lab",
    image: "/placeholder.svg?height=300&width=300&text=Dr.+James+Park",
    bio: "Expert in functional foods and nutraceuticals with 50+ published papers.",
    expertise: ["Functional Foods", "Nutraceuticals", "Research"],
    social: { linkedin: "#", twitter: "#", website: "#" },
    featured: false,
    talkTitle: "Functional Foods and Health",
    talkDescription: "Understanding the role of functional foods in promoting health.",
  },
  {
    id: "4",
    name: "Maria Gonzalez",
    title: "Food Safety Director",
    company: "Global Food Standards",
    image: "/placeholder.svg?height=300&width=300&text=Maria+Gonzalez",
    bio: "Food safety expert with extensive experience in quality assurance and regulations.",
    expertise: ["Food Safety", "Quality Assurance", "Regulations"],
    social: { linkedin: "#", twitter: "#" },
    featured: false,
    talkTitle: "Food Safety in Global Supply Chains",
    talkDescription: "Ensuring food safety across complex global distribution networks.",
  },
  {
    id: "5",
    name: "Alex Kumar",
    title: "Biotechnology Researcher",
    company: "BioFood Innovations",
    image: "/placeholder.svg?height=300&width=300&text=Alex+Kumar",
    bio: "Pioneer in food biotechnology and genomics applications in food science.",
    expertise: ["Biotechnology", "Genomics", "Innovation"],
    social: { linkedin: "#", website: "#" },
    featured: false,
    talkTitle: "Biotechnology in Food Production",
    talkDescription: "Leveraging biotechnology for sustainable food production.",
  },
]

export const Speakers: React.FC = () => {
    const [currentView, setCurrentView] = useState<"main" | "keynote" | "session" | "invited">("main")
  const [currentIndex, setCurrentIndex] = useState(0)

  const keynoteSpeakers = speakers.filter((speaker) => speaker.featured)
  const sessionChairs = speakers.filter((speaker) => !speaker.featured && (speaker.id === "7" || speaker.id === "8"))
  const invitedSpeakers = speakers.filter((speaker) => !speaker.featured && speaker.id !== "7" && speaker.id !== "8")

  const nextSlide = () => {
    const currentSpeakers =
      currentView === "keynote" ? keynoteSpeakers : currentView === "session" ? sessionChairs : invitedSpeakers
    setCurrentIndex((prev) => (prev + 1) % currentSpeakers.length)
  }

  const prevSlide = () => {
    const currentSpeakers =
      currentView === "keynote" ? keynoteSpeakers : currentView === "session" ? sessionChairs : invitedSpeakers
    setCurrentIndex((prev) => (prev - 1 + currentSpeakers.length) % currentSpeakers.length)
  }

  if (currentView !== "main") {
    const currentSpeakers =
      currentView === "keynote" ? keynoteSpeakers : currentView === "session" ? sessionChairs : invitedSpeakers
    const currentSpeaker = currentSpeakers[currentIndex]

    return (
      <section className="min-h-screen py-16 px-6 bg-white flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-slate-800 mb-4">
              {currentView === "keynote" ? "Keynote" : currentView === "session" ? "Session" : "Invited"}{" "}
              <span className="text-yellow-600">
                Speakers
              </span>
            </h2>
            <Button
              onClick={() => setCurrentView("main")}
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              ← Back to Overview
            </Button>
          </div>

          {/* Speaker Slideshow */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={currentSpeaker.image || "/placeholder.svg"}
                    alt={currentSpeaker.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="mb-4">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold text-white ${
                        currentView === "keynote"
                          ? "bg-gradient-to-r from-yellow-500 to-amber-500"
                          : currentView === "session"
                            ? "bg-gradient-to-r from-purple-500 to-violet-500"
                            : "bg-gradient-to-r from-purple-600 to-pink-600"
                      }`}
                    >
                      <Star className="h-3 w-3" />
                      {currentView === "keynote" ? "Keynote" : currentView === "session" ? "Session Chair" : "Invited"}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{currentSpeaker.name}</h3>
                  <p className="text-lg font-semibold text-purple-600 mb-1">{currentSpeaker.title}</p>
                  <p className="text-slate-600 mb-4">{currentSpeaker.company}</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">Talk: {currentSpeaker.talkTitle}</h4>
                      <p className="text-slate-600 text-sm">{currentSpeaker.talkDescription}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentSpeaker.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            {currentSpeakers.length > 1 && (
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  onClick={prevSlide}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-3 rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2">
                  {currentSpeakers.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full ${idx === currentIndex ? "bg-purple-600" : "bg-purple-200"}`}
                    />
                  ))}
                </div>
                <Button
                  onClick={nextSlide}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-3 rounded-full"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            Featured{" "}
            <span className="text-yellow-600">
              Speakers
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
           <i>Learn from industry leaders, renowned researchers, and visionary innovators.</i>
          </p>
        </div>

        {/* Speaker Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Keynote Speakers */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-6 w-6" />
                <h3 className="text-xl font-bold">Keynote Speakers</h3>
              </div>
              <p className="text-yellow-100 text-sm">Industry leaders and visionaries</p>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                {keynoteSpeakers.map((speaker) => (
                  <div key={speaker.id} className="flex items-center gap-3">
                    <img
                      src={speaker.image || "/placeholder.svg"}
                      alt={speaker.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{speaker.name}</div>
                      <div className="text-slate-600 text-xs">{speaker.company}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => {
                  setCurrentView("keynote")
                  setCurrentIndex(0)
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold py-2 rounded-full"
              >
                View Keynote Speakers
              </Button>
            </div>
          </div>

          {/* Session Chairs */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6" />
                <h3 className="text-xl font-bold">Session Chairs</h3>
              </div>
              <p className="text-purple-100 text-sm">Conference organizers and moderators</p>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                {sessionChairs.map((speaker) => (
                  <div key={speaker.id} className="flex items-center gap-3">
                    <img
                      src={speaker.image || "/placeholder.svg"}
                      alt={speaker.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{speaker.name}</div>
                      <div className="text-slate-600 text-xs">{speaker.company}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => {
                  setCurrentView("session")
                  setCurrentIndex(0)
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold py-2 rounded-full"
              >
                View Session Chairs
              </Button>
            </div>
          </div>

          {/* Invited Speakers */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Play className="h-6 w-6" />
                <h3 className="text-xl font-bold">Invited Speakers</h3>
              </div>
              <p className="text-purple-100 text-sm">Expert researchers and practitioners</p>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                {invitedSpeakers.slice(0, 2).map((speaker) => (
                  <div key={speaker.id} className="flex items-center gap-3">
                    <img
                      src={speaker.image || "/placeholder.svg"}
                      alt={speaker.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{speaker.name}</div>
                      <div className="text-slate-600 text-xs">{speaker.company}</div>
                    </div>
                  </div>
                ))}
                {invitedSpeakers.length > 3 && (
                  <div className="text-center text-sm text-slate-500">
                    +{invitedSpeakers.length - 3} more speakers
                  </div>
                )}
              </div>
              <Button
                onClick={() => {
                  setCurrentView("invited")
                  setCurrentIndex(0)
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 rounded-full"
              >
                View All Speakers
              </Button>
            </div>
          </div>
        </div>

      </div>
      <Button
          
            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            View All Speakers
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
    </section>
  )
}

export default Speakers
