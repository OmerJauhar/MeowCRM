import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsPanel } from "@/components/settings/settings-panel"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#f8fafc]">Settings</h1>
            <p className="text-[#94a3b8]">Manage your account and preferences</p>
          </div>
        </div>
        <SettingsPanel />
      </div>
    </DashboardLayout>
  )
}
