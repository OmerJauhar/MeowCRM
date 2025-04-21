"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, AlertTriangle, TrendingUp, TrendingDown, ArrowRight } from "lucide-react"

export function AIInsights() {
  return (
    <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#6366f1]" />
            <CardTitle className="text-[#f8fafc]">AI Insights</CardTitle>
          </div>
          <Badge className="bg-[#6366f1] hover:bg-[#6366f1]/80">New</Badge>
        </div>
        <CardDescription className="text-[#94a3b8]">AI-powered business intelligence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-[#0f172a] p-3 rounded-md border-l-4 border-[#10b981]">
          <div className="flex items-start gap-2">
            <TrendingUp className="h-5 w-5 text-[#10b981] mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-[#f8fafc]">Revenue Growth Opportunity</h4>
              <p className="text-xs text-[#94a3b8] mt-1">
                Stark Industries shows a 20% increase in API usage. Consider upselling to the enterprise plan for an
                estimated $150K additional annual revenue.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0f172a] p-3 rounded-md border-l-4 border-[#ef4444]">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-[#ef4444] mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-[#f8fafc]">Churn Risk Detected</h4>
              <p className="text-xs text-[#94a3b8] mt-1">
                Wayne Enterprises product usage has declined by 30% in the last quarter. Recommend scheduling a review
                call before renewal in 30 days.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0f172a] p-3 rounded-md border-l-4 border-[#f59e0b]">
          <div className="flex items-start gap-2">
            <Sparkles className="h-5 w-5 text-[#f59e0b] mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-[#f8fafc]">Market Trend Analysis</h4>
              <p className="text-xs text-[#94a3b8] mt-1">
                Based on your customer data and market trends, the healthcare sector shows 35% higher conversion rates
                than other industries. Consider focusing Q4 marketing efforts here.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0f172a] p-3 rounded-md border-l-4 border-[#6366f1]">
          <div className="flex items-start gap-2">
            <TrendingDown className="h-5 w-5 text-[#6366f1] mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-[#f8fafc]">Anomaly Detected</h4>
              <p className="text-xs text-[#94a3b8] mt-1">
                Customer acquisition cost increased by 25% this month compared to the 6-month average. Primary factor
                appears to be lower conversion rates from the new landing page.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#0f172a] hover:bg-[#0f172a]/80 text-[#f8fafc]">
          View All Insights
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
