"use client"
import AmazonSellerDashboard from "@/components/AmazonSellerDashboard"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/breadcrumb"
import { Separator } from "@/components/separator"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/sidebar"
import { MainDashboardCharts } from "@/components/main-charts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import { SalesOverview } from "@/components/dashboard-overview"
import { RecentSales } from "@/components/recent-sales"
import { InventorySummary } from "@/components/inventory/inventory-summary"
import { ProfitMarginTrend } from "@/components/overview/profit-margin-trend"
import { RecentMarketing } from "@/components/recent-marketing"
import React from "react"
import dynamic from "next/dynamic"

const GlanceAIPage = dynamic(() => import('@/app/[locale]/(dashboard)/glance-ai/page'), {
  loading: () => <div className="h-full w-full bg-muted/20 rounded-md animate-pulse" />
})

export default function Page() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [analyticsSubtab, setAnalyticsSubtab] = useState<string | null>(null)
  
  useEffect(() => {
    if (tabParam && ["overview", "inventory", "analytics", "chat"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
    
    // Get the subtab parameter from the URL
    const subtabParam = searchParams.get('subtab')
    
    // Handle tab and subtab changes
    const handleTabChange = (event: CustomEvent<{ tab: string; subtab?: string }>) => {
      if (event.detail && event.detail.tab) {
        // Force tab update
        setActiveTab(event.detail.tab);
        
        // Handle subtab if present
        if (event.detail.subtab) {
          setAnalyticsSubtab(event.detail.subtab);
        }
        
        console.log(`Tab changed to: ${event.detail.tab}`);
      }
    };
    
    // Add event listener
    window.addEventListener('tabchange', handleTabChange as EventListener);
    
    // Clean up
    return () => {
      window.removeEventListener('tabchange', handleTabChange as EventListener);
    };
  }, []); // Empty dependency array to only run once

  type StoreType = {
    name: string;
    logo: React.ElementType;
    plan: string;
  };

  const [activeStore, setActiveStore] = useState<StoreType>({
    name: "Amazon Store",
    logo: () => null,
    plan: "Enterprise"
  });

  const handleStoreChange = (store: StoreType) => {
    setActiveStore(store);
  };

  return (
    <SidebarProvider>
      <AppSidebar onStoreChange={handleStoreChange} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    {activeStore.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full max-w-[500px] mx-0 grid-cols-4 gap-1 sm:gap-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="chat">Glance AI®</TabsTrigger>
            </TabsList>
           
            <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-4">
                  <ProfitMarginTrend />
                </div>
              </div>
              <div className="mb-4">
                <MainDashboardCharts />
              </div>



              {/* Updated layout to ensure side-by-side display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full overflow-x-auto">
                  <RecentMarketing />
                </div>
                <div className="w-full overflow-x-auto">
                  <RecentSales />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
  {/* Don't use AmazonSellerDashboard for inventory, use InventorySummary directly */}
  <InventorySummary />
</TabsContent>

<TabsContent value="analytics">
  <div key="analytics-tab" className="min-h-[600px]">
    <React.Suspense fallback={
      <div className="h-[600px] w-full bg-muted/20 rounded-md animate-pulse" />
    }>
      <AmazonSellerDashboard defaultTab={analyticsSubtab || "customers"} />
    </React.Suspense>
  </div>
</TabsContent>

            <TabsContent value="chat">
              <div className="h-[calc(100vh-12rem)] min-h-[500px]">
                <GlanceAIPage />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}