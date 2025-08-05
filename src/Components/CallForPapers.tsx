"use client"

import type React from "react"
import {
  Handshake,
  Apple,
  Scale,
  ShieldCheck,
  Leaf,
  FlaskConical,
  Package,
  Soup,
  Dna,
  Home,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { useEffect } from "react"
import { useState } from "react"

const themes = [
  {
    name: "Academia–Industry–Government Collaboration Models",
    icon: Handshake,
    color: "from-purple-500 to-violet-600",
    description: "Exploring synergistic partnerships for research and development.",
  },
  {
    name: "Addressing Malnutrition through Nutritional Fortification",
    icon: Apple,
    color: "from-violet-500 to-purple-600",
    description: "Strategies and innovations in enhancing food's nutritional value.",
  },
  {
    name: "Public Health Nutrition and Policy Translation",
    icon: Scale,
    color: "from-purple-600 to-indigo-600",
    description: "Translating nutritional science into effective public health policies.",
  },
  {
    name: "Food Safety, Quality Assurance, and Regulations",
    icon: ShieldCheck,
    color: "from-amber-500 to-yellow-500",
    description: "Ensuring food integrity from farm to fork through robust systems.",
  },
  {
    name: "Sustainable Food Systems and Climate Adaptation",
    icon: Leaf,
    color: "from-purple-500 to-pink-500",
    description: "Developing resilient food systems in the face of climate change.",
  },
  {
    name: "Functional Foods, Probiotics, and Nutraceuticals",
    icon: FlaskConical,
    color: "from-indigo-500 to-purple-600",
    description: "Research on health-promoting food components and their applications.",
  },
  {
    name: "Innovative Processing, Packaging, and Preservation Technologies",
    icon: Package,
    color: "from-yellow-500 to-amber-600",
    description: "Advancements in food technology for enhanced shelf-life and quality.",
  },
  {
    name: "Malnutrition, Hidden Hunger, and Community Interventions",
    icon: Soup,
    color: "from-pink-500 to-purple-600",
    description: "Community-based approaches to combat nutritional deficiencies.",
  },
  {
    name: "Food Biotechnology, Genomics, and Omics Technologies",
    icon: Dna,
    color: "from-purple-600 to-violet-600",
    description: "Leveraging biotechnology for food improvement and understanding.",
  },
  {
    name: "Traditional, Local, and Indigenous Food Systems",
    icon: Home,
    color: "from-amber-600 to-yellow-600",
    description: "Preserving and promoting heritage food practices and knowledge.",
  },
]

export const CallForPapers: React.FC = () => {
  const [showAllThemes, setShowAllThemes] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Smoothly scroll to the top of the guidelines section when it becomes visible
  useEffect(() => {
    if (currentPage === 2) {
      const el = document.getElementById("abstract-guidelines")
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [currentPage])

  if (currentPage === 2) {
    return (
      <section id="submission-guidelines" className="min-h-screen py-16 px-6 bg-[#D8CFF2]">
        <div id="abstract-guidelines" className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
              Submission{" "}
              <span className="text-yellow-600 bg-clip-text text-transparent">
                Guidelines
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Follow these guidelines to ensure your abstract meets our submission requirements
            </p>
          </div>

          {/* Guidelines Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Abstract Requirements</h3>
                <div className="w-12 h-1 bg-white/30 rounded-full"></div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Maximum 300 words (English)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Include: Title, Authors, Affiliations, Methodology, Results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Format: MS Word (.doc/.docx), Times New Roman 12pt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Peer-reviewed by scientific committee</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Submission Process</h3>
                <div className="w-12 h-1 bg-white/30 rounded-full"></div>
              </div>
              <div className="p-6">
                <div className="space-y-4 text-slate-700">
                  <p>
                    Abstracts will be peer-reviewed by the scientific committee based on originality, methodology,
                    significance, and clarity.
                  </p>
                  <p>
                    Authors will be notified of acceptance via email. Accepted abstracts will be published in the
                    conference proceedings.
                  </p>
                  <p>Selected papers may be invited for submission to a special issue of a reputable journal.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Dates */}
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-8 text-white text-center mb-8">
            <h3 className="text-3xl font-bold mb-6">Important Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-yellow-300 font-bold text-lg">Submission Deadline</div>
                <div className="text-2xl font-black">September 15, 2025</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-yellow-300 font-bold text-lg">Acceptance Notification</div>
                <div className="text-2xl font-black">September 22, 2025</div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Submit Your Abstract</h3>
            <div className="space-y-4">
              <div className="text-lg text-slate-700">
                <span className="font-medium">Submit to:</span>
                <a
                  href="mailto:fsnconference@cuisahiwal.edu.pk"
                  className="text-purple-600 font-bold ml-2 hover:text-purple-700 transition-colors"
                >
                  fsnconference@cuisahiwal.edu.pk
                </a>
              </div>
              <p className="text-slate-600">
                Questions? Contact us at{" "}
                <span className="text-purple-600 font-bold">fsnconference@cuisahiwal.edu.pk</span>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center mt-8">
            <Button
              onClick={() => setCurrentPage(1)}
              className="bg-[#6e58a5] hover:from-purple-700 hover:to-yellow-600 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              ← Back to Research Themes
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="call-for-papers" className="min-h-screen py-16 px-6 bg-[#D8CFF2]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-4">
            Call for{" "}
            <span className="text-yellow-600">Papers</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
           <i> We invite original research abstracts for oral and poster presentations. Open to students, researchers,
            practitioners, and industry professionals.</i>
          </p>
        </div>

        {/* Research Themes */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-yellow-600 text-center mb-12"><b>Research Themes</b></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.slice(0, showAllThemes ? themes.length : 6).map((theme, index) => (
              <div
                key={theme.name}
                className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${theme.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <theme.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-80">Theme {index + 1}</div>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2">{theme.name}</h4>
                  <div className="w-12 h-1 bg-white/30 rounded-full"></div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 leading-relaxed">{theme.description}</p>
                </div>
              </div>
            ))}
          </div>

          {themes.length > 6 && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setShowAllThemes(!showAllThemes)}
                className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                {showAllThemes ? "Show Less Themes" : "View All Themes"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-[#6e58a5] rounded-2xl p-8 text-white mb-8">
            <h3 className="text-3xl font-bold mb-4">Ready to Submit Your Research?</h3>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto mb-6">
              Don't miss this opportunity to showcase your research to a global audience of industry leaders,
              researchers, and innovators.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
              <span className="font-bold text-yellow-300">Deadline: September 15, 2025</span>
            </div>
          </div>

          <Button
            onClick={() => {
              setCurrentPage(2)
            }}
            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            View Submission Guidelines
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CallForPapers
