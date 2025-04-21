"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, ChevronDown, ChevronRight } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Sample companies data
const companies = [
  {
    id: "1",
    name: "Acme Corporation",
    industry: "Technology",
    children: [
      {
        id: "6",
        name: "Acme Cloud Services",
        industry: "Cloud Computing",
      },
      {
        id: "7",
        name: "Acme Security Solutions",
        industry: "Cybersecurity",
      },
    ],
  },
  {
    id: "2",
    name: "Globex Corp",
    industry: "Manufacturing",
    children: [],
  },
  {
    id: "3",
    name: "Stark Industries",
    industry: "Defense",
    children: [
      {
        id: "8",
        name: "Stark Renewable Energy",
        industry: "Energy",
      },
    ],
  },
  {
    id: "4",
    name: "Umbrella Corp",
    industry: "Pharmaceuticals",
    children: [],
  },
  {
    id: "5",
    name: "Wayne Enterprises",
    industry: "Conglomerate",
    children: [],
  },
]

export function OrgChart() {
  const [selectedCompany, setSelectedCompany] = useState<string>("")
  const [expandedNodes, setExpandedNodes] = useState<string[]>([])

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompany(companyId)
    toast({
      title: "Company Selected",
      description: `${companies.find((c) => c.id === companyId)?.name} has been selected.`,
    })
  }

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => (prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]))
  }

  const renderCompanyNode = (company: any, level = 0) => {
    const isExpanded = expandedNodes.includes(company.id)
    const hasChildren = company.children && company.children.length > 0

    return (
      <div key={company.id} className="mb-2">
        <div
          className={`flex items-center p-3 rounded-md ${
            selectedCompany === company.id ? "bg-[#334155]" : "bg-[#0f172a]"
          } hover:bg-[#334155] cursor-pointer transition-colors`}
          style={{ marginLeft: `${level * 24}px` }}
          onClick={() => handleCompanySelect(company.id)}
        >
          {hasChildren && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 mr-2 text-[#94a3b8]"
              onClick={(e) => {
                e.stopPropagation()
                toggleNode(company.id)
              }}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </Button>
          )}
          {!hasChildren && level > 0 && <div className="w-8"></div>}
          <div className="h-8 w-8 rounded-md bg-[#1e293b] flex items-center justify-center text-[#6366f1] mr-3">
            <Building2 size={16} />
          </div>
          <div>
            <div className="font-medium text-[#f8fafc]">{company.name}</div>
            <div className="text-xs text-[#94a3b8]">{company.industry}</div>
          </div>
        </div>
        {isExpanded && hasChildren && (
          <div className="mt-1">{company.children.map((child: any) => renderCompanyNode(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
      <CardHeader>
        <CardTitle className="text-[#f8fafc]">Organization Chart</CardTitle>
        <CardDescription className="text-[#94a3b8]">Visualize company hierarchies and relationships</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedCompany} onValueChange={handleCompanySelect}>
            <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e293b] border-[#334155]">
              {companies.map((company) => (
                <SelectItem
                  key={company.id}
                  value={company.id}
                  className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                >
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCompany ? (
          <div className="border border-[#334155] rounded-md p-4">
            <div className="space-y-1">
              {companies.map((company) => {
                if (company.id === selectedCompany || expandedNodes.includes(company.id)) {
                  return renderCompanyNode(company)
                }
                return null
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center p-12 border border-dashed border-[#334155] rounded-md">
            <div className="text-center space-y-2">
              <Building2 size={48} className="mx-auto text-[#94a3b8]" />
              <h3 className="text-lg font-medium text-[#f8fafc]">Org Chart Visualization</h3>
              <p className="text-sm text-[#94a3b8]">Select a company to view its organizational structure</p>
              <Button
                className="mt-2 bg-[#6366f1] hover:bg-[#6366f1]/90 text-white"
                onClick={() => {
                  // Select the first company by default
                  if (companies.length > 0) {
                    handleCompanySelect(companies[0].id)
                  }
                }}
              >
                Select Company
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
