import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Vote, Trophy, Users, TrendingUp } from "lucide-react"

export default function ResultsPage() {
  // Mock results data
  const liveResults = [
    {
      id: 1,
      eventTitle: "Tech Innovation Workshop",
      question: "Are you interested in attending this workshop?",
      totalVotes: 78,
      options: [
        { label: "Yes, definitely!", votes: 45, percentage: 58 },
        { label: "Maybe, depends on schedule", votes: 23, percentage: 29 },
        { label: "Not interested", votes: 10, percentage: 13 },
      ],
      status: "active",
      endDate: "2025-06-14",
    },
    {
      id: 2,
      eventTitle: "Cultural Fest 2025",
      question: "Which performance are you most excited about?",
      totalVotes: 156,
      options: [
        { label: "Music performances", votes: 67, percentage: 43 },
        { label: "Dance competitions", votes: 54, percentage: 35 },
        { label: "Art exhibitions", votes: 35, percentage: 22 },
      ],
      status: "active",
      endDate: "2025-06-19",
    },
  ]

  const completedResults = [
    {
      id: 3,
      eventTitle: "Photography Workshop",
      question: "What time slot works best for you?",
      totalVotes: 89,
      winner: "Afternoon (2-5 PM)",
      options: [
        { label: "Morning (9-12 PM)", votes: 23, percentage: 26 },
        { label: "Afternoon (2-5 PM)", votes: 45, percentage: 51 },
        { label: "Evening (6-9 PM)", votes: 21, percentage: 23 },
      ],
      completedDate: "2025-06-01",
    },
    {
      id: 4,
      eventTitle: "Startup Pitch Event",
      question: "Which category interests you most?",
      totalVotes: 134,
      winner: "Tech Startups",
      options: [
        { label: "Tech Startups", votes: 67, percentage: 50 },
        { label: "Social Impact", votes: 34, percentage: 25 },
        { label: "E-commerce", votes: 33, percentage: 25 },
      ],
      completedDate: "2025-05-28",
    },
  ]

  const overallStats = [
    { label: "Total Polls", value: 20, icon: Vote },
    { label: "Total Votes", value: 892, icon: Users },
    { label: "Active Polls", value: 12, icon: TrendingUp },
    { label: "Avg. Participation", value: "74%", icon: Trophy },
  ]

  const getBarColor = (index: number) => {
    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
    return colors[index % colors.length]
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Voting Results</h1>
          <p className="text-muted-foreground">Live and completed voting results from community polls</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {overallStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Results */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2" />
            Live Results
          </h2>

          <div className="space-y-6">
            {liveResults.map((result) => (
              <Card key={result.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Live
                    </Badge>
                    <div className="text-sm text-muted-foreground">Ends: {result.endDate}</div>
                  </div>
                  <CardTitle className="text-xl">{result.eventTitle}</CardTitle>
                  <CardDescription>{result.question}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Bar Chart */}
                    <div>
                      <h4 className="font-semibold mb-4">Vote Distribution</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={result.options} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="label" type="category" width={100} />
                          <Tooltip />
                          <Bar dataKey="votes" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Detailed Results */}
                    <div>
                      <h4 className="font-semibold mb-4">Results ({result.totalVotes} total votes)</h4>
                      <div className="space-y-4">
                        {result.options.map((option, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{option.label}</span>
                              <span className="text-sm text-muted-foreground">
                                {option.votes} votes ({option.percentage}%)
                              </span>
                            </div>
                            <Progress value={option.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Results */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Trophy className="h-6 w-6 mr-2" />
            Completed Polls
          </h2>

          <div className="space-y-6">
            {completedResults.map((result) => (
              <Card key={result.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">Completed</Badge>
                    <div className="text-sm text-muted-foreground">Completed: {result.completedDate}</div>
                  </div>
                  <CardTitle className="text-xl">{result.eventTitle}</CardTitle>
                  <CardDescription>{result.question}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Pie Chart */}
                    <div>
                      <h4 className="font-semibold mb-4">Vote Distribution</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={result.options}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="votes"
                            label={({ label, percentage }) => `${label}: ${percentage}%`}
                          >
                            {result.options.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Winner and Results */}
                    <div>
                      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Trophy className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-semibold text-green-800">Winner</span>
                        </div>
                        <p className="text-lg font-bold text-green-800">{result.winner}</p>
                      </div>

                      <h4 className="font-semibold mb-4">Final Results ({result.totalVotes} total votes)</h4>
                      <div className="space-y-3">
                        {result.options.map((option, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm font-medium">{option.label}</span>
                            <div className="text-right">
                              <div className="text-sm font-semibold">{option.votes} votes</div>
                              <div className="text-xs text-muted-foreground">{option.percentage}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* No Results Message */}
        {liveResults.length === 0 && completedResults.length === 0 && (
          <div className="text-center py-12">
            <Vote className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No voting results available</h3>
            <p className="text-muted-foreground">
              Results will appear here once voting polls are created and completed.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
