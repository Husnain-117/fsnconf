"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"

const contactMethods = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Us",
    contact: "fsnconference@cuisahiwal.edu.pk",
    subContact: "registration@cuisahiwal.edu.pk",
    color: "from-purple-600 to-violet-600",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Call Us",
    contact: "03009200474 ",
    subContact: "03009200474 ",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Visit Us",
    contact: "COMSATS University Islamabad",
    subContact: "Sahiwal Campus, Pakistan",
    color: "from-purple-500 to-pink-500",
  },
]

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
    inquiryType: "",
  })
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
    <section id="contact" className="min-h-screen py-16 px-6 bg-white flex items-center justify-center">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            Get In{" "}
            <span className="text-yellow-600">Touch</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
           <i>Have questions about the conference? Need assistance with registration? Our dedicated team is here to help
            you every step of the way.</i>
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${method.color} p-6 text-white`}>
                <div className="text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="p-3 bg-white/20 rounded-2xl">{method.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold">{method.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="text-center space-y-2">
                  <p className="font-semibold text-slate-800">{method.contact}</p>
                  <p className="text-slate-600 text-sm">{method.subContact}</p>
                </div>
                
              </div>
            </div>
          ))}
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
  )
}

export default Contact
