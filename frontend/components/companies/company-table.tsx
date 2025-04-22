"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreHorizontal,
  ArrowUpDown,
  ChevronDown,
  Filter,
  Building2,
  Plus,
  Download,
  GitMerge,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"

interface CompanyTableProps {
  onSelectCompany: (id: string) => void
}

export function CompanyTable({ onSelectCompany }: CompanyTableProps) {
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  // Add search state
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const [companies, setCompanies] = useState<any[]>([])

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`https://localhost:7147/api/Company`)
        setCompanies(response.data.$values)
      } catch (error) {
        console.error("Error fetching companies:", error)
      }
    }

    fetchCompanies()
  }, [])

  const toggleRowExpand = (id: string) => {
    setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
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

  const renderCompanyRow = (company: any, level = 0) => {
    const hasChildren = company.children && company.children.length > 0
    const isExpanded = expandedRows.includes(company.id)

    return (
      <>
        <TableRow
          key={company.id}
          className="hover:bg-[#0f172a]/50 border-[#334155] cursor-pointer"
          onClick={() => onSelectCompany(company.id)}
        >
          <TableCell>
            <div className="flex items-center gap-3" style={{ paddingLeft: `${level * 24}px` }}>
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-[#94a3b8]"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleRowExpand(company.id)
                  }}
                >
                  <ChevronDown size={16} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </Button>
              )}
              {!hasChildren && level > 0 && <div className="w-6"></div>}
              <div className="h-10 w-10 rounded-md bg-[#0f172a] flex items-center justify-center text-[#6366f1]">
                <Building2 size={20} />
              </div>
              <div>
                <div className="font-medium text-[#f8fafc]">{company.name}</div>
                <div className="text-sm text-[#94a3b8]">{company.industry}</div>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Badge className={getStatusColor(company.status)}>{company.status}</Badge>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <span className="text-[#f8fafc]">{company.revenue}</span>
              {company.growth === "up" ? (
                <TrendingUp size={16} className="text-[#10b981]" />
              ) : (
                <TrendingDown size={16} className="text-[#ef4444]" />
              )}
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-[#94a3b8]" />
              <span className="text-[#f8fafc]">{company.employees}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#94a3b8]" />
              <span className="text-[#f8fafc]">{company.lastActivity}</span>
            </div>
          </TableCell>
          <TableCell className="p-2" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#94a3b8]">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1e293b] border-[#334155]">
                <DropdownMenuItem
                  className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                  onClick={() => onSelectCompany(company.id)}
                >
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#334155]" />
                <DropdownMenuItem className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                  Add Child Company
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#334155]" />
                <DropdownMenuItem className="text-red-500 focus:bg-[#334155] focus:text-red-500">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        {isExpanded &&
          hasChildren &&
          company.children.map((childId: string) => {
            const childCompany = companies.find((c) => c.id === childId)
            if (childCompany) {
              return renderCompanyRow(childCompany, level + 1)
            }
            return null
          })}
      </>
    )
  }

  // Filter top-level companies (those without parents)
  const topLevelCompanies = companies.filter((company) => !company.parent)

  // Filter companies based on search query
  const filteredCompanies = topLevelCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-[#f8fafc]">Company Management</CardTitle>
            <CardDescription className="text-[#94a3b8]">Manage your company relationships</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#94a3b8]" />
              <Input
                type="search"
                placeholder="Search companies..."
                className="pl-8 bg-[#0f172a] border-[#334155] text-[#f8fafc] w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="text-[#94a3b8] border-[#334155]">
                  <Filter size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1e293b] border-[#334155]">
                <DropdownMenuLabel className="text-[#f8fafc]">Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#334155]" />
                <DropdownMenuItem className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                  Status
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                  Industry
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                  Revenue
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white"
            onClick={() => {
              // This will trigger the company management component's add company modal
              const companyManagementTab = document.querySelector('[data-state="inactive"][value="companies"]')
              if (companyManagementTab) {
                ;(companyManagementTab as HTMLElement).click()
                // Set a timeout to allow the tab to activate
                setTimeout(() => {
                  const addCompanyButton = document.querySelector('button:has(.mr-2.h-4.w-4):contains("Add Company")')
                  if (addCompanyButton) {
                    ;(addCompanyButton as HTMLElement).click()
                  }
                }, 100)
              } else {
                toast({
                  title: "Add Company",
                  description: "Please navigate to the Companies tab to add a new company.",
                })
              }
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Button>
          <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
            <GitMerge className="mr-2 h-4 w-4" />
            Merge
          </Button>
        </div>
        <div className="rounded-md border border-[#334155]">
          <Table>
            <TableHeader className="bg-[#0f172a]">
              <TableRow className="hover:bg-[#0f172a]/80 border-[#334155]">
                <TableHead className="w-[300px]">
                  <div className="flex items-center gap-1 text-[#f8fafc]">
                    Company
                    <ArrowUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1 text-[#f8fafc]">
                    Status
                    <ChevronDown size={14} />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1 text-[#f8fafc]">
                    Revenue
                    <ArrowUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1 text-[#f8fafc]">
                    Employees
                    <ArrowUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1 text-[#f8fafc]">
                    Last Activity
                    <ArrowUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{filteredCompanies.map((company) => renderCompanyRow(company))}</TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
