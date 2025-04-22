"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Menu, X, ChevronDown, Sun, Moon, Command } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import { toast } from "@/hooks/use-toast"

interface HeaderProps {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
}

export function Header({ sidebarCollapsed, setSidebarCollapsed }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    document.title = "Meow CRM"
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    toast({
      title: "Theme changed",
      description: `Theme set to ${newTheme} mode.`,
    })
  }

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  // Get theme-specific colors
  const getBgColor = () => {
    return theme === "light" ? "bg-white border-gray-200" : "bg-[#1e293b] border-[#334155]"
  }

  const getTextColor = () => {
    return theme === "light" ? "text-gray-700" : "text-[#94a3b8]"
  }

  const getInputBgColor = () => {
    return theme === "light" ? "bg-gray-50 border-gray-200" : "bg-[#0f172a] border-[#334155]"
  }

  return (
    <header className={`h-16 border-b ${getBgColor()} px-4 flex items-center justify-between`}>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={`lg:hidden ${getTextColor()}`}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <Menu size={20} />
        </Button>

        <nav className={`hidden md:flex items-center gap-1 text-sm ${getTextColor()}`}>
          <span>Dashboard</span>
          <span>/</span>
          <span className={theme === "light" ? "text-gray-900" : "text-[#f8fafc]"}>Customers</span>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {searchOpen ? (
          <div className="relative w-full md:w-80">
            <Input
              className={`${getInputBgColor()} ${theme === "light" ? "text-gray-900" : "text-[#f8fafc]"} pl-10 pr-4 h-9 w-full`}
              placeholder="Search..."
              autoFocus
            />
            <Search className={`absolute left-3 top-2.5 h-4 w-4 ${getTextColor()}`} />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute right-1 top-1 h-7 w-7 ${getTextColor()}`}
              onClick={() => setSearchOpen(false)}
            >
              <X size={16} />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className={`hidden md:flex items-center gap-2 ${getTextColor()} ${getInputBgColor()}`}
            onClick={() => setSearchOpen(true)}
          >
            <Search size={16} />
            <span>Search...</span>
            <kbd
              className={`ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border ${theme === "light" ? "border-gray-200 bg-gray-50" : "border-[#334155] bg-[#1e293b]"} px-1.5 font-mono text-[10px] font-medium ${getTextColor()}`}
            >
              <span className="text-xs">
                <Command size={12} />
              </span>
              K
            </kbd>
          </Button>
        )}

        <Button
          variant="ghost"
          size="icon"
          className={`${getTextColor()} md:hidden`}
          onClick={() => setSearchOpen(true)}
        >
          <Search size={20} />
        </Button>

        <Button variant="ghost" size="icon" className={`${getTextColor()} relative`}>
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#10b981]"></span>
        </Button>

        <Button variant="ghost" size="icon" className={getTextColor()} onClick={toggleTheme}>
          {mounted ? (
            theme === "dark" ? <Sun size={20} /> : <Moon size={20} />
          ) : (
            <div style={{ width: '20px', height: '20px' }}></div>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-[#6366f1]">JD</AvatarFallback>
              </Avatar>
              <span className={`hidden md:inline-flex ${theme === "light" ? "text-gray-900" : "text-[#f8fafc]"}`}>
                John Doe
              </span>
              <ChevronDown size={16} className={getTextColor()} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={`w-56 ${getBgColor()}`}>
            <DropdownMenuLabel className={theme === "light" ? "text-gray-900" : "text-[#f8fafc]"}>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className={theme === "light" ? "bg-gray-200" : "bg-[#334155]"} />
            <DropdownMenuItem
              className={`${theme === "light" ? "text-gray-900 focus:bg-gray-100" : "text-[#f8fafc] focus:bg-[#334155]"} focus:text-[#f8fafc]`}
              onClick={() => router.push("/settings")}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`${theme === "light" ? "text-gray-900 focus:bg-gray-100" : "text-[#f8fafc] focus:bg-[#334155]"} focus:text-[#f8fafc]`}
              onClick={() => router.push("/settings")}
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className={theme === "light" ? "bg-gray-200" : "bg-[#334155]"} />
            <DropdownMenuItem
              className={`${theme === "light" ? "text-gray-900 focus:bg-gray-100" : "text-[#f8fafc] focus:bg-[#334155]"} focus:text-[#f8fafc]`}
              onClick={handleLogout}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
