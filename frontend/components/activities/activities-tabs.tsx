"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityTimeline } from "@/components/activities/activity-timeline"
import { ActivityForm } from "@/components/activities/activity-form"

function ActivitiesTabsContent() {
  const searchParams = useSearchParams()
  const tab = searchParams?.get("tab") || "timeline"

  return (
    <Tabs defaultValue={tab} className="space-y-4">
      <TabsList className="bg-[#1e293b] border border-[#334155]">
        <TabsTrigger value="timeline" className="data-[state=active]:bg-[#0f172a] data-[state=active]:text-[#f8fafc]">
          Timeline
        </TabsTrigger>
        <TabsTrigger value="create" className="data-[state=active]:bg-[#0f172a] data-[state=active]:text-[#f8fafc]">
          Create Activity
        </TabsTrigger>
      </TabsList>
      <TabsContent value="timeline">
        <ActivityTimeline />
      </TabsContent>
      <TabsContent value="create">
        <ActivityForm />
      </TabsContent>
    </Tabs>
  )
}

export function ActivitiesTabs() {
  return (
    <Suspense fallback={
      <div className="space-y-4">
        <div className="bg-[#1e293b] h-10 rounded-md animate-pulse border border-[#334155]"></div>
        <div className="bg-[#1e293b] h-[500px] rounded-md animate-pulse border border-[#334155]"></div>
      </div>
    }>
      <ActivitiesTabsContent />
    </Suspense>
  )
} 