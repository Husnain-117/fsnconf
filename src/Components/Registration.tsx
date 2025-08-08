"use client"

import type React from "react"
import Header from "./header";
import Footer from "./Footer";
import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { CheckCircle, UserPlus, ArrowRight, Users, Award, X, Upload, Building, User, DollarSign, FileText, Trash2 } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Checkbox } from "@/Components/ui/checkbox"

const commonBenefits = [
  "Abstract Book (digital)",
  "Conference Kit",
  "Certificate of Participation",
  "Entry to All Sessions",
  "Lunch & Tea Breaks",
  "Cultural Visit",
  "Networking Access",
]

const categories = [
  {
    type: "Pakistani Students",
    early: "Rs. 2000",
    regular: "Rs. 3000",
    popular: false,
    icon: <Users className="h-5 w-5" />,
    color: "from-purple-500 to-violet-600",
  },
  {
    type: "Pakistani Professionals",
    early: "Rs. 3000",
    regular: "Rs. 5000",
    popular: true,
    icon: <Award className="h-5 w-5" />,
    color: "from-yellow-500 to-amber-500",
  },
  {
    type: "International Students",
    early: "$150",
    regular: "–",
    popular: false,
    icon: <Users className="h-5 w-5" />,
    color: "from-purple-600 to-pink-600",
  },
  {
    type: "International Professionals",
    early: "$250",
    regular: "–",
    popular: false,
    icon: <Award className="h-5 w-5" />,
    color: "from-amber-500 to-yellow-600",
  },
]

