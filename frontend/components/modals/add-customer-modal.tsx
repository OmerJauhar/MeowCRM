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

interface AddCustomerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddCustomer: (customer: any) => void
}

export function AddCustomerModal({ open, onOpenChange, onAddCustomer }: AddCustomerModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState("Active")
  const [value, setValue] = useState("")

  // Sample companies for dropdown
  const companies = [
    { id: "1", name: "Acme Inc." },
    { id: "2", name: "Globex Corp" },
    { id: "3", name: "Stark Industries" },
    { id: "4", name: "Umbrella Corp" },
    { id: "5", name: "Wayne Enterprises" },
  ]

  const handleSubmit = () => {
    if (!name || !email || !company) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newCustomer = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      company,
      position,
      phone,
      status,
      value: value ? `$${value}` : "$0",
      lastContact: new Date().toISOString().split("T")[0],
    }

    onAddCustomer(newCustomer)
    resetForm()
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setCompany("")
    setPosition("")
    setPhone("")
    setStatus("Active")
    setValue("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1e293b] border-[#334155] text-[#f8fafc] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription className="text-[#94a3b8]">
            Fill in the details to add a new customer to your CRM.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#f8fafc]">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#f8fafc]">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.smith@example.com"
                className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-[#f8fafc]">
                Company <span className="text-red-500">*</span>
              </Label>
              <Select value={company} onValueChange={setCompany}>
                <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-[#334155]">
                  {companies.map((company) => (
                    <SelectItem
                      key={company.id}
                      value={company.name}
                      className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                    >
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="position" className="text-[#f8fafc]">
                Position
              </Label>
              <Input
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Marketing Director"
                className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#f8fafc]">
                Phone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-[#f8fafc]">
                Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-[#334155]">
                  <SelectItem value="Active" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                    Active
                  </SelectItem>
                  <SelectItem value="Inactive" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                    Inactive
                  </SelectItem>
                  <SelectItem value="Lead" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                    Lead
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value" className="text-[#f8fafc]">
              Customer Value
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-[#94a3b8]">$</span>
              <Input
                id="value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0.00"
                className="bg-[#0f172a] border-[#334155] text-[#f8fafc] pl-7"
              />
            </div>
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
            Add Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
