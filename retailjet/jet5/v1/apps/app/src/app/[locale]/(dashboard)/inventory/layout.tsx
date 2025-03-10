"use client";

import { Package, Search } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage,
  BreadcrumbSeparator 
} from "@/components/breadcrumb";
import { Separator } from "@/components/separator";
import { 
  SidebarInset, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/sidebar";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useState } from "react";

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  // Define a type for the store to match your implementation
  type StoreType = {
    name: string;
    logo: React.ElementType;
    plan: string;
  };

  // State to track the active store
  const [activeStore, setActiveStore] = useState<StoreType>({
    name: "Amazon Store",
    logo: () => null,
    plan: "Enterprise"
  });

  // Handler for store changes
  const handleStoreChange = (store: StoreType) => {
    setActiveStore(store);
  };
  
  return (
    <SidebarProvider>
      <AppSidebar onStoreChange={handleStoreChange} />
      <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">          <div className="flex items-center gap-2 px-4 w-full">
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
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inventory</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="ml-auto flex items-center gap-3">
              <div className="relative w-64 hidden md:block">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search inventory..." 
                  className="pl-8 h-9 focus-visible:ring-0"
                />
              </div>
              <Button size="sm" variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-4 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}