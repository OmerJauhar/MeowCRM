"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Building2, BarChart3, Calendar, Settings, ChevronLeft, ChevronRight, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "@/hooks/use-toast"

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const { theme } = useTheme()

  // Determine active item based on current path
  const getActiveItem = () => {
    if (pathname?.includes("/customers")) return "customers"
    if (pathname?.includes("/companies")) return "companies"
    if (pathname?.includes("/activities")) return "activities"
    if (pathname?.includes("/reports")) return "reports"
    if (pathname?.includes("/settings")) return "settings"
    return "customers" // Default
  }

  const [activeItem, setActiveItem] = useState(getActiveItem())

  const navItems = [
    { id: "companies", label: "Companies", icon: Building2, href: "/companies" },
    { id: "customers", label: "Customers", icon: Users, href: "/customers" },
    { id: "activities", label: "Activities", icon: Calendar, href: "/activities" },
  ]

  // Get theme-specific colors
  const getBgColor = () => {
    return theme === "light" ? "bg-white" : "bg-[#1e293b]"
  }

  const getBorderColor = () => {
    return theme === "light" ? "border-gray-200" : "border-[#334155]"
  }

  const getTextColor = () => {
    return theme === "light" ? "text-gray-700" : "text-[#94a3b8]"
  }

  const getActiveTextColor = () => {
    return theme === "light" ? "text-gray-900" : "text-[#f8fafc]"
  }

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <div
      className={cn(
        `flex flex-col h-full ${getBgColor()} border-r ${getBorderColor()} transition-all duration-300`,
        collapsed ? "w-[80px]" : "w-[280px]",
      )}
    >
      <div className={`flex items-center justify-between p-4 border-b ${getBorderColor()}`}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-[#6366f1] flex items-center justify-center text-white font-bold">
              MCR
            </div>
            <span className={`font-bold ${getActiveTextColor()}`}>Meow CRM</span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 mx-auto rounded-md bg-[#6366f1] flex items-center justify-center text-white font-bold">
            MCR
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(getTextColor(), collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                activeItem === item.id
                  ? `${theme === "light" ? "bg-gray-100" : "bg-[#1e293b]"} ${getActiveTextColor()} border-l-4 border-[#6366f1]`
                  : `${getTextColor()} hover:${getActiveTextColor()} hover:${theme === "light" ? "bg-gray-100/60" : "bg-[#1e293b]/60"}`,
              )}
              onClick={() => setActiveItem(item.id)}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className={`p-4 border-t ${getBorderColor()}`}>
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
          <div className={cn("flex items-center gap-3", collapsed && "hidden")}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-[#6366f1]">JD</AvatarFallback>
            </Avatar>
            <div>
              <p className={`text-sm font-medium ${getActiveTextColor()}`}>John Doe</p>
              <p className="text-xs text-[#94a3b8]">Admin</p>
            </div>
          </div>
          {collapsed ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-[#6366f1]">JD</AvatarFallback>
            </Avatar>
          ) : (
            <Button variant="ghost" size="icon" className={getTextColor()} onClick={handleLogout}>
              <LogOut size={18} />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
