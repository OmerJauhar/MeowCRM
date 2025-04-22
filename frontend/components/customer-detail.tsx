"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Mail, Phone, Building, Calendar, Edit, MessageSquare, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"

interface CustomerDetailProps {
  customerId: string
  onClose: () => void
}

export function CustomerDetail({ customerId, onClose }: CustomerDetailProps) {
  const [customer, setCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://localhost:7147/api/Customer/${customerId}`)
        // Format the customer data
        const customerData = {
          id: response.data.id,
          name: `${response.data.firstName} ${response.data.lastName}`,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone,
          company: response.data.company.name,
          position: response.data.position,
          status: response.data.status,
          lastContact: new Date(response.data.createDate).toLocaleDateString(),
          value: response.data.customerValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          customerValue: response.data.customerValue,
          notes: response.data.notes.$values && response.data.notes.$values.length > 0 
            ? response.data.notes.$values.map((note: any) => note.content).join('\n\n')
            : "No notes available for this customer.",
          activities: response.data.activities.$values || []
        }
        
        setCustomer(customerData)
      } catch (error) {
        console.error("Error fetching customer details:", error)
      } finally {
        setLoading(false)
      }
    }

    if (customerId) {
      fetchCustomer()
    }
  }, [customerId])

  if (loading) {
    return (
      <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#f8fafc]">Loading customer details...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (!customer) {
    return (
      <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#f8fafc]">Customer not found</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button onClick={onClose} variant="outline" className="border-[#334155] text-[#f8fafc]">
            Close
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-[#f8fafc]">Customer Details</CardTitle>
          <CardDescription className="text-[#94a3b8]">View and manage customer information</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-[#94a3b8]">
            <X size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`/placeholder.svg?height=64&width=64`} />
            <AvatarFallback className="bg-[#6366f1] text-lg">
              {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-[#f8fafc]">{customer.name}</h3>
            <p className="text-sm text-[#94a3b8]">
              {customer.position} at {customer.company}
            </p>
            <div className="flex items-center gap-2 pt-1">
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
              <Badge className="bg-[#6366f1] hover:bg-[#6366f1]/80">{customer.value}</Badge>
            </div>
          </div>
        </div>

        <Separator className="bg-[#334155]" />

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[#f8fafc]">Contact Information</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail size={16} className="text-[#94a3b8]" />
              <span className="text-[#f8fafc]">{customer.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-[#94a3b8]" />
              <span className="text-[#f8fafc]">{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building size={16} className="text-[#94a3b8]" />
              <span className="text-[#f8fafc]">{customer.company}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-[#94a3b8]" />
              <span className="text-[#f8fafc]">Last Contact: {customer.lastContact}</span>
            </div>
          </div>
        </div>

        <Separator className="bg-[#334155]" />

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[#f8fafc]">Notes</h4>
          <p className="text-sm text-[#f8fafc] bg-[#0f172a] p-3 rounded-md whitespace-pre-line">{customer.notes}</p>
          <Button variant="outline" size="sm" className="border-[#334155] text-[#94a3b8]">
            <Edit size={14} className="mr-2" />
            Edit Notes
          </Button>
        </div>

        <Separator className="bg-[#334155]" />

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[#f8fafc]">Recent Activities</h4>
          <div className="space-y-3">
            {customer.activities.length === 0 ? (
              <p className="text-sm text-[#94a3b8] bg-[#0f172a] p-3 rounded-md">No recent activities</p>
            ) : (
              customer.activities.map((activity: any) => (
                <div key={activity.id} className="flex items-start gap-3 bg-[#0f172a] p-3 rounded-md">
                  <div className="mt-0.5">
                    {activity.type === "Email" ? (
                      <Mail size={16} className="text-[#6366f1]" />
                    ) : activity.type === "Meeting" ? (
                      <MessageSquare size={16} className="text-[#10b981]" />
                    ) : (
                      <Clock size={16} className="text-[#94a3b8]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <p className="text-sm font-medium text-[#f8fafc]">{activity.description}</p>
                      <span className="text-xs text-[#94a3b8]">{new Date(activity.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <Button className="w-full bg-[#0f172a] hover:bg-[#0f172a]/80 text-[#f8fafc]">View All Activities</Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-[#334155] pt-6">
        <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
          <Phone size={16} className="mr-2" />
          Call
        </Button>
        <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
          <Mail size={16} className="mr-2" />
          Email
        </Button>
        <Button className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white">
          <Calendar size={16} className="mr-2" />
          Schedule
        </Button>
      </CardFooter>
    </Card>
  )
}
