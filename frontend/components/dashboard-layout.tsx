"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useTheme } from "next-themes"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()

  // Apply theme-specific background colors
  const getBgColor = () => {
    return theme === "light" ? "bg-[#f8fafc]" : "bg-[#0f172a]"
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
        <main className={`flex-1 overflow-y-auto ${getBgColor()} p-6`}>{children}</main>
      </div>
    </div>
  )
}
