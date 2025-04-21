"use client";

import { DashboardLayout } from "@/components/dashboard-layout"
import { ActivityTimeline } from "@/components/activities/activity-timeline"
import { ActivityForm } from "@/components/activities/activity-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"

export default function ActivitiesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#f8fafc]">Activities</h1>
            <p className="text-[#94a3b8]">Track and manage customer interactions</p>
          </div>
        </div>
        <ActivitiesTabs />
      </div>
    </DashboardLayout>
  )
}

function ActivitiesTabs() {
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
