"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { CalendarIcon, Sparkles, X, Plus, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

// Sample companies for selection
const companies = [
  { id: "1", name: "Acme Corporation" },
  { id: "2", name: "Globex Corp" },
  { id: "3", name: "Stark Industries" },
  { id: "4", name: "Umbrella Corp" },
  { id: "5", name: "Wayne Enterprises" },
]

// Sample users for participants selection
const users = [
  {
    id: "u1",
    name: "John Smith",
    email: "john.smith@acmecorp.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "u2",
    name: "Sarah Johnson",
    email: "sarah.johnson@acmecorp.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "u3",
    name: "Michael Brown",
    email: "michael.brown@acmecorp.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "u4",
    name: "Robert Wilson",
    email: "robert.wilson@globexcorp.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "u5",
    name: "Anthony Stark",
    email: "tony@starkindustries.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "u6",
    name: "Virginia Potts",
    email: "pepper@starkindustries.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function ActivityForm() {
  const [activityType, setActivityType] = useState("meeting")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [company, setCompany] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("09:00")
  const [duration, setDuration] = useState("30")
  const [outcome, setOutcome] = useState("")
  const [participants, setParticipants] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleAddParticipant = (userId: string) => {
    if (!participants.includes(userId)) {
      setParticipants([...participants, userId])
    }
  }

  const handleRemoveParticipant = (userId: string) => {
    setParticipants(participants.filter((id) => id !== userId))
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedParticipantsData = users.filter((user) => participants.includes(user.id))

  const handleGenerateWithAI = () => {
    // In a real app, this would call an AI service
    if (activityType === "meeting") {
      setDescription(
        "Discuss product roadmap and implementation timeline. Review technical requirements and address any concerns.",
      )
    } else if (activityType === "call") {
      setDescription("Follow up on previous discussions and address any questions about our proposal.")
    } else if (activityType === "email") {
      setDescription(
        "Send detailed information about our services, including pricing options and implementation timeline.",
      )
    } else if (activityType === "task") {
      setDescription("Prepare custom documentation and implementation guides for the client's technical team.")
    }
  }

  const handleSubmit = () => {
    if (!title || !company) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new activity object
    const newActivity = {
      id: Math.random().toString(36).substring(2, 9),
      type: activityType,
      title,
      date: date ? format(date, "yyyy-MM-dd") : new Date().toISOString().split("T")[0],
      time,
      duration: activityType === "meeting" || activityType === "call" ? `${duration} min` : undefined,
      description,
      outcome,
      company: companies.find((c) => c.id === company)?.name || "",
      companyId: company,
      participants: selectedParticipantsData,
    }

    // In a real app, you would save this to your database
    toast({
      title: "Activity Created",
      description: `${activityType.charAt(0).toUpperCase() + activityType.slice(1)} "${title}" has been created.`,
    })

    // Reset form
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setCompany("")
    setDate(new Date())
    setTime("09:00")
    setDuration("30")
    setOutcome("")
    setParticipants([])
    setSearchQuery("")
  }

  return (
    <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
      <CardHeader>
        <CardTitle className="text-[#f8fafc]">Create New Activity</CardTitle>
        <CardDescription className="text-[#94a3b8]">Record a new customer interaction</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="activity-type" className="text-[#f8fafc]">
            Activity Type
          </Label>
          <Select value={activityType} onValueChange={setActivityType}>
            <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
              <SelectValue placeholder="Select activity type" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e293b] border-[#334155]">
              <SelectItem value="meeting" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Meeting
              </SelectItem>
              <SelectItem value="call" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Call
              </SelectItem>
              <SelectItem value="email" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Email
              </SelectItem>
              <SelectItem value="task" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Task
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title" className="text-[#f8fafc]">
            Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Enter activity title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-[#f8fafc]">
            Company <span className="text-red-500">*</span>
          </Label>
          <Select value={company} onValueChange={setCompany}>
            <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e293b] border-[#334155]">
              {companies.map((company) => (
                <SelectItem
                  key={company.id}
                  value={company.id}
                  className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                >
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-[#f8fafc]">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-[#334155] bg-[#0f172a] text-[#f8fafc]",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#1e293b] border-[#334155]">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="bg-[#1e293b] text-[#f8fafc]"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-[#f8fafc]">
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
            />
          </div>
        </div>

        {(activityType === "meeting" || activityType === "call") && (
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-[#f8fafc]">
              Duration (minutes)
            </Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-[#1e293b] border-[#334155]">
                <SelectItem value="15" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                  15 minutes
                </SelectItem>
                <SelectItem value="30" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                  30 minutes
                </SelectItem>
                <SelectItem value="45" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                  45 minutes
                </SelectItem>
                <SelectItem value="60" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                  1 hour
                </SelectItem>
                <SelectItem value="90" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                  1.5 hours
                </SelectItem>
                <SelectItem value="120" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                  2 hours
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description" className="text-[#f8fafc]">
              Description
            </Label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateWithAI}
              className="border-[#334155] text-[#f8fafc]"
            >
              <Sparkles size={14} className="mr-2 text-[#6366f1]" />
              Generate with AI
            </Button>
          </div>
          <Textarea
            id="description"
            placeholder="Enter activity description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-[#0f172a] border-[#334155] text-[#f8fafc] min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="outcome" className="text-[#f8fafc]">
            Outcome
          </Label>
          <Select value={outcome} onValueChange={setOutcome}>
            <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
              <SelectValue placeholder="Select outcome" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e293b] border-[#334155]">
              <SelectItem value="completed" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Completed
              </SelectItem>
              <SelectItem value="follow-up" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Follow-up Required
              </SelectItem>
              <SelectItem value="positive" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Positive Feedback
              </SelectItem>
              <SelectItem value="negative" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Negative Feedback
              </SelectItem>
              <SelectItem value="awaiting" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Awaiting Response
              </SelectItem>
              <SelectItem value="cancelled" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Cancelled
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[#f8fafc]">Participants</Label>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedParticipantsData.map((user) => (
                <Badge
                  key={user.id}
                  className="bg-[#0f172a] text-[#f8fafc] hover:bg-[#0f172a]/80 flex items-center gap-2 pl-1 pr-2 py-1"
                >
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#6366f1] text-[0.5rem]">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 text-[#94a3b8] hover:text-[#f8fafc]"
                    onClick={() => handleRemoveParticipant(user.id)}
                  >
                    <X size={12} />
                  </Button>
                </Badge>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#94a3b8]" />
              <Input
                placeholder="Search participants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-[#0f172a] border-[#334155] text-[#f8fafc]"
              />
            </div>

            <div className="bg-[#0f172a] border border-[#334155] rounded-md max-h-[150px] overflow-y-auto">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 hover:bg-[#1e293b] cursor-pointer"
                    onClick={() => handleAddParticipant(user.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-[#6366f1] text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-[#f8fafc]">{user.name}</p>
                        <p className="text-xs text-[#94a3b8]">{user.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-[#94a3b8]"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddParticipant(user.id)
                      }}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="p-2 text-center text-[#94a3b8]">No users found</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t border-[#334155] pt-6">
        <Button variant="outline" className="border-[#334155] text-[#f8fafc]" onClick={resetForm}>
          Cancel
        </Button>
        <Button className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white" onClick={handleSubmit}>
          Create Activity
        </Button>
      </CardFooter>
    </Card>
  )
}
