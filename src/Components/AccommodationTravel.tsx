"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"
import {
  Hotel,
  Plane,
  MapPin,
  Car,
  ArrowRight,
  Star,
  Wifi,
  Coffee,
  Utensils,
  Phone,
  Navigation,
  Clock,
  Shield,
  CreditCard,
  Users,
  Zap,
  Calendar,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/Components/ui/button"

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, duration: 0.8, ease: "easeOut" } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const hotels = [
  {
    name: "Grand Plaza Hotel",
    distance: "0.5 km",
    price: "from $90",
    originalPrice: "$120",
    rating: 5,
    image: "/placeholder.svg?height=250&width=400&text=Grand+Plaza+Hotel",
    amenities: [
      { name: "WiFi", icon: <Wifi className="h-4 w-4" /> },
      { name: "Pool", icon: <Coffee className="h-4 w-4" /> },
      { name: "Restaurant", icon: <Utensils className="h-4 w-4" /> },
      { name: "Spa", icon: <Shield className="h-4 w-4" /> },
    ],
    description: "Luxury hotel with premium amenities and world-class service",
    features: ["24/7 Concierge", "Business Center", "Fitness Center", "Room Service"],
    color: "from-blue-600 to-indigo-700",
    popular: true,
  },
  {
    name: "City Inn Suites",
    distance: "1 km",
    price: "from $70",
    originalPrice: "$95",
    rating: 4,
    image: "/placeholder.svg?height=250&width=400&text=City+Inn+Suites",
    amenities: [
      { name: "WiFi", icon: <Wifi className="h-4 w-4" /> },
      { name: "Gym", icon: <Zap className="h-4 w-4" /> },
      { name: "Restaurant", icon: <Utensils className="h-4 w-4" /> },
      { name: "Parking", icon: <Car className="h-4 w-4" /> },
    ],
    description: "Modern business hotel with excellent service and amenities",
    features: ["Meeting Rooms", "Airport Shuttle", "Laundry Service", "Free Parking"],
    color: "from-emerald-600 to-teal-700",
    popular: false,
  },
  {
    name: "Budget Stay Lodge",
    distance: "1.2 km",
    price: "from $50",
    originalPrice: "$70",
    rating: 3,
    image: "/placeholder.svg?height=250&width=400&text=Budget+Stay+Lodge",
    amenities: [
      { name: "WiFi", icon: <Wifi className="h-4 w-4" /> },
      { name: "Breakfast", icon: <Coffee className="h-4 w-4" /> },
      { name: "Parking", icon: <Car className="h-4 w-4" /> },
    ],
    description: "Comfortable accommodation at affordable rates with essential amenities",
    features: ["Free Breakfast", "24/7 Reception", "Luggage Storage", "Tour Desk"],
    color: "from-purple-600 to-violet-700",
    popular: false,
  },
]

const transportOptions = [
  {
    icon: <Plane className="h-10 w-10" />,
    title: "By Air",
    description: "Islamabad International Airport (ISB)",
    details:
      "25 km from city center. Multiple transport options available including taxis, ride-hailing services, and shuttle buses operating 24/7.",
    color: "from-blue-500 to-indigo-600",
    tips: ["Book airport transfer in advance", "Allow 45 minutes travel time", "Multiple transport options available"],
    cost: "$15-25",
    duration: "45 min",
  },
  {
    icon: <Car className="h-10 w-10" />,
    title: "By Car",
    description: "Easy highway access",
    details:
      "Well-connected road network with ample parking facilities at the venue. GPS navigation available with real-time traffic updates.",
    color: "from-green-500 to-emerald-600",
    tips: ["GPS coordinates provided", "Free parking available", "Valet service offered"],
    cost: "Free parking",
    duration: "Varies",
  },
  {
    icon: <MapPin className="h-10 w-10" />,
    title: "Local Transport",
    description: "Ride-hailing & Public Transport",
    details:
      "Careem, Uber, and local bus services provide convenient city-wide connectivity with affordable rates and reliable service.",
    color: "from-purple-500 to-violet-600",
    tips: ["Download ride-hailing apps", "Bus routes available", "Taxi stands nearby"],
    cost: "$5-15",
    duration: "20-30 min",
  },
]

const travelStats = [
  { icon: <Clock className="h-8 w-8" />, value: "25 min", label: "From Airport", color: "text-blue-600" },
  { icon: <Car className="h-8 w-8" />, value: "500+", label: "Parking Spaces", color: "text-emerald-600" },
  { icon: <Navigation className="h-8 w-8" />, value: "24/7", label: "Transport Available", color: "text-purple-600" },
  { icon: <Users className="h-8 w-8" />, value: "3", label: "Hotel Partners", color: "text-orange-600" },
]

