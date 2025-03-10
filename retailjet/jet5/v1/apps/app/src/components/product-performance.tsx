"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/card"
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Badge } from "@/components/badge"
import { TrendingUp, TrendingDown, Filter, Search, ArrowUpDown } from "lucide-react"

// Define types and interfaces
interface ProductTrend {
  value: number;
  direction: "up" | "down";
}

type ProductStatus = "active" | "low-stock" | "out-of-stock";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  margin: number;
  sales: number;
  revenue: number;
  rating: number;
  stock: number;
  trend: ProductTrend;
  status: ProductStatus;
}

type SortDirection = "asc" | "desc";

interface SortConfig {
  key: keyof Product;
  direction: SortDirection;
}

// Badge variant mapping
const statusVariant: Record<ProductStatus, string> = {
  'active': 'success',
  'low-stock': 'warning',
  'out-of-stock': 'destructive'
};

// Sample product data
const productData: Product[] = [
  {
    id: "PROD001",
    name: "Ultra Comfort Pillow",
    category: "Home",
    price: 39.99,
    cost: 12.50,
    margin: 68.7,
    sales: 243,
    revenue: 9717.57,
    rating: 4.7,
    stock: 85,
    trend: { value: 12.4, direction: "up" },
    status: "active"
  },
  {
    id: "PROD002",
    name: "Premium Kitchen Knife Set",
    category: "Kitchen",
    price: 129.99,
    cost: 45.20,
    margin: 65.2,
    sales: 187,
    revenue: 24308.13,
    rating: 4.9,
    stock: 32,
    trend: { value: 8.7, direction: "up" },
    status: "active"
  },
  {
    id: "PROD003",
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    price: 89.99,
    cost: 32.80,
    margin: 63.6,
    sales: 412,
    revenue: 37075.88,
    rating: 4.5,
    stock: 126,
    trend: { value: 22.5, direction: "up" },
    status: "active"
  },
  {
    id: "PROD004",
    name: "Natural Bamboo Cutting Board",
    category: "Kitchen",
    price: 24.99,
    cost: 8.10,
    margin: 67.6,
    sales: 156,
    revenue: 3898.44,
    rating: 4.3,
    stock: 64,
    trend: { value: 3.2, direction: "down" },
    status: "active"
  },
  {
    id: "PROD005",
    name: "Smart LED Light Bulbs (4-Pack)",
    category: "Home",
    price: 34.99,
    cost: 14.20,
    margin: 59.4,
    sales: 203,
    revenue: 7102.97,
    rating: 4.6,
    stock: 52,
    trend: { value: 15.8, direction: "up" },
    status: "active"
  },
  {
    id: "PROD006",
    name: "Professional Hair Dryer",
    category: "Beauty",
    price: 59.99,
    cost: 22.50,
    margin: 62.5,
    sales: 178,
    revenue: 10678.22,
    rating: 4.4,
    stock: 41,
    trend: { value: 5.2, direction: "down" },
    status: "active"
  },
  {
    id: "PROD007",
    name: "Waterproof Bluetooth Speaker",
    category: "Electronics",
    price: 49.99,
    cost: 18.75,
    margin: 62.5,
    sales: 231,
    revenue: 11547.69,
    rating: 4.2,
    stock: 17,
    trend: { value: 7.5, direction: "up" },
    status: "low-stock"
  },
  {
    id: "PROD008",
    name: "Organic Cotton Bath Towels",
    category: "Home",
    price: 29.99,
    cost: 10.80,
    margin: 64.0,
    sales: 124,
    revenue: 3718.76,
    rating: 4.8,
    stock: 93,
    trend: { value: 2.1, direction: "up" },
    status: "active"
  },
  {
    id: "PROD009",
    name: "Stainless Steel Water Bottle",
    category: "Sports",
    price: 19.99,
    cost: 6.50,
    margin: 67.5,
    sales: 345,
    revenue: 6896.55,
    rating: 4.7,
    stock: 8,
    trend: { value: 18.3, direction: "up" },
    status: "low-stock"
  },
  {
    id: "PROD010",
    name: "Adjustable Desk Lamp",
    category: "Office",
    price: 44.99,
    cost: 16.20,
    margin: 64.0,
    sales: 97,
    revenue: 4364.03,
    rating: 4.5,
    stock: 0,
    trend: { value: 9.6, direction: "down" },
    status: "out-of-stock"
  }
];

