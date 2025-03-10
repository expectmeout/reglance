"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/sidebar"
import { CaretSortIcon, PlusIcon } from "@radix-ui/react-icons"

// Define the Store type
export type StoreType = {
  name: string;
  logo: React.ElementType;
  plan: string;
};

// Define StoreSwitcher props interface
interface StoreSwitcherProps {
  stores: StoreType[];
  onStoreChange?: (store: StoreType) => void;
  initialStore?: StoreType;
}

function StoreSwitcher({ stores, onStoreChange, initialStore }: StoreSwitcherProps) {
  const { isMobile } = useSidebar()
  const [activeStore, setActiveStore] = React.useState(initialStore || stores[0])

  if (!activeStore) {
    return null
  }

  // Handle store change with callback
  const handleStoreChange = (store: StoreType) => {
    setActiveStore(store);
    if (onStoreChange) {
      onStoreChange(store);
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeStore.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeStore.name}
                </span>
                <span className="truncate text-xs">{activeStore.plan}</span>
              </div>
              <CaretSortIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Stores
            </DropdownMenuLabel>
            {stores.map((store, index) => (
              <DropdownMenuItem
                key={store.name}
                onClick={() => handleStoreChange(store)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <store.logo className="size-4 shrink-0" />
                </div>
                {store.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <PlusIcon className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add store</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default StoreSwitcher;