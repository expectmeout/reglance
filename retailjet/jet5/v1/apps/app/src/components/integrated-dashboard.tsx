"use client"

import { useState } from "react"
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/tabs"

// Import our components
import dynamic from 'next/dynamic'

// Dynamically import to avoid circular dependencies and improve load time
const AmazonSellerDashboardMetrics = dynamic(
  () => import('@/components/amazon-seller-dashboard-metrics'),
  { ssr: false }
)

const ProductPerformance = dynamic(
  () => import('@/components/product-performance'),
  { ssr: false }
)

const CohortAnalysis = dynamic(
  () => import('@/components/cohort-analysis'),
  { ssr: false }
)

// Import our new tab content components
const InventoryTabContent = dynamic(
  () => import('@/components/inventory-tab-content').then((mod) => mod.InventoryTabContent),
  { ssr: false }
)

const MarketingTabContent = dynamic(
  () => import('@/components/marketing-tab-content').then((mod) => mod.MarketingTabContent),
  { ssr: false }
)

export default function AmazonSellerDashboard(): JSX.Element {
  // State to track the current dashboard tab
  const [activeTab, setActiveTab] = useState<string>("metrics")

  return (
    <div className="space-y-4">
      {/* Performance Dashboard Tabs */}
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={setActiveTab} 
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        {/* Key Metrics Tab */}
        <TabsContent value="metrics" className="space-y-4">
          <AmazonSellerDashboardMetrics />
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <ProductPerformance />
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <CohortAnalysis />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Acquisition Card */}
            <CustomerMetricsCard 
              title="Customer Acquisition" 
              metrics={[
                { name: "Acquisition Cost", value: "$18.42", change: -1.2 },
                { name: "Conversion Rate", value: "4.8%", change: 0.3 },
                { name: "Landing Page CTR", value: "3.2%", change: 0.5 },
                { name: "Average Session Duration", value: "2m 45s", change: 0.8 }
              ]}
            />
            
            {/* Customer Retention Card */}
            <CustomerMetricsCard 
              title="Customer Retention" 
              metrics={[
                { name: "Repeat Purchase Rate", value: "32.5%", change: 2.8 },
                { name: "Customer Lifetime Value", value: "$184.50", change: 5.2 },
                { name: "Churn Rate", value: "4.2%", change: -0.7 },
                { name: "Average Order Value", value: "$57.20", change: 3.1 }
              ]}
            />
          </div>
        </TabsContent>

        {/* Inventory Tab - Using our new component */}
        <InventoryTabContent />

        {/* Marketing Tab - Using our new component */}
        <MarketingTabContent />
      </Tabs>
    </div>
  )
}

// Customer Metrics Card Component
interface CustomerMetric {
  name: string;
  value: string;
  change: number;
}

interface CustomerMetricsCardProps {
  title: string;
  metrics: CustomerMetric[];
}

function CustomerMetricsCard({ title, metrics }: CustomerMetricsCardProps): JSX.Element {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="mt-4 space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{metric.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{metric.value}</span>
                <span className={`text-xs ${metric.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change > 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}