"use client"
import { useState } from "react"
import { type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/sidebar"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { TabLink } from "./tab-link"
import { Button } from "@/components/button"
import Link from "next/link"
import { cn } from "@/utils"

// Add this function to handle tab navigation with subtabs
const handleTabNavigation = (
  e: React.MouseEvent,
  item: {
    isTabLink?: boolean;
    tabValue?: string;
    subtabValue?: string;
    url: string;
  }
) => {
  if (item.isTabLink) {
    e.preventDefault();
   
    // Create a custom event for tab change
    const event = new CustomEvent('tabchange', {
      detail: {
        tab: item.tabValue,
        subtab: item.subtabValue
      }
    });
   
    // Dispatch the event
    window.dispatchEvent(event);
   
    // Update URL without full page reload
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', item.url);
    }
   
    // Log for debugging
    console.log(`Tab navigation: ${item.tabValue}${item.subtabValue ? `, subtab: ${item.subtabValue}` : ''}`);
  }
};

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      isTabLink?: boolean
      tabValue?: string
      subtabValue?: string
      items?: {
        title: string
        url: string
        isTabLink?: boolean
        tabValue?: string
        subtabValue?: string
      }[]
    }[]
  }[]
}) {
  // Add state to track which sub-items have been clicked
  const [expandedSubItems, setExpandedSubItems] = useState<Record<string, boolean>>({});
  
  // Function to toggle a specific sub-item
  const toggleSubItem = (title: string) => {
    setExpandedSubItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a
                          href={subItem.url}
                          onClick={(e) => {
                            // Handle tab navigation
                            handleTabNavigation(e, subItem);
                            
                            // For Analytics, toggle its expanded state
                            if (subItem.title === "Analytics") {
                              toggleSubItem(subItem.title);
                            } else {
                              // If clicking any other link, collapse Analytics
                              setExpandedSubItems(prev => ({
                                ...prev,
                                "Analytics": false
                              }));
                            }
                          }}
                        >
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                     
                      {/* Only show nested items for Analytics if it's expanded */}
                      {subItem.items && (subItem.title !== "Analytics" || expandedSubItems[subItem.title]) && (
                        <SidebarMenuSub>
                          {subItem.items.map((nestedItem) => (
                            <SidebarMenuSubItem key={nestedItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a
                                  href={nestedItem.url}
                                  onClick={(e) => {
                                    handleTabNavigation(e, nestedItem);
                                    // After clicking a nested item, leave parent expanded
                                  }}
                                >
                                  <span>{nestedItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}