export function ProductPerformance(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "sales", direction: "desc" })
  const [statusFilter, setStatusFilter] = useState<ProductStatus[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string[]>([])
  
  // Get all unique categories
  const categories = [...new Set(productData.map(product => product.category))]
  
  // Filter products based on search term, status, and category
  const filteredProducts = productData.filter(product => {
    // Search filter
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Status filter
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(product.status)
    
    // Category filter
    const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(product.category)
    
    return matchesSearch && matchesStatus && matchesCategory
  })
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })
  
  // Handle sorting
  const requestSort = (key: keyof Product) => {
    let direction: SortDirection = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }
  
  // Get sort direction indicator
  const getSortDirectionIndicator = (key: keyof Product): string | null => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }
  
  // Toggle status filter
  const toggleStatusFilter = (status: ProductStatus) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    )
  }
  
  // Toggle category filter
  const toggleCategoryFilter = (category: string) => {
    setCategoryFilter(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    )
  }
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value)
  }
  
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Product Performance</CardTitle>
        <CardDescription>Monitor sales, inventory, and metrics across all products.</CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-9 px-4">
                  <Filter className="mr-2 h-4 w-4" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('active')}
                  onCheckedChange={() => toggleStatusFilter('active')}
                >
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('low-stock')}
                  onCheckedChange={() => toggleStatusFilter('low-stock')}
                >
                  Low Stock
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('out-of-stock')}
                  onCheckedChange={() => toggleStatusFilter('out-of-stock')}
                >
                  Out of Stock
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-9 px-4">
                  <Filter className="mr-2 h-4 w-4" />
                  Category
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                {categories.map(category => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={categoryFilter.includes(category)}
                    onCheckedChange={() => toggleCategoryFilter(category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" className="p-0" onClick={() => requestSort('price')}>
                    Price {getSortDirectionIndicator('price')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right hidden lg:table-cell">
                  <Button variant="ghost" className="p-0" onClick={() => requestSort('margin')}>
                    Margin {getSortDirectionIndicator('margin')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" className="p-0" onClick={() => requestSort('sales')}>
                    Sales {getSortDirectionIndicator('sales')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right hidden md:table-cell">
                  <Button variant="ghost" className="p-0" onClick={() => requestSort('revenue')}>
                    Revenue {getSortDirectionIndicator('revenue')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button variant="ghost" className="p-0" onClick={() => requestSort('rating')}>
                    Rating {getSortDirectionIndicator('rating')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right hidden sm:table-cell">
                  <Button variant="ghost" className="p-0" onClick={() => requestSort('stock')}>
                    Stock {getSortDirectionIndicator('stock')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.id}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                  <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                  <TableCell className="text-right hidden lg:table-cell">
                    {product.margin}%
                  </TableCell>
                  <TableCell className="text-right">
                    <div>{product.sales}</div>
                    <div className="flex items-center justify-end text-xs">
                      {product.trend.direction === "up" ? (
                        <span className="text-green-500 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" /> {product.trend.value}%
                        </span>
                      ) : (
                        <span className="text-red-500 flex items-center">
                          <TrendingDown className="h-3 w-3 mr-1" /> {product.trend.value}%
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    {formatCurrency(product.revenue)}
                  </TableCell>
                  <TableCell className="text-center">{product.rating}</TableCell>
                  <TableCell className="text-right hidden sm:table-cell">{product.stock}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={statusVariant[product.status]} className="capitalize">
                      {product.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {sortedProducts.length} of {productData.length} products
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: Mar 5, 2025
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductPerformance;