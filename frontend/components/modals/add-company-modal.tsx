"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

interface AddCompanyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddCompany: (company: any) => void
}

export function AddCompanyModal({ open, onOpenChange, onAddCompany }: AddCompanyModalProps) {
  const [name, setName] = useState("")
  const [industry, setIndustry] = useState("")
  const [employees, setEmployees] = useState("")
  const [revenue, setRevenue] = useState("")
  const [status, setStatus] = useState("Client")
  const [website, setWebsite] = useState("")
  const [address, setAddress] = useState("")
  const [growth, setGrowth] = useState("up")

  const industries = [
    "Technology",
    "Manufacturing",
    "Healthcare",
    "Finance",
    "Retail",
    "Education",
    "Energy",
    "Transportation",
    "Entertainment",
    "Consulting",
  ]

  const employeeSizes = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5001-10000", "10000+"]

  const revenueRanges = [
    "Under $1M",
    "$1M-$5M",
    "$5M-$10M",
    "$10M-$25M",
    "$25M-$50M",
    "$50M-$100M",
    "$100M-$500M",
    "$500M-$1B",
    "$1B+",
  ]

  const handleSubmit = () => {
    if (!name || !industry) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newCompany = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      industry,
      employees: employees || "Unknown",
      revenue: revenue || "Unknown",
      status,
      website,
      address,
      growth,
      customers: Math.floor(Math.random() * 10) + 1,
      lastActivity: new Date().toISOString().split("T")[0],
    }

    onAddCompany(newCompany)
    resetForm()
  }

  const resetForm = () => {
    setName("")
    setIndustry("")
    setEmployees("")
    setRevenue("")
    setStatus("Client")
    setWebsite("")
    setAddress("")
    setGrowth("up")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1e293b] border-[#334155] text-[#f8fafc] sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
          <DialogDescription className="text-[#94a3b8]">
            Fill in the details to add a new company to your CRM.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#f8fafc]">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Acme Inc."
                className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-[#f8fafc]">
                Industry <span className="text-red-500">*</span>
              </Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-[#334155]">
                  {industries.map((industry) => (
                    <SelectItem
                      key={industry}
                      value={industry}
                      className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                    >
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employees" className="text-[#f8fafc]">
                Number of Employees
              </Label>
              <Select value={employees} onValueChange={setEmployees}>
                <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-[#334155]">
                  {employeeSizes.map((size) => (
                    <SelectItem
                      key={size}
                      value={size}
                      className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                    >
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="revenue" className="text-[#f8fafc]">
                Annual Revenue
              </Label>
              <Select value={revenue} onValueChange={setRevenue}>
                <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
                  <SelectValue placeholder="Select revenue" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-[#334155]">
                  {revenueRanges.map((range) => (
                    <SelectItem
                      key={range}
                      value={range}
                      className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                    >
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-[#f8fafc]">
                Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-[#334155]">
                  <SelectItem value="Client" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                    Client
                  </SelectItem>
                  <SelectItem value="Prospect" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                    Prospect
                  </SelectItem>
                  <SelectItem value="Vendor" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                    Vendor
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="growth" className="text-[#f8fafc]">
                Growth Trend
              </Label>
              <Select value={growth} onValueChange={setGrowth}>
                <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
                  <SelectValue placeholder="Select trend" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-[#334155]">
                  <SelectItem value="up" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                    Growing
                  </SelectItem>
                  <SelectItem value="down" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                    Declining
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website" className="text-[#f8fafc]">
              Website
            </Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="www.example.com"
              className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="text-[#f8fafc]">
              Address
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Business St, City, State, ZIP"
              className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetForm()
              onOpenChange(false)
            }}
            className="border-[#334155] text-[#f8fafc]"
          >
            Cancel
          </Button>
          <Button className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white" onClick={handleSubmit}>
            Add Company
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
