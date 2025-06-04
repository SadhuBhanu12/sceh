"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Vote, TrendingUp, Bell, BookOpen, Award, Target } from "lucide-react"
import Link from "next/link"

interface User {
  role: string
  name: string
  email: string
  id: string
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Mock data - in real app, this would come from API
  const featuredEvents = [
    {
      id: 1,
      title: "Technical Symposium 2025",
      description: "Annual technical event featuring workshops, competitions, and industry talks",
      date: "2025-06-15",
      time: "09:00 AM",
      venue: "Main Auditorium",
      category: "Technical",
      organizer: "CSE Department",
      status: "approved",
      registrations: 245,
      votes: 178,
      priority: "high",
    },
    {
      id: 2,
      title: "Cultural Fest - Aerofiesta",
      description: "Celebrate diversity through music, dance, art, and cultural performances",
      date: "2025-06-20",
      time: "06:00 PM",
      venue: "Open Air Theatre",
      category: "Cultural",
      organizer: "Cultural Committee",
      status: "approved",
      registrations: 420,
      votes: 356,
      priority: "high",
    },
    {
      id: 3,
      title: "Industry Connect Session",
      description: "Connect with aerospace industry professionals and explore career opportunities",
      date: "2025-06-25",
      time: "02:00 PM",
      venue: "Conference Hall",
      category: "Career",
      organizer: "Placement Cell",
      status: "approved",
      registrations: 167,
      votes: 189,
      priority: "medium",
    },
  ]

  const quickStats = [
    { label: "Active Events", value: "24", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Participants", value: "1,247", icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "Live Polls", value: "8", icon: Vote, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Success Rate", value: "94%", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
  ]

  const announcements = [
    {
      title: "Event Registration Deadline Extended",
      description: "Registration for Technical Symposium extended till June 10th",
      time: "2 hours ago",
      type: "info",
    },
    {
      title: "New Voting Poll Available",
      description: "Vote for your preferred time slot for Industry Connect Session",
      time: "5 hours ago",
      type: "poll",
    },
    {
      title: "Cultural Fest Venue Changed",
      description: "Aerofiesta venue moved to Open Air Theatre due to weather conditions",
      time: "1 day ago",
      type: "update",
    },
  ]

  const getWelcomeMessage = () => {
    if (!user) return "Welcome to SCEH++ Portal"

    const timeOfDay = new Date().getHours()
    let greeting = "Good day"
    if (timeOfDay < 12) greeting = "Good morning"
    else if (timeOfDay < 17) greeting = "Good afternoon"
    else greeting = "Good evening"

    switch (user.role) {
      case "student":
        return `${greeting}, ${user.name.split(" ")[0]}! 🎓`
      case "faculty":
        return `${greeting}, ${user.name}! 📚`
      case "hod":
        return `${greeting}, ${user.name}! 👥`
      case "admin":
        return `${greeting}, ${user.name}! 🛡️`
      default:
        return `${greeting}, ${user.name}!`
    }
  }

  const EventCard = ({ event }: { event: (typeof featuredEvents)[0] }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-[#1e3a8a]/10 text-[#1e3a8a] border-[#1e3a8a]/20">
              {event.category}
            </Badge>
            {event.priority === "high" && (
              <Badge className="bg-red-100 text-red-700 border-red-200">High Priority</Badge>
            )}
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-200">{event.status}</Badge>
        </div>
        <CardTitle className="text-lg text-gray-800 hover:text-[#1e3a8a] transition-colors">{event.title}</CardTitle>
        <CardDescription className="text-gray-600">{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-[#1e3a8a]" />
            {event.date} at {event.time}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-green-600" />
            {event.venue}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-blue-600" />
            {event.registrations} registered
          </div>
          <div className="flex items-center">
            <Vote className="h-4 w-4 mr-2 text-purple-600" />
            {event.votes} votes
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={user ? `/event-registration/${event.id}` : "/auth/login"} className="flex-1">
            <Button size="sm" className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white">
              Register Now
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/10">
            Vote
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-semibold border-white/30">
                <Award className="h-4 w-4 mr-2" />
                {user ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Portal` : "Official IARE Portal"}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {getWelcomeMessage()}
              <br />
              <span className="text-blue-200">Student Community Event & Voting Portal</span>
            </h1>

            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {user
                ? `Discover amazing events, participate in community voting, and connect with fellow ${
                    user.role === "student" ? "students" : "colleagues"
                  } at Institute of Aeronautical Engineering.`
                : "Official portal for IARE students and faculty to discover, register, and vote on campus events and activities."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/events">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-[#1e3a8a] hover:bg-gray-100 shadow-lg font-semibold"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Browse Events
                </Button>
              </Link>
              {user ? (
                <Link href="/register-event">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-[#1e3a8a] font-semibold"
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Register New Event
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-[#1e3a8a] font-semibold"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Sign In to Portal
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="text-center border border-gray-200 bg-white hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Events */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Featured Events</h2>
              <Link href="/events">
                <Button variant="outline" className="border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/10">
                  View All Events
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Announcements */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-[#1e3a8a]" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement, index) => (
                    <div key={index} className="border-l-4 border-[#1e3a8a] pl-4 py-2">
                      <h4 className="font-semibold text-gray-800 text-sm">{announcement.title}</h4>
                      <p className="text-gray-600 text-xs mb-1">{announcement.description}</p>
                      <span className="text-gray-500 text-xs">{announcement.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={user ? "/register-event" : "/auth/login"}>
                  <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Register New Event
                  </Button>
                </Link>
                <Link href={user ? "/voting" : "/auth/login"}>
                  <Button
                    variant="outline"
                    className="w-full border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/10 justify-start"
                  >
                    <Vote className="h-4 w-4 mr-2" />
                    Participate in Voting
                  </Button>
                </Link>
                <Link href="/results">
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 justify-start"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Results
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* College Info */}
            <Card className="border border-gray-200 bg-gradient-to-br from-[#1e3a8a]/5 to-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-[#1e3a8a]">Institute Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <strong>Institute:</strong> Institute of Aeronautical Engineering
                </div>
                <div>
                  <strong>Location:</strong> Dundigal, Hyderabad
                </div>
                <div>
                  <strong>Established:</strong> 2000
                </div>
                <div>
                  <strong>Affiliation:</strong> JNTUH
                </div>
                <div className="pt-2">
                  <Link href="https://iare.ac.in" target="_blank" className="text-[#1e3a8a] hover:underline">
                    Visit Official Website →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">SCEH++ Portal</h3>
              <p className="text-blue-200 text-sm">
                Official Student Community Event & Voting Portal for Institute of Aeronautical Engineering
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link href="/events" className="block text-blue-200 hover:text-white">
                  Events
                </Link>
                <Link href="/voting" className="block text-blue-200 hover:text-white">
                  Voting
                </Link>
                <Link href="/results" className="block text-blue-200 hover:text-white">
                  Results
                </Link>
                <Link href="/analytics" className="block text-blue-200 hover:text-white">
                  Analytics
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-blue-200">
                <div>📧 info@iare.ac.in</div>
                <div>📞 +91-8415-024999</div>
                <div>📍 Dundigal, Hyderabad - 500043</div>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-4 text-center text-sm text-blue-200">
            <p>&copy; 2025 Institute of Aeronautical Engineering. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
