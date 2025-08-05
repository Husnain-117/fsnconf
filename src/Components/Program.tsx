"use client"

import type React from "react"
import { useState } from "react"
import { CalendarDays, ArrowRight, Clock, Presentation, Award, Coffee, Camera, Sparkles, Users } from "lucide-react"
import { Button } from "@/Components/ui/button"

const programHighlights = [
  {
    title: "Inaugural Ceremony",
    description: "Grand opening with distinguished guests and keynote address",
    icon: <Sparkles className="h-6 w-6" />,
    time: "9:00 AM",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    title: "Keynote Lectures",
    description: "Inspiring talks from industry leaders and renowned researchers",
    icon: <Presentation className="h-6 w-6" />,
    time: "10:30 AM",
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    title: "Technical Sessions",
    description: "Parallel sessions covering cutting-edge research and innovations",
    icon: <Users className="h-6 w-6" />,
    time: "2:00 PM",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    title: "Poster Presentations",
    description: "Interactive showcase of research findings and methodologies",
    icon: <Award className="h-6 w-6" />,
    time: "3:30 PM",
    gradient: "from-amber-500 to-yellow-600",
  },
  {
    title: "Panel Discussions",
    description: "Expert panels addressing current challenges and future trends",
    icon: <Coffee className="h-6 w-6" />,
    time: "4:30 PM",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Cultural Visit",
    description: "Exclusive guided tour to the historic Harappa archaeological site",
    icon: <Camera className="h-6 w-6" />,
    time: "Full Day",
    gradient: "from-pink-500 to-purple-600",
  },
]

export const Program: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  hoveredCard;
  return (
    <section className="min-h-screen py-16 px-6 bg-[#D8CFF2] flex items-center justify-center">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            Conference{" "}
            <span className="text-yellow-600">Program</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto mb-8">
            <i>Discover an extraordinary lineup of sessions, presentations, and networking opportunities designed to
            inspire and educate.</i>
          </p>
          
          {/* Program Details */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <span className="bg-yellow-500 text-white p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              Program Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Conference Dates</h4>
                <p className="text-slate-600">October 13-14, 2025</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Location</h4>
                <p className="text-slate-600">COMSATS University Islamabad, Sahiwal Campus</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Registration</h4>
                <p className="text-slate-600">Opens: June 1, 2025</p>
                <p className="text-slate-600">Early Bird Deadline: August 31, 2025</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Program Includes</h4>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>Keynote Presentations</li>
                  <li>Technical Sessions</li>
                  <li>Workshops</li>
                  <li>Poster Sessions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Program Highlights Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">Program Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programHighlights.map((highlight, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className={`bg-gradient-to-r ${highlight.gradient} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      {highlight.icon}
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">{highlight.time}</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2">{highlight.title}</h4>
                  <div className="w-12 h-1 bg-white/30 rounded-full"></div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 leading-relaxed mb-4">{highlight.description}</p>
                 
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Program Release Info */}
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-8 text-white text-center">
          <div className="inline-flex items-center gap-3 bg-white/20 rounded-full px-6 py-3 mb-6">
            <CalendarDays className="h-6 w-6 text-yellow-300" />
            <span className="font-bold text-lg">Final Program Release</span>
          </div>
          <h3 className="text-3xl font-bold mb-4">Complete Program Guide</h3>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto mb-6">
            The detailed conference schedule with session timings, speaker information, and venue details will be
            available on
          </p>
          <div className="text-2xl font-bold text-yellow-300 mb-8">October 6, 2025</div>
          <Button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
            Get Notified
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Program
