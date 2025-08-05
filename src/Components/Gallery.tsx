"use client"

import type React from "react"
import { useState } from "react"
import { PlayCircle, ImageIcon, Video, Download, Share2, Eye, X } from "lucide-react"
import { Button } from "@/Components/ui/button"

const media = [
  {
    type: "image",
    src: "/placeholder.svg?height=400&width=300&text=Conference+Audience",
    alt: "Conference audience",
    title: "Opening Ceremony",
    description: "Packed auditorium during the opening keynote",
    category: "Event Highlights",
  },
  {
    type: "image",
    src: "/placeholder.svg?height=400&width=300&text=Speaker+on+Stage",
    alt: "Speaker on stage",
    title: "Keynote Presentation",
    description: "Dr. Sarah Chen delivering her AI keynote",
    category: "Speakers",
  },
  {
    type: "video",
    src: "#",
    alt: "Event highlight video",
    title: "Conference Highlights",
    description: "Best moments from the 2-day event",
    category: "Videos",
  },
  {
    type: "image",
    src: "/placeholder.svg?height=400&width=300&text=Networking+Event",
    alt: "Networking event",
    title: "Networking Reception",
    description: "Attendees connecting during evening reception",
    category: "Networking",
  },
  {
    type: "image",
    src: "/placeholder.svg?height=400&width=300&text=Workshop+Session",
    alt: "Workshop session",
    title: "Interactive Workshop",
    description: "Hands-on AI workshop in progress",
    category: "Workshops",
  },
  {
    type: "image",
    src: "/placeholder.svg?height=400&width=300&text=Exhibition+Booth",
    alt: "Exhibition booth",
    title: "Technology Exhibition",
    description: "Latest innovations on display",
    category: "Exhibition",
  },
  {
    type: "video",
    src: "#",
    alt: "Speaker interviews",
    title: "Speaker Interviews",
    description: "Exclusive interviews with keynote speakers",
    category: "Videos",
  },
  {
    type: "image",
    src: "/placeholder.svg?height=400&width=300&text=Awards+Ceremony",
    alt: "Awards ceremony",
    title: "Awards Ceremony",
    description: "Recognizing outstanding research contributions",
    category: "Awards",
  },
]

const categories = ["All", "Event Highlights", "Speakers", "Videos", "Networking", "Workshops", "Exhibition", "Awards"]

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null)

  const filteredMedia = selectedCategory === "All" ? media : media.filter((item) => item.category === selectedCategory)

  return (
    <section id="gallery" className="min-h-screen py-16 px-6 bg-[#D8CFF2]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            Event{" "}
            <span className="text-yellow-600">
              Gallery
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
           <i>Relive the memorable moments from our conference. Explore photos, videos, and highlights from keynotes,
            workshops, networking events, and more.</i>
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-2xl p-2 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#6e58a5] text-white shadow-lg"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMedia.map((mediaItem, i) => (
            <div
              key={`${selectedCategory}-${i}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedMedia(i)}
            >
              {mediaItem.type === "image" ? (
                <div className="relative">
                  <img
                    src={mediaItem.src || "/placeholder.svg"}
                    alt={mediaItem.alt}
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2">
                    <ImageIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
              ) : (
                <div className="h-48 w-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-violet-600 relative">
                  <PlayCircle className="h-16 w-16 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2">
                    <Video className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}

              {/* Media Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {mediaItem.category}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 mb-1 group-hover:text-purple-600 transition-colors">
                  {mediaItem.title}
                </h4>
                <p className="text-sm text-slate-600">{mediaItem.description}</p>
              </div>

              {/* Hover Actions */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    className="bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Media Viewer Modal */}
      {selectedMedia !== null && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {filteredMedia[selectedMedia].type === "image" ? (
                <img
                  src={filteredMedia[selectedMedia].src || "/placeholder.svg"}
                  alt={filteredMedia[selectedMedia].alt}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
                  <PlayCircle className="h-24 w-24 text-white" />
                </div>
              )}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 bg-black/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/40 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{filteredMedia[selectedMedia].title}</h3>
                  <p className="text-slate-600">{filteredMedia[selectedMedia].description}</p>
                </div>
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  {filteredMedia[selectedMedia].category}
                </span>
              </div>
              <div className="flex gap-4">
                <Button className="bg-[#6e58a5] hover:from-purple-700 hover:to-yellow-600 text-white font-bold rounded-xl">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
