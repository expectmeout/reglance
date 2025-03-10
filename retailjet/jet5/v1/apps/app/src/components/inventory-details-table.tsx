"use client"

import { useState } from "react"
import { Filter, AlertTriangle } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/card"
import { Badge } from "@/components/badge"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"
import { Button } from "@/components/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/tabs"
import { Truck, BoxIcon, BarChart2, ShoppingCart, CheckCircle2 } from "lucide-react"

// Define the InventoryItem interface
interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  optimal: number;
  daysOfSupply: number;
  status: string;
  location: string;
  category: string;
}

// Sample inventory data
const inventoryData = [
  {
    id: "1",
    name: "Ultra Comfort Pillow",
    sku: "UCP-001",
    stock: 85,
    optimal: 100,
    daysOfSupply: 28,
    status: "In Stock",
    location: "US-East",
    category: "Home Goods"
  },
  {
    id: "2",
    name: "Premium Kitchen Knife Set",
    sku: "PKK-002",
    stock: 32,
    optimal: 50,
    daysOfSupply: 45,
    status: "In Stock",
    location: "US-West",
    category: "Kitchen"
  },
  {
    id: "3",
    name: "Wireless Earbuds Pro",
    sku: "WEP-003",
    stock: 12,
    optimal: 60,
    daysOfSupply: 12,
    status: "Low Stock",
    location: "US-Central",
    category: "Electronics"
  },
  {
    id: "4",
    name: "Natural Bamboo Cutting Board",
    sku: "NBC-004",
    stock: 8,
    optimal: 40,
    daysOfSupply: 8,
    status: "Low Stock",
    location: "US-East",
    category: "Kitchen"
  },
  {
    id: "5",
    name: "Smart LED Light Bulbs (4-Pack)",
    sku: "SLB-005",
    stock: 65,
    optimal: 80,
    daysOfSupply: 22,
    status: "In Stock",
    location: "US-West", 
    category: "Electronics"
  },
  {
    id: "6",
    name: "Professional Hair Dryer",
    sku: "PHD-006",
    stock: 0,
    optimal: 30,
    daysOfSupply: 0,
    status: "Out of Stock",
    location: "US-Central",
    category: "Beauty"
  },
  {
    id: "7",
    name: "Organic Cotton Bath Towels",
    sku: "OCT-007",
    stock: 42,
    optimal: 60,
    daysOfSupply: 35,
    status: "In Stock",
    location: "US-East",
    category: "Home Goods"
  },
  {
    id: "8",
    name: "Stainless Steel Water Bottle",
    sku: "SSB-008",
    stock: 7,
    optimal: 45,
    daysOfSupply: 5,
    status: "Low Stock",
    location: "US-West",
    category: "Outdoor"
  }
];

// Function to determine badge color based on status
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Out of Stock":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

// Days of supply indicator component
const SupplyIndicator = ({ days }: { days: number }) => {
  let color = "bg-green-500";
  let icon = null;
  
  if (days <= 0) {
    color = "bg-red-500";
    icon = <AlertTriangle className="h-4 w-4 text-red-500 ml-1" />;
  } else if (days <= 14) {
    color = "bg-red-500";
    icon = <AlertTriangle className="h-4 w-4 text-red-500 ml-1" />;
  } else if (days <= 30) {
    color = "bg-yellow-500";
  }
  
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <div className={`h-2 w-2 rounded-full ${color} mr-2`}></div>
        <span>{days} days</span>
      </div>
      {icon}
    </div>
  );
};

export function InventoryDetailsTable() {
  // State for table sorting and filtering
  const [activeTab, setActiveTab] = useState("all");
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });
  
  // Filter inventory data based on tab selection
  const filteredInventory = inventoryData.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "in-stock") return item.status === "In Stock";
    if (activeTab === "low-stock") return item.status === "Low Stock";
    if (activeTab === "out-of-stock") return item.status === "Out of Stock";
    return true;
  });

  // Sort function for inventory items
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to the filtered inventory
  const sortedInventory = [...filteredInventory].sort((a: any, b: any) => {
    if (sortConfig.key === null) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return (
    <Card className="overflow-hidden h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Inventory Details</CardTitle>
          <div className="flex gap-1">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="text-xs">All Items</TabsTrigger>
                <TabsTrigger value="in-stock" className="text-xs">In Stock</TabsTrigger>
                <TabsTrigger value="low-stock" className="text-xs">Low Stock</TabsTrigger>
                <TabsTrigger value="out-of-stock" className="text-xs">Out of Stock</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => requestSort('name')} className="cursor-pointer">
                  Product Name
                  {sortConfig.key === 'name' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </TableHead>
                <TableHead>SKU</TableHead>
                <TableHead onClick={() => requestSort('stock')} className="cursor-pointer text-right">
                  Stock
                  {sortConfig.key === 'stock' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </TableHead>
                <TableHead className="text-right">Optimal</TableHead>
                <TableHead onClick={() => requestSort('daysOfSupply')} className="cursor-pointer text-center">
                  Days Supply
                  {sortConfig.key === 'daysOfSupply' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </TableHead>
                <TableHead onClick={() => requestSort('status')} className="cursor-pointer">
                  Status
                  {sortConfig.key === 'status' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.category}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell className="text-right">{item.stock}</TableCell>
                  <TableCell className="text-right">{item.optimal}</TableCell>
                  <TableCell className="text-center">
                    <SupplyIndicator days={item.daysOfSupply} />
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Filter className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" />
                          Create Purchase Order
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Adjust Stock
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Set as Reviewed
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Inventory Actions Row */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button>
            <Truck className="mr-2 h-4 w-4" />
            Create Purchase Order
          </Button>
          <Button variant="outline">
            <BoxIcon className="mr-2 h-4 w-4" />
            Manage Stock Transfers
          </Button>
          <Button variant="outline">
            <BarChart2 className="mr-2 h-4 w-4" />
            Download Inventory Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}