"use client"

import Header from "./header";
import Footer from "./Footer";
import { useState } from "react"
import { CalendarDays, ArrowRight } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Link } from 'react-router-dom'

export const Program: React.FC = () => {

  const [hoveredCard] = useState<number | null>(null)

  hoveredCard;
  return (
    <>
      <Header />
      <section id="program" className="min-h-screen py-16 px-6 bg-[#D8CFF2] flex items-center justify-center">
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
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4 md:mt-0">
              <div className="text-2xl font-bold text-yellow-300">October 6, 2025</div>
                            <Link to="/contact">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  Get Notified
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Program
