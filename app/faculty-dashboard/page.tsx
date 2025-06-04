"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Users,
  Calendar,
  Vote,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Search,
} from "lucide-react"

interface User {
  role: string
  name: string
  email: string
  id: string
}

interface Student {
  name: string
  rollNo: string
  section: string
  branch: string
  event: string
  status: "confirmed" | "pending" | "cancelled"
}

export default function FacultyDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Mock data for faculty dashboard
  const facultyStats = [
    { label: "My Events", value: "8", icon: Calendar, gradient: "from-blue-500 to-cyan-500" },
    { label: "Total Participants", value: "234", icon: Users, gradient: "from-green-500 to-emerald-500" },
    { label: "Active Polls", value: "3", icon: Vote, gradient: "from-purple-500 to-violet-500" },
    { label: "Approval Rate", value: "92%", icon: TrendingUp, gradient: "from-orange-500 to-red-500" },
  ]

  const myEvents = [
    {
      id: 1,
      title: "Advanced Programming Workshop",
      description: "Deep dive into advanced programming concepts and best practices",
      date: "2025-06-20",
      status: "approved",
      participants: 45,
      votes: 67,
      category: "Workshop",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Research Methodology Seminar",
      description: "Learn effective research methodologies for academic projects",
      date: "2025-06-25",
      status: "pending",
      participants: 0,
      votes: 23,
      category: "Seminar",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      id: 3,
      title: "Industry Connect Session",
      description: "Connect with industry professionals and learn about career opportunities",
      date: "2025-07-01",
      status: "approved",
      participants: 78,
      votes: 89,
      category: "Networking",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      title: "Innovation Challenge",
      description: "Students present innovative solutions to real-world problems",
      date: "2025-07-05",
      status: "rejected",
      participants: 0,
      votes: 12,
      category: "Competition",
      gradient: "from-red-500 to-pink-500",
      rejectionReason: "Conflicts with exam schedule",
    },
  ]

  // Registered students data
  const registeredStudents: Student[] = [
    {
      name: "Alice Johnson",
      rollNo: "21CS001",
      section: "A",
      branch: "Computer Science",
      event: "Advanced Programming Workshop",
      status: "confirmed",
    },
    {
      name: "Bob Smith",
      rollNo: "21EE002",
      section: "B",
      branch: "Electrical Engineering",
      event: "Advanced Programming Workshop",
      status: "confirmed",
    },
    {
      name: "Carol Davis",
      rollNo: "21ME003",
      section: "A",
      branch: "Mechanical Engineering",
      event: "Industry Connect Session",
      status: "confirmed",
    },
    {
      name: "David Wilson",
      rollNo: "21CS004",
      section: "B",
      branch: "Computer Science",
      event: "Advanced Programming Workshop",
      status: "pending",
    },
    {
      name: "Eva Brown",
      rollNo: "21CE005",
      section: "A",
      branch: "Civil Engineering",
      event: "Industry Connect Session",
      status: "confirmed",
    },
    {
      name: "Frank Miller",
      rollNo: "21IT006",
      section: "A",
      branch: "Information Technology",
      event: "Advanced Programming Workshop",
      status: "confirmed",
    },
    {
      name: "Grace Lee",
      rollNo: "21EC007",
      section: "B",
      branch: "Electronics & Communication",
      event: "Industry Connect Session",
      status: "confirmed",
    },
    {
      name: "Henry Chen",
      rollNo: "21CS008",
      section: "A",
      branch: "Computer Science",
      event: "Advanced Programming Workshop",
      status: "confirmed",
    },
    {
      name: "Ivy Rodriguez",
      rollNo: "21EE009",
      section: "B",
      branch: "Electrical Engineering",
      event: "Industry Connect Session",
      status: "pending",
    },
    {
      name: "Jack Thompson",
      rollNo: "21ME010",
      section: "A",
      branch: "Mechanical Engineering",
      event: "Advanced Programming Workshop",
      status: "confirmed",
    },
    {
      name: "Kate Williams",
      rollNo: "21CS011",
      section: "B",
      branch: "Computer Science",
      event: "Industry Connect Session",
      status: "confirmed",
    },
    {
      name: "Liam Garcia",
      rollNo: "21CE012",
      section: "A",
      branch: "Civil Engineering",
      event: "Advanced Programming Workshop",
      status: "confirmed",
    },
    {
      name: "Maya Patel",
      rollNo: "21IT013",
      section: "A",
      branch: "Information Technology",
      event: "Industry Connect Session",
      status: "confirmed",
    },
    {
      name: "Noah Kim",
      rollNo: "21EC014",
      section: "B",
      branch: "Electronics & Communication",
      event: "Advanced Programming Workshop",
      status: "cancelled",
    },
    {
      name: "Olivia Taylor",
      rollNo: "21CS015",
      section: "A",
      branch: "Computer Science",
      event: "Industry Connect Session",
      status: "confirmed",
    },
    {
      name: "Peter Anderson",
      rollNo: "21EE016",
      section: "B",
      branch: "Electrical Engineering",
      event: "Advanced Programming Workshop",
      status: "confirmed",
    },
    {
      name: "Quinn Roberts",
      rollNo: "21ME017",
      section: "A",
      branch: "Mechanical Engineering",
      event: "Industry Connect Session",
      status: "confirmed",
    },
    {
      name: "Rachel Green",
      rollNo: "21CS018",
      section: "B",
      branch: "Computer Science",
      event: "Advanced Programming Workshop",
      status: "confirmed",
    },
    {
      name: "Sam Wilson",
      rollNo: "21CE019",
      section: "A",
      branch: "Civil Engineering",
      event: "Industry Connect Session",
      status: "pending",
    },
    {
      name: "Tina Brown",
      rollNo: "21IT020",
      section: "A",
      branch: "Information Technology",
      event: "Advanced Programming Workshop",
      status: "confirmed",
    },
  ]

  const eventStatusData = [
    { name: "Approved", value: 5, color: "#22c55e" },
    { name: "Pending", value: 2, color: "#eab308" },
    { name: "Rejected", value: 1, color: "#ef4444" },
  ]

  const participationData = [
    { month: "Jan", participants: 45 },
    { month: "Feb", participants: 67 },
    { month: "Mar", participants: 89 },
    { month: "Apr", participants: 123 },
    { month: "May", participants: 156 },
    { month: "Jun", participants: 234 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "rejected":
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  // Filter students by section and search term
  const getFilteredStudentsBySection = (section: string) => {
    return registeredStudents.filter(
      (student) =>
        student.section === section &&
        (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.branch.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Please log in to access the faculty dashboard</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Faculty Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {user.name}! Manage your events and track student engagement.
              </p>
            </div>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Create New Event
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {facultyStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              My Events
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              Registered Students
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="engagement"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              Student Engagement
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-6">
              {myEvents.map((event) => (
                <Card
                  key={event.id}
                  className="hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden"
                >
                  <div className={`h-1 bg-gradient-to-r ${event.gradient}`}></div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                            {event.category}
                          </Badge>
                          <Badge className={getStatusColor(event.status)}>
                            {getStatusIcon(event.status)}
                            <span className="ml-1">{event.status}</span>
                          </Badge>
                        </div>
                        <CardTitle className="text-xl text-gray-800">{event.title}</CardTitle>
                        <CardDescription className="text-gray-600">{event.description}</CardDescription>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {event.date}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {event.participants} participants
                          </span>
                          <span className="flex items-center">
                            <Vote className="h-4 w-4 mr-1" />
                            {event.votes} votes
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {event.status === "rejected" && event.rejectionReason && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">
                          <strong>Rejection Reason:</strong> {event.rejectionReason}
                        </p>
                      </div>
                    )}
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            {/* Overview Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {registeredStudents.filter((s) => s.section === "A").length}
                    </div>
                    <p className="text-sm text-gray-600">Section A Students</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {registeredStudents.filter((s) => s.section === "B").length}
                    </div>
                    <p className="text-sm text-gray-600">Section B Students</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {registeredStudents.filter((s) => s.status === "confirmed").length}
                    </div>
                    <p className="text-sm text-gray-600">Confirmed</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {registeredStudents.filter((s) => s.status === "pending").length}
                    </div>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search Bar */}
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students by name, roll no, or branch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="text-sm text-gray-600">Total Students: {registeredStudents.length}</div>
            </div>

            {/* Section Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="section-a">
                  Section A ({registeredStudents.filter((s) => s.section === "A").length})
                </TabsTrigger>
                <TabsTrigger value="section-b">
                  Section B ({registeredStudents.filter((s) => s.section === "B").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="border-0 bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-gray-800">All Registered Students</CardTitle>
                    <CardDescription>Overview of all students registered for your events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Section</h3>
                      <p className="text-gray-500 mb-6">
                        Click on "Section A" or "Section B" tabs above to view registered students
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-800">Section A</h4>
                          <p className="text-2xl font-bold text-blue-600">
                            {registeredStudents.filter((s) => s.section === "A").length}
                          </p>
                          <p className="text-sm text-blue-600">Students</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-800">Section B</h4>
                          <p className="text-2xl font-bold text-green-600">
                            {registeredStudents.filter((s) => s.section === "B").length}
                          </p>
                          <p className="text-sm text-green-600">Students</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="section-a" className="mt-6">
                <Card className="border-0 bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Section A Students ({getFilteredStudentsBySection("A").length})
                    </CardTitle>
                    <CardDescription>Students from Section A registered for your events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getFilteredStudentsBySection("A").map((student, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <span className="font-semibold text-gray-800">{student.name}</span>
                                <div className="text-sm text-gray-600">Roll: {student.rollNo}</div>
                              </div>
                              <div>
                                <span className="text-gray-600">{student.branch}</span>
                                <div className="text-sm text-gray-500">Event: {student.event}</div>
                              </div>
                              <div className="flex items-center">
                                <Badge className={getStatusColor(student.status)}>
                                  {getStatusIcon(student.status)}
                                  <span className="ml-1">{student.status}</span>
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {getFilteredStudentsBySection("A").length === 0 && (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Section A students found</h3>
                        <p className="text-gray-500">
                          {searchTerm
                            ? "Try adjusting your search criteria"
                            : "No students from Section A have registered yet"}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="section-b" className="mt-6">
                <Card className="border-0 bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Section B Students ({getFilteredStudentsBySection("B").length})
                    </CardTitle>
                    <CardDescription>Students from Section B registered for your events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getFilteredStudentsBySection("B").map((student, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <span className="font-semibold text-gray-800">{student.name}</span>
                                <div className="text-sm text-gray-600">Roll: {student.rollNo}</div>
                              </div>
                              <div>
                                <span className="text-gray-600">{student.branch}</span>
                                <div className="text-sm text-gray-500">Event: {student.event}</div>
                              </div>
                              <div className="flex items-center">
                                <Badge className={getStatusColor(student.status)}>
                                  {getStatusIcon(student.status)}
                                  <span className="ml-1">{student.status}</span>
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {getFilteredStudentsBySection("B").length === 0 && (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Section B students found</h3>
                        <p className="text-gray-500">
                          {searchTerm
                            ? "Try adjusting your search criteria"
                            : "No students from Section B have registered yet"}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Event Status Distribution */}
              <Card className="border-0 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">Event Status Distribution</CardTitle>
                  <CardDescription>Status of your submitted events</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={eventStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {eventStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Participation Trends */}
              <Card className="border-0 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">Participation Trends</CardTitle>
                  <CardDescription>Monthly participation in your events</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={participationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="participants" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
                    <p className="text-gray-600">Approval Rate</p>
                    <Progress value={92} className="mt-3" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">4.7</div>
                    <p className="text-gray-600">Average Rating</p>
                    <div className="flex justify-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`text-lg ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-purple-50 to-violet-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">78%</div>
                    <p className="text-gray-600">Engagement Rate</p>
                    <Progress value={78} className="mt-3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Student Engagement Overview</CardTitle>
                <CardDescription>Track how students interact with your events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 text-gray-800">Top Performing Events</h4>
                    <div className="space-y-3">
                      {myEvents
                        .filter((e) => e.status === "approved")
                        .slice(0, 3)
                        .map((event, index) => (
                          <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-800">{event.title}</p>
                              <p className="text-sm text-gray-600">{event.participants} participants</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">#{index + 1}</Badge>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 text-gray-800">Engagement Metrics</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Registration Rate</span>
                          <span className="text-sm font-semibold">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Voting Participation</span>
                          <span className="text-sm font-semibold">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Event Completion</span>
                          <span className="text-sm font-semibold">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Feedback Response</span>
                          <span className="text-sm font-semibold">68%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Student Activity */}
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Recent Student Activity</CardTitle>
                <CardDescription>Latest interactions with your events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      student: "Alice Johnson",
                      action: "Registered for",
                      event: "Advanced Programming Workshop",
                      time: "2 hours ago",
                    },
                    {
                      student: "Bob Smith",
                      action: "Voted on",
                      event: "Research Methodology Seminar",
                      time: "4 hours ago",
                    },
                    {
                      student: "Carol Davis",
                      action: "Commented on",
                      event: "Industry Connect Session",
                      time: "6 hours ago",
                    },
                    {
                      student: "David Wilson",
                      action: "Registered for",
                      event: "Advanced Programming Workshop",
                      time: "8 hours ago",
                    },
                    { student: "Eva Brown", action: "Voted on", event: "Industry Connect Session", time: "1 day ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {activity.student
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            <span className="font-semibold">{activity.student}</span> {activity.action}{" "}
                            <span className="font-semibold">{activity.event}</span>
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
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
