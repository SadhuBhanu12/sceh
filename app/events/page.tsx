"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Vote, Search, Filter, Clock } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Tech Innovation Workshop",
      description: "Learn about the latest trends in AI and Machine Learning with hands-on sessions",
      date: "2025-06-15",
      time: "10:00 AM",
      venue: "Computer Lab A",
      category: "Workshop",
      organizer: "Tech Club",
      status: "approved",
      registrations: 45,
      maxCapacity: 60,
      votes: 78,
      votingEnabled: true,
      votingQuestion: "Are you interested in attending this workshop?",
    },
    {
      id: 2,
      title: "Cultural Fest 2025",
      description: "Annual cultural celebration with music, dance, and art performances",
      date: "2025-06-20",
      time: "6:00 PM",
      venue: "Main Auditorium",
      category: "Cultural",
      organizer: "Cultural Committee",
      status: "approved",
      registrations: 120,
      maxCapacity: 200,
      votes: 156,
      votingEnabled: true,
      votingQuestion: "Which performance are you most excited about?",
    },
    {
      id: 3,
      title: "Career Guidance Seminar",
      description: "Industry experts share insights on career opportunities in tech",
      date: "2025-06-25",
      time: "2:00 PM",
      venue: "Seminar Hall",
      category: "Seminar",
      organizer: "Placement Cell",
      status: "approved",
      registrations: 67,
      maxCapacity: 80,
      votes: 89,
      votingEnabled: false,
    },
    {
      id: 4,
      title: "Coding Competition",
      description: "Test your programming skills in this exciting coding challenge",
      date: "2025-06-30",
      time: "9:00 AM",
      venue: "Computer Lab B",
      category: "Technical",
      organizer: "Programming Club",
      status: "pending",
      registrations: 0,
      maxCapacity: 40,
      votes: 23,
      votingEnabled: true,
      votingQuestion: "Should we include team-based challenges?",
    },
    {
      id: 5,
      title: "Environmental Awareness Drive",
      description: "Join us in spreading awareness about environmental conservation",
      date: "2025-07-05",
      time: "11:00 AM",
      venue: "Campus Ground",
      category: "Social",
      organizer: "Green Club",
      status: "rejected",
      registrations: 0,
      maxCapacity: 100,
      votes: 12,
      votingEnabled: false,
      rejectionReason: "Conflicting with another major event",
    },
  ]

  const categories = ["all", "workshop", "cultural", "seminar", "technical", "social", "sports"]
  const statuses = ["all", "approved", "pending", "rejected"]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category.toLowerCase() === selectedCategory
    const matchesStatus = selectedStatus === "all" || event.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const EventCard = ({ event }: { event: (typeof events)[0] }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary">{event.category}</Badge>
          <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
        </div>
        <CardTitle className="text-lg">{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {event.date} at {event.time}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {event.venue}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            {event.registrations}/{event.maxCapacity} registered
          </div>
          {event.votingEnabled && (
            <div className="flex items-center">
              <Vote className="h-4 w-4 mr-2" />
              {event.votes} votes
            </div>
          )}
        </div>

        {event.status === "rejected" && event.rejectionReason && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <p className="text-sm text-red-800">
              <strong>Rejection Reason:</strong> {event.rejectionReason}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {event.status === "approved" && (
            <>
              <Button size="sm" className="flex-1">
                Register
              </Button>
              {event.votingEnabled && (
                <Button variant="outline" size="sm">
                  Vote
                </Button>
              )}
            </>
          )}
          {event.status === "pending" && (
            <Button variant="outline" size="sm" className="flex-1" disabled>
              <Clock className="h-4 w-4 mr-2" />
              Pending Approval
            </Button>
          )}
          <Link href={`/events/${event.id}`}>
            <Button variant="ghost" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">All Events</h1>
          <p className="text-muted-foreground">Discover and participate in student community events</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Events ({filteredEvents.length})</TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({filteredEvents.filter((e) => e.status === "approved").length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({filteredEvents.filter((e) => e.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({filteredEvents.filter((e) => e.status === "rejected").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .filter((e) => e.status === "approved")
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .filter((e) => e.status === "pending")
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .filter((e) => e.status === "rejected")
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or check back later for new events.
            </p>
            <Link href="/register-event">
              <Button>Register New Event</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
