import { DashboardLayout } from "@/components/dashboard-layout"
import { ActivitiesTabs } from "@/components/activities/activities-tabs"

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