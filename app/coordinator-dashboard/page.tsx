"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Download,
  Mail,
  Phone,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"

interface User {
  role: string
  name: string
  email: string
  id: string
}

interface Student {
  id: string
  name: string
  email: string
  phone: string
  department: string
  year: string
  registrationDate: string
  status: "confirmed" | "pending" | "cancelled"
  avatar?: string
}

export default function CoordinatorDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Mock data for coordinator dashboard
  const coordinatorStats = [
    { label: "My Events", value: "12", icon: Calendar, gradient: "from-teal-500 to-cyan-500" },
    { label: "Total Registrations", value: "456", icon: Users, gradient: "from-blue-500 to-indigo-500" },
    { label: "Active Events", value: "5", icon: Vote, gradient: "from-green-500 to-emerald-500" },
    { label: "Success Rate", value: "96%", icon: TrendingUp, gradient: "from-purple-500 to-violet-500" },
  ]

  const myEvents = [
    {
      id: 1,
      title: "Annual Tech Symposium",
      description: "A comprehensive technology conference featuring industry leaders",
      date: "2025-06-20",
      status: "approved",
      registrations: 145,
      maxCapacity: 200,
      votes: 89,
      category: "Conference",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Student Leadership Workshop",
      description: "Developing leadership skills for student representatives",
      date: "2025-06-25",
      status: "pending",
      registrations: 67,
      maxCapacity: 80,
      votes: 34,
      category: "Workshop",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      id: 3,
      title: "Cultural Exchange Program",
      description: "Celebrating diversity through cultural performances and exhibitions",
      date: "2025-07-01",
      status: "approved",
      registrations: 234,
      maxCapacity: 300,
      votes: 156,
      category: "Cultural",
      gradient: "from-pink-500 to-rose-500",
    },
  ]

  // Mock registered students data
  const registeredStudents: Student[] = [
    {
      id: "STU001",
      name: "Alice Johnson",
      email: "alice.johnson@student.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      year: "3rd Year",
      registrationDate: "2025-06-01",
      status: "confirmed",
    },
    {
      id: "STU002",
      name: "Bob Smith",
      email: "bob.smith@student.edu",
      phone: "+1 (555) 234-5678",
      department: "Electrical Engineering",
      year: "2nd Year",
      registrationDate: "2025-06-02",
      status: "confirmed",
    },
    {
      id: "STU003",
      name: "Carol Davis",
      email: "carol.davis@student.edu",
      phone: "+1 (555) 345-6789",
      department: "Mechanical Engineering",
      year: "4th Year",
      registrationDate: "2025-06-03",
      status: "pending",
    },
    {
      id: "STU004",
      name: "David Wilson",
      email: "david.wilson@student.edu",
      phone: "+1 (555) 456-7890",
      department: "Computer Science",
      year: "1st Year",
      registrationDate: "2025-06-04",
      status: "confirmed",
    },
    {
      id: "STU005",
      name: "Eva Brown",
      email: "eva.brown@student.edu",
      phone: "+1 (555) 567-8901",
      department: "Civil Engineering",
      year: "3rd Year",
      registrationDate: "2025-06-05",
      status: "cancelled",
    },
    {
      id: "STU006",
      name: "Frank Miller",
      email: "frank.miller@student.edu",
      phone: "+1 (555) 678-9012",
      department: "Information Technology",
      year: "2nd Year",
      registrationDate: "2025-06-06",
      status: "confirmed",
    },
  ]

  const filteredStudents = registeredStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  const exportStudentList = () => {
    const csvContent = [
      ["Student ID", "Name", "Email", "Phone", "Department", "Year", "Registration Date", "Status"],
      ...filteredStudents.map((student) => [
        student.id,
        student.name,
        student.email,
        student.phone,
        student.department,
        student.year,
        student.registrationDate,
        student.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "registered_students.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Please log in to access the coordinator dashboard</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Coordinator Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {user.name}! Coordinate events and manage student participation.
              </p>
            </div>
            <Link href="/register-event">
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Create New Event
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {coordinatorStats.map((stat, index) => (
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
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              My Events
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              Registered Students
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              Analytics
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
                            {event.registrations}/{event.maxCapacity} registered
                          </span>
                          <span className="flex items-center">
                            <Vote className="h-4 w-4 mr-1" />
                            {event.votes} votes
                          </span>
                        </div>
                        <div className="mt-3">
                          <Progress value={(event.registrations / event.maxCapacity) * 100} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.round((event.registrations / event.maxCapacity) * 100)}% capacity filled
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Event Registrations - {event.title}</DialogTitle>
                              <DialogDescription>View all students registered for this event</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                              {registeredStudents.slice(0, event.registrations).map((student, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage src={student.avatar || "/placeholder.svg"} />
                                      <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                                        {student.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium text-gray-800">{student.name}</p>
                                      <p className="text-sm text-gray-600">
                                        {student.department} - {student.year}
                                      </p>
                                    </div>
                                  </div>
                                  <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={exportStudentList} className="border-teal-200 hover:bg-teal-50">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
              </div>
            </div>

            {/* Student Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {registeredStudents.filter((s) => s.status === "confirmed").length}
                    </div>
                    <p className="text-sm text-gray-600">Confirmed</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {registeredStudents.filter((s) => s.status === "pending").length}
                    </div>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-gradient-to-br from-red-50 to-pink-50">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {registeredStudents.filter((s) => s.status === "cancelled").length}
                    </div>
                    <p className="text-sm text-gray-600">Cancelled</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{registeredStudents.length}</div>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Students List */}
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Registered Students ({filteredStudents.length})</CardTitle>
                <CardDescription>Manage student registrations and communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={student.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white font-semibold">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-800">{student.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {student.id}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {student.email}
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {student.phone}
                            </div>
                            <div className="flex items-center">
                              <GraduationCap className="h-3 w-3 mr-1" />
                              {student.department}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <span>{student.year}</span>
                            <span>Registered: {student.registrationDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(student.status)}>
                          {getStatusIcon(student.status)}
                          <span className="ml-1">{student.status}</span>
                        </Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredStudents.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No students found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">Registration Trends</CardTitle>
                  <CardDescription>Student registration patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="font-semibold">234 registrations</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Month</span>
                      <span className="font-semibold">189 registrations</span>
                    </div>
                    <Progress value={63} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Growth Rate</span>
                      <span className="font-semibold text-green-600">+24%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">Department Distribution</CardTitle>
                  <CardDescription>Registration by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { dept: "Computer Science", count: 45, percentage: 35 },
                      { dept: "Electrical Engineering", count: 32, percentage: 25 },
                      { dept: "Mechanical Engineering", count: 28, percentage: 22 },
                      { dept: "Civil Engineering", count: 23, percentage: 18 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.dept}</span>
                          <span className="text-sm text-gray-600">{item.count} students</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
