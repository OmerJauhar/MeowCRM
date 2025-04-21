"use client"

import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface KeyMetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
  sparklineData: number[]
}

export function KeyMetricCard({ title, value, change, trend, icon, sparklineData }: KeyMetricCardProps) {
  // Normalize sparkline data to fit in the available space
  const max = Math.max(...sparklineData)
  const normalizedData = sparklineData.map((value) => (value / max) * 40) // 40 is the max height in pixels

  return (
    <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="text-sm font-medium text-[#94a3b8]">{title}</div>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-[#f8fafc]">{value}</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge
                className={trend === "up" ? "bg-[#10b981] hover:bg-[#10b981]/80" : "bg-[#ef4444] hover:bg-[#ef4444]/80"}
              >
                {trend === "up" ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                {change}
              </Badge>
              <span className="text-xs text-[#94a3b8]">vs last period</span>
            </div>
          </div>
          <div className="h-10 flex items-end gap-[2px]">
            {normalizedData.map((height, index) => (
              <div
                key={index}
                className={`w-1 rounded-t-sm ${trend === "up" ? "bg-[#10b981]" : "bg-[#ef4444]"}`}
                style={{ height: `${height}px` }}
              ></div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
