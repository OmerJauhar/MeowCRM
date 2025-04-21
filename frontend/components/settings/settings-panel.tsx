"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import {
  User,
  Moon,
  Sun,
  Monitor,
  Upload,
  Users,
  Key,
  Lock,
  Globe,
  MoreHorizontal,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  AlertCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample team members data
const initialTeamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2023-11-14T10:45:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2023-11-14T09:30:00Z",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "User",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2023-11-13T16:20:00Z",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "User",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2023-11-10T11:15:00Z",
  },
]

// Sample integrations data
const initialIntegrations = [
  {
    id: "1",
    name: "Google Workspace",
    description: "Connect your Google account for calendar and email integration",
    connected: true,
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Slack",
    description: "Receive notifications and updates in your Slack channels",
    connected: true,
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Zoom",
    description: "Schedule and join meetings directly from the CRM",
    connected: false,
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Microsoft 365",
    description: "Sync with Outlook calendar and email",
    connected: false,
    icon: "/placeholder.svg?height=40&width=40",
  },
]

// Replace the SettingsPanel function with this updated version
export function SettingsPanel() {
  // Use the next-themes hook for theme management
  const { theme: currentTheme, setTheme } = useTheme()
  const [theme, setLocalTheme] = useState(currentTheme || "dark")

  // User profile states
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [title, setTitle] = useState("Product Manager")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const [bio, setBio] = useState("Product Manager with 5+ years of experience in SaaS and enterprise software.")
  const [avatar, setAvatar] = useState("/placeholder.svg?height=96&width=96")

  // Notification states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [defaultView, setDefaultView] = useState("dashboard")

  // Team management states
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false)
  const [newMemberName, setNewMemberName] = useState("")
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newMemberRole, setNewMemberRole] = useState("User")

  // Integration states
  const [integrations, setIntegrations] = useState(initialIntegrations)

  // Security states
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [productionApiKey, setProductionApiKey] = useState("sk_prod_2023abcdefghijklmnopqrstuvwxyz")
  const [developmentApiKey, setDevelopmentApiKey] = useState("sk_dev_2023abcdefghijklmnopqrstuvwxyz")

  // File input reference for avatar upload
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update the actual theme when the local theme state changes
  useEffect(() => {
    if (theme) {
      setTheme(theme)
    }
  }, [theme, setTheme])

  // Handle avatar change
  const handleAvatarChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll use a local URL
      const url = URL.createObjectURL(file)
      setAvatar(url)
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      })
    }
  }

  // Handle theme change
  const handleThemeChange = (newTheme: string) => {
    setLocalTheme(newTheme)
    toast({
      title: "Theme updated",
      description: `Theme changed to ${newTheme}.`,
    })
  }

  // Handle profile save
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  // Handle password update
  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      })
      return
    }

    if (!currentPassword) {
      toast({
        title: "Current password required",
        description: "Please enter your current password.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would verify the current password and update the new one
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")

    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    })
  }

  // Handle team member role change
  const handleRoleChange = (memberId: string, newRole: string) => {
    setTeamMembers(teamMembers.map((member) => (member.id === memberId ? { ...member, role: newRole } : member)))

    toast({
      title: "Role updated",
      description: "Team member role has been updated.",
    })
  }

  // Handle adding a new team member
  const handleAddMember = () => {
    if (!newMemberName || !newMemberEmail) {
      toast({
        title: "Missing information",
        description: "Please provide both name and email for the new team member.",
        variant: "destructive",
      })
      return
    }

    const newMember = {
      id: `${teamMembers.length + 1}`,
      name: newMemberName,
      email: newMemberEmail,
      role: newMemberRole,
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: new Date().toISOString(),
    }

    setTeamMembers([...teamMembers, newMember])
    setShowAddMemberDialog(false)
    setNewMemberName("")
    setNewMemberEmail("")
    setNewMemberRole("User")

    toast({
      title: "Team member added",
      description: `${newMemberName} has been added to your team.`,
    })
  }

  // Handle removing a team member
  const handleRemoveMember = (memberId: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== memberId))

    toast({
      title: "Team member removed",
      description: "Team member has been removed from your team.",
    })
  }

  // Handle integration connection/disconnection
  const handleToggleIntegration = (integrationId: string) => {
    setIntegrations(
      integrations.map((integration) =>
        integration.id === integrationId ? { ...integration, connected: !integration.connected } : integration,
      ),
    )

    const integration = integrations.find((i) => i.id === integrationId)
    if (integration) {
      toast({
        title: integration.connected ? "Integration disconnected" : "Integration connected",
        description: `${integration.name} has been ${integration.connected ? "disconnected" : "connected"} successfully.`,
      })
    }
  }

  // Handle API key regeneration
  const handleRegenerateApiKey = (keyType: "production" | "development") => {
    // Generate a random API key
    const newKey = `sk_${keyType === "production" ? "prod" : "dev"}_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`

    if (keyType === "production") {
      setProductionApiKey(newKey)
    } else {
      setDevelopmentApiKey(newKey)
    }

    toast({
      title: "API key regenerated",
      description: `Your ${keyType} API key has been regenerated.`,
    })
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = diffInMs / (1000 * 60 * 60)
    const diffInDays = diffInHours / 24

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} days ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
      <CardHeader>
        <CardTitle className="text-[#f8fafc]">Settings</CardTitle>
        <CardDescription className="text-[#94a3b8]">Manage your account preferences and team settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preferences" className="w-full">
          <TabsList className="bg-[#0f172a] border border-[#334155] w-full justify-start mb-6">
            <TabsTrigger
              value="preferences"
              className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-[#f8fafc] flex items-center gap-2"
            >
              <User size={16} />
              Preferences
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-[#f8fafc] flex items-center gap-2"
            >
              <Users size={16} />
              Team
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-[#f8fafc] flex items-center gap-2"
            >
              <Globe size={16} />
              Integrations
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-[#f8fafc] flex items-center gap-2"
            >
              <Lock size={16} />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#f8fafc]">User Profile</h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#6366f1] text-xl">
                      {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button variant="outline" className="border-[#334155] text-[#f8fafc]" onClick={handleAvatarChange}>
                    <Upload className="mr-2 h-4 w-4" />
                    Change Avatar
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#f8fafc]">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#f8fafc]">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-[#f8fafc]">
                        Job Title
                      </Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#f8fafc]">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-[#f8fafc]">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="bg-[#0f172a] border-[#334155] text-[#f8fafc] min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-[#334155]" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#f8fafc]">Appearance</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#f8fafc]">Theme</Label>
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center justify-center h-10 w-10 rounded-md cursor-pointer ${
                        theme === "light"
                          ? "bg-[#f8fafc] text-[#0f172a] ring-2 ring-[#6366f1]"
                          : "bg-[#f8fafc] text-[#0f172a]"
                      }`}
                      onClick={() => handleThemeChange("light")}
                    >
                      <Sun size={20} />
                    </div>
                    <div
                      className={`flex items-center justify-center h-10 w-10 rounded-md cursor-pointer ${
                        theme === "dark"
                          ? "bg-[#0f172a] text-[#f8fafc] ring-2 ring-[#6366f1]"
                          : "bg-[#0f172a] text-[#f8fafc]"
                      }`}
                      onClick={() => handleThemeChange("dark")}
                    >
                      <Moon size={20} />
                    </div>
                    <div
                      className={`flex items-center justify-center h-10 w-10 rounded-md cursor-pointer ${
                        theme === "system"
                          ? "bg-[#334155] text-[#f8fafc] ring-2 ring-[#6366f1]"
                          : "bg-[#334155] text-[#f8fafc]"
                      }`}
                      onClick={() => handleThemeChange("system")}
                    >
                      <Monitor size={20} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#f8fafc]">Default View</Label>
                  <Select value={defaultView} onValueChange={setDefaultView}>
                    <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
                      <SelectValue placeholder="Select default view" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e293b] border-[#334155]">
                      <SelectItem value="dashboard" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                        Dashboard
                      </SelectItem>
                      <SelectItem value="customers" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                        Customers
                      </SelectItem>
                      <SelectItem value="companies" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                        Companies
                      </SelectItem>
                      <SelectItem value="activities" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                        Activities
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="bg-[#334155]" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#f8fafc]">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-[#f8fafc]">Enable Notifications</Label>
                    <p className="text-sm text-[#94a3b8]">Receive notifications about important updates</p>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                    className="data-[state=checked]:bg-[#6366f1]"
                  />
                </div>

                {notificationsEnabled && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-[#f8fafc]">Email Notifications</Label>
                        <p className="text-sm text-[#94a3b8]">Receive updates via email</p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                        className="data-[state=checked]:bg-[#6366f1]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-[#f8fafc]">Push Notifications</Label>
                        <p className="text-sm text-[#94a3b8]">Receive updates in the browser</p>
                      </div>
                      <Switch
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                        className="data-[state=checked]:bg-[#6366f1]"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
                Cancel
              </Button>
              <Button className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white" onClick={handleSaveProfile}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-[#f8fafc]">Team Members</h3>
              <Button
                className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white"
                onClick={() => setShowAddMemberDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>

            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0f172a] p-4 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-[#6366f1]">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-[#f8fafc]">{member.name}</div>
                      <div className="text-sm text-[#94a3b8]">{member.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Select defaultValue={member.role} onValueChange={(value) => handleRoleChange(member.id, value)}>
                        <SelectTrigger className="bg-[#1e293b] border-[#334155] text-[#f8fafc] w-[120px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e293b] border-[#334155]">
                          <SelectItem value="Admin" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                            Admin
                          </SelectItem>
                          <SelectItem
                            value="Manager"
                            className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                          >
                            Manager
                          </SelectItem>
                          <SelectItem value="User" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                            User
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Badge variant="outline" className="border-[#334155] text-[#94a3b8]">
                        {formatDate(member.lastActive)}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-[#94a3b8]">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#1e293b] border-[#334155]">
                        <DropdownMenuItem className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-[#334155]" />
                        <DropdownMenuItem
                          className="text-red-500 focus:bg-[#334155] focus:text-red-500"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-[#f8fafc]">Connected Apps</h3>
              <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
                <Plus className="mr-2 h-4 w-4" />
                Browse Integrations
              </Button>
            </div>

            <div className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0f172a] p-4 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-[#1e293b] flex items-center justify-center">
                      <img src={integration.icon || "/placeholder.svg"} alt={integration.name} className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-medium text-[#f8fafc]">{integration.name}</div>
                      <div className="text-sm text-[#94a3b8]">{integration.description}</div>
                    </div>
                  </div>
                  <div>
                    {integration.connected ? (
                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#10b981] hover:bg-[#10b981]/80">Connected</Badge>
                        <Button variant="outline" size="sm" className="border-[#334155] text-[#f8fafc]">
                          Configure
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-400"
                          onClick={() => handleToggleIntegration(integration.id)}
                        >
                          Disconnect
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white"
                        onClick={() => handleToggleIntegration(integration.id)}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#f8fafc]">Password</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-[#f8fafc]">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-[#f8fafc]">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-[#f8fafc]">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                  />
                </div>
                <Button className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white" onClick={handleUpdatePassword}>
                  <Lock className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </div>
            </div>

            <Separator className="bg-[#334155]" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#f8fafc]">API Keys</h3>
              <div className="space-y-4">
                <div className="bg-[#0f172a] p-4 rounded-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="font-medium text-[#f8fafc]">Production API Key</div>
                      <div className="text-sm text-[#94a3b8]">Last used: 2 days ago</div>
                      {showApiKey && (
                        <div className="mt-2 p-2 bg-[#1e293b] rounded border border-[#334155] font-mono text-xs text-[#f8fafc] break-all">
                          {productionApiKey}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#334155] text-[#f8fafc]"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        <Key className="mr-2 h-4 w-4" />
                        {showApiKey ? "Hide Key" : "Show Key"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#334155] text-[#f8fafc]"
                        onClick={() => handleRegenerateApiKey("production")}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="font-medium text-[#f8fafc]">Development API Key</div>
                      <div className="text-sm text-[#94a3b8]">Last used: 5 hours ago</div>
                      {showApiKey && (
                        <div className="mt-2 p-2 bg-[#1e293b] rounded border border-[#334155] font-mono text-xs text-[#f8fafc] break-all">
                          {developmentApiKey}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#334155] text-[#f8fafc]"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        <Key className="mr-2 h-4 w-4" />
                        {showApiKey ? "Hide Key" : "Show Key"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#334155] text-[#f8fafc]"
                        onClick={() => handleRegenerateApiKey("development")}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New API Key
                </Button>
              </div>
            </div>

            <Separator className="bg-[#334155]" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#f8fafc]">Account</h3>
              <Button
                variant="destructive"
                className="bg-red-500 hover:bg-red-600"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Add Member Dialog */}
      <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
        <DialogContent className="bg-[#1e293b] border-[#334155] text-[#f8fafc]">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription className="text-[#94a3b8]">
              Add a new member to your team. They will receive an email invitation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="member-name" className="text-[#f8fafc]">
                Name
              </Label>
              <Input
                id="member-name"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-email" className="text-[#f8fafc]">
                Email
              </Label>
              <Input
                id="member-email"
                type="email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-role" className="text-[#f8fafc]">
                Role
              </Label>
              <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-[#334155]">
                  <SelectItem value="Admin" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                    Admin
                  </SelectItem>
                  <SelectItem value="Manager" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                    Manager
                  </SelectItem>
                  <SelectItem value="User" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                    User
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddMemberDialog(false)}
              className="border-[#334155] text-[#f8fafc]"
            >
              Cancel
            </Button>
            <Button onClick={handleAddMember} className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white">
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-[#1e293b] border-[#334155] text-[#f8fafc]">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription className="text-[#94a3b8]">
              Are you sure you want to delete your account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert variant="destructive" className="border-red-500 bg-red-500/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Deleting your account will permanently remove all your data, including customers, companies, and
                activities.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              className="border-[#334155] text-[#f8fafc]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                setShowDeleteConfirm(false)
                toast({
                  title: "Account deleted",
                  description: "Your account has been successfully deleted.",
                  variant: "destructive",
                })
              }}
            >
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
