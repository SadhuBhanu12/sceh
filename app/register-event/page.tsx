"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, Upload, Send } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function RegisterEventPage() {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    category: "",
    organizer: "",
    time: "",
    expectedAttendees: "",
    requirements: "",
    enableVoting: false,
    votingQuestion: "",
  })
  const { toast } = useToast()

  const categories = ["Workshop", "Seminar", "Cultural", "Sports", "Technical", "Social", "Academic", "Other"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.title || !formData.description || !date || !formData.venue) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // In real app, this would submit to API
    toast({
      title: "Event Submitted Successfully!",
      description: "Your event proposal has been sent for approval. You'll be notified once it's reviewed.",
    })

    // Reset form
    setFormData({
      title: "",
      description: "",
      venue: "",
      category: "",
      organizer: "",
      time: "",
      expectedAttendees: "",
      requirements: "",
      enableVoting: false,
      votingQuestion: "",
    })
    setDate(undefined)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Register New Event</h1>
            <p className="text-muted-foreground">Submit your event proposal for approval by the administration</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>
                Fill in the information about your event. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter event title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your event in detail"
                    rows={4}
                    required
                  />
                </div>

                {/* Date, Time, and Venue */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Event Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue *</Label>
                    <Input
                      id="venue"
                      value={formData.venue}
                      onChange={(e) => handleInputChange("venue", e.target.value)}
                      placeholder="Event location"
                      required
                    />
                  </div>
                </div>

                {/* Organizer and Attendees */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizer">Organizing Club/Department</Label>
                    <Input
                      id="organizer"
                      value={formData.organizer}
                      onChange={(e) => handleInputChange("organizer", e.target.value)}
                      placeholder="e.g., Tech Club, CSE Department"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expectedAttendees">Expected Attendees</Label>
                    <Input
                      id="expectedAttendees"
                      type="number"
                      value={formData.expectedAttendees}
                      onChange={(e) => handleInputChange("expectedAttendees", e.target.value)}
                      placeholder="Approximate number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Special Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => handleInputChange("requirements", e.target.value)}
                    placeholder="Any special equipment, setup, or requirements needed"
                    rows={3}
                  />
                </div>

                {/* Voting Section */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="enableVoting"
                      checked={formData.enableVoting}
                      onCheckedChange={(checked) => handleInputChange("enableVoting", checked as boolean)}
                    />
                    <Label htmlFor="enableVoting" className="font-medium">
                      Enable Community Voting
                    </Label>
                  </div>

                  {formData.enableVoting && (
                    <div className="space-y-2">
                      <Label htmlFor="votingQuestion">Voting Question</Label>
                      <Input
                        id="votingQuestion"
                        value={formData.votingQuestion}
                        onChange={(e) => handleInputChange("votingQuestion", e.target.value)}
                        placeholder="e.g., Would you be interested in attending this event?"
                      />
                    </div>
                  )}
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label>Attachments (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload event poster, agenda, or other relevant files
                    </p>
                    <Button variant="outline" size="sm" type="button">
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    <Send className="mr-2 h-4 w-4" />
                    Submit for Approval
                  </Button>
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
