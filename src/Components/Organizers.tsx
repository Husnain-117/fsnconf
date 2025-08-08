"use client"

import type React from "react"
import { Users, Crown, Shield, Award, Zap, Heart } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import { Link } from 'react-router-dom'
import Header from "./header";
import Footer from "./Footer";

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
  return (
    <>
      <Header />
      <section id="organizers" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-yellow-500 mb-4">
              Meet Our{" "}
              <span className="text-yellow-500">
                Organizers
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto">
              Our distinguished team of visionary leaders, esteemed academics, and industry experts collaborate to create
              an extraordinary conference experience.
            </p>
          </div>

          {/* Committee Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {committees.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                {/* Header Section */}
                <div className={`bg-gradient-to-r ${member.color} p-6 text-white`}>
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 bg-white/20 rounded-xl">{member.icon}</div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white/90">{member.role}</h4>
                      <p className="text-white/90 text-xl font-bold mt-1">{member.names[0]}</p>
                    </div>
                  </div>
                </div>
                
                {/* Designation */}
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-700 bg-gray-100 rounded-full py-1 px-3 inline-block">
                    {member.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>

        {/* CTA Section */}
        <div className="text-center">
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
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold px-8 py-3 rounded-full">
                  <Users className="w-5 h-5 mr-2" />
                  Get Involved Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}

export default Organizers
