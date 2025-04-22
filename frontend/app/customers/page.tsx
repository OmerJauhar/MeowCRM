"use client";
import { DashboardLayout } from "@/components/dashboard-layout"
import { CustomerTable } from "@/components/customer-table"
import { CustomerDetail } from "@/components/customer-detail"
import { useState } from "react"

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#f8fafc]">Customers</h1>
            <p className="text-[#94a3b8]">Manage your customer relationships</p>
          </div>
        </div>
        <CustomersContent />
      </div>
    </DashboardLayout>
  )
}

function CustomersContent() {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 gap-6">
      {selectedCustomer ? (
        <CustomerDetail customerId={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
      ) : (
        <CustomerTable onSelectCustomer={setSelectedCustomer} />
      )}
    </div>
  )
} 