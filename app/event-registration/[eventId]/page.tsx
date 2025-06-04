"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Calendar, MapPin, Users, Clock, Mail, Phone, GraduationCap, FileText, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EventDetails {
  id: number
  title: string
  description: string
  date: string
  time: string
  venue: string
  category: string
  organizer: string
  maxCapacity: number
  currentRegistrations: number
  requirements?: string
  gradient: string
}

export default function EventRegistrationPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock event data - in real app, fetch based on eventId
  const eventDetails: EventDetails = {
    id: Number.parseInt(params.eventId as string) || 1,
    title: "Tech Innovation Workshop",
    description: "Learn about the latest trends in AI and Machine Learning with hands-on sessions and expert guidance",
    date: "2025-06-15",
    time: "10:00 AM - 4:00 PM",
    venue: "Computer Lab A, Main Building",
    category: "Workshop",
    organizer: "Tech Club",
    maxCapacity: 60,
    currentRegistrations: 45,
    requirements: "Bring your laptop, basic programming knowledge preferred",
    gradient: "from-blue-500 to-cyan-500",
  }

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    studentId: "",

    // Academic Information
    department: "",
    year: "",
    semester: "",

    // Event-specific
    motivation: "",
    experience: "",
    expectations: "",
    dietaryRestrictions: "",
    emergencyContact: "",
    emergencyPhone: "",

    // Agreements
    agreeTerms: false,
    agreePhotography: false,
    agreeUpdates: false,
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Pre-fill form with user data
      setFormData((prev) => ({
        ...prev,
        fullName: parsedUser.name || "",
        email: parsedUser.email || "",
        studentId: parsedUser.id || "",
      }))
    }
  }, [])

  const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Chemical Engineering",
    "Biotechnology",
  ]

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"]
  const semesters = ["1st Semester", "2nd Semester"]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to register for events.",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.department || !formData.year) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Registration Successful! 🎉",
        description: `You have been registered for ${eventDetails.title}. Check your email for confirmation.`,
      })

      setIsLoading(false)
      router.push("/events")
    }, 2000)
  }

  const availableSpots = eventDetails.maxCapacity - eventDetails.currentRegistrations
  const isEventFull = availableSpots <= 0

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <h2 className="text-xl font-bold mb-4">Authentication Required</h2>
              <p className="text-gray-600 mb-6">Please log in to register for events.</p>
              <Link href="/auth/login">
                <Button className="w-full">Sign In</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/events">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Event Details Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 border-0 bg-white shadow-xl overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${eventDetails.gradient}`}></div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                    {eventDetails.category}
                  </Badge>
                  <CardTitle className="text-xl">{eventDetails.title}</CardTitle>
                  <CardDescription>{eventDetails.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-3 text-blue-500" />
                      <span>{eventDetails.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-3 text-green-500" />
                      <span>{eventDetails.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-3 text-red-500" />
                      <span>{eventDetails.venue}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-3 text-purple-500" />
                      <span>
                        {eventDetails.currentRegistrations}/{eventDetails.maxCapacity} registered
                      </span>
                    </div>
                  </div>

                  {eventDetails.requirements && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-1">Requirements</h4>
                      <p className="text-sm text-blue-700">{eventDetails.requirements}</p>
                    </div>
                  )}

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-1">Organizer</h4>
                    <p className="text-sm text-gray-600">{eventDetails.organizer}</p>
                  </div>

                  {isEventFull ? (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                      <p className="text-red-800 font-semibold">Event is Full</p>
                      <p className="text-sm text-red-600">Join the waitlist below</p>
                    </div>
                  ) : (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <p className="text-green-800 font-semibold">{availableSpots} spots remaining</p>
                      <p className="text-sm text-green-600">Register now to secure your spot</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {isEventFull ? "Join Waitlist" : "Event Registration"}
                  </CardTitle>
                  <CardDescription>
                    {isEventFull
                      ? "Complete the form below to join the waitlist. You'll be notified if a spot becomes available."
                      : "Complete the form below to register for this event. All fields marked with * are required."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <Mail className="h-5 w-5 mr-2" />
                        Personal Information
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="studentId">Student ID *</Label>
                          <Input
                            id="studentId"
                            value={formData.studentId}
                            onChange={(e) => handleInputChange("studentId", e.target.value)}
                            placeholder="Enter your student ID"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2" />
                        Academic Information
                      </h3>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="department">Department *</Label>
                          <Select
                            value={formData.department}
                            onValueChange={(value) => handleInputChange("department", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="year">Year *</Label>
                          <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="semester">Semester</Label>
                          <Select
                            value={formData.semester}
                            onValueChange={(value) => handleInputChange("semester", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                              {semesters.map((semester) => (
                                <SelectItem key={semester} value={semester}>
                                  {semester}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Event-specific Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Event-specific Information
                      </h3>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="motivation">Why do you want to attend this event?</Label>
                          <Textarea
                            id="motivation"
                            value={formData.motivation}
                            onChange={(e) => handleInputChange("motivation", e.target.value)}
                            placeholder="Share your motivation for attending..."
                            rows={3}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="experience">Relevant Experience</Label>
                            <Textarea
                              id="experience"
                              value={formData.experience}
                              onChange={(e) => handleInputChange("experience", e.target.value)}
                              placeholder="Any relevant experience or background..."
                              rows={2}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expectations">What do you expect to learn?</Label>
                            <Textarea
                              id="expectations"
                              value={formData.expectations}
                              onChange={(e) => handleInputChange("expectations", e.target.value)}
                              placeholder="Your learning expectations..."
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <Phone className="h-5 w-5 mr-2" />
                        Emergency Contact
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                          <Input
                            id="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                            placeholder="Contact person name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                          <Input
                            id="emergencyPhone"
                            type="tel"
                            value={formData.emergencyPhone}
                            onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                            placeholder="Contact person phone"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dietaryRestrictions">Dietary Restrictions/Special Requirements</Label>
                        <Textarea
                          id="dietaryRestrictions"
                          value={formData.dietaryRestrictions}
                          onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                          placeholder="Any dietary restrictions, allergies, or special requirements..."
                          rows={2}
                        />
                      </div>
                    </div>

                    {/* Agreements */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Agreements & Consent</h3>

                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeTerms"
                            checked={formData.agreeTerms}
                            onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                            className="mt-1"
                          />
                          <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                            I agree to the{" "}
                            <Link href="/terms" className="text-blue-600 hover:underline">
                              terms and conditions
                            </Link>{" "}
                            and understand that I must attend the full event duration. *
                          </Label>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreePhotography"
                            checked={formData.agreePhotography}
                            onCheckedChange={(checked) => handleInputChange("agreePhotography", checked as boolean)}
                            className="mt-1"
                          />
                          <Label htmlFor="agreePhotography" className="text-sm leading-relaxed">
                            I consent to photography and videography during the event for promotional purposes.
                          </Label>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeUpdates"
                            checked={formData.agreeUpdates}
                            onCheckedChange={(checked) => handleInputChange("agreeUpdates", checked as boolean)}
                            className="mt-1"
                          />
                          <Label htmlFor="agreeUpdates" className="text-sm leading-relaxed">
                            I would like to receive updates about future events and activities.
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t">
                      <Button
                        type="submit"
                        disabled={isLoading || !formData.agreeTerms}
                        className={`w-full bg-gradient-to-r ${eventDetails.gradient} hover:opacity-90 text-white font-semibold py-3 shadow-lg transition-all duration-300`}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {isEventFull ? "Joining Waitlist..." : "Registering..."}
                          </div>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            {isEventFull ? "Join Waitlist" : "Complete Registration"}
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-gray-500 text-center mt-3">
                        By registering, you agree to attend the event and follow all guidelines.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
