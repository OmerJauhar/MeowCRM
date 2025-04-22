"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  X,
  Building2,
  Users,
  DollarSign,
  Globe,
  MapPin,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Edit,
  Sparkles,
  Plus,
} from "lucide-react"
import axios from "axios"

interface CompanyDetailProps {
  companyId: string
  onClose: () => void
}

export function CompanyDetail({ companyId, onClose }: CompanyDetailProps) {
  const [company, setCompany] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/Company`);
        setCompany(response.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompany();
  }, []);

  if (!company) {
    return (
      <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#f8fafc]">Company not found</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button onClick={onClose} variant="outline" className="border-[#334155] text-[#f8fafc]">
            Close
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Client":
        return "bg-[#10b981] hover:bg-[#10b981]/80"
      case "Prospect":
        return "bg-[#f59e0b] hover:bg-[#f59e0b]/80"
      case "Vendor":
        return "bg-[#6366f1] hover:bg-[#6366f1]/80"
      default:
        return "bg-[#94a3b8] hover:bg-[#94a3b8]/80"
    }
  }

  const renderMetricBar = (value: number, color: string) => (
    <div className="h-2 w-full bg-[#0f172a] rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
    </div>
  )

  return (
    <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-[#f8fafc]">Company Details</CardTitle>
          <CardDescription className="text-[#94a3b8]">View and manage company information</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-[#94a3b8]">
            <X size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="h-16 w-16 rounded-md">
            <AvatarImage src={company.logo || "/placeholder.svg"} />
            <AvatarFallback className="bg-[#6366f1] rounded-md">
              <Building2 size={32} />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-[#f8fafc]">{company.name}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-[#334155] text-[#94a3b8]">
                {company.industry}
              </Badge>
              <Badge className={getStatusColor(company.status)}>{company.status}</Badge>
              <Badge
                className={
                  company.growth === "up" ? "bg-[#10b981] hover:bg-[#10b981]/80" : "bg-[#ef4444] hover:bg-[#ef4444]/80"
                }
              >
                {company.growth === "up" ? (
                  <TrendingUp size={14} className="mr-1" />
                ) : (
                  <TrendingDown size={14} className="mr-1" />
                )}
                {company.revenue}
              </Badge>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#0f172a] border border-[#334155] w-full justify-start">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-[#f8fafc] flex items-center gap-2"
            >
              <BarChart3 size={16} />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-[#f8fafc] flex items-center gap-2"
            >
              <Users size={16} />
              Contacts
            </TabsTrigger>
            <TabsTrigger
              value="financials"
              className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-[#f8fafc] flex items-center gap-2"
            >
              <DollarSign size={16} />
              Financials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[#f8fafc]">Company Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Globe size={16} className="text-[#94a3b8]" />
                    <span className="text-[#f8fafc]">{company.website}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-[#94a3b8]" />
                    <span className="text-[#f8fafc]">{company.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-[#94a3b8]" />
                    <span className="text-[#f8fafc]">{company.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-[#94a3b8]" />
                    <span className="text-[#f8fafc]">{company.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-[#94a3b8]" />
                    <span className="text-[#f8fafc]">Employees: {company.employees}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-[#94a3b8]" />
                    <span className="text-[#f8fafc]">Last Activity: {company.lastActivity}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[#f8fafc]">Description</h4>
                <p className="text-sm text-[#f8fafc] bg-[#0f172a] p-3 rounded-md">{company.description}</p>
                <Button variant="outline" size="sm" className="border-[#334155] text-[#94a3b8]">
                  <Edit size={14} className="mr-2" />
                  Edit Description
                </Button>
              </div>
            </div>

            <Separator className="bg-[#334155]" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-[#f8fafc]">Key Metrics</h4>
                <Button variant="outline" size="sm" className="border-[#334155] text-[#94a3b8]">
                  <Sparkles size={14} className="mr-2" />
                  Enhance with AI
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0f172a] p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#94a3b8]">Customer Satisfaction</span>
                    <span className="text-sm font-medium text-[#f8fafc]">{company.metrics.customerSatisfaction}%</span>
                  </div>
                  {renderMetricBar(company.metrics.customerSatisfaction, "bg-[#10b981]")}
                </div>
                <div className="bg-[#0f172a] p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#94a3b8]">Retention Rate</span>
                    <span className="text-sm font-medium text-[#f8fafc]">{company.metrics.retentionRate}%</span>
                  </div>
                  {renderMetricBar(company.metrics.retentionRate, "bg-[#6366f1]")}
                </div>
                <div className="bg-[#0f172a] p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#94a3b8]">Upsell Rate</span>
                    <span className="text-sm font-medium text-[#f8fafc]">{company.metrics.upsellRate}%</span>
                  </div>
                  {renderMetricBar(company.metrics.upsellRate, "bg-[#f59e0b]")}
                </div>
                <div className="bg-[#0f172a] p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#94a3b8]">Market Share</span>
                    <span className="text-sm font-medium text-[#f8fafc]">{company.metrics.marketShare}%</span>
                  </div>
                  {renderMetricBar(company.metrics.marketShare, "bg-[#6366f1]")}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="pt-4 space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-[#f8fafc]">Key Contacts</h4>
              <Button className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </div>
            <div className="space-y-4">
              {company.contacts.map((contact: any) => (
                <div key={contact.id} className="bg-[#0f172a] p-4 rounded-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback className="bg-[#6366f1]">
                          {contact.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h5 className="font-medium text-[#f8fafc]">{contact.name}</h5>
                        <p className="text-sm text-[#94a3b8]">{contact.position}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-[#94a3b8]" />
                        <span className="text-[#f8fafc]">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-[#94a3b8]" />
                        <span className="text-[#f8fafc]">{contact.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="financials" className="pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0f172a] p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#94a3b8]">Revenue</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#f8fafc]">{company.financials.revenue.current}</span>
                    <Badge
                      className={
                        company.financials.revenue.growth > 0
                          ? "bg-[#10b981] hover:bg-[#10b981]/80"
                          : "bg-[#ef4444] hover:bg-[#ef4444]/80"
                      }
                    >
                      {company.financials.revenue.growth > 0 ? "+" : ""}
                      {company.financials.revenue.growth}%
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-[#94a3b8]">Previous: {company.financials.revenue.previous}</div>
              </div>
              <div className="bg-[#0f172a] p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#94a3b8]">Profit</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#f8fafc]">{company.financials.profit.current}</span>
                    <Badge
                      className={
                        company.financials.profit.growth > 0
                          ? "bg-[#10b981] hover:bg-[#10b981]/80"
                          : "bg-[#ef4444] hover:bg-[#ef4444]/80"
                      }
                    >
                      {company.financials.profit.growth > 0 ? "+" : ""}
                      {company.financials.profit.growth}%
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-[#94a3b8]">Previous: {company.financials.profit.previous}</div>
              </div>
              <div className="bg-[#0f172a] p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#94a3b8]">Average Deal Size</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#f8fafc]">{company.financials.averageDeal.current}</span>
                    <Badge
                      className={
                        company.financials.averageDeal.growth > 0
                          ? "bg-[#10b981] hover:bg-[#10b981]/80"
                          : "bg-[#ef4444] hover:bg-[#ef4444]/80"
                      }
                    >
                      {company.financials.averageDeal.growth > 0 ? "+" : ""}
                      {company.financials.averageDeal.growth}%
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-[#94a3b8]">Previous: {company.financials.averageDeal.previous}</div>
              </div>
              <div className="bg-[#0f172a] p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#94a3b8]">Customer Acquisition Cost</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#f8fafc]">
                      {company.financials.customerAcquisitionCost.current}
                    </span>
                    <Badge
                      className={
                        company.financials.customerAcquisitionCost.growth < 0
                          ? "bg-[#10b981] hover:bg-[#10b981]/80"
                          : "bg-[#ef4444] hover:bg-[#ef4444]/80"
                      }
                    >
                      {company.financials.customerAcquisitionCost.growth > 0 ? "+" : ""}
                      {company.financials.customerAcquisitionCost.growth}%
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-[#94a3b8]">
                  Previous: {company.financials.customerAcquisitionCost.previous}
                </div>
              </div>
            </div>

            <div className="bg-[#0f172a] p-4 rounded-md">
              <h4 className="text-sm font-medium text-[#f8fafc] mb-4">Financial Health</h4>
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex-1 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full border-8 border-[#6366f1] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#f8fafc]">A+</div>
                      <div className="text-xs text-[#94a3b8]">Credit Rating</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-[#94a3b8]">Debt to Equity</span>
                        <span className="text-sm font-medium text-[#f8fafc]">0.8</span>
                      </div>
                      {renderMetricBar(80, "bg-[#6366f1]")}
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-[#94a3b8]">Profit Margin</span>
                        <span className="text-sm font-medium text-[#f8fafc]">22%</span>
                      </div>
                      {renderMetricBar(22, "bg-[#10b981]")}
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-[#94a3b8]">Cash Flow</span>
                        <span className="text-sm font-medium text-[#f8fafc]">Positive</span>
                      </div>
                      {renderMetricBar(85, "bg-[#10b981]")}
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-[#94a3b8]">ROI</span>
                        <span className="text-sm font-medium text-[#f8fafc]">18%</span>
                      </div>
                      {renderMetricBar(18, "bg-[#f59e0b]")}
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-[#94a3b8]">Liquidity Ratio</span>
                        <span className="text-sm font-medium text-[#f8fafc]">2.5</span>
                      </div>
                      {renderMetricBar(75, "bg-[#6366f1]")}
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-[#94a3b8]">Growth Rate</span>
                        <span className="text-sm font-medium text-[#f8fafc]">15%</span>
                      </div>
                      {renderMetricBar(15, "bg-[#10b981]")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-[#334155] pt-6">
        <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
          <Mail size={16} className="mr-2" />
          Contact
        </Button>
        <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
          <Calendar size={16} className="mr-2" />
          Schedule Meeting
        </Button>
        <Button className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white">
          <Edit size={16} className="mr-2" />
          Edit Company
        </Button>
      </CardFooter>
    </Card>
  )
}
