"use client"

import type React from "react"
import { useState } from "react"
import { FileText, UploadCloud, Mic2, Download, ArrowRight, CheckCircle } from "lucide-react"
import { toast } from "react-toastify"
import { Button } from "@/Components/ui/button"

const guidelines = [
  {
    icon: <FileText className="h-6 w-6 text-white" />,
    title: "Formatting Requirements",
    details: [
      "Maximum 300 words with clear, concise language",
      "Structure: Background, Methods, Results, Conclusion",
      "APA 7th edition referencing style required",
      "Times New Roman, 12pt font, single spacing",
    ],
    color: "from-purple-500 to-violet-600",
    stats: "4 Key Rules",
  },
  {
    icon: <UploadCloud className="h-6 w-6 text-white" />,
    title: "Submission Process",
    details: [
      "Upload PDF via EasyChair portal only",
      "Filename format: <Track>_<LastName>.pdf",
      "Deadline: 30 Nov 2025, 23:59 GMT",
      "Confirmation email sent within 24 hours",
    ],
    color: "from-yellow-500 to-amber-500",
    stats: "3 Steps",
  },
  {
    icon: <Mic2 className="h-6 w-6 text-white" />,
    title: "Presentation Guidelines",
    details: [
      "Oral presentations: 12 minutes + 3 minutes Q&A",
      "Poster presentations: A0 portrait format",
      "Slides must be in 16:9 aspect ratio",
      "Technical check 30 minutes before session",
    ],
    color: "from-purple-600 to-pink-600",
    stats: "2 Formats",
  },
]

export const AbstractGuidelines: React.FC = () => {
  const [selectedGuideline, setSelectedGuideline] = useState<number | null>(null)
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleDownloadPDF = async () => {
    setDownloading(true)
    setDownloaded(false)

    const toastId = toast.info("Starting download...", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    })

    try {
      const response = await fetch("/FSNC_2025.pdf")
      if (!response.ok) throw new Error("File not found")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "FSNC_2025.pdf"
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)

      setDownloaded(true)
      toast.update(toastId, { render: "Download complete!", type: "success", autoClose: 1500, isLoading: false })
      setTimeout(() => setDownloaded(false), 1500)
    } catch (e) {
      toast.update(toastId, { render: "PDF download failed.", type: "error", autoClose: 1500, isLoading: false })
    } finally {
      setDownloading(false)
    }
  }

  return (
    <section id="abstract-guidelines" className="min-h-screen py-16 px-6 bg-[#D8CFF2] flex items-center justify-center">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            Abstract{" "}
            <span className="text-yellow-600">
              Guidelines
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
           <i>Follow our comprehensive submission guidelines to ensure your abstract meets all requirements for successful
            review and presentation.</i>
          </p>
        </div>

        {/* Guidelines Cards */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {guidelines.map((guideline, index) => (
            <div
              key={guideline.title}
              className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedGuideline(selectedGuideline === index ? null : index)}
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${guideline.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white">{guideline.icon}</div>
                  <div className="text-right">
                    <div className="text-sm opacity-80">{guideline.stats}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{guideline.title}</h3>
                <div className="w-12 h-1 bg-white/30 rounded-full"></div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <ul className="space-y-3">
                  {guideline.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="font-medium leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <div className="text-slate-500 text-sm font-medium">Click for detailed requirements</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Submit Your Abstract?</h3>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Download our comprehensive guidelines document with templates, examples, and submission checklist.
            </p>
            <Button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <Download className="w-5 h-5 mr-2 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  {downloaded ? "Downloaded!" : "Download Complete Guidelines"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Modal for detailed guidelines */}
        {selectedGuideline !== null && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedGuideline(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-r ${guidelines[selectedGuideline].color} p-8 text-white`}>
                <h3 className="text-3xl font-bold mb-4">{guidelines[selectedGuideline].title}</h3>
                <p className="text-white/90">Detailed requirements and best practices</p>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3">Requirements Checklist</h4>
                    <ul className="space-y-3">
                      {guidelines[selectedGuideline].details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 font-medium">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default AbstractGuidelines
