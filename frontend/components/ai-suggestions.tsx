"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sparkles, TrendingUp, AlertCircle, Mail, Calendar, RefreshCw } from "lucide-react"

export function AiSuggestions() {
  return (
    <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-[#f8fafc] flex items-center gap-2">
            <Sparkles size={18} className="text-[#6366f1]" />
            AI Insights
          </CardTitle>
          <CardDescription className="text-[#94a3b8]">AI-powered recommendations</CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="text-[#94a3b8]">
          <RefreshCw size={16} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[#f8fafc] flex items-center gap-2">
            <TrendingUp size={16} className="text-[#10b981]" />
            Growth Opportunities
          </h4>
          <div className="space-y-2">
            <div className="bg-[#0f172a] p-3 rounded-md">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-[#f8fafc]">Upsell opportunity with Acme Inc.</p>
                <Badge className="bg-[#10b981] hover:bg-[#10b981]/80">High</Badge>
              </div>
              <p className="text-xs text-[#94a3b8] mt-1">
                Based on recent purchases and company growth, Acme Inc. is likely to need additional licenses.
              </p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="h-7 text-xs border-[#334155] text-[#f8fafc]">
                  <Mail size={12} className="mr-1" />
                  Email Template
                </Button>
                <Button size="sm" className="h-7 text-xs bg-[#6366f1] hover:bg-[#6366f1]/90 text-white">
                  <Calendar size={12} className="mr-1" />
                  Schedule Call
                </Button>
              </div>
            </div>
            <div className="bg-[#0f172a] p-3 rounded-md">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-[#f8fafc]">Cross-sell to Stark Industries</p>
                <Badge className="bg-[#6366f1] hover:bg-[#6366f1]/80">Medium</Badge>
              </div>
              <p className="text-xs text-[#94a3b8] mt-1">
                Their recent API integration suggests they could benefit from our analytics package.
              </p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="h-7 text-xs border-[#334155] text-[#f8fafc]">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-[#334155]" />

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[#f8fafc] flex items-center gap-2">
            <AlertCircle size={16} className="text-[#f97316]" />
            Risk Alerts
          </h4>
          <div className="space-y-2">
            <div className="bg-[#0f172a] p-3 rounded-md">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-[#f8fafc]">Renewal risk for Wayne Enterprises</p>
                <Badge className="bg-[#f97316] hover:bg-[#f97316]/80">Warning</Badge>
              </div>
              <p className="text-xs text-[#94a3b8] mt-1">
                No engagement in the last 45 days. Contract renewal in 30 days.
              </p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" className="h-7 text-xs bg-[#6366f1] hover:bg-[#6366f1]/90 text-white">
                  Create Task
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-[#334155]" />

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[#f8fafc]">Suggested Email Templates</h4>
          <div className="space-y-2">
            <div className="bg-[#0f172a] p-3 rounded-md">
              <p className="text-sm font-medium text-[#f8fafc]">Follow-up after demo</p>
              <p className="text-xs text-[#94a3b8] mt-1">
                Personalized template based on recent product demonstrations
              </p>
            </div>
            <div className="bg-[#0f172a] p-3 rounded-md">
              <p className="text-sm font-medium text-[#f8fafc]">Quarterly business review</p>
              <p className="text-xs text-[#94a3b8] mt-1">Template for scheduling QBR with key accounts</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#0f172a] hover:bg-[#0f172a]/80 text-[#f8fafc]">View All Insights</Button>
      </CardFooter>
    </Card>
  )
}
