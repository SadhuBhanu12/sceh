"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Calendar, MapPin, Users, Vote, CheckCircle, XCircle, Clock, MessageSquare } from "lucide-react"

export default function AdminPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [approvalComment, setApprovalComment] = useState("")
  const [rejectionComment, setRejectionComment] = useState("")
  const { toast } = useToast()

  // Mock pending events data
  const pendingEvents = [
    {
      id: 4,
      title: "Coding Competition",
      description: "Test your programming skills in this exciting coding challenge with prizes for winners",
      date: "2025-06-30",
      time: "9:00 AM",
      venue: "Computer Lab B",
      category: "Technical",
      organizer: "Programming Club",
      organizerEmail: "progclub@college.edu",
      expectedAttendees: 40,
      requirements: "Computers with programming IDEs, projector for announcements",
      submittedDate: "2025-06-01",
      votingEnabled: true,
      votingQuestion: "Should we include team-based challenges?",
      votes: 23,
    },
    {
      id: 6,
      title: "Photography Workshop",
      description: "Learn professional photography techniques from industry experts",
      date: "2025-07-10",
      time: "3:00 PM",
      venue: "Art Studio",
      category: "Workshop",
      organizer: "Photography Club",
      organizerEmail: "photoclub@college.edu",
      expectedAttendees: 25,
      requirements: "DSLR cameras (can be arranged), lighting equipment",
      submittedDate: "2025-06-02",
      votingEnabled: false,
      votes: 0,
    },
    {
      id: 7,
      title: "Startup Pitch Competition",
      description: "Students present their startup ideas to a panel of investors and entrepreneurs",
      date: "2025-07-15",
      time: "1:00 PM",
      venue: "Main Auditorium",
      category: "Technical",
      organizer: "Entrepreneurship Cell",
      organizerEmail: "ecell@college.edu",
      expectedAttendees: 100,
      requirements: "Microphone system, projector, judging panel setup",
      submittedDate: "2025-06-03",
      votingEnabled: true,
      votingQuestion: "Which startup category interests you most?",
      votes: 45,
    },
  ]

  const recentlyApproved = [
    {
      id: 1,
      title: "Tech Innovation Workshop",
      approvedDate: "2025-06-02",
      approvedBy: "Dr. Smith (HOD)",
      registrations: 45,
    },
    {
      id: 2,
      title: "Cultural Fest 2025",
      approvedDate: "2025-06-01",
      approvedBy: "Prof. Johnson (Admin)",
      registrations: 120,
    },
  ]

  const recentlyRejected = [
    {
      id: 5,
      title: "Environmental Awareness Drive",
      rejectedDate: "2025-06-01",
      rejectedBy: "Dr. Smith (HOD)",
      reason: "Conflicting with another major event",
    },
  ]

  const handleApprove = (eventId: number) => {
    // In real app, this would call API
    toast({
      title: "Event Approved",
      description: "The event has been approved and is now visible to students.",
    })
    setSelectedEvent(null)
    setApprovalComment("")
  }

  const handleReject = (eventId: number) => {
    if (!rejectionComment.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejecting this event.",
        variant: "destructive",
      })
      return
    }

    // In real app, this would call API
    toast({
      title: "Event Rejected",
      description: "The event has been rejected and the organizer has been notified.",
    })
    setSelectedEvent(null)
    setRejectionComment("")
  }

  const EventDetailsDialog = ({ event }: { event: any }) => (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{event.title}</DialogTitle>
        <DialogDescription>Review event details and make approval decision</DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Event Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Category:</span>
              <Badge variant="secondary" className="ml-2">
                {event.category}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Organizer:</span> {event.organizer}
            </div>
            <div>
              <span className="font-medium">Date:</span> {event.date}
            </div>
            <div>
              <span className="font-medium">Time:</span> {event.time}
            </div>
            <div>
              <span className="font-medium">Venue:</span> {event.venue}
            </div>
            <div>
              <span className="font-medium">Expected Attendees:</span> {event.expectedAttendees}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Description</h4>
          <p className="text-sm text-muted-foreground">{event.description}</p>
        </div>

        {event.requirements && (
          <div>
            <h4 className="font-semibold mb-2">Special Requirements</h4>
            <p className="text-sm text-muted-foreground">{event.requirements}</p>
          </div>
        )}

        {event.votingEnabled && (
          <div>
            <h4 className="font-semibold mb-2">Voting Information</h4>
            <p className="text-sm text-muted-foreground mb-1">
              <strong>Question:</strong> {event.votingQuestion}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Current Votes:</strong> {event.votes}
            </p>
          </div>
        )}

        <div>
          <h4 className="font-semibold mb-2">Contact Information</h4>
          <p className="text-sm text-muted-foreground">{event.organizerEmail}</p>
        </div>
      </div>

      <DialogFooter className="flex-col sm:flex-row gap-2">
        <div className="flex gap-2 w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Approve Event</DialogTitle>
                <DialogDescription>Add any comments for the organizer (optional)</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="approval-comment">Comments</Label>
                  <Textarea
                    id="approval-comment"
                    value={approvalComment}
                    onChange={(e) => setApprovalComment(e.target.value)}
                    placeholder="Any additional notes or suggestions..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => handleApprove(event.id)}>Confirm Approval</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="flex-1">
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Event</DialogTitle>
                <DialogDescription>Please provide a reason for rejecting this event</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rejection-comment">Rejection Reason *</Label>
                  <Textarea
                    id="rejection-comment"
                    value={rejectionComment}
                    onChange={(e) => setRejectionComment(e.target.value)}
                    placeholder="Explain why this event cannot be approved..."
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="destructive" onClick={() => handleReject(event.id)}>
                  Confirm Rejection
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </DialogFooter>
    </DialogContent>
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-3 w-3 mr-1" />
      case "pending":
        return <Clock className="h-3 w-3 mr-1" />
      case "rejected":
        return <XCircle className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground">Review and manage event proposals</p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending Approval ({pendingEvents.length})</TabsTrigger>
            <TabsTrigger value="approved">Recently Approved ({recentlyApproved.length})</TabsTrigger>
            <TabsTrigger value="rejected">Recently Rejected ({recentlyRejected.length})</TabsTrigger>
            <TabsTrigger value="students">Registered Students</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <div className="space-y-6">
              {pendingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{event.category}</Badge>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">Submitted: {event.submittedDate}</span>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.venue}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {event.expectedAttendees} expected
                      </div>
                      {event.votingEnabled && (
                        <div className="flex items-center">
                          <Vote className="h-4 w-4 mr-2" />
                          {event.votes} votes
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <EventDetailsDialog event={event} />
                      </Dialog>

                      <Button className="flex-1" onClick={() => handleApprove(event.id)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Quick Approve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {pendingEvents.length === 0 && (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No pending events</h3>
                  <p className="text-muted-foreground">All event proposals have been reviewed.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <div className="space-y-4">
              {recentlyApproved.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Approved on {event.approvedDate} by {event.approvedBy}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approved
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{event.registrations} registrations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <div className="space-y-4">
              {recentlyRejected.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Rejected on {event.rejectedDate} by {event.rejectedBy}
                        </p>
                        <p className="text-sm text-red-600 mt-1">
                          <MessageSquare className="h-3 w-3 inline mr-1" />
                          {event.reason}
                        </p>
                      </div>
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        <XCircle className="h-3 w-3 mr-1" />
                        Rejected
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="mt-6">
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">All Registered Students</CardTitle>
                <CardDescription>View and manage student registrations across all events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Alice Johnson",
                      email: "alice.johnson@student.edu",
                      event: "Tech Innovation Workshop",
                      department: "Computer Science",
                      year: "3rd Year",
                      status: "confirmed",
                      registrationDate: "2025-06-01",
                    },
                    {
                      name: "Bob Smith",
                      email: "bob.smith@student.edu",
                      event: "Cultural Fest 2025",
                      department: "Electrical Engineering",
                      year: "2nd Year",
                      status: "confirmed",
                      registrationDate: "2025-06-02",
                    },
                    {
                      name: "Carol Davis",
                      email: "carol.davis@student.edu",
                      event: "Career Guidance Seminar",
                      department: "Mechanical Engineering",
                      year: "4th Year",
                      status: "pending",
                      registrationDate: "2025-06-03",
                    },
                  ].map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.email}</p>
                          <p className="text-xs text-gray-500">
                            {student.department} - {student.year} | Registered: {student.registrationDate}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">{student.event}</p>
                        <Badge className={getStatusColor(student.status)}>
                          {getStatusIcon(student.status)}
                          <span className="ml-1">{student.status}</span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