export const AccommodationTravel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"hotels" | "transport">("hotels")
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null)

  return (
    <section
      id="accommodation"
      className="relative min-h-screen py-20 px-6 overflow-hidden"
      style={{ backgroundColor: "rgb(153, 173, 193)" }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto space-y-20"
      >
        {/* Enhanced Heading */}
        <motion.div variants={item} className="text-center space-y-8">
          <motion.h2
            className="
              text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
              font-black leading-tight text-slate-800 text-center
              flex flex-wrap items-center justify-center gap-x-2
            "
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span>Accommodation&nbsp;&amp;&nbsp;</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Travel
            </span>
          </motion.h2>
          <motion.p variants={item} className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Experience seamless travel and comfortable stays. Discover our carefully selected accommodations and
            comprehensive travel solutions designed to enhance your conference journey.
          </motion.p>
        </motion.div>

        {/* Enhanced Travel Stats */}
        <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {travelStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group bg-white/90 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl border border-white/50 cursor-pointer"
              whileHover={{ scale: 1.08, y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`${stat.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-4xl font-black text-slate-800 mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {stat.value}
              </motion.div>
              <div className="text-slate-600 font-semibold text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Navigation Tabs */}
        <motion.div variants={item} className="flex justify-center">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border border-white/50">
            {[
              { id: "hotels", label: "Premium Hotels", icon: <Hotel className="h-6 w-6" /> },
              { id: "transport", label: "Travel   Guide", icon: <Navigation className="h-6 w-6" /> },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-10 py-5 rounded-2xl font-bold transition-all duration-300 flex items-center gap-4 text-lg ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl"
                    : "text-slate-700 hover:bg-white/50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeAccommodationTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Content Sections */}
        <motion.div variants={item} className="min-h-[700px]">
          <AnimatePresence mode="wait">
            {activeTab === "hotels" && (
              <motion.div
                key="hotels"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-4xl font-bold text-slate-800">Premium Hotel Partners</h3>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                    Enjoy exclusive rates and premium amenities at our carefully selected hotel partners
                  </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-3">
                  {hotels.map((hotel, index) => (
                    <motion.div
                      key={hotel.name}
                      variants={cardVariants}
                      className={`group relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden cursor-pointer ${
                        hotel.popular ? "ring-2 ring-blue-500 ring-offset-4 ring-offset-transparent" : ""
                      }`}
                      whileHover={{ scale: 1.03, y: -8 }}
                      onClick={() => setSelectedHotel(selectedHotel === index ? null : index)}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {hotel.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-10">
                          Most Popular
                        </div>
                      )}

                      {/* Image Section */}
                      <div className="relative overflow-hidden">
                        <img
                          src={hotel.image || "/placeholder.svg"}
                          alt={hotel.name}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Rating Badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                          <div className="flex items-center gap-1">
                            {[...Array(hotel.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>

                        {/* Distance Badge */}
                        <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          {hotel.distance} away
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8 space-y-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-2xl font-bold text-slate-800 mb-2">{hotel.name}</h4>
                            <p className="text-slate-600 leading-relaxed">{hotel.description}</p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-500 line-through">{hotel.originalPrice}</span>
                              <span className="text-2xl font-bold text-blue-600">{hotel.price}</span>
                            </div>
                            <p className="text-slate-500 text-sm">per night</p>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="space-y-3">
                          <h5 className="font-bold text-slate-800">Premium Amenities</h5>
                          <div className="grid grid-cols-2 gap-2">
                            {hotel.amenities.map((amenity, idx) => (
                              <motion.div
                                key={amenity.name}
                                className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-2"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                              >
                                <div className="text-blue-600">{amenity.icon}</div>
                                {amenity.name}
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-3">
                          <h5 className="font-bold text-slate-800">Special Features</h5>
                          <div className="grid grid-cols-2 gap-2">
                            {hotel.features.map((feature, idx) => (
                              <motion.div
                                key={feature}
                                className="flex items-center gap-2 text-xs text-slate-600"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                              >
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {feature}
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                          <Button
                            className={`flex-1 bg-gradient-to-r ${hotel.color} text-white font-bold rounded-2xl py-3 shadow-lg hover:shadow-xl transition-all duration-300`}
                          >
                            <motion.div className="flex items-center justify-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Book Now
                              <motion.div
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <ArrowRight className="w-4 h-4" />
                              </motion.div>
                            </motion.div>
                          </Button>
                          <Button
                            variant="outline"
                            className="bg-transparent border-slate-300 rounded-2xl px-4 hover:bg-slate-50"
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Special Offer */}
                <motion.div
                  className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-3xl p-12 text-white text-center overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/20 rounded-full -translate-y-20 translate-x-20" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/20 rounded-full translate-y-16 -translate-x-16" />

                  <div className="relative z-10 space-y-6">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <CreditCard className="h-16 w-16 text-emerald-200 mx-auto" />
                    </motion.div>
                    <div>
                      <h4 className="text-3xl font-bold mb-4">Conference Attendee Special</h4>
                      <p className="text-emerald-100 text-xl mb-6 max-w-2xl mx-auto">
                        Get <span className="font-bold text-2xl">20% off</span> your hotel booking when you mention
                        conference code: <span className="font-bold bg-white/20 px-3 py-1 rounded-lg">FSNC2025</span>
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-white text-emerald-600 font-bold px-10 py-4 rounded-2xl hover:bg-emerald-50 transition-colors shadow-lg"
                    >
                      <Clock className="w-6 h-6 mr-3" />
                      Limited Time Offer
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "transport" && (
              <motion.div
                key="transport"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-4xl font-bold text-slate-800">Comprehensive Travel Guide</h3>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Multiple convenient transportation options to reach the conference venue in Islamabad with ease and
                    comfort
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {transportOptions.map((option, index) => (
                    <motion.div
                      key={option.title}
                      className="group bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
                      whileHover={{ scale: 1.03, y: -8 }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Header */}
                      <div
                        className={`relative bg-gradient-to-br ${option.color} p-10 text-white text-center overflow-hidden`}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />

                        <div className="relative z-10 space-y-4">
                          <motion.div
                            className="flex justify-center mb-4"
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {option.icon}
                          </motion.div>
                          <h4 className="text-2xl font-bold mb-2">{option.title}</h4>
                          <p className="text-white/90 text-lg">{option.description}</p>
                          <div className="flex justify-center gap-6 pt-4">
                            <div className="text-center">
                              <div className="text-lg font-bold">{option.cost}</div>
                              <div className="text-xs text-white/70">Cost</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{option.duration}</div>
                              <div className="text-xs text-white/70">Duration</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 space-y-6">
                        <p className="text-slate-600 font-medium leading-relaxed">{option.details}</p>

                        <div className="space-y-4">
                          <h5 className="font-bold text-slate-800 flex items-center gap-2">
                            <Zap className="h-5 w-5 text-blue-600" />
                            Travel Tips
                          </h5>
                          <ul className="space-y-3">
                            {option.tips.map((tip, idx) => (
                              <motion.li
                                key={idx}
                                className="flex items-start gap-3 text-sm text-slate-600"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                              >
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {tip}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <Button
                          className={`w-full bg-gradient-to-r ${option.color} text-white font-bold rounded-2xl py-3 shadow-lg hover:shadow-xl transition-all duration-300`}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Venue Location */}
                <motion.div
                  className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 p-10 text-white">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className="p-4 bg-blue-500/20 rounded-2xl backdrop-blur-sm"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                      >
                        <MapPin className="h-8 w-8 text-blue-400" />
                      </motion.div>
                      <div>
                        <h4 className="text-3xl font-bold">Conference Venue</h4>
                        <p className="text-slate-300 text-lg">COMSATS University Islamabad, Pakistan</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-10">
                    <div className="grid lg:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div>
                          <h5 className="font-bold text-slate-800 mb-4 text-lg">Complete Address</h5>
                          <p className="text-slate-600 mb-6 leading-relaxed">
                            Park Road, Tarlai Kalan, Islamabad 45550, Pakistan
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                            <Phone className="h-6 w-6 text-blue-600" />
                            <div>
                              <div className="font-semibold text-slate-800">Phone</div>
                              <div className="text-slate-600">+92 51 9049 000</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                            <Navigation className="h-6 w-6 text-blue-600" />
                            <div>
                              <div className="font-semibold text-slate-800">GPS Coordinates</div>
                              <div className="text-slate-600">33.6513, 72.9900</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-64 flex items-center justify-center">
                        <div className="text-center text-slate-600">
                          <MapPin className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                          <p className="font-bold text-lg">Interactive Map</p>
                          <p className="text-sm">Detailed directions and landmarks</p>
                          <Button className="mt-4 bg-blue-600 text-white rounded-xl">View on Maps</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default AccommodationTravel
