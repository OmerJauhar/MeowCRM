"use client"

import { useState, useEffect } from "react"
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
import {
  Search,
  MoreHorizontal,
  ArrowUpDown,
  ChevronDown,
  Filter,
  X,
  Plus,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  status: string;
  lastContact: string;
  customerValue: number;
}

interface CustomerTableProps {
  onSelectCustomer: (id: string) => void
}

export function CustomerTable({ onSelectCustomer }: CustomerTableProps) {
  const [customers, setCustomers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const { toast } = useToast()

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://localhost:7147/api/Customer`)
        
        // Format the customer data
        const customersData = response.data.$values.map((customer: any) => ({
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          fullName: `${customer.firstName} ${customer.lastName}`,
          email: customer.email,
          phone: customer.phone,
          status: customer.status,
          customerValue: customer.customerValue,
          company: customer.company?.name || "N/A",
          position: customer.position || "N/A",
          createDate: new Date(customer.createDate).toLocaleDateString()
        }))
        
        setCustomers(customersData)
      } catch (error) {
        console.error("Error fetching customers:", error)
        toast({
          title: "Error",
          description: "Failed to load customers. Please try again later.",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [toast])

  // Filter the customers based on search query
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  
  // Get customers for current page
  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
                className="pl-8 bg-[#0f172a] border-[#334155] text-[#f8fafc] w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white"
              onClick={() => {
                toast({
                  title: "Add Customer",
                  description: "Feature not implemented yet.",
                })
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-[#334155]">
          <Table>
            <TableHeader className="bg-[#0f172a]">
              <TableRow className="hover:bg-[#0f172a]/80 border-[#334155]">
                <TableHead>
                  <div className="flex items-center gap-1 text-[#f8fafc]">
                    Customer
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
                    Email
                    <ArrowUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead className="hidden xl:table-cell">
                  <div className="flex items-center gap-1 text-[#f8fafc]">
                    Status
                    <ChevronDown size={14} />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1 text-[#f8fafc]">
                    Value
                    <ArrowUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-[#94a3b8]">
                    Loading customers...
                  </TableCell>
                </TableRow>
              ) : currentCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-[#94a3b8]">
                    No customers found.
                  </TableCell>
                </TableRow>
              ) : (
                currentCustomers.map((customer) => (
                  <TableRow 
                    key={customer.id} 
                    className="hover:bg-[#0f172a]/50 border-[#334155] cursor-pointer"
                    onClick={() => onSelectCustomer(customer.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#0f172a] flex items-center justify-center text-[#6366f1]">
                          {customer.firstName?.charAt(0) || ''}{customer.lastName?.charAt(0) || ''}
                        </div>
                        <div>
                          <div className="font-medium text-[#f8fafc]">{customer.fullName}</div>
                          <div className="text-sm text-[#94a3b8]">{customer.position}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-[#f8fafc]">{customer.company}</TableCell>
                    <TableCell className="hidden lg:table-cell text-[#f8fafc]">{customer.email}</TableCell>
                    <TableCell className="hidden xl:table-cell">
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
                    <TableCell className="text-[#f8fafc]">
                      ${(customer.customerValue || 0).toLocaleString()}
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
                            onClick={() => onSelectCustomer(customer.id)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
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
            {currentCustomers.length}
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
              }
            }}
            disabled={currentPage === 1 || loading}
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
              }
            }}
            disabled={currentPage === totalPages || loading}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
