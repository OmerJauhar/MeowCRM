"use client";
import { DashboardLayout } from "@/components/dashboard-layout"
import { CompanyTable } from "@/components/companies/company-table"
import { CompanyDetail } from "@/components/companies/company-detail"
import { useState } from "react"

export default function CompaniesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#f8fafc]">Companies</h1>
            <p className="text-[#94a3b8]">Manage your company relationships</p>
          </div>
        </div>
        <CompaniesContent />
      </div>
    </DashboardLayout>
  )
}
// Client component to handle state
;

function CompaniesContent() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 gap-6">
      {selectedCompany ? (
        <CompanyDetail companyId={selectedCompany} onClose={() => setSelectedCompany(null)} />
      ) : (
        <CompanyTable onSelectCompany={setSelectedCompany} />
      )}
    </div>
  )
}