export const Registration: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    department: "",
    designation: "",
    cityCountry: "",
    category: "",
    participationMode: "",
    culturalVisit: "",
    totalFee: "",
    transactionId: "",
    paymentDate: "",
    bankName: "",
    proofOfPayment: null as File | null,
    confirmAccuracy: false,
    agreeConduct: false,
  })

  const handleRegisterClick = (categoryType: string) => {
    setSelectedCategory(categoryType)
    setFormData((prev) => ({ ...prev, category: categoryType }))
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedCategory("")
  }

  const [preview, setPreview] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === 'proofOfPayment' && value === null) {
      if (preview) {
        URL.revokeObjectURL(preview)
        setPreview(null)
      }
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      handleInputChange("proofOfPayment", file)
      if (preview) {
        URL.revokeObjectURL(preview)
      }
      setPreview(URL.createObjectURL(file))
    }
  }, [preview])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  })

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    const data = new FormData()
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData]
      if (value instanceof File) {
        data.append(key, value)
      } else if (typeof value === "boolean") {
        data.append(key, String(value))
      } else if (value) {
        data.append(key, value)
      }
    })

    try {
      const response = await fetch("https://fsnconference-backend.vercel.app/api/register", {
        method: "POST",
        body: data,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong")
      }

      setSuccessMessage(result.message || "Registration successful!")
      // Optionally, reset form or redirect user
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <Header />
    <section id="registration" className={showForm ? "min-h-screen bg-white" : "min-h-screen py-16 px-6 bg-gradient-to-br from-purple-50 via-white to-yellow-50"}>
      {showForm ? (
        <>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-6 text-white">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <UserPlus className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Conference Registration</h1>
                  <p className="text-purple-100">Food Science & Nutrition Conference 2025</p>
                  <div className="mt-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">{selectedCategory}</span>
                  </div>
                </div>
              </div>
              <Button onClick={handleCloseForm} className="text-white hover:bg-white/20 rounded-full p-2" variant="ghost">
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b-2 border-purple-100">
                <div className="p-3 bg-purple-100 rounded-2xl">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Personal Information</h2>
                  <p className="text-slate-600">Please provide your personal details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-semibold text-slate-800">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-slate-800 placeholder:text-slate-500"
                    placeholder="Enter your complete full name"
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
                  />
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    We'll send confirmation and updates to this email
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-slate-800">
                    Phone (WhatsApp) *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-slate-800 placeholder:text-slate-500"
                    placeholder="+92 300 1234567"
                  />
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    WhatsApp number preferred for quick communication
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cityCountry" className="text-sm font-semibold text-slate-800">
                    City & Country *
                  </Label>
                  <Input
                    id="cityCountry"
                    value={formData.cityCountry}
                    onChange={(e) => handleInputChange("cityCountry", e.target.value)}
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-slate-800 placeholder:text-slate-500"
                    placeholder="e.g., Lahore, Pakistan"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b-2 border-yellow-100">
                <div className="p-3 bg-yellow-100 rounded-2xl">
                  <Building className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Professional Information</h2>
                  <p className="text-slate-600">Tell us about your professional background</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-sm font-semibold text-slate-800">
                    Organization *
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
                  <Label htmlFor="department" className="text-sm font-semibold text-slate-800">
                    Department *
                  </Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-slate-800 placeholder:text-slate-500"
                    placeholder="Department or division name"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="designation" className="text-sm font-semibold text-slate-800">
                    Designation *
                  </Label>
                  <Input
                    id="designation"
                    value={formData.designation}
                    onChange={(e) => handleInputChange("designation", e.target.value)}
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-slate-800 placeholder:text-slate-500"
                    placeholder="Your current position or title"
                  />
                </div>
              </div>
            </div>

            {/* Conference Options */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b-2 border-purple-100">
                <div className="p-3 bg-purple-100 rounded-2xl">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Conference Options</h2>
                  <p className="text-slate-600">Customize your conference experience</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-800">Participation Mode *</Label>
                  <Select onValueChange={(value) => handleInputChange("participationMode", value)}>
                    <SelectTrigger className="h-12 rounded-xl border-2 border-slate-200 focus:border-purple-500 text-slate-800">
                      <SelectValue placeholder="Select participation mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-Person Attendance</SelectItem>
                      <SelectItem value="virtual">Virtual Attendance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-800">Cultural Visit *</Label>
                  <Select onValueChange={(value) => handleInputChange("culturalVisit", value)}>
                    <SelectTrigger className="h-12 rounded-xl border-2 border-slate-200 focus:border-purple-500 text-slate-800">
                      <SelectValue placeholder="Join cultural visit?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I want to join</SelectItem>
                      <SelectItem value="no">No, thank you</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b-2 border-yellow-100">
                <div className="p-3 bg-yellow-100 rounded-2xl">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Payment Information</h2>
                  <p className="text-slate-600">Provide your payment details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="totalFee" className="text-sm font-semibold text-slate-800">
                    Total Fee Paid *
                  </Label>
                  <Input
                    id="totalFee"
                    value={formData.totalFee}
                    onChange={(e) => handleInputChange("totalFee", e.target.value)}
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-slate-800 placeholder:text-slate-500"
                    placeholder="Enter amount paid (e.g., Rs. 2000)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transactionId" className="text-sm font-semibold text-slate-800">
                    Transaction ID *
                  </Label>
                  <Input
                    id="transactionId"
                    value={formData.transactionId}
                    onChange={(e) => handleInputChange("transactionId", e.target.value)}
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-slate-800 placeholder:text-slate-500"
                    placeholder="Bank reference or transaction number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentDate" className="text-sm font-semibold text-slate-800">
                    Payment Date *
                  </Label>
                  <Input
                    id="paymentDate"
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) => handleInputChange("paymentDate", e.target.value)}
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-slate-800"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankName" className="text-sm font-semibold text-slate-800">
                    Bank Name *
                  </Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange("bankName", e.target.value)}
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-slate-800 placeholder:text-slate-500"
                    placeholder="Name of your bank (e.g., HBL, UBL)"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-800">Payment Proof *</Label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-300 cursor-pointer ${isDragActive ? "border-yellow-500 bg-yellow-50" : "border-slate-300 hover:border-yellow-400"}`}>
                  <input {...getInputProps()} />
                  {formData.proofOfPayment ? (
                    <div className="flex flex-col items-center gap-4">
                      {preview && formData.proofOfPayment.type.startsWith('image/') ? (
                        <img src={preview} alt="Payment proof preview" className="max-h-40 rounded-lg object-contain" />
                      ) : (
                        <FileText className="h-20 w-20 text-slate-500" />
                      )}
                      <div className="text-center">
                        <p className="font-semibold text-slate-800">{formData.proofOfPayment.name}</p>
                        <p className="text-xs text-slate-500">{(formData.proofOfPayment.size / 1024).toFixed(2)} KB</p>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation() // prevent opening file dialog
                          handleInputChange("proofOfPayment", null)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove File
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-600">
                      <Upload className="h-12 w-12 text-slate-400" />
                      <p className="font-medium">Drop your payment proof here, or click to browse</p>
                      <p className="text-xs text-slate-500">JPG, PNG, or PDF (Max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submission Status */}
            {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}
            {successMessage && <div className="p-4 bg-green-100 text-green-700 rounded-lg">{successMessage}</div>}

            {/* Terms and Conditions */}
            <div className="space-y-4 p-6 bg-slate-50 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="confirmAccuracy"
                    checked={formData.confirmAccuracy}
                    onCheckedChange={(checked) => handleInputChange("confirmAccuracy", checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="confirmAccuracy" className="text-sm text-slate-700 leading-relaxed">
                    I confirm that all the information provided above is accurate and complete to the best of my
                    knowledge.
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agreeConduct"
                    checked={formData.agreeConduct}
                    onCheckedChange={(checked) => handleInputChange("agreeConduct", checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="agreeConduct" className="text-sm text-slate-700 leading-relaxed">
                    I agree to abide by the conference code of conduct and understand that any violation may result in
                    removal from the event.
                  </Label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t-2 border-slate-100">
              <Button type="submit" disabled={isLoading} className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? "Submitting..." : "Register Now"}
              </Button>
            </div>
          </form>
        </div>
        </>
      ) : (
        // ... (rest of the code remains the same)
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            <span className="text-yellow-600">
              Register Now
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto">
           <i>Join us for an extraordinary conference experience. Choose your registration category and secure your spot
            today.</i>
          </p>
        </div>

        {/* Registration Categories */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.type}
              className={`relative bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                category.popular ? "ring-2 ring-purple-500 ring-offset-4" : ""
              }`}
              onClick={() => handleRegisterClick(category.type)}
            >
              

              {/* Header */}
              <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                <div className="text-center space-y-3">
                  <div className="flex justify-center">{category.icon}</div>
                  <h3 className="text-lg font-bold leading-tight">{category.type}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-800 mb-1">{category.early}</div>
                  <div className="text-sm text-slate-600">Early Bird Rate</div>
                  {category.regular !== "–" && (
                    <div className="mt-2">
                      <div className="text-lg font-bold text-slate-500 line-through">{category.regular}</div>
                      <div className="text-xs text-slate-500">Regular Rate</div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800 text-sm">Includes:</h4>
                  <ul className="space-y-2">
                    {commonBenefits.slice(0, 3).map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                    <li className="text-xs text-slate-500 italic">+ {commonBenefits.length - 3} more benefits</li>
                  </ul>
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 text-white font-bold py-2 rounded-xl transition-all duration-300`}
                  onClick={() => handleRegisterClick(category.type)}
                >
                  <div className="flex items-center justify-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Register Now
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Button>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </section>
    <Footer />
    </>
  )
}

export default Registration
