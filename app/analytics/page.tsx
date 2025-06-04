"use client"

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Calendar, Users, Vote, TrendingUp, CheckCircle, XCircle, Clock } from "lucide-react"

export default function AnalyticsPage() {
  // Mock analytics data
  const overviewStats = [
    { label: "Total Events", value: 24, change: "+12%", icon: Calendar, color: "text-blue-600" },
    { label: "Total Participants", value: 1247, change: "+23%", icon: Users, color: "text-green-600" },
    { label: "Total Votes Cast", value: 892, change: "+18%", icon: Vote, color: "text-purple-600" },
    { label: "Approval Rate", value: "87%", change: "+5%", icon: TrendingUp, color: "text-orange-600" },
  ]

  const eventStatusData = [
    { name: "Approved", value: 18, color: "#22c55e" },
    { name: "Pending", value: 3, color: "#eab308" },
    { name: "Rejected", value: 3, color: "#ef4444" },
  ]

  const categoryData = [
    { category: "Technical", events: 8, participants: 320 },
    { category: "Cultural", events: 6, participants: 450 },
    { category: "Workshop", events: 4, participants: 180 },
    { category: "Seminar", events: 3, participants: 150 },
    { category: "Sports", events: 2, participants: 97 },
    { category: "Social", events: 1, participants: 50 },
  ]

  const monthlyTrends = [
    { month: "Jan", events: 3, participants: 120, votes: 89 },
    { month: "Feb", events: 4, participants: 180, votes: 134 },
    { month: "Mar", events: 5, participants: 220, votes: 167 },
    { month: "Apr", events: 6, participants: 290, votes: 201 },
    { month: "May", events: 4, participants: 250, votes: 178 },
    { month: "Jun", events: 2, participants: 177, votes: 123 },
  ]

  const topEvents = [
    { name: "Cultural Fest 2025", participants: 156, votes: 234, rating: 4.8 },
    { name: "Tech Innovation Workshop", participants: 78, votes: 145, rating: 4.6 },
    { name: "Career Guidance Seminar", participants: 89, votes: 112, rating: 4.4 },
    { name: "Photography Workshop", participants: 45, votes: 89, rating: 4.7 },
    { name: "Coding Competition", participants: 67, votes: 98, rating: 4.5 },
  ]

  const votingInsights = [
    { question: "Event timing preference", responses: 234, engagement: 89 },
    { question: "Venue satisfaction", responses: 189, engagement: 76 },
    { question: "Content quality rating", responses: 156, engagement: 82 },
    { question: "Future event suggestions", responses: 145, engagement: 71 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights into event management and community engagement</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="voting">Voting</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Event Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Status Distribution</CardTitle>
                  <CardDescription>Current status of all submitted events</CardDescription>
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

              {/* Category Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Events by Category</CardTitle>
                  <CardDescription>Number of events and participants by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="events" fill="#3b82f6" name="Events" />
                      <Bar dataKey="participants" fill="#10b981" name="Participants" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <div className="space-y-6">
              {/* Top Performing Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Events</CardTitle>
                  <CardDescription>Events ranked by participation and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold">{event.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">★</span>
                            <span className="font-semibold">{event.rating}</span>
                          </div>
                          <Badge variant="secondary">Top Rated</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Event Approval Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Approved Events</p>
                        <p className="text-2xl font-bold text-green-600">18</p>
                        <p className="text-sm text-muted-foreground">75% of total</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                        <p className="text-2xl font-bold text-yellow-600">3</p>
                        <p className="text-sm text-muted-foreground">12.5% of total</p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Rejected Events</p>
                        <p className="text-2xl font-bold text-red-600">3</p>
                        <p className="text-sm text-muted-foreground">12.5% of total</p>
                      </div>
                      <XCircle className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="voting" className="mt-6">
            <div className="space-y-6">
              {/* Voting Engagement */}
              <Card>
                <CardHeader>
                  <CardTitle>Voting Engagement Insights</CardTitle>
                  <CardDescription>Community participation in event polls and feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {votingInsights.map((insight, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{insight.question}</span>
                          <span className="text-sm text-muted-foreground">{insight.responses} responses</span>
                        </div>
                        <Progress value={insight.engagement} className="h-2" />
                        <div className="text-sm text-muted-foreground">{insight.engagement}% engagement rate</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Voting Statistics */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Votes Cast</CardTitle>
                    <CardDescription>Community voting activity over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-600 mb-2">892</div>
                      <p className="text-muted-foreground">Total votes across all polls</p>
                      <div className="mt-4 flex justify-center space-x-4 text-sm">
                        <div>
                          <span className="font-semibold">12</span>
                          <span className="text-muted-foreground ml-1">Active polls</span>
                        </div>
                        <div>
                          <span className="font-semibold">8</span>
                          <span className="text-muted-foreground ml-1">Completed polls</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Average Participation</CardTitle>
                    <CardDescription>Voting participation per event</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">74%</div>
                      <p className="text-muted-foreground">Average participation rate</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Highest participation:</span>
                          <span className="font-semibold">89%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Lowest participation:</span>
                          <span className="font-semibold">45%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <div className="space-y-6">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Activity Trends</CardTitle>
                  <CardDescription>Events, participants, and votes over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="events" stroke="#3b82f6" strokeWidth={2} name="Events" />
                      <Line
                        type="monotone"
                        dataKey="participants"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Participants"
                      />
                      <Line type="monotone" dataKey="votes" stroke="#8b5cf6" strokeWidth={2} name="Votes" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Growth Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Growth</CardTitle>
                    <CardDescription>Month-over-month change</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">+12%</div>
                      <p className="text-muted-foreground">More events this month</p>
                      <div className="mt-2 text-sm text-muted-foreground">Compared to last month</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Participation Growth</CardTitle>
                    <CardDescription>Student engagement trend</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">+23%</div>
                      <p className="text-muted-foreground">More participants</p>
                      <div className="mt-2 text-sm text-muted-foreground">Highest growth this year</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Voting Engagement</CardTitle>
                    <CardDescription>Community feedback trend</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">+18%</div>
                      <p className="text-muted-foreground">More votes cast</p>
                      <div className="mt-2 text-sm text-muted-foreground">Increasing community involvement</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
