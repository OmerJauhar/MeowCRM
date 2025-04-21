"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Building2, Users, TrendingUp, MoreHorizontal, ChevronDown } from "lucide-react"
import { useState } from "react"
import { OrgChart } from "@/components/companies/org-chart"
import { toast } from "@/hooks/use-toast"
// Add the import for AddCompanyModal
import { AddCompanyModal } from "@/components/modals/add-company-modal"

// Sample company data
const companies = [
  {
    id: "1",
    name: "Acme Inc.",
    industry: "Technology",
    employees: "250-500",
    revenue: "$25M-$50M",
    status: "Active",
    customers: 12,
    growth: "+15%",
  },
  {
    id: "2",
    name: "Globex Corp",
    industry: "Manufacturing",
    employees: "1000+",
    revenue: "$100M-$500M",
    status: "Active",
    customers: 8,
    growth: "+5%",
  },
  {
    id: "3",
    name: "Stark Industries",
    industry: "Defense",
    employees: "5000+",
    revenue: "$1B+",
    status: "Active",
    customers: 3,
    growth: "+22%",
  },
  {
    id: "4",
    name: "Umbrella Corp",
    industry: "Pharmaceuticals",
    employees: "1000+",
    revenue: "$500M-$1B",
    status: "Active",
    customers: 7,
    growth: "+8%",
  },
  {
    id: "5",
    name: "Wayne Enterprises",
    industry: "Conglomerate",
    employees: "10000+",
    revenue: "$10B+",
    status: "Active",
    customers: 5,
    growth: "+12%",
  },
]

export function CompanyManagement() {
  // Add state for the "Add Company" modal
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#f8fafc]">Company Management</h2>
          <p className="text-[#94a3b8]">Manage your company relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#94a3b8]" />
            <Input
              type="search"
              placeholder="Search companies..."
              className="pl-8 bg-[#0f172a] border-[#334155] text-[#f8fafc] w-full md:w-[250px]"
            />
          </div>
          {/* Update the "Add Company" button to open the modal */}
          <Button
            className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white"
            onClick={() => setShowAddCompanyModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="bg-[#1e293b] border border-[#334155]">
          <TabsTrigger value="list" className="data-[state=active]:bg-[#0f172a] data-[state=active]:text-[#f8fafc]">
            List View
          </TabsTrigger>
          <TabsTrigger value="org" className="data-[state=active]:bg-[#0f172a] data-[state=active]:text-[#f8fafc]">
            Org Chart
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
            <CardContent className="p-0">
              <div className="rounded-md border border-[#334155]">
                <Table>
                  <TableHeader className="bg-[#0f172a]">
                    <TableRow className="hover:bg-[#0f172a]/80 border-[#334155]">
                      <TableHead>
                        <div className="flex items-center gap-1 text-[#f8fafc]">
                          Company
                          <ChevronDown size={14} />
                        </div>
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        <div className="flex items-center gap-1 text-[#f8fafc]">
                          Industry
                          <ChevronDown size={14} />
                        </div>
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-[#f8fafc]">
                          Size
                          <ChevronDown size={14} />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1 text-[#f8fafc]">
                          Customers
                          <ChevronDown size={14} />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1 text-[#f8fafc]">
                          Growth
                          <ChevronDown size={14} />
                        </div>
                      </TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companies.map((company) => (
                      <TableRow key={company.id} className="hover:bg-[#0f172a]/50 border-[#334155] cursor-pointer">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-md bg-[#0f172a] flex items-center justify-center text-[#6366f1]">
                              <Building2 size={20} />
                            </div>
                            <div>
                              <div className="font-medium text-[#f8fafc]">{company.name}</div>
                              <div className="text-sm text-[#94a3b8]">{company.revenue}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-[#f8fafc]">{company.industry}</TableCell>
                        <TableCell className="hidden lg:table-cell text-[#f8fafc]">{company.employees}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users size={16} className="text-[#94a3b8]" />
                            <span className="text-[#f8fafc]">{company.customers}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-[#10b981] hover:bg-[#10b981]/80">
                            <TrendingUp size={14} className="mr-1" />
                            {company.growth}
                          </Badge>
                        </TableCell>
                        <TableCell className="p-2">
                          <Button variant="ghost" size="icon" className="text-[#94a3b8]">
                            <MoreHorizontal size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between py-4">
              <div className="text-sm text-[#94a3b8]">
                Showing <span className="font-medium text-[#f8fafc]">5</span> of{" "}
                <span className="font-medium text-[#f8fafc]">25</span> companies
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-[#334155] text-[#f8fafc]">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="border-[#334155] text-[#f8fafc]">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="org">
          <OrgChart />
        </TabsContent>
      </Tabs>
      {/* Add the AddCompanyModal component at the end of the component, before the final closing tag */}
      {showAddCompanyModal && (
        <AddCompanyModal
          open={showAddCompanyModal}
          onOpenChange={setShowAddCompanyModal}
          onAddCompany={(company) => {
            toast({
              title: "Company Added",
              description: `${company.name} has been added successfully.`,
            })
            setShowAddCompanyModal(false)
          }}
        />
      )}
    </div>
  )
}

interface AddCompanyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddCompany: (company: any) => void
}
