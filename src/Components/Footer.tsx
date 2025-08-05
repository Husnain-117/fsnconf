"use client"

import type React from "react"
import { Mail, MapPin, Phone,  ArrowUp } from "lucide-react"



const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Registration", href: "#registration" },
  { name: "Speakers", href: "#speakers" },
  { name: "Program", href: "#program" },
  { name: "Contact", href: "#contact" },
]

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-[#6e58a5] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Branding Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-yellow-300">FSNC 2025</h3>
            <p className="text-purple-100 text-sm">
              Food Science & Nutrition Conference - Advancing research and innovation for a better future.
            </p>
            <div className="text-purple-200 text-sm">
              <p>October 13-14, 2025</p>
              <p>COMSATS University Sahiwal</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-yellow-300">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-purple-100 hover:text-yellow-300 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-yellow-300">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-purple-100">
                <Mail className="h-4 w-4 text-yellow-300" />
                <span>fsnconference@cuisahiwal.edu.pk</span>
              </div>
              <div className="flex items-center gap-2 text-purple-100">
                <Phone className="h-4 w-4 text-yellow-300" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-start gap-2 text-purple-100">
                <MapPin className="h-4 w-4 text-yellow-300 mt-0.5" />
                <span>COMSATS University Islamabad, Sahiwal Campus</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            
            <button
              onClick={scrollToTop}
              className="mt-4 p-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <ArrowUp className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-500 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-purple-200 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Food Science & Nutrition Conference. All rights reserved.
          </p>
          <p className="text-purple-300 text-xs text-center md:text-right">
            Designed with ❤️ for the future of food science
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
