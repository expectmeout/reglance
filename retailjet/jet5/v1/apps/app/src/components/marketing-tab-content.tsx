"use client"

import { 
  TabsContent 
} from "@/components/tabs"
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
import { Badge } from "@/components/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { AcosCampaign } from "@/components/marketing/acos-campaign"
// Import our custom chart components
import { AdSpendRevenueChart } from "@/components/ad-spend-revenue"
import { TrafficSourcesChart } from "@/components/traffic-sources"
import { CustomerSegmentChart } from "@/components/customer-segment"
import { CvrByChannel } from "@/components/marketing/cvr-by-channel"
import { InteractiveBarChart } from "@/components/marketing/interactive-bar-chart"
// Define types
interface Campaign {
  id: string;
  name: string;
  platform: string;
  type: string;
  budget: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  acos: number;
  roas: number;
  status: "Active" | "Paused" | "Ended";
}

interface ChannelMetric {
  channel: string;
  sessions: number;
  bounceRate: number;
  conversionRate: number;
  cpa: number;
  trend: {
    value: number;
    direction: "up" | "down";
  };
}

// Sample campaign data
const campaignData: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale - Electronics",
    platform: "Amazon",
    type: "Sponsored Products",
    budget: "$100/day",
    spend: 2854,
    impressions: 345670,
    clicks: 6913,
    conversions: 345,
    revenue: 17983,
    acos: 15.8,
    roas: 6.3,
    status: "Active"
  },
  {
    id: "2",
    name: "Brand Awareness Q3",
    platform: "Amazon",
    type: "Sponsored Brands",
    budget: "$150/day",
    spend: 4125,
    impressions: 527840,
    clicks: 7917,
    conversions: 198,
    revenue: 22687,
    acos: 18.2,
    roas: 5.5,
    status: "Active"
  },
  {
    id: "3",
    name: "Product Launch - Kitchen",
    platform: "Walmart",
    type: "Sponsored Products",
    budget: "$75/day",
    spend: 1875,
    impressions: 238590,
    clicks: 4772,
    conversions: 143,
    revenue: 8250,
    acos: 22.5,
    roas: 4.4,
    status: "Active"
  },
  {
    id: "4",
    name: "Competitor Targeting",
    platform: "Amazon",
    type: "Sponsored Display",
    budget: "$50/day",
    spend: 1250,
    impressions: 175430,
    clicks: 3508,
    conversions: 88,
    revenue: 6375,
    acos: 19.8,
    roas: 5.1,
    status: "Paused"
  },
  {
    id: "5",
    name: "Category Domination",
    platform: "Amazon",
    type: "DSP",
    budget: "$200/day",
    spend: 5600,
    impressions: 875240,
    clicks: 17505,
    conversions: 438,
    revenue: 34720,
    acos: 16.2,
    roas: 6.2,
    status: "Active"
  }
];

// Channel performance data
const channelData: ChannelMetric[] = [
  {
    channel: "Amazon PPC",
    sessions: 58420,
    bounceRate: 32.5,
    conversionRate: 4.8,
    cpa: 18.74,
    trend: { value: 7.2, direction: "up" }
  },
  {
    channel: "Walmart Ads",
    sessions: 24850,
    bounceRate: 38.3,
    conversionRate: 3.2,
    cpa: 25.18,
    trend: { value: 5.4, direction: "up" }
  },
  {
    channel: "Facebook Ads",
    sessions: 32740,
    bounceRate: 45.7,
    conversionRate: 2.1,
    cpa: 35.62,
    trend: { value: 2.8, direction: "down" }
  },
  {
    channel: "Google Ads",
    sessions: 47620,
    bounceRate: 40.2,
    conversionRate: 3.4,
    cpa: 22.45,
    trend: { value: 4.3, direction: "up" }
  },
  {
    channel: "Email Marketing",
    sessions: 15380,
    bounceRate: 28.9,
    conversionRate: 5.7,
    cpa: 12.30,
    trend: { value: 8.5, direction: "up" }
  }
];

