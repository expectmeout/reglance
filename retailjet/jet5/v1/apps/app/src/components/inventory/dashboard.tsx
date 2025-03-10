"use client";

import { useState } from "react";
import { 
  BarChart as LucideBarChart,
  PieChart as LucidePieChart,
  LineChart as LucideLineChart,
  ArrowUpCircle,
  ArrowDownCircle,
  Package,
  AlertCircle,
  XCircle,
  DollarSign,
  Share2,
  FolderTree
} from "lucide-react";
import dynamic from "next/dynamic";
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  Line, 
  Bar, 
  Pie, 
  Cell, 
  Area, 
  AreaChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Badge } from "@/components/badge";

import { Skeleton } from "@/components/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";

// Chart Components
import { WarehouseDist2 } from "@/components/inventory/cards/warehouse-dist-piechart";
import { BarChartDist2 } from "@/components/barchart-dist";
import { RadarChartHealth2 } from "@/components/inventory/cards/radarchart-inventory-health";

// Import metrics card components
import { 
  CustomerMetricsCard, 
  CustomerMetric 
} from "@/components/customer-metrics-card";
import { 
  PerformanceMetricsCard,
  PerformanceMetric
} from "@/components/performance-metrics-card";

// Import the enhanced card components
import {
  ChannelStatusCard,
  AnomalyDetectionCard,
  TopPerformingProductsCard
} from './cards';

// Import the new area chart component
import { AreaChartChannelLevels } from "./cards/area-chart-channel-levels";

// Dynamically import ProductPerformance component
const ProductPerformance = dynamic(
  () => import('@/components/product-performance'),
  { ssr: false }
);

// Dynamically import Amazon dashboard components
const AmazonSellerDashboardMetrics = dynamic(
  () => import('@/components/amazon-seller-dashboard-metrics'),
  { ssr: false }
);

const CohortAnalysis = dynamic(
  () => import('@/components/cohort-analysis'),
  { ssr: false }
);

const MarketingTabContent = dynamic(
  () => import('@/components/marketing-tab-content').then((mod) => mod.MarketingTabContent),
  { ssr: false }
);

// Create a standardized dashboard card component
interface DashboardCardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  height?: string;
  className?: string;
  actions?: React.ReactNode;
}

const DashboardCard = ({ 
  title, 
  subtitle, 
  icon, 
  children, 
  height = "auto", 
  className = "",
  actions
}: DashboardCardProps) => (
  <Card className={`overflow-hidden flex flex-col ${className}`} style={{ height }}>
    {(title || icon || actions) && (
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
        {(title || icon) && (
          <div className="flex items-center gap-2">
            {icon && <div className="bg-primary/10 p-2 rounded-full">{icon}</div>}
            <div>
              {title && <CardTitle className="text-base font-medium">{title}</CardTitle>}
              {subtitle && <CardDescription>{subtitle}</CardDescription>}
            </div>
          </div>
        )}
        {actions && (
          <div className="flex items-center">
            {actions}
          </div>
        )}
      </CardHeader>
    )}
    <CardContent className="p-4 flex-1">{children}</CardContent>
  </Card>
);

// Dashboard card skeleton for loading state
const DashboardCardSkeleton = () => (
  <div className="flex flex-col space-y-3 w-full h-full">
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-full w-full flex-grow" />
  </div>
);

// Sample metric data
const customerMetrics: CustomerMetric[] = [
  { 
    name: "New Customers", 
    value: 1482, 
    trend: 12.2, 
    trendLabel: "vs last month", 
    trendDirection: "up" 
  },
  { 
    name: "Repeat Customers", 
    value: 8245, 
    trend: 8.3, 
    trendLabel: "vs last month", 
    trendDirection: "up" 
  },
  { 
    name: "Average Order Value", 
    value: 68, 
    prefix: "$", 
    trend: 3.1, 
    trendLabel: "vs last month", 
    trendDirection: "up" 
  }
];

// Sales data
const salesData = [
  { month: "Jan", sales: 380000 },
  { month: "Feb", sales: 390000 },
  { month: "Mar", sales: 410000 },
  { month: "Apr", sales: 420000 },
  { month: "May", sales: 450000 },
  { month: "Jun", sales: 480000 }
];

// Geographic data
const geographicData = [
  { state: "NY", value: 1245 },
  { state: "PA", value: 890 },
  { state: "CA", value: 1120 },
  { state: "TX", value: 750 },
  { state: "FL", value: 680 },
  { state: "IL", value: 540 },
  { state: "OH", value: 490 },
  { state: "MI", value: 420 },
  { state: "GA", value: 380 },
  { state: "NC", value: 350 }
];

