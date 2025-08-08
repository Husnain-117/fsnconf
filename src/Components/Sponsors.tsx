"use client"

import type React from "react"
import { useState } from "react"
import { Award, Building2, Handshake, Crown, Trophy, Medal, Heart, Users, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/Components/ui/button"
import Header from "./header";
import Footer from "./Footer";


const partners = [
  {
    name: "COMSATS University Islamabad, Sahiwal Campus",
    type: "Host Institution",
    description: "Leading institution in higher education and research excellence",
    color: "from-purple-600 to-violet-600",
    icon: <Building2 className="h-6 w-6" />,
    stats: { projects: "500+", students: "15K+", research: "200+" },
  },
  {
    name: "Higher Education Commission (HEC), Pakistan",
    type: "Government Partner",
    description: "Promoting excellence in higher education and research development",
    color: "from-yellow-500 to-amber-500",
    icon: <Award className="h-6 w-6" />,
    stats: { universities: "200+", funding: "$2B+", programs: "1000+" },
  },
  {
    name: "Pakistan Society of Food Scientists and Technologists (PSFST)",
    type: "Professional Society",
    description: "Advancing food science and technology through innovation",
    color: "from-purple-500 to-pink-500",
    icon: <Users className="h-6 w-6" />,
    stats: { members: "5K+", events: "50+", publications: "300+" },
  },
]

const sponsorshipTiers = [
  {
    tier: "Platinum",
    amount: "Rs. 500,000",
    icon: <Crown className="h-8 w-8" />,
    color: "from-purple-600 to-violet-600",
    popular: true,
    benefits: [
      "Logo on all event banners and printed materials",
      "Branding in keynote session",
      "Recognition during opening/closing ceremony",
      "Promotional stall at venue",
      "4 complimentary registrations",
      "VIP networking access",
      "Custom branding opportunities",
    ],
  },
  {
    tier: "Gold",
    amount: "Rs. 300,000",
    icon: <Trophy className="h-8 w-8" />,
    color: "from-yellow-500 to-amber-500",
    popular: false,
    benefits: [
      "Logo on event brochure and venue banners",
      "Recognition on website",
      "2 complimentary registrations",
      "Networking session access",
      "Digital marketing inclusion",
    ],
  },
  {
    tier: "Silver",
    amount: "Rs. 150,000",
    icon: <Medal className="h-8 w-8" />,
    color: "from-purple-500 to-pink-500",
    popular: false,
    benefits: [
      "Logo on official website",
      "1 complimentary registration",
      "Conference materials inclusion",
      "Social media recognition",
    ],
  },
  {
    tier: "Supporter",
    amount: "Rs. 75,000",
    icon: <Heart className="h-8 w-8" />,
    color: "from-pink-500 to-purple-600",
    popular: false,
    benefits: ["Logo featured in digital abstract book only", "Certificate of appreciation"],
  },
]

export const Sponsors: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)

  if (currentPage === 2) {
    return (
      <section className="min-h-screen py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
              Sponsorship{" "}
              <span className="text-yellow-600">
                Opportunities
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Partner with us to gain exceptional visibility while supporting groundbreaking scientific advancement and
              innovation
            </p>
          </div>

          {/* Sponsorship Tiers */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sponsorshipTiers.map((tier) => (
              <div
                key={tier.tier}
                className={`relative bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                  tier.popular ? "ring-2 ring-purple-500 ring-offset-4" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#6e58a5] text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div className={`bg-gradient-to-r ${tier.color} p-6 text-white text-center`}>
                  <div className="flex justify-center mb-3">{tier.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{tier.tier}</h4>
                  <p className="text-2xl font-black">{tier.amount}</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h5 className="text-lg font-bold text-slate-800 mb-3">Benefits Include:</h5>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white font-bold rounded-xl py-2 transition-all duration-300`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      Choose {tier.tier}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-8 text-white">
              <div className="space-y-6">
                <Handshake className="h-12 w-12 text-yellow-300 mx-auto" />
                <div>
                  <h3 className="text-3xl font-bold mb-4">Become Our Partner</h3>
                  <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                    Join us in supporting scientific excellence and innovation. Let's discuss custom sponsorship
                    packages tailored to your organization's goals and vision.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                  >
                    <Handshake className="w-5 h-5 mr-2" />
                    Partner With Us
                  </Button>
                  <Button
                    onClick={() => setCurrentPage(1)}
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-800 font-bold px-8 py-3 rounded-full transition-all duration-300"
                  >
                    ← Back to Partners
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
    <Header />
    <section className="min-h-screen py-16 px-6 bg-[#D8CFF2]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            Sponsors &{" "}
            <span className="text-yellow-600">
              Partners
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto">
           <i>We acknowledge the invaluable support of our distinguished partners and invite visionary organizations to
            join us in advancing scientific research and fostering innovation.</i>
          </p>
        </div>

        {/* Partners Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Distinguished Partners</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Collaborating with leading institutions and organizations to create an extraordinary conference experience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {/* Header Section */}
                <div className="bg-white p-6 text-slate-800">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 bg-gray-100 rounded-2xl">{partner.icon}</div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-2">{partner.type}</h4>
                      <div className="w-16 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                        <span className="text-xs font-bold">LOGO</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  <div>
                    <h5 className="text-lg font-bold text-slate-800 mb-2">{partner.name}</h5>
                    <p className="text-slate-600 text-sm">{partner.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(partner.stats).map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-slate-50 rounded-lg">
                        <div className="text-lg font-bold text-slate-800">{value}</div>
                        <div className="text-xs text-slate-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Partnership Badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${partner.color} text-white rounded-full text-sm font-semibold`}
                  >
                    <Handshake className="h-4 w-4" />
                    Strategic Partner
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation to Sponsorship */}
        <div className="text-center">
          <Button
            onClick={() => setCurrentPage(2)}
            className="bg-[#6e58a5] hover:from-purple-700 hover:to-yellow-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            View Sponsorship Opportunities
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}

export default Sponsors
