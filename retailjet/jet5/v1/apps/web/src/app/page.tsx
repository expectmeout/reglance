export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Debug Grid */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-red-100">
          <div className="h-16 bg-blue-300 rounded flex items-center justify-center">1</div>
          <div className="h-16 bg-blue-300 rounded flex items-center justify-center">2</div>
          <div className="h-16 bg-blue-300 rounded flex items-center justify-center">3</div>
          <div className="h-16 bg-blue-300 rounded flex items-center justify-center">4</div>
        </div>
        
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
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
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Dashboard Header with Title and Date */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <DateRangePicker />
          </div>
         
          {/* Tab Navigation */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
           
            <TabsContent value="overview" className="space-y-4">
              {/* Dashboard Cards */}
              <DashboardCharts />
             
              {/* Overview Chart and Recent Sales */}
              <DashboardOverview />
            </TabsContent>
           
            {/* Other tab content */}
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}