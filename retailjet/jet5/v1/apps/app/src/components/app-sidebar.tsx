"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import StoreSwitcher, { StoreType } from "@/components/store-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Ruben",
    email: "sales@retailjet.com",
    avatar: "/shadcn.jpg",
  },
  stores: [
    {
      name: "RetailJet",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Vitamax",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "ExtraLinens",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/en",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/en?tab=overview",
          isTabLink: true,
          tabValue: "overview"
        },
        {
          title: "Inventory",
          url: "/en?tab=inventory",
          isTabLink: true,
          tabValue: "inventory"
        },
        {
          title: "Analytics",
          url: "/en?tab=analytics",
          isTabLink: true,
          tabValue: "analytics",
          items: [
            {
              title: "Customers",
              url: "/en?tab=analytics&subtab=customers",
              isTabLink: true,
              tabValue: "analytics",
              subtabValue: "customers"
            },
            {
              title: "Marketing",
              url: "/en?tab=analytics&subtab=marketing",
              isTabLink: true,
              tabValue: "analytics",
              subtabValue: "marketing"
            }
          ]
        },
        {
          title: "Glance AI®",
          url: "/en?tab=chat",
          isTabLink: true,
          tabValue: "chat"
        },
      ],
    },
  ],
  projects: [
    {
      name: "Business Reports",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales Analytics",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Help & Support",
      url: "#",
      icon: Map,
    },
  ],
};

// Define props interface for AppSidebar
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onStoreChange?: (store: StoreType) => void;
}

export function AppSidebar({ 
  onStoreChange, 
  ...props 
}: AppSidebarProps) {
  // Initialize with the first store, ensuring it's not undefined
  const [activeStore, setActiveStore] = React.useState<StoreType>(
    (data.stores && data.stores[0]) || {
      name: "RetailJet",
      logo: GalleryVerticalEnd,
      plan: "Enterprise"
    }
  );
  
  // Handle store change
  const handleStoreChange = (store: StoreType) => {
    setActiveStore(store);
    if (onStoreChange) {
      onStoreChange(store);
    }
  };
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <StoreSwitcher 
          stores={data.stores} 
          onStoreChange={handleStoreChange}
          initialStore={activeStore}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
