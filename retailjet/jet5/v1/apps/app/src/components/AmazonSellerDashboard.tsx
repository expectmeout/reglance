"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/tabs"
import { useSearchParams } from "next/navigation"

// Dynamically import components to improve loading performance
import dynamic from 'next/dynamic'
import { CustomerMetricsCard } from "@/components/customer-metrics-card"
import { CustomerCostChart2 } from "@/components/customers/customer-cost-chart"
import { CustomerValueChart2 } from "@/components/customers/customer-value-chart"
import { ConversionSegment2 } from "@/components/customers/customer-segment-performance"
import { CvrFunnelBarChart } from "@/components/customers/cvr-funnel-barchart"

// Dynamically import to avoid circular dependencies and improve load time
const ProductPerformance = dynamic(
  () => import('@/components/product-performance'),
  { ssr: false }
)

const CohortAnalysis = dynamic(
  () => import('@/components/cohort-analysis').then(mod => mod.default || mod),
  { 
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-muted/20 rounded-md animate-pulse" />,
  }
)

// Import our tab content components
const InventoryTabContent = dynamic(
  () => import('@/components/inventory-tab-content').then((mod) => mod.default),
  { ssr: false }
)

const MarketingTabContent = dynamic(
  () => import('@/components/marketing-tab-content').then((mod) => mod.MarketingTabContent),
  { ssr: false }
)

export default function AmazonSellerDashboard({ defaultTab = "customers" }) {
  const searchParams = useSearchParams()
  
  // Use a ref to track initialization to prevent unwanted re-renders
  const initializedRef = useRef(false)
  
  // Set the initial active tab based on the defaultTab prop or URL parameter
  const [activeTab, setActiveTab] = useState(defaultTab)
  
  // Track component mounting separately from tab state
  const [mounted, setMounted] = useState(false)

  // Handle initialization and URL parameter updates
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
      setMounted(true)
      
      // Check for subtab in URL params to set initial state
      const subtabParam = searchParams?.get('subtab')
      if (subtabParam && ["customers", "marketing", "products"].includes(subtabParam)) {
        setActiveTab(subtabParam)
      } else if (defaultTab) {
        setActiveTab(defaultTab)
      }
    }
    
    // Listen for custom tab change events
    const handleTabChange = (event: CustomEvent<{ tab: string; subtab?: string }>) => {
      if (event.detail && event.detail.subtab) {
        // Only update if it's a subtab within analytics section
        setActiveTab(event.detail.subtab)
      }
    }
    
    // Add event listener
    window.addEventListener('tabchange', handleTabChange as EventListener)
    
    // Cleanup function to prevent memory leaks
    return () => {
      window.removeEventListener('tabchange', handleTabChange as EventListener)
    }
  }, [defaultTab, searchParams])

  // Update the tab when defaultTab prop changes
  useEffect(() => {
    if (defaultTab && mounted) {
      setActiveTab(defaultTab)
    }
  }, [defaultTab, mounted])

  // Handle tab change from UI interactions
  const handleTabChange = (value: string) => {
    if (mounted) {
      setActiveTab(value)
    }
  }

  // Render a placeholder during initial load
  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-[400px] bg-muted/20 rounded-md animate-pulse mb-4" />
        <div className="h-[500px] w-full bg-muted/20 rounded-md animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Performance Dashboard Tabs */}
      <Tabs 
        value={activeTab}
        onValueChange={handleTabChange} 
        className="space-y-4"
      >
        <TabsList className="grid max-w-[500px] w-full mx-0 grid-cols-2 gap-1 sm:gap-2">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <ProductPerformance />
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          {/* Only render when this tab is active to prevent unnecessary work */}
          {activeTab === "customers" && (
            <>
              <CohortAnalysis />
              
              {/* Customer analytics charts */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Customer Acquisition Cost Trend */}
                <CustomerCostChart2 />

                {/* Customer LTV by Channel */}
                <CustomerValueChart2 />

                {/* Conversion Segment */}
                <ConversionSegment2 />

                {/* CVR Funnel Bar Chart */}
                <CvrFunnelBarChart />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customer Acquisition Card */}
                <CustomerMetricsCard 
                  title="Customer Acquisition" 
                  metrics={[
                    { name: "Acquisition Cost", value: 18.42, prefix: "$", trend: 1.2, trendDirection: "down", trendLabel: "vs last month" },
                    { name: "Conversion Rate", value: 4.8, suffix: "%", trend: 0.3, trendDirection: "up", trendLabel: "vs last month" },
                    { name: "Landing Page CTR", value: 3.2, suffix: "%", trend: 0.5, trendDirection: "up", trendLabel: "vs last month" },
                    { name: "Average Session Duration", value: 2.75, suffix: "m", trend: 0.8, trendDirection: "up", trendLabel: "vs last month" }
                  ]}
                />
                
                {/* Customer Retention Card */}
                <CustomerMetricsCard 
                  title="Customer Retention" 
                  metrics={[
                    { name: "Repeat Purchase Rate", value: 32.5, suffix: "%", trend: 2.8, trendDirection: "up", trendLabel: "vs last month" },
                    { name: "Customer Lifetime Value", value: 184.50, prefix: "$", trend: 5.2, trendDirection: "up", trendLabel: "vs last month" },
                    { name: "Churn Rate", value: 4.2, suffix: "%", trend: 0.7, trendDirection: "down", trendLabel: "vs last month" },
                    { name: "Average Order Value", value: 57.20, prefix: "$", trend: 3.1, trendDirection: "up", trendLabel: "vs last month" }
                  ]}
                />
              </div>
            </>
          )}
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <InventoryTabContent />
        </TabsContent>

        {/* Marketing Tab */}
        <TabsContent value="marketing" className="space-y-4">
          <MarketingTabContent />
        </TabsContent>
      </Tabs>
    </div>
  )
}