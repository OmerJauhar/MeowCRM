"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomerTable } from "@/components/customer-table"
import { CustomerDetail } from "@/components/customer-detail"
import { CompanyManagement } from "@/components/company-management"
import { AiSuggestions } from "@/components/ai-suggestions"
import { Users, Building2, TrendingUp, DollarSign, Plus } from "lucide-react"
// Add the import for AddCustomerModal
import { AddCustomerModal } from "@/components/modals/add-customer-modal"
import { toast } from "@/hooks/use-toast"
import axios from 'axios'

export function DashboardContent() {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  // Add a state for the "Add Customer" modal
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false)
  // Add a useState for the active tab
  const [activeTab, setActiveTab] = useState("customers")
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/Customer`);
        const customersData = response.data.$values.map((customer: any) => ({
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          status: customer.status,
          customerValue: customer.customerValue,
          company: customer.company.name,
        }));
        setCustomers(customersData);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#f8fafc]">Dashboard</h1>
          <p className="text-[#94a3b8]">Welcome back, John Doe</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Update the button in the header section to open the modal */}
          <Button
            className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white"
            onClick={() => setShowAddCustomerModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#f8fafc]">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-[#6366f1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#f8fafc]">1,248</div>
            <p className="text-xs text-[#10b981]">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#f8fafc]">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-[#6366f1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#f8fafc]">342</div>
            <p className="text-xs text-[#10b981]">+5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#f8fafc]">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-[#6366f1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#f8fafc]">$842,245</div>
            <p className="text-xs text-[#10b981]">+18% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#f8fafc]">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#6366f1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#f8fafc]">24.8%</div>
            <p className="text-xs text-[#10b981]">+2.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-[#1e293b] border border-[#334155]">
          <TabsTrigger
            value="customers"
            className="data-[state=active]:bg-[#0f172a] data-[state=active]:text-[#f8fafc]"
          >
            Customers
          </TabsTrigger>
          <TabsTrigger
            value="companies"
            className="data-[state=active]:bg-[#0f172a] data-[state=active]:text-[#f8fafc]"
          >
            Companies
          </TabsTrigger>
        </TabsList>
        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={cn("lg:col-span-2", selectedCustomer ? "hidden lg:block" : "")}>
              <CustomerTable onSelectCustomer={setSelectedCustomer} customers={customers} />
            </div>
            {selectedCustomer && (
              <div className="lg:col-span-1">
                <CustomerDetail customerId={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
              </div>
            )}
            {!selectedCustomer && (
              <div className="lg:col-span-1">
                <AiSuggestions />
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="companies">
          <CompanyManagement />
        </TabsContent>
      </Tabs>
      {/* Add the AddCustomerModal component at the end of the component, before the final closing tag */}
      {showAddCustomerModal && (
        <AddCustomerModal
          open={showAddCustomerModal}
          onOpenChange={setShowAddCustomerModal}
          onAddCustomer={(customer) => {
            toast({
              title: "Customer Added",
              description: `${customer.name} has been added successfully.`,
            })
            setShowAddCustomerModal(false)
          }}
        />
      )}
    </div>
  )
}
