"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Vote, Calendar, MapPin, Users, CheckCircle, Clock } from "lucide-react"

export default function VotingPage() {
  const [votes, setVotes] = useState<Record<number, string>>({})
  const { toast } = useToast()

  // Mock voting data
  const activePolls = [
    {
      id: 1,
      eventId: 1,
      eventTitle: "Tech Innovation Workshop",
      eventDate: "2025-06-15",
      eventVenue: "Computer Lab A",
      question: "Are you interested in attending this workshop?",
      options: [
        { id: "yes", label: "Yes, definitely!", votes: 45 },
        { id: "maybe", label: "Maybe, depends on schedule", votes: 23 },
        { id: "no", label: "Not interested", votes: 10 },
      ],
      totalVotes: 78,
      userVoted: false,
      endDate: "2025-06-14",
    },
    {
      id: 2,
      eventId: 2,
      eventTitle: "Cultural Fest 2025",
      eventDate: "2025-06-20",
      eventVenue: "Main Auditorium",
      question: "Which performance are you most excited about?",
      options: [
        { id: "music", label: "Music performances", votes: 67 },
        { id: "dance", label: "Dance competitions", votes: 54 },
        { id: "art", label: "Art exhibitions", votes: 35 },
      ],
      totalVotes: 156,
      userVoted: true,
      userVote: "music",
      endDate: "2025-06-19",
    },
    {
      id: 3,
      eventId: 4,
      eventTitle: "Coding Competition",
      eventDate: "2025-06-30",
      eventVenue: "Computer Lab B",
      question: "Should we include team-based challenges?",
      options: [
        { id: "individual", label: "Individual challenges only", votes: 12 },
        { id: "team", label: "Include team challenges", votes: 8 },
        { id: "both", label: "Both individual and team", votes: 3 },
      ],
      totalVotes: 23,
      userVoted: false,
      endDate: "2025-06-29",
    },
  ]

  const completedPolls = [
    {
      id: 4,
      eventTitle: "Photography Workshop",
      question: "What time slot works best for you?",
      winningOption: "Afternoon (2-5 PM)",
      totalVotes: 89,
      completedDate: "2025-06-01",
    },
    {
      id: 5,
      eventTitle: "Startup Pitch Event",
      question: "Which category interests you most?",
      winningOption: "Tech Startups",
      totalVotes: 134,
      completedDate: "2025-05-28",
    },
  ]

  const handleVote = (pollId: number, optionId: string) => {
    setVotes((prev) => ({ ...prev, [pollId]: optionId }))
  }

  const submitVote = (pollId: number) => {
    const selectedOption = votes[pollId]
    if (!selectedOption) {
      toast({
        title: "Please select an option",
        description: "You must choose an option before voting.",
        variant: "destructive",
      })
      return
    }

    // In real app, this would submit to API
    toast({
      title: "Vote submitted successfully!",
      description: "Thank you for participating in the poll.",
    })

    // Clear the vote from local state
    setVotes((prev) => {
      const newVotes = { ...prev }
      delete newVotes[pollId]
      return newVotes
    })
  }

  const getVotePercentage = (optionVotes: number, totalVotes: number) => {
    return totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0
  }

  const isVotingEnded = (endDate: string) => {
    return new Date(endDate) < new Date()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Community Voting</h1>
          <p className="text-muted-foreground">Participate in polls and help shape upcoming events</p>
        </div>

        {/* Active Polls */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Vote className="h-6 w-6 mr-2" />
            Active Polls
          </h2>

          <div className="space-y-6">
            {activePolls.map((poll) => (
              <Card key={poll.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">Event Poll</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      Ends: {poll.endDate}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{poll.eventTitle}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {poll.eventDate}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {poll.eventVenue}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="font-semibold mb-4">{poll.question}</h3>

                    {poll.userVoted ? (
                      // Show results if user has voted
                      <div className="space-y-3">
                        {poll.options.map((option) => (
                          <div key={option.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">{option.label}</span>
                                {poll.userVote === option.id && <CheckCircle className="h-4 w-4 text-green-600" />}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {option.votes} votes ({getVotePercentage(option.votes, poll.totalVotes)}%)
                              </span>
                            </div>
                            <Progress value={getVotePercentage(option.votes, poll.totalVotes)} className="h-2" />
                          </div>
                        ))}
                        <div className="mt-4 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 inline mr-1" />
                          Total votes: {poll.totalVotes}
                        </div>
                      </div>
                    ) : (
                      // Show voting interface if user hasn't voted
                      <div className="space-y-4">
                        {isVotingEnded(poll.endDate) ? (
                          <div className="text-center py-4 text-muted-foreground">
                            <Clock className="h-8 w-8 mx-auto mb-2" />
                            <p>Voting has ended for this poll</p>
                          </div>
                        ) : (
                          <>
                            <RadioGroup
                              value={votes[poll.id] || ""}
                              onValueChange={(value) => handleVote(poll.id, value)}
                            >
                              {poll.options.map((option) => (
                                <div key={option.id} className="flex items-center space-x-2">
                                  <RadioGroupItem value={option.id} id={`${poll.id}-${option.id}`} />
                                  <Label htmlFor={`${poll.id}-${option.id}`} className="flex-1 cursor-pointer">
                                    {option.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                            <Button onClick={() => submitVote(poll.id)} disabled={!votes[poll.id]} className="w-full">
                              <Vote className="h-4 w-4 mr-2" />
                              Submit Vote
                            </Button>
                          </>
                        )}
                        <div className="text-sm text-muted-foreground">
                          <Users className="h-4 w-4 inline mr-1" />
                          {poll.totalVotes} people have voted so far
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {activePolls.length === 0 && (
            <div className="text-center py-12">
              <Vote className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No active polls</h3>
              <p className="text-muted-foreground">Check back later for new voting opportunities.</p>
            </div>
          )}
        </div>

        {/* Completed Polls */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <CheckCircle className="h-6 w-6 mr-2" />
            Recent Results
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {completedPolls.map((poll) => (
              <Card key={poll.id}>
                <CardHeader>
                  <Badge variant="outline" className="w-fit">
                    Completed
                  </Badge>
                  <CardTitle className="text-lg">{poll.eventTitle}</CardTitle>
                  <CardDescription>{poll.question}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-green-600">Winner:</span>
                      <span className="font-semibold">{poll.winningOption}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Total votes:</span>
                      <span>{poll.totalVotes}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Completed:</span>
                      <span>{poll.completedDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
