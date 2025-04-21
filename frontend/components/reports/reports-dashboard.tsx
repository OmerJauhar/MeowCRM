"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, PieChart, LineChart, Download, Share2 } from "lucide-react"
import { KeyMetricCard } from "@/components/reports/key-metric-card"
import { SalesFunnel } from "@/components/reports/sales-funnel"
import { AIInsights } from "@/components/reports/ai-insights"

export function ReportsDashboard() {
  const [dateRange, setDateRange] = useState("last30days")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#f8fafc]">Reports & Analytics</h2>
          <p className="text-[#94a3b8]">Track performance and identify trends</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="bg-[#0f172a] border-[#334155] text-[#f8fafc] w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e293b] border-[#334155]">
              <SelectItem value="last7days" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Last 7 Days
              </SelectItem>
              <SelectItem value="last30days" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Last 30 Days
              </SelectItem>
              <SelectItem value="last90days" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Last 90 Days
              </SelectItem>
              <SelectItem value="thisyear" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                This Year
              </SelectItem>
              <SelectItem value="custom" className="text-[#f8fafc] focus:bg-[#334155] focus:text-[#f8fafc]">
                Custom Range
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="border-[#334155] text-[#f8fafc]">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KeyMetricCard
          title="Total Revenue"
          value="$842,245"
          change="+18%"
          trend="up"
          icon={<BarChart3 className="h-4 w-4 text-[#6366f1]" />}
          sparklineData={[35, 60, 45, 50, 55, 70, 90]}
        />
        <KeyMetricCard
          title="New Customers"
          value="128"
          change="+12%"
          trend="up"
          icon={<LineChart className="h-4 w-4 text-[#10b981]" />}
          sparklineData={[20, 40, 30, 50, 45, 60, 70]}
        />
        <KeyMetricCard
          title="Conversion Rate"
          value="24.8%"
          change="+2.3%"
          trend="up"
          icon={<PieChart className="h-4 w-4 text-[#f59e0b]" />}
          sparklineData={[25, 23, 22, 20, 22, 24, 25]}
        />
        <KeyMetricCard
          title="Avg. Deal Size"
          value="$32,500"
          change="-5%"
          trend="down"
          icon={<BarChart3 className="h-4 w-4 text-[#ef4444]" />}
          sparklineData={[40, 35, 30, 25, 30, 35, 30]}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-[#1e293b] border border-[#334155]">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#0f172a] data-[state=active]:text-[#f8fafc]">
            Overview
          </TabsTrigger>
          <TabsTrigger value="sales" className="data-[state=active]:bg-[#0f172a] data-[state=active]:text-[#f8fafc]">
            Sales
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className="data-[state=active]:bg-[#0f172a] data-[state=active]:text-[#f8fafc]"
          >
            Customers
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className="data-[state=active]:bg-[#0f172a] data-[state=active]:text-[#f8fafc]"
          >
            Activities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#f8fafc]">Revenue Trends</CardTitle>
                  <CardDescription className="text-[#94a3b8]">Monthly revenue for the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center text-[#94a3b8]">
                      <BarChart3 size={48} className="mx-auto mb-2 text-[#6366f1]" />
                      <p>Revenue chart visualization would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#f8fafc]">Sales Funnel</CardTitle>
                  <CardDescription className="text-[#94a3b8]">Conversion through sales stages</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesFunnel
                    stages={[
                      { name: "Leads", value: 1200 },
                      { name: "Qualified", value: 900 },
                      { name: "Proposals", value: 600 },
                      { name: "Negotiations", value: 300 },
                      { name: "Closed", value: 150 },
                    ]}
                  />
                </CardContent>
                <CardFooter>
                  <div className="w-full text-center">
                    <p className="text-sm text-[#94a3b8]">
                      Conversion Rate: <span className="text-[#f8fafc] font-medium">12.5%</span>
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#f8fafc]">Top Performing Companies</CardTitle>
                  <CardDescription className="text-[#94a3b8]">By revenue contribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 bg-[#6366f1] rounded-full"></div>
                          <span className="text-sm font-medium text-[#f8fafc]">Stark Industries</span>
                        </div>
                        <span className="text-sm text-[#f8fafc]">$350,000</span>
                      </div>
                      <div className="h-2 w-full bg-[#0f172a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#6366f1]" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 bg-[#10b981] rounded-full"></div>
                          <span className="text-sm font-medium text-[#f8fafc]">Globex Corp</span>
                        </div>
                        <span className="text-sm text-[#f8fafc]">$215,000</span>
                      </div>
                      <div className="h-2 w-full bg-[#0f172a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#10b981]" style={{ width: "61%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 bg-[#f59e0b] rounded-full"></div>
                          <span className="text-sm font-medium text-[#f8fafc]">Acme Corporation</span>
                        </div>
                        <span className="text-sm text-[#f8fafc]">$125,000</span>
                      </div>
                      <div className="h-2 w-full bg-[#0f172a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#f59e0b]" style={{ width: "36%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 bg-[#ef4444] rounded-full"></div>
                          <span className="text-sm font-medium text-[#f8fafc]">Umbrella Corp</span>
                        </div>
                        <span className="text-sm text-[#f8fafc]">$98,000</span>
                      </div>
                      <div className="h-2 w-full bg-[#0f172a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#ef4444]" style={{ width: "28%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 bg-[#94a3b8] rounded-full"></div>
                          <span className="text-sm font-medium text-[#f8fafc]">Wayne Enterprises</span>
                        </div>
                        <span className="text-sm text-[#f8fafc]">$54,000</span>
                      </div>
                      <div className="h-2 w-full bg-[#0f172a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#94a3b8]" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <AIInsights />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#f8fafc]">Sales Performance</CardTitle>
              <CardDescription className="text-[#94a3b8]">Detailed sales metrics and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <div className="text-center text-[#94a3b8]">
                  <LineChart size={48} className="mx-auto mb-2 text-[#6366f1]" />
                  <p>Sales performance chart would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#f8fafc]">Customer Analytics</CardTitle>
              <CardDescription className="text-[#94a3b8]">Customer acquisition and retention metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <div className="text-center text-[#94a3b8]">
                  <PieChart size={48} className="mx-auto mb-2 text-[#6366f1]" />
                  <p>Customer analytics visualization would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card className="bg-[#1e293b] border-[#334155] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#f8fafc]">Activity Metrics</CardTitle>
              <CardDescription className="text-[#94a3b8]">Analysis of customer interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <div className="text-center text-[#94a3b8]">
                  <BarChart3 size={48} className="mx-auto mb-2 text-[#6366f1]" />
                  <p>Activity metrics visualization would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
