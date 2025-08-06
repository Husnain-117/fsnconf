"use client"

import type React from "react"
import { useState } from "react"
import { Users, Crown, Shield, Award, Zap, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/Components/ui/button"

const committees = [
  {
    role: "Patron-in-Chief",
    names: ["Prof. Dr. Sajid Qamar"],
    icon: <Crown className="h-6 w-6 text-white" />,
    color: "from-purple-600 to-violet-600",
    bio: "Visionary leader providing strategic direction and unwavering support for the conference's mission to advance scientific excellence.",
    designation: "Rector, COMSATS University Islamabad",
  },
  {
    role: "Patron",
    names: ["Prof. Dr. Najeeb-ur-Rehman"],
    icon: <Shield className="h-6 w-6 text-white" />,
    color: "from-yellow-500 to-amber-500",
    bio: "Distinguished academic leader fostering innovation and collaboration in the scientific community.",
    designation: "Director, COMSATS University Sahiwal Campus",
  },
  {
    role: "Conference Patron",
    names: ["Prof. Dr. M. Irshad"],
    icon: <Award className="h-6 w-6 text-white" />,
    color: "from-purple-500 to-pink-500",
    bio: "Dedicated patron ensuring the highest standards of academic excellence and professional development.",
    designation: "Dean, Faculty of Science, COMSATS University",
  },
  {
    role: "Conference Chairperson",
    names: ["Prof. Dr. Mahmood A. Kayani"],
    icon: <Zap className="h-6 w-6 text-white" />,
    color: "from-amber-500 to-yellow-600",
    bio: "Dynamic chairperson orchestrating all conference activities with precision and innovation.",
    designation: "Head of Department, Food Science & Nutrition",
  },
  {
    role: "President PSFST",
    names: ["Prof. Dr. Muhammad Atif Randhawa"],
    icon: <Heart className="h-6 w-6 text-white" />,
    color: "from-pink-500 to-purple-600",
    bio: "Esteemed president of Pakistan Society of Food Scientists and Technologists, driving industry advancement.",
    designation: "President, Pakistan Society of Food Scientists and Technologists",
  },
]

export const Organizers: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % committees.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + committees.length) % committees.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section id="organizers" className="min-h-screen py-16 px-6 bg-white flex items-center justify-center">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
              Organizers
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto">
            Our distinguished team of visionary leaders, esteemed academics, and industry experts collaborate to create
            an extraordinary conference experience.
          </p>
        </div>

        {/* Committee Slideshow */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Distinguished Organizing Committee</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Meet the exceptional leaders who bring decades of experience and unwavering dedication to make this
              conference a resounding success.
            </p>
          </div>

          {/* Slideshow Container */}
          <div className="relative max-w-2xl mx-auto">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5 text-slate-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-5 w-5 text-slate-700" />
            </button>

            {/* Slide Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-[500px]">
              {/* Header Section */}
              <div className={`bg-gradient-to-r ${committees[currentSlide].color} p-8 text-white`}>
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-white/20 rounded-2xl">{committees[currentSlide].icon}</div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-1">{committees[currentSlide].role}</h4>
                    <p className="text-white/90 text-lg font-semibold">{committees[currentSlide].names.join(", ")}</p>
                    {/* Stylish Designation */}
                    <p className="text-sm mt-1 px-4 py-1 inline-block rounded-full bg-white/20 text-white/80 font-medium">
                      {committees[currentSlide].designation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 space-y-6">
                <p className="text-slate-700 leading-relaxed text-center">{committees[currentSlide].bio}</p>
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {committees.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-gradient-to-r from-purple-600 to-yellow-500 scale-125"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-8 text-white">
            <div className="space-y-6">
              <Users className="h-12 w-12 text-yellow-300 mx-auto" />
              <div>
                <h3 className="text-3xl font-bold mb-4">Join Our Organizing Team</h3>
                <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                  Passionate about making a difference? We're always seeking dedicated volunteers and committee members
                  to help shape the future of our conferences.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                <Users className="w-5 h-5 mr-2" />
                Get Involved Today
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Organizers
