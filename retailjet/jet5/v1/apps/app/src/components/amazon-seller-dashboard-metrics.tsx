"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/card"
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/tabs"
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/chart"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Target 
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area
} from "recharts"

// Define types for our data
interface ProfitMarginData {
  month: string;
  amazon: number;
  walmart: number;
  shopify: number;
}

interface CostBreakdownData {
  name: string;
  value: number;
}

interface ReturnRateData {
  month: string;
  amazon: number;
  walmart: number;
  shopify: number;
}

interface CustomerSegmentData {
  segment: string;
  value: number;
}

interface ConversionFunnelData {
  name: string;
  value: number;
}

interface AdPerformanceData {
  campaign: string;
  ctr: number;
  acos: number;
  roas: number;
}

interface InventoryHealthData {
  product: string;
  inStock: number;
  optimal: number;
  turnover: number;
}

interface KpiCardProps {
  title: string;
  value: string;
  trend: {
    value: number;
    direction: "up" | "down";
  };
  icon: React.ReactNode;
  description: string;
}

// Define colors for different marketplaces
const chartConfig = {
  amazon: {
    label: "Amazon",
    color: "hsl(var(--chart-1))",
  },
  walmart: {
    label: "Walmart",
    color: "hsl(var(--chart-3))",
  },
  shopify: {
    label: "Shopify",
    color: "hsl(var(--chart-2))",
  },
  ebay: {
    label: "eBay",
    color: "hsl(var(--chart-4))",
  },
  etsy: {
    label: "Etsy",
    color: "hsl(var(--chart-5))",
  },
  acquisition: {
    label: "Acquisition",
    color: "hsl(var(--chart-1))",
  },
  conversion: {
    label: "Conversion",
    color: "hsl(var(--chart-3))",
  },
  retention: {
    label: "Retention",
    color: "hsl(var(--chart-2))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

// Sample data for various metrics
const profitMarginData: ProfitMarginData[] = [
  { month: "Jan", amazon: 32, walmart: 28, shopify: 35 },
  { month: "Feb", amazon: 35, walmart: 29, shopify: 38 },
  { month: "Mar", amazon: 30, walmart: 26, shopify: 32 },
  { month: "Apr", amazon: 28, walmart: 29, shopify: 34 },
  { month: "May", amazon: 33, walmart: 30, shopify: 37 },
  { month: "Jun", amazon: 36, walmart: 32, shopify: 40 },
]

const costBreakdownData: CostBreakdownData[] = [
  { name: "COGS", value: 55 },
  { name: "Fulfillment", value: 15 },
  { name: "Marketing", value: 12 },
  { name: "Platform Fees", value: 8 },
  { name: "Returns", value: 5 },
  { name: "Other", value: 5 },
]

const returnRateData: ReturnRateData[] = [
  { month: "Jan", amazon: 3.2, walmart: 2.8, shopify: 1.5 },
  { month: "Feb", amazon: 3.5, walmart: 2.9, shopify: 1.8 },
  { month: "Mar", amazon: 3.0, walmart: 2.6, shopify: 1.2 },
  { month: "Apr", amazon: 2.8, walmart: 2.9, shopify: 1.4 },
  { month: "May", amazon: 3.3, walmart: 3.0, shopify: 1.7 },
  { month: "Jun", amazon: 3.6, walmart: 3.2, shopify: 2.0 },
]

const customerSegmentData: CustomerSegmentData[] = [
  { segment: "Acquisition", value: 78 },
  { segment: "Conversion", value: 65 },
  { segment: "Retention", value: 83 },
  { segment: "Revenue", value: 72 },
  { segment: "Satisfaction", value: 80 },
]

const conversionFunnelData: ConversionFunnelData[] = [
  { name: "Impressions", value: 100 },
  { name: "Clicks", value: 28 },
  { name: "Add to Cart", value: 15 },
  { name: "Purchase", value: 8 },
]

const adPerformanceData: AdPerformanceData[] = [
  { campaign: "Brand PPC", ctr: 2.5, acos: 15, roas: 6.7 },
  { campaign: "Category", ctr: 1.8, acos: 18, roas: 5.5 },
  { campaign: "Competitor", ctr: 1.2, acos: 22, roas: 4.5 },
  { campaign: "Retargeting", ctr: 3.5, acos: 12, roas: 8.3 },
]

const inventoryHealthData: InventoryHealthData[] = [
  { product: "Product A", inStock: 85, optimal: 100, turnover: 4.2 },
  { product: "Product B", inStock: 120, optimal: 80, turnover: 2.8 },
  { product: "Product C", inStock: 45, optimal: 60, turnover: 5.1 },
  { product: "Product D", inStock: 30, optimal: 70, turnover: 3.5 },
  { product: "Product E", inStock: 65, optimal: 50, turnover: 4.0 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

const AmazonSellerDashboardMetrics = (): JSX.Element => {
  return (
    <div className="space-y-4">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Avg. Profit Margin" 
          value="31.5%" 
          trend={{ value: 2.3, direction: "up" }}
          icon={<DollarSign className="h-4 w-4" />}
          description="Across all marketplaces" 
        />
        
        <KpiCard 
          title="Product Return Rate" 
          value="2.8%" 
          trend={{ value: 0.5, direction: "down" }}
          icon={<ShoppingCart className="h-4 w-4" />}
          description="30-day average" 
        />
        
        <KpiCard 
          title="Customer Acquisition" 
          value="$18.42" 
          trend={{ value: 1.2, direction: "down" }}
          icon={<Users className="h-4 w-4" />}
          description="Cost per new customer" 
        />
        
        <KpiCard 
          title="Avg. ACOS" 
          value="16.8%" 
          trend={{ value: 1.4, direction: "down" }}
          icon={<Target className="h-4 w-4" />}
          description="Advertising cost of sale" 
        />
      </div>

      {/* Note about Profitability content */}
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          Profitability analysis charts have been moved to the main Overview tab for easier access.
        </p>
      </div>
    </div>
  )
}

// KPI Card component for summary metrics
const KpiCard = ({ title, value, trend, icon, description }: KpiCardProps): JSX.Element => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="rounded-full bg-muted p-2">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <span className={trend.direction === "up" ? "text-green-500" : "text-red-500"}>
            {trend.direction === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          </span>
          <span className={trend.direction === "up" ? "text-green-500" : "text-red-500"}>
            {trend.value}%
          </span>
          <span>{trend.direction === "up" ? "increase" : "decrease"}</span>
        </div>
        <p className="text-xs text-muted-foreground pt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

export default AmazonSellerDashboardMetrics;