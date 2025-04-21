"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Phone,
  Video,
  Mail,
  CheckSquare,
  Clock,
  MoreHorizontal,
  Calendar,
  Filter,
  ChevronDown,
  Plus,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Sample activities data
const activities = [
  {
    id: "a1",
    type: "meeting",
    title: "Product Demo with Acme Corp",
    date: "2023-11-14",
    time: "10:00 AM",
    duration: "45 min",
    description: "Demonstrated new features to the client's technical team.",
    outcome: "Positive feedback, follow-up scheduled",
    company: "Acme Corporation",
    companyId: "1",
    participants: [
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
    ],
    aiSummary:
      "Client showed strong interest in the analytics dashboard and API integration features. They requested pricing for enterprise tier.",
  },
  {
    id: "a2",
    type: "call",
    title: "Follow-up Call with Globex Corp",
    date: "2023-11-10",
    time: "2:30 PM",
    duration: "15 min",
    description: "Discussed implementation timeline and next steps.",
    outcome: "Scheduled technical assessment",
    company: "Globex Corp",
    companyId: "2",
    participants: [
      {
        id: "u4",
        name: "Robert Wilson",
        email: "robert.wilson@globexcorp.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    aiSummary:
      "Client confirmed budget approval for Q1 implementation. Technical team will be available starting January 15th.",
  },
  {
    id: "a3",
    type: "email",
    title: "Proposal Sent to Stark Industries",
    date: "2023-11-08",
    time: "9:15 AM",
    description: "Sent detailed proposal with custom implementation plan.",
    outcome: "Awaiting response",
    company: "Stark Industries",
    companyId: "3",
    participants: [
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
    ],
    aiSummary:
      "Proposal includes custom security features and dedicated support team as requested. Pricing reflects 15% enterprise discount.",
  },
  {
    id: "a4",
    type: "task",
    title: "Prepare Technical Documentation for Umbrella Corp",
    date: "2023-11-05",
    time: "11:00 AM",
    description: "Created detailed API documentation and integration guides.",
    outcome: "Completed",
    company: "Umbrella Corp",
    companyId: "4",
    participants: [],
    aiSummary:
      "Documentation covers all requested integration points and includes sample code for their development team.",
  },
  {
    id: "a5",
    type: "meeting",
    title: "Quarterly Business Review with Wayne Enterprises",
    date: "2023-10-28",
    time: "1:00 PM",
    duration: "60 min",
    description: "Reviewed performance metrics and discussed renewal options.",
    outcome: "Renewal at risk",
    company: "Wayne Enterprises",
    companyId: "5",
    participants: [
      {
        id: "u7",
        name: "Bruce Wayne",
        email: "bruce@wayneenterprises.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: "u8",
        name: "Lucius Fox",
        email: "lucius@wayneenterprises.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    aiSummary:
      "Client expressed concerns about ROI. Usage metrics show 30% decline in last quarter. Recommend scheduling technical review to address adoption issues.",
  },
]

export function ActivityTimeline() {
  const [filter, setFilter] = useState("all")

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <Video className="text-[#6366f1]" />
      case "call":
        return <Phone className="text-[#10b981]" />
      case "email":
        return <Mail className="text-[#f59e0b]" />
      case "task":
        return <CheckSquare className="text-[#ef4444]" />
      default:
        return <Calendar className="text-[#94a3b8]" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "border-[#6366f1]"
      case "call":
        return "border-[#10b981]"
      case "email":
        return "border-[#f59e0b]"
      case "task":
        return "border-[#ef4444]"
      default:
        return "border-[#94a3b8]"
    }
  }

  const getOutcomeColor = (outcome: string) => {
    if (outcome.toLowerCase().includes("positive") || outcome.toLowerCase().includes("completed")) {
      return "bg-[#10b981] hover:bg-[#10b981]/80"
    } else if (outcome.toLowerCase().includes("risk") || outcome.toLowerCase().includes("negative")) {
      return "bg-[#ef4444] hover:bg-[#ef4444]/80"
    } else if (outcome.toLowerCase().includes("await")) {
      return "bg-[#f59e0b] hover:bg-[#f59e0b]/80"
    } else {
      return "bg-[#94a3b8] hover:bg-[#94a3b8]/80"
    }
  }

  const filteredActivities = filter === "all" ? activities : activities.filter((activity) => activity.type === filter)

  return (
    <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-[#f8fafc]">Activity Timeline</CardTitle>
            <CardDescription className="text-[#94a3b8]">Track all customer interactions</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-[#334155] text-[#f8fafc] flex items-center gap-2">
                  <Filter size={16} />
                  {filter === "all" ? "All Activities" : filter.charAt(0).toUpperCase() + filter.slice(1) + "s"}
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1e293b] border-[#334155]">
                <DropdownMenuLabel className="text-[#f8fafc]">Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#334155]" />
                <DropdownMenuItem
                  className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                  onClick={() => setFilter("all")}
                >
                  All Activities
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                  onClick={() => setFilter("meeting")}
                >
                  Meetings
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                  onClick={() => setFilter("call")}
                >
                  Calls
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                  onClick={() => setFilter("email")}
                >
                  Emails
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                  onClick={() => setFilter("task")}
                >
                  Tasks
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white"
              onClick={() => {
                // This will trigger a navigation to the activities page with the create tab active
                const activitiesLink = document.querySelector('a[href="/activities"]')
                if (activitiesLink) {
                  ;(activitiesLink as HTMLElement).click()
                  // Set a timeout to allow the page to load before clicking the tab
                  setTimeout(() => {
                    const createTab = document.querySelector('[data-state="inactive"][value="create"]')
                    if (createTab) {
                      ;(createTab as HTMLElement).click()
                    }
                  }, 100)
                } else {
                  // Fallback using window.location if the link isn't found
                  window.location.href = "/activities?tab=create"
                }
                toast({
                  title: "Create Activity",
                  description: "Navigating to create activity form.",
                })
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Activity
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[#334155]"></div>
          <div className="space-y-8 relative pl-14">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="relative">
                <div
                  className={`absolute -left-14 top-0 h-12 w-12 rounded-full bg-[#0f172a] flex items-center justify-center border-2 ${getActivityColor(
                    activity.type,
                  )}`}
                >
                  {getActivityIcon(activity.type)}
                </div>
                <div className="bg-[#0f172a] rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-[#f8fafc]">{activity.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                        <span>{activity.company}</span>
                        <span>•</span>
                        <span>
                          {activity.date} {activity.time}
                        </span>
                        {activity.duration && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {activity.duration}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {activity.outcome && (
                        <Badge className={getOutcomeColor(activity.outcome)}>{activity.outcome}</Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-[#94a3b8]">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#1e293b] border-[#334155]">
                          <DropdownMenuItem className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-[#334155]" />
                          <DropdownMenuItem className="text-red-500 focus:bg-[#334155] focus:text-red-500">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {activity.description && <p className="text-sm text-[#f8fafc] mb-3">{activity.description}</p>}

                  {activity.participants && activity.participants.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-xs font-medium text-[#94a3b8] mb-2">Participants</h4>
                      <div className="flex flex-wrap gap-2">
                        {activity.participants.map((participant) => (
                          <div
                            key={participant.id}
                            className="flex items-center gap-2 bg-[#1e293b] px-2 py-1 rounded-md"
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-[#6366f1] text-xs">
                                {participant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-[#f8fafc]">{participant.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activity.aiSummary && (
                    <div className="bg-[#1e293b] p-3 rounded-md border border-[#334155]">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-5 w-5 rounded-full bg-[#6366f1] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">AI</span>
                        </div>
                        <h4 className="text-xs font-medium text-[#94a3b8]">AI Summary</h4>
                      </div>
                      <p className="text-sm text-[#f8fafc]">{activity.aiSummary}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-[#334155] pt-6">
        <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
          Load More Activities
        </Button>
      </CardFooter>
    </Card>
  )
}