// Performance metrics
const performanceMetrics: PerformanceMetric[] = [
  { 
    label: "ACOS", 
    value: 13.6, 
    suffix: "%", 
    trend: 9.1, 
    trendLabel: "vs last month", 
    trendDirection: "down" as "down",
    trendIsGood: true
  },
  { 
    label: "Conversion Rate", 
    value: 8.2, 
    suffix: "%", 
    trend: 1.4, 
    trendLabel: "vs last month", 
    trendDirection: "up" as "up",
    trendIsGood: true
  },
  { 
    label: "Ad Spend", 
    value: 22450, 
    prefix: "$", 
    trend: 5.2, 
    trendLabel: "vs last month", 
    trendDirection: "up" as "up",
    trendIsGood: false
  }
];

// Define types for the chart components
interface GeographicItem {
  state: string;
  value: number;
}

interface SalesItem {
  month: string;
  sales: number;
}

// Simple GeographicHeatmap component
const GeographicHeatmap = ({ data }: { data: GeographicItem[] }) => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Geographic data visualization</p>
          <p className="text-sm text-muted-foreground">Data will be displayed here</p>
        </div>
      </div>
      <div className="mt-4">
        {data.slice(0, 5).map((item: GeographicItem, index: number) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-sm">{item.state}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple SalesChart component
const SalesChart = ({ data }: { data: SalesItem[] }) => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Sales chart visualization</p>
          <p className="text-sm text-muted-foreground">Data will be displayed here</p>
        </div>
      </div>
      <div className="mt-4">
        {data.slice(0, 5).map((item: SalesItem, index: number) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-sm">{item.month}</span>
            <span className="font-medium">${(item.sales / 1000).toFixed(1)}k</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add any missing data variables
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function InventoryDashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State to track the current dashboard tab from AmazonSellerDashboard
  const [amazonDashboardTab, setAmazonDashboardTab] = useState<string>("customers");

  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full md:w-auto grid-cols-5 md:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        {/* Second tab menu from AmazonSellerDashboard */}
        <div className="mt-4">
          <Tabs 
            defaultValue={amazonDashboardTab} 
            onValueChange={setAmazonDashboardTab} 
          >
            <TabsList className="grid max-w-[400px] w-full mx-auto grid-cols-2 gap-1 sm:gap-2">
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Overview Tab with Sales Distribution content */}
        <TabsContent value="overview">
          {/* Render content based on the selected amazon dashboard tab */}
          {amazonDashboardTab === "customers" && <CohortAnalysis />}
          {amazonDashboardTab === "marketing" && <MarketingTabContent />}
          
          {/* Original Overview content (display this when no amazon dashboard tab is selected) */}
          {!["customers", "marketing"].includes(amazonDashboardTab) && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Sales Distribution</CardTitle>
                  <CardDescription>January 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Top Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                    <CustomerMetricsCard 
                      title="Customer Metrics" 
                      metrics={customerMetrics} 
                    />
                    
                    <PerformanceMetricsCard 
                      title="Performance Metrics" 
                      metrics={performanceMetrics} 
                    />
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-12 gap-4 mb-4">
                    <div className="col-span-12 lg:col-span-6">
                      <DashboardCard
                        title="Sales by State"
                        subtitle="January - June 2024"
                        height="300px"
                      >
                        <GeographicHeatmap data={geographicData} />
                      </DashboardCard>
                    </div>

                    <div className="col-span-12 lg:col-span-6">
                      <DashboardCard
                        title="Marketplace Sales Overview"
                        subtitle="January - June 2024"
                        height="300px"
                      >
                        <SalesChart data={salesData} />
                      </DashboardCard>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          )}
        </TabsContent>

        {/* Inventory Tab (former Overview Tab) */}
        <TabsContent value="inventory" className="space-y-4">
          {/* Always show the inventory-specific components */}
          {/* Existing Inventory tab content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <DashboardCard
              title="Total Products"
              subtitle="All channels"
              icon={<Package className="h-4 w-4 text-blue-500" />}
            >
              <div className="text-2xl font-bold">1,248</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <ArrowUpCircle className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">12%</span>
                <span className="ml-1">from last month</span>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Low Stock"
              subtitle="Needs attention"
              icon={<AlertCircle className="h-4 w-4 text-amber-500" />}
            >
              <div className="text-2xl font-bold">28</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <ArrowDownCircle className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">5%</span>
                <span className="ml-1">from last month</span>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Out of Stock"
              subtitle="Across all channels"
              icon={<XCircle className="h-4 w-4 text-red-500" />}
            >
              <div className="text-2xl font-bold">14</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <ArrowDownCircle className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">3%</span>
                <span className="ml-1">from last month</span>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Inventory Value"
              subtitle="Total cost"
              icon={<DollarSign className="h-4 w-4 text-green-500" />}
            >
              <div className="text-2xl font-bold">$1.24M</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <ArrowUpCircle className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">8%</span>
                <span className="ml-1">from last month</span>
              </div>
            </DashboardCard>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard
              title="Inventory by Status"
              subtitle="All products"
              icon={<PieChart className="h-4 w-4 text-purple-500" />}
              height="300px"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "In Stock", value: 1206 },
                      { name: "Low Stock", value: 28 },
                      { name: "Out of Stock", value: 14 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#4ade80" />
                    <Cell fill="#facc15" />
                    <Cell fill="#f87171" />
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </DashboardCard>

            <DashboardCard
              title="Inventory by Channel"
              subtitle="Distribution"
              icon={<Share2 className="h-4 w-4 text-blue-500" />}
              height="300px"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Amazon", value: 548 },
                      { name: "Walmart", value: 312 },
                      { name: "Shopify", value: 246 },
                      { name: "eBay", value: 142 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#FF9900" />
                    <Cell fill="#0071DC" />
                    <Cell fill="#96BF48" />
                    <Cell fill="#E53238" />
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </DashboardCard>

            <DashboardCard
              title="Inventory by Category"
              subtitle="Product types"
              icon={<FolderTree className="h-4 w-4 text-indigo-500" />}
              height="300px"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Electronics", value: 382 },
                      { name: "Home Goods", value: 294 },
                      { name: "Apparel", value: 232 },
                      { name: "Beauty", value: 186 },
                      { name: "Toys", value: 154 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {[...Array(5)].map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </DashboardCard>
          </div>
          
          {/* Add the content from the sub-menu Inventory tab here */}
          <div className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Inventory Turnover */}
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Turnover</CardTitle>
                  <CardDescription>Last 6 months</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", turnover: 4.2 },
                        { month: "Feb", turnover: 4.5 },
                        { month: "Mar", turnover: 4.8 },
                        { month: "Apr", turnover: 4.6 },
                        { month: "May", turnover: 5.0 },
                        { month: "Jun", turnover: 5.2 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip />
                      <Line
                        type="monotone"
                        dataKey="turnover"
                        stroke="#2196F3"
                        strokeWidth={2}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Restock Recommendations */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardDescription>Based on sales velocity</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Days Left</TableHead>
                        <TableHead>Restock Qty</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Wireless Earbuds</TableCell>
                        <TableCell>28</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>150</TableCell>
                        <TableCell><Badge variant="destructive">Urgent</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Smart Watch</TableCell>
                        <TableCell>42</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>100</TableCell>
                        <TableCell><Badge variant="secondary">Soon</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bluetooth Speaker</TableCell>
                        <TableCell>36</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>120</TableCell>
                        <TableCell><Badge variant="secondary">Soon</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Phone Charger</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell><Badge variant="destructive">Urgent</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Laptop Stand</TableCell>
                        <TableCell>58</TableCell>
                        <TableCell>18</TableCell>
                        <TableCell>80</TableCell>
                        <TableCell><Badge variant="outline">Planned</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              {/* Storage Costs */}
              <Card>
                <CardHeader>
                  <CardTitle>Storage Costs</CardTitle>
                  <CardDescription>Monthly breakdown</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Standard", value: 1250 },
                          { name: "Oversize", value: 850 },
                          { name: "Long-term", value: 650 },
                          { name: "Hazmat", value: 350 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[...Array(4)].map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip formatter={(value) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
                  </div>

            {/* Inventory Health Section - From AmazonSellerDashboardMetrics */}
            <h3 className="text-lg font-medium mt-8">Inventory Health Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Inventory Health Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Health</CardTitle>
                  <CardDescription>Current vs. Optimal Stock Levels</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { product: "Product A", inStock: 85, optimal: 100 },
                        { product: "Product B", inStock: 120, optimal: 80 },
                        { product: "Product C", inStock: 45, optimal: 60 },
                        { product: "Product D", inStock: 30, optimal: 70 },
                        { product: "Product E", inStock: 65, optimal: 50 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="product" type="category" />
                      <ChartTooltip />
                      <Legend />
                      <Bar dataKey="inStock" name="Current Stock" fill="#2196F3" />
                      <Bar dataKey="optimal" name="Optimal Level" fill="#4CAF50" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* Inventory Turnover by Product */}
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Turnover by Product</CardTitle>
                  <CardDescription>Efficiency metrics</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { product: "Product A", turnover: 4.2 },
                        { product: "Product B", turnover: 2.8 },
                        { product: "Product C", turnover: 5.1 },
                        { product: "Product D", turnover: 3.5 },
                        { product: "Product E", turnover: 4.0 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="product" type="category" />
                      <ChartTooltip />
                      <Bar dataKey="turnover" name="Turnover Rate" fill="#9C27B0" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
                    </div>
                    
            {/* Inventory Aging Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Inventory Aging Analysis</CardTitle>
                  <CardDescription>Days in inventory by product category</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { month: "Jan", electronics: 32, homeGoods: 45, apparel: 60, beauty: 28, toys: 38 },
                        { month: "Feb", electronics: 30, homeGoods: 48, apparel: 58, beauty: 30, toys: 36 },
                        { month: "Mar", electronics: 28, homeGoods: 42, apparel: 55, beauty: 25, toys: 34 },
                        { month: "Apr", electronics: 26, homeGoods: 40, apparel: 52, beauty: 22, toys: 32 },
                        { month: "May", electronics: 24, homeGoods: 38, apparel: 50, beauty: 20, toys: 30 },
                        { month: "Jun", electronics: 22, homeGoods: 36, apparel: 48, beauty: 18, toys: 28 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                      <ChartTooltip />
                      <Legend />
                      <Area type="monotone" dataKey="electronics" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="homeGoods" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="apparel" stackId="1" stroke="#ffc658" fill="#ffc658" />
                      <Area type="monotone" dataKey="beauty" stackId="1" stroke="#ff8042" fill="#ff8042" />
                      <Area type="monotone" dataKey="toys" stackId="1" stroke="#0088fe" fill="#0088fe" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Optionally show Amazon dashboard content if a tab is selected */}
          {amazonDashboardTab === "customers" && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-medium mb-4">Customer Analysis</h3>
              <CohortAnalysis />
            </div>
          )}
          {amazonDashboardTab === "marketing" && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-medium mb-4">Marketing Performance</h3>
              <MarketingTabContent />
            </div>
          )}
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          {/* Render content based on the selected amazon dashboard tab */}
          {amazonDashboardTab === "customers" && <CohortAnalysis />}
          {amazonDashboardTab === "marketing" && <MarketingTabContent />}
          
          {/* Original Performance tab content (display when no amazon dashboard tab is selected) */}
          {!["customers", "marketing"].includes(amazonDashboardTab) && (
            <>
          {/* Main Dashboard Components - Using grid layout with explicit sizing */}
          <div className="grid grid-cols-12 gap-4 mt-4">
            {/* Channel Status Card */}
            <div className="col-span-12 md:col-span-6">
              {isLoading ? (
                <DashboardCard height="400px">
                  <DashboardCardSkeleton />
                </DashboardCard>
              ) : (
                <DashboardCard 
                  title="Channel Status" 
                  subtitle="Performance by sales channel"
                  height="400px"
                  className="flex flex-col"
                >
                  <div className="h-full w-full flex-1 overflow-auto">
                    <ChannelStatusCard />
                  </div>
                </DashboardCard>
              )}
            </div>

            {/* Anomaly Detection Alert System */}
            <div className="col-span-12 md:col-span-6">
              {isLoading ? (
                <DashboardCard height="400px">
                  <DashboardCardSkeleton />
                </DashboardCard>
              ) : (
                <DashboardCard 
                  title="Anomaly Detection" 
                  subtitle="Recent inventory issues"
                  height="400px"
                  className="flex flex-col"
                >
                  <div className="h-full w-full flex-1 overflow-auto">
                    <AnomalyDetectionCard />
                  </div>
                </DashboardCard>
              )}
            </div>

            {/* Top Performing Products */}
            <div className="col-span-12">
              {isLoading ? (
                <DashboardCard height="400px">
                  <DashboardCardSkeleton />
                </DashboardCard>
              ) : (
                <DashboardCard 
                  title="Top Performing Products" 
                  subtitle="Based on sales velocity and profit margin"
                  height="400px"
                >
                  <div className="h-full w-full flex-grow">
                    <TopPerformingProductsCard />
                  </div>
                </DashboardCard>
              )}
            </div>
          </div>
            </>
          )}
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          {/* Render content based on the selected amazon dashboard tab */}
          {amazonDashboardTab === "customers" && <CohortAnalysis />}
          {amazonDashboardTab === "marketing" && <MarketingTabContent />}
          
          {/* Original Reports tab content (display when no amazon dashboard tab is selected) */}
          {!["customers", "marketing"].includes(amazonDashboardTab) && (
          <div className="flex items-center justify-center h-40 border rounded-lg">
            <p className="text-muted-foreground">Reports content coming soon...</p>
          </div>
          )}
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          {/* Render content based on the selected amazon dashboard tab */}
          {amazonDashboardTab === "customers" && <CohortAnalysis />}
          {amazonDashboardTab === "marketing" && <MarketingTabContent />}
          
          {/* Original Notifications tab content (display when no amazon dashboard tab is selected) */}
          {!["customers", "marketing"].includes(amazonDashboardTab) && (
          <div className="flex items-center justify-center h-40 border rounded-lg">
            <p className="text-muted-foreground">Notifications content coming soon...</p>
          </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}