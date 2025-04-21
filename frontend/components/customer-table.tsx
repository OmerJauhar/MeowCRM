"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, ArrowUpDown, ChevronDown, Filter, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
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

interface CustomerTableProps {
  onSelectCustomer: (id: string) => void
  customers: Array<{ id: string; firstName: string; lastName: string; email: string; company: string; status: string; lastContact: string; customerValue: number; }>
}

export function CustomerTable({ onSelectCustomer, customers }: CustomerTableProps) {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()
  const itemsPerPage = 5

  // Add filter states
  const [minValue, setMinValue] = useState("")
  const [maxValue, setMaxValue] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [isFilterActive, setIsFilterActive] = useState(false)

  // Add edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [customerToEdit, setCustomerToEdit] = useState<any>(null)

  // Filter the customers based on the filter criteria
  const filteredCustomers = customers.filter((customer) => {
    // Parse the customer value (remove $ and commas)
    const customerValueNum = customer.customerValue

    // Check minimum value filter
    if (minValue && !isNaN(Number.parseFloat(minValue)) && customerValueNum < Number.parseFloat(minValue)) {
      return false
    }

    // Check maximum value filter
    if (maxValue && !isNaN(Number.parseFloat(maxValue)) && customerValueNum > Number.parseFloat(maxValue)) {
      return false
    }

    // Check status filter
    if (statusFilter && customer.status !== statusFilter) {
      return false
    }

    return true
  })

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)

  const toggleCustomer = (id: string) => {
    setSelectedCustomers((prev) => (prev.includes(id) ? prev.filter((customerId) => customerId !== id) : [...prev, id]))
  }

  const toggleAllCustomers = () => {
    setSelectedCustomers((prev) =>
      prev.length === filteredCustomers.length ? [] : filteredCustomers.map((customer) => customer.id),
    )
  }

  const applyFilters = () => {
    setIsFilterActive(!!minValue || !!maxValue || !!statusFilter)
    setShowFilters(false)
    setCurrentPage(1) // Reset to first page when filters change

    toast({
      title: "Filters Applied",
      description: "Customer list has been filtered based on your criteria.",
    })
  }

  const clearFilters = () => {
    setMinValue("")
    setMaxValue("")
    setStatusFilter(null)
    setIsFilterActive(false)
    setCurrentPage(1) // Reset to first page when filters are cleared

    toast({
      title: "Filters Cleared",
      description: "All filters have been removed.",
    })
  }

  const handleEditCustomer = (customer: any) => {
    setCustomerToEdit(customer)
    setEditModalOpen(true)
  }

  const saveCustomerEdit = () => {
    // In a real app, you would update the customer in your database
    toast({
      title: "Customer Updated",
      description: `${customerToEdit.firstName} ${customerToEdit.lastName}'s information has been updated.`,
    })
    setEditModalOpen(false)
  }

  return (
    <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-[#f8fafc]">Customer Management</CardTitle>
            <CardDescription className="text-[#94a3b8]">Manage your customer relationships</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#94a3b8]" />
              <Input
                type="search"
                placeholder="Search customers..."
                className="pl-8 bg-[#0f172a] border-[#334155] text-[#f8fafc] w-full md:w-[200px] lg:w-[300px]"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className={`text-[#94a3b8] border-[#334155] ${isFilterActive ? "bg-[#6366f1]/20" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
            </Button>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute right-0 top-16 z-10 mt-2 w-72 rounded-md bg-[#1e293b] border border-[#334155] shadow-lg">
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-[#f8fafc]">Filter Customers</h3>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowFilters(false)}>
                      <X size={14} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status-filter" className="text-[#f8fafc]">
                      Status
                    </Label>
                    <Select
                      value={statusFilter || ""}
                      onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
                    >
                      <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e293b] border-[#334155]">
                        <SelectItem value="all" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                          All Statuses
                        </SelectItem>
                        <SelectItem value="Active" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                          Active
                        </SelectItem>
                        <SelectItem value="Inactive" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                          Inactive
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="min-value" className="text-[#f8fafc]">
                      Minimum Value ($)
                    </Label>
                    <Input
                      id="min-value"
                      type="number"
                      placeholder="0"
                      value={minValue}
                      onChange={(e) => setMinValue(e.target.value)}
                      className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-value" className="text-[#f8fafc]">
                      Maximum Value ($)
                    </Label>
                    <Input
                      id="max-value"
                      type="number"
                      placeholder="1000000"
                      value={maxValue}
                      onChange={(e) => setMaxValue(e.target.value)}
                      className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                    />
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button variant="outline" className="border-[#334155] text-[#f8fafc]" onClick={clearFilters}>
                      Clear
                    </Button>
                    <Button className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white" onClick={applyFilters}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Filter Indicators */}
        {isFilterActive && (
          <div className="flex flex-wrap gap-2 mt-4">
            {statusFilter && (
              <Badge className="bg-[#6366f1] hover:bg-[#6366f1]/80 flex items-center gap-1">
                Status: {statusFilter}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0 text-white hover:bg-transparent"
                  onClick={() => {
                    setStatusFilter(null)
                    setIsFilterActive(!!minValue || !!maxValue)
                  }}
                >
                  <X size={10} />
                </Button>
              </Badge>
            )}

            {minValue && (
              <Badge className="bg-[#6366f1] hover:bg-[#6366f1]/80 flex items-center gap-1">
                Min: ${minValue}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0 text-white hover:bg-transparent"
                  onClick={() => {
                    setMinValue("")
                    setIsFilterActive(!!maxValue || !!statusFilter)
                  }}
                >
                  <X size={10} />
                </Button>
              </Badge>
            )}

            {maxValue && (
              <Badge className="bg-[#6366f1] hover:bg-[#6366f1]/80 flex items-center gap-1">
                Max: ${maxValue}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0 text-white hover:bg-transparent"
                  onClick={() => {
                    setMaxValue("")
                    setIsFilterActive(!!minValue || !!statusFilter)
                  }}
                >
                  <X size={10} />
                </Button>
              </Badge>
            )}

            <Button
              variant="outline"
              size="sm"
              className="h-6 border-[#334155] text-[#94a3b8] text-xs"
              onClick={clearFilters}
            >
              Clear All
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-[#334155]">
          <Table>
            <TableHeader className="bg-[#0f172a]">
              <TableRow className="hover:bg-[#0f172a]/80 border-[#334155]">
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                    onCheckedChange={toggleAllCustomers}
                    className="border-[#334155]"
                  />
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1 text-[#f8fafc]">
                    Name
                    <ArrowUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <div className="flex items-center gap-1 text-[#f8fafc]">
                    Company
                    <ArrowUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  <div className="flex items-center gap-1 text-[#f8fafc]">
                    Status
                    <ChevronDown size={14} />
                  </div>
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  <div className="flex items-center gap-1 text-[#f8fafc]">
                    Value
                    <ArrowUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-[#94a3b8]">
                    No customers match your filter criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((customer) => (
                    <TableRow
                      key={customer.id}
                      className="hover:bg-[#0f172a]/50 border-[#334155] cursor-pointer"
                      onClick={() => onSelectCustomer(customer.id)}
                    >
                      <TableCell className="p-2" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedCustomers.includes(customer.id)}
                          onCheckedChange={() => toggleCustomer(customer.id)}
                          className="border-[#334155]"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-[#f8fafc]">{customer.firstName} {customer.lastName}</div>
                          <div className="text-sm text-[#94a3b8]">{customer.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-[#f8fafc]">{customer.company}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge
                          variant={customer.status === "Active" ? "default" : "secondary"}
                          className={
                            customer.status === "Active"
                              ? "bg-[#10b981] hover:bg-[#10b981]/80"
                              : "bg-[#94a3b8] hover:bg-[#94a3b8]/80"
                          }
                        >
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-[#f8fafc]">{customer.customerValue.toLocaleString()}</TableCell>
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
                              onClick={() => onSelectCustomer(customer.id)}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditCustomer(customer)
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-[#334155]" />
                            <DropdownMenuItem className="text-red-500 focus:bg-[#334155] focus:text-red-500">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between py-4">
        <div className="text-sm text-[#94a3b8]">
          Showing{" "}
          <span className="font-medium text-[#f8fafc]">
            {filteredCustomers.length === 0
              ? 0
              : Math.min(itemsPerPage, filteredCustomers.length - (currentPage - 1) * itemsPerPage)}
          </span>{" "}
          of <span className="font-medium text-[#f8fafc]">{filteredCustomers.length}</span> customers
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[#334155] text-[#f8fafc]"
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
                toast({
                  title: "Previous Page",
                  description: `Showing page ${currentPage - 1} of ${totalPages}`,
                })
              }
            }}
            disabled={currentPage === 1 || filteredCustomers.length === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-[#334155] text-[#f8fafc]"
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1)
                toast({
                  title: "Next Page",
                  description: `Showing page ${currentPage + 1} of ${totalPages}`,
                })
              }
            }}
            disabled={currentPage === totalPages || filteredCustomers.length === 0}
          >
            Next
          </Button>
        </div>
      </CardFooter>

      {/* Edit Customer Modal */}
      {customerToEdit && (
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="bg-[#1e293b] border-[#334155] text-[#f8fafc] sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
              <DialogDescription className="text-[#94a3b8]">Update customer information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name" className="text-[#f8fafc]">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-name"
                    value={customerToEdit.firstName}
                    onChange={(e) => setCustomerToEdit({ ...customerToEdit, firstName: e.target.value })}
                    className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email" className="text-[#f8fafc]">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={customerToEdit.email}
                    onChange={(e) => setCustomerToEdit({ ...customerToEdit, email: e.target.value })}
                    className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-company" className="text-[#f8fafc]">
                    Company <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-company"
                    value={customerToEdit.company}
                    onChange={(e) => setCustomerToEdit({ ...customerToEdit, company: e.target.value })}
                    className="bg-[#0f172a] border-[#334155] text-[#f8fafc]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status" className="text-[#f8fafc]">
                    Status
                  </Label>
                  <Select
                    value={customerToEdit.status}
                    onValueChange={(value) => setCustomerToEdit({ ...customerToEdit, status: value })}
                  >
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
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-value" className="text-[#f8fafc]">
                  Customer Value
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-[#94a3b8]">$</span>
                  <Input
                    id="edit-value"
                    value={customerToEdit.customerValue.toLocaleString()}
                    onChange={(e) => setCustomerToEdit({ ...customerToEdit, customerValue: Number.parseFloat(e.target.value) })}
                    className="bg-[#0f172a] border-[#334155] text-[#f8fafc] pl-7"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditModalOpen(false)}
                className="border-[#334155] text-[#f8fafc]"
              >
                Cancel
              </Button>
              <Button className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white" onClick={saveCustomerEdit}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