// Function to format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
};

// Function to format number with commas
const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

// Function to determine badge color based on status
const getStatusBadgeColor = (status: string): string => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Paused":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Ended":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

// Add these imports at the top of the file
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  AreaChart, 
  Line, 
  Bar, 
  Pie, 
  Cell, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Add any missing data variables
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const adPerformanceData = [
  { campaign: "Brand", acos: 15, ctr: 2.3, roas: 6.7 },
  { campaign: "Category", acos: 18, ctr: 1.8, roas: 5.5 },
  { campaign: "Competitor", acos: 22, ctr: 1.5, roas: 4.5 },
  { campaign: "Product", acos: 12, ctr: 2.8, roas: 8.3 }
];

const costBreakdownData = [
  { name: "Organic", value: 42 },
  { name: "PPC", value: 28 },
  { name: "Social", value: 15 },
  { name: "Referral", value: 10 },
  { name: "Email", value: 5 },
];

// If chartConfig is needed and not defined elsewhere
const chartConfig = {
  // Add your chart configuration here
  // This is a placeholder - replace with your actual config
  theme: 'dark',
  animationEnabled: true,
  responsive: true
};

export function MarketingTabContent(): JSX.Element {
  return (
    <TabsContent value="marketing" className="space-y-4">
      {/* KPI Summary Cards - Keep as 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ad Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(87450)}</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> 12.4%
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ad Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(530680)}</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> 18.7%
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average ACOS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16.8%</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" /> 1.4%
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average ROAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.9x</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> 0.8x
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section - First Row */}
      <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
        {/* ACOS By Campaign - Takes 2 columns */}
          <AcosCampaign />
        <CustomerSegmentChart />
        <TrafficSourcesChart />
        <CvrByChannel />
      </div>


      {/* Charts Section - Second Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4">
          <InteractiveBarChart />
        </div>
      </div>
      
      {/* Tables Section - Full width */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance</CardTitle>
          <CardDescription>Key metrics by marketing channel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead className="text-right">Sessions</TableHead>
                  <TableHead className="text-right">Bounce Rate</TableHead>
                  <TableHead className="text-right">Conv. Rate</TableHead>
                  <TableHead className="text-right">CPA</TableHead>
                  <TableHead className="text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {channelData.map((channel, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{channel.channel}</TableCell>
                    <TableCell className="text-right">{formatNumber(channel.sessions)}</TableCell>
                    <TableCell className="text-right">{channel.bounceRate}%</TableCell>
                    <TableCell className="text-right">{channel.conversionRate}%</TableCell>
                    <TableCell className="text-right">{formatCurrency(channel.cpa)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        {channel.trend.direction === "up" ? (
                          <span className="text-green-500 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" /> {channel.trend.value}%
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center">
                            <TrendingDown className="h-3 w-3 mr-1" /> {channel.trend.value}%
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
          <CardDescription>Performance metrics for all ad campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Budget</TableHead>
                  <TableHead className="text-right">Spend</TableHead>
                  <TableHead className="text-right">Impressions</TableHead>
                  <TableHead className="text-right">Clicks</TableHead>
                  <TableHead className="text-right">ACOS</TableHead>
                  <TableHead className="text-right">ROAS</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignData.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>{campaign.platform}</TableCell>
                    <TableCell>{campaign.type}</TableCell>
                    <TableCell className="text-right">{campaign.budget}</TableCell>
                    <TableCell className="text-right">{formatCurrency(campaign.spend)}</TableCell>
                    <TableCell className="text-right">{formatNumber(campaign.impressions)}</TableCell>
                    <TableCell className="text-right">{formatNumber(campaign.clicks)}</TableCell>
                    <TableCell className="text-right">{campaign.acos}%</TableCell>
                    <TableCell className="text-right">{campaign.roas}x</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-xs text-muted-foreground">
          <div>Showing {campaignData.length} campaigns</div>
          <div>Last updated: Mar 5, 2025</div>
        </CardFooter>
      </Card>
    </TabsContent>
  )
}