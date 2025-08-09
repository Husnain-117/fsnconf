"use client"

import type React from "react"
import Header from "./header";
import Footer from "./Footer";
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, ArrowRight, User } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"

const focalPersons = [
  {
    role: "Focal Person",
    name: "Dr. Muhammad Nadeem",
    designation: "Associate Professor, Dept. of Biosciences",
    emails: ["nadeem@cuisahiwal.edu.pk", "fsnconference@cuisahiwal.edu.pk"],
    phone: "+92-300-9200474",
    icon: <User className="h-8 w-8 text-white" />,
    color: "from-purple-600 to-violet-600",
  },
  {
    role: "Conference Secretary",
    name: "Dr. Muhammad Wasim Sajid",
    designation: "Associate Professor, Dept. of Biosciences",
    emails: ["muhammad.wasim@cuisahiwal.edu.pk", "fsnconference@cuisahiwal.edu.pk"],
    phone: "+92-333-6967095",
    icon: <User className="h-8 w-8 text-white" />,
    color: "from-yellow-500 to-amber-500",
  },
];

export const Contact: React.FC = () => {
  const location = useLocation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
    inquiryType: "sponsorship", // Default to sponsorship for pre-filled messages
  })

  // Handle pre-filled message from state
  useEffect(() => {
    if (location.state?.message) {
      setFormData(prev => ({
        ...prev,
        message: location.state.message,
        inquiryType: "sponsorship"
      }))
    }
  }, [location.state])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("https://fsnconference-backend.vercel.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong")
      }

      setSuccessMessage(result.message || "Message sent successfully!")
      setFormData({
        name: "",
        email: "",
        organization: "",
        subject: "",
        message: "",
        inquiryType: "",
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <Header />
    <section id="contact" className="min-h-screen py-16 px-6 bg-white flex items-center justify-center">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-yellow-500 mb-4">
            Get In{" "}
            <span className="text-yellow-500">Touch</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
           <i>Have questions about the conference? Need assistance with registration? Our dedicated team is here to help
            you every step of the way.</i>
          </p>
        </div>

        {/* Focal Persons */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {focalPersons.map((person) => (
            <div
              key={person.name}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${person.color} p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl">{person.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold">{person.role}</h3>
                    <p className="text-white/90">{person.name}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex-grow flex flex-col">
                <p className="text-slate-600 text-center font-medium flex-grow">{person.designation}</p>
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <a href={`tel:${person.phone}`} className="flex items-center gap-3 text-slate-800 hover:text-purple-600 transition-colors duration-200 group">
                    <Phone className="h-5 w-5 text-purple-500 group-hover:animate-pulse" />
                    <span className="font-semibold">{person.phone}</span>
                  </a>
                  {person.emails.map(email => (
                     <a key={email} href={`mailto:${email}`} className="flex items-center gap-3 text-slate-800 hover:text-yellow-600 transition-colors duration-200 group">
                       <Mail className="h-5 w-5 text-yellow-500 group-hover:animate-pulse" />
                       <span className="font-semibold break-all">{email}</span>
                     </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {/* Visit Us Card */}
            <div
              key="visit-us"
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r from-yellow-500 to-cyan-500 p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl"><MapPin className="h-8 w-8 text-white" /></div>
                  <div>
                    <h3 className="text-xl font-bold">Visit Us</h3>
                    <p className="text-white/90">Conference Venue</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-2 flex-grow flex flex-col justify-center">
                <p className="text-slate-800 text-center font-semibold text-lg">COMSATS University Islamabad</p>
                <p className="text-slate-600 text-center">Sahiwal Campus, Pakistan</p>
              </div>
            </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-[#6e58a5] p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Send Us a Message</h3>
                <p className="text-white/90">We'll get back to you within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-slate-800">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-12 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-slate-800 placeholder:text-slate-500"
                  placeholder="Enter your complete full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-800">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-12 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-slate-800 placeholder:text-slate-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization" className="text-sm font-semibold text-slate-800">
                  Organization
                </Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => handleInputChange("organization", e.target.value)}
                  className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-slate-800 placeholder:text-slate-500"
                  placeholder="Your university, company, or institution"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-800">Inquiry Type *</Label>
                <Select onValueChange={(value) => handleInputChange("inquiryType", value)}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-500 text-slate-800">
                    <SelectValue placeholder="What can we help you with?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="registration">Registration Support</SelectItem>
                    <SelectItem value="sponsorship">Sponsorship Opportunities</SelectItem>
                    <SelectItem value="accommodation">Accommodation & Travel</SelectItem>
                    <SelectItem value="program">Conference Program</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-semibold text-slate-800">
                Subject *
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                className="h-12 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-slate-800 placeholder:text-slate-500"
                placeholder="Brief subject of your message"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-semibold text-slate-800">
                Message *
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 min-h-[120px] resize-none text-slate-800 placeholder:text-slate-500"
                placeholder="Please provide detailed information about your inquiry..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </div>
              </Button>

              {successMessage && (
                <div className="text-green-600 font-semibold text-center mt-4 flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  {successMessage}
                </div>
              )}
              {error && (
                <div className="text-red-600 font-semibold text-center mt-4">
                  {error}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}

export default Contact
