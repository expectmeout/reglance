"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import { 
  BarChart3Icon, 
  TrendingUp, 
  DollarSign, 
  SearchIcon,
  FilterIcon,
  ChevronRight,
  MoreHorizontal 
} from "lucide-react";

// Import UI components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/table";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/hover-card";
import { Badge } from "@/components/badge";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { ScrollArea } from "@/components/scroll-area";

// Define types
interface ChannelData {
  id: string;
  channel: string;
  platform: string;
  sessions: number;
  bounceRate: number;
  convRate: number;
  cpa: number;
  trend: number;
  status: string;
  lastUpdated: string;
  owner: string;
  budget: number;
  spend: number;
}

interface CampaignData {
  id: string;
  campaignName: string;
  platform: string;
  type: string;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  acos: number;
  roas: number;
  status: string;
  lastUpdated: string;
  owner: string;
  startDate: string;
  endDate: string;
}

// Sample channel performance data
const initialChannelPerformance: ChannelData[] = [
  {
    id: "channel-001",
    channel: "Amazon PPC",
    platform: "amazon",
    sessions: 58420,
    bounceRate: 32.5,
    convRate: 4.8,
    cpa: 18.74,
    trend: 7.2,
    status: "Active",
    lastUpdated: "2024-03-01",
    owner: "Marketing Team",
    budget: 12000,
    spend: 8540,
  },
  {
    id: "channel-002",
    channel: "Walmart Ads",
    platform: "walmart",
    sessions: 24850,
    bounceRate: 38.3,
    convRate: 3.2,
    cpa: 25.18,
    trend: -4.9,
    status: "Active",
    lastUpdated: "2024-03-01",
    owner: "Digital Team",
    budget: 8000,
    spend: 4250,
  },
  {
    id: "channel-003",
    channel: "Facebook Ads",
    platform: "facebook",
    sessions: 37740,
    bounceRate: 45.7,
    convRate: 2.1,
    cpa: 35.62,
    trend: -2.8,
    status: "Paused",
    lastUpdated: "2024-02-28",
    owner: "Social Media Team",
    budget: 10000,
    spend: 3750,
  },
  {
    id: "channel-004",
    channel: "Google Ads",
    platform: "google",
    sessions: 47620,
    bounceRate: 40.2,
    convRate: 3.4,
    cpa: 22.45,
    trend: 4.3,
    status: "Active",
    lastUpdated: "2024-03-02",
    owner: "PPC Team",
    budget: 15000,
    spend: 7820,
  },
  {
    id: "channel-005",
    channel: "Email Marketing",
    platform: "email",
    sessions: 15380,
    bounceRate: 28.9,
    convRate: 5.7,
    cpa: 12.3,
    trend: 8.5,
    status: "Active",
    lastUpdated: "2024-03-02",
    owner: "CRM Team",
    budget: 5000,
    spend: 1850,
  },
];

// Sample active campaigns data
const initialActiveCampaigns: CampaignData[] = [
  {
    id: "campaign-001",
    campaignName: "Summer Sale - Electronics",
    platform: "amazon",
    type: "Sponsored Products",
    budget: 100,
    spend: 2854.0,
    impressions: 345670,
    clicks: 6913,
    acos: 15.8,
    roas: 6.3,
    status: "Active",
    lastUpdated: "2024-02-28",
    owner: "PPC Team",
    startDate: "2024-02-01",
    endDate: "2024-08-31",
  },
  {
    id: "campaign-002",
    campaignName: "Brand Awareness Q3",
    platform: "amazon",
    type: "Sponsored Brands",
    budget: 150,
    spend: 4125.0,
    impressions: 527840,
    clicks: 7917,
    acos: 18.2,
    roas: 5.5,
    status: "Active",
    lastUpdated: "2024-03-01",
    owner: "Brand Team",
    startDate: "2024-03-01",
    endDate: "2024-09-30",
  },
  {
    id: "campaign-003",
    campaignName: "Product Launch - Kitchen",
    platform: "walmart",
    type: "Sponsored Products",
    budget: 75,
    spend: 1875.0,
    impressions: 238590,
    clicks: 4772,
    acos: 22.5,
    roas: 4.4,
    status: "Active",
    lastUpdated: "2024-02-15",
    owner: "Product Team",
    startDate: "2024-02-15",
    endDate: "2024-05-15",
  },
  {
    id: "campaign-004",
    campaignName: "Competitor Targeting",
    platform: "amazon",
    type: "Sponsored Display",
    budget: 50,
    spend: 1250.0,
    impressions: 175430,
    clicks: 3508,
    acos: 19.8,
    roas: 5.1,
    status: "Paused",
    lastUpdated: "2024-02-20",
    owner: "Strategy Team",
    startDate: "2024-01-10",
    endDate: "2024-04-10",
  },
  {
    id: "campaign-005",
    campaignName: "Category Domination",
    platform: "amazon",
    type: "DSP",
    budget: 200,
    spend: 5600.0,
    impressions: 875240,
    clicks: 17505,
    acos: 16.2,
    roas: 6.2,
    status: "Active",
    lastUpdated: "2024-03-02",
    owner: "DSP Team",
    startDate: "2024-02-01",
    endDate: "2024-07-31",
  },
];

// Efficient date display component with placeholder
const DateDisplay = ({ dateString }: { dateString: string }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Render a placeholder with matching width during SSR
  if (!mounted) {
    return <span className="inline-block min-w-[80px]">—</span>;
  }
  
  try {
    const normalizedDateString = dateString.includes('T') 
      ? dateString 
      : `${dateString}T00:00:00Z`;
    
    const date = new Date(normalizedDateString);
    
    if (isNaN(date.getTime())) {
      return <span>Invalid date</span>;
    }
    
    return <span>{format(date, 'MMM d, yyyy')}</span>;
  } catch (error) {
    return <span>Error</span>;
  }
};

export function RecentMarketing() {
  const [channelPerformance] = useState(initialChannelPerformance);
  const [activeCampaigns] = useState(initialActiveCampaigns);
  const [activeTab, setActiveTab] = useState("channelPerformance");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Calculate summary metrics once
  const channelMetrics = useMemo(() => {
    const totalSpend = channelPerformance.reduce((sum, item) => sum + item.spend, 0);
    const totalSessions = channelPerformance.reduce((sum, item) => sum + item.sessions, 0);
    const avgConvRate = channelPerformance.reduce((sum, item) => sum + item.convRate, 0) / channelPerformance.length;
    
    return {
      totalSpend,
      totalSessions,
      avgConvRate
    };
  }, [channelPerformance]);
  
  const campaignMetrics = useMemo(() => {
    const totalSpend = activeCampaigns.reduce((sum, item) => sum + item.spend, 0);
    const totalImpressions = activeCampaigns.reduce((sum, item) => sum + item.impressions, 0);
    const avgRoas = activeCampaigns.reduce((sum, item) => sum + item.roas, 0) / activeCampaigns.length;
    
    return {
      totalSpend,
      totalImpressions,
      avgRoas
    };
  }, [activeCampaigns]);

  // Format large numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Add keyboard shortcut for search (Command+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("marketing-search").focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Card className="overflow-hidden h-[675px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Marketing Performance</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <span>Showing the last {channelPerformance.length} channels</span>
            <button
              className="inline-flex items-center text-xs text-primary hover:underline ml-1"
              onClick={() => { /* View all channels logic */ }}
            >
              <span>View all</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-[180px] transition-all duration-200 focus-within:w-[250px]">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              id="marketing-search"
              type="search"
              placeholder="Search marketing..."
              className="pl-8 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-2 top-2 text-xs text-muted-foreground pointer-events-none hidden sm:block">
              <kbd className="px-1.5 py-0.5 border rounded-md bg-muted text-[10px]">⌘</kbd>
              <kbd className="px-1.5 py-0.5 border rounded-md bg-muted text-[10px] ml-1">K</kbd>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {}}>
                All Channels
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                Active Channels
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                Paused Channels
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Date Range
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="channelPerformance" value={activeTab} onValueChange={setActiveTab} className="px-6 pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="channelPerformance">Channel Performance</TabsTrigger>
            <TabsTrigger value="activeCampaigns">Active Campaigns</TabsTrigger>
          </TabsList>

          {/* Channel Performance Tab */}
          <TabsContent value="channelPerformance" className="mt-4">
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="bg-muted/40 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Total Spend</p>
                <p className="text-lg font-bold">$26.2K</p>
              </div>
              <div className="bg-muted/40 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Sessions</p>
                <p className="text-lg font-bold">184.0K</p>
              </div>
              <div className="bg-muted/40 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Avg. Conv. Rate</p>
                <p className="text-lg font-bold">3.8%</p>
              </div>
              <div className="bg-muted/40 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Bounce Rate</p>
                <p className="text-lg font-bold">37.1%</p>
                <div className="mt-1 h-1 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: "37.1%" }}
                  />
                </div>
              </div>
            </div>
            <ScrollArea className="h-[500px]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-medium">Channel</TableHead>
                      <TableHead className="font-medium">Sessions</TableHead>
                      <TableHead className="font-medium">Bounce Rate</TableHead>
                      <TableHead className="font-medium">Conv. Rate</TableHead>
                      <TableHead className="font-medium">CPA</TableHead>
                      <TableHead className="font-medium">Trend</TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {channelPerformance.map((channel) => (
                      <HoverCard key={channel.id} openDelay={300} closeDelay={200}>
                        <HoverCardTrigger asChild>
                          <TableRow className="border-b border-border/50 group cursor-default hover:bg-muted/50 transition-colors">
                            <TableCell className="font-medium py-4">{channel.channel}</TableCell>
                            <TableCell className="py-4">{channel.sessions.toLocaleString()}</TableCell>
                            <TableCell className="py-4">{channel.bounceRate}%</TableCell>
                            <TableCell className="py-4">{channel.convRate}%</TableCell>
                            <TableCell className="py-4">${channel.cpa.toFixed(2)}</TableCell>
                            <TableCell className="py-4">
                              <span className={channel.trend > 0 ? "text-green-500" : "text-red-500"}>
                                {channel.trend > 0 ? "+" : ""}{channel.trend}%
                              </span>
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge variant={channel.status === "Active" ? "default" : "secondary"} className="rounded-sm">
                                {channel.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 p-4" side="right">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <h4 className="font-semibold">{channel.channel}</h4>
                              <Badge variant={channel.status === "Active" ? "default" : "secondary"}>
                                {channel.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>Sessions: <span className="font-semibold">{channel.sessions.toLocaleString()}</span></div>
                              <div>Bounce Rate: <span className="font-semibold">{channel.bounceRate}%</span></div>
                              <div>Conversion: <span className="font-semibold">{channel.convRate}%</span></div>
                              <div>CPA: <span className="font-semibold">${channel.cpa.toFixed(2)}</span></div>
                              <div>Budget: <span className="font-semibold">${channel.budget.toLocaleString()}</span></div>
                              <div>Spend: <span className="font-semibold">${channel.spend.toLocaleString()}</span></div>
                            </div>
                            <div className="pt-1 text-xs text-muted-foreground">
                              Last updated: <DateDisplay dateString={channel.lastUpdated} />
                            </div>
                            <div className="flex gap-2">
                              <button className="text-xs px-2 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded">
                                View Details
                              </button>
                              <button className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded">
                                Edit
                              </button>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Active Campaigns Tab */}
          <TabsContent value="activeCampaigns" className="mt-4">
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="bg-muted/40 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Total Spend</p>
                <p className="text-lg font-bold">$15.7K</p>
              </div>
              <div className="bg-muted/40 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Impressions</p>
                <p className="text-lg font-bold">2.16M</p>
              </div>
              <div className="bg-muted/40 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Avg. ROAS</p>
                <p className="text-lg font-bold">5.5x</p>
              </div>
              <div className="bg-muted/40 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">CTR</p>
                <p className="text-lg font-bold">2.1%</p>
                <div className="mt-1 h-1 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: "21%" }}
                  />
                </div>
              </div>
            </div>
            <ScrollArea className="h-[500px]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-medium">Campaign</TableHead>
                      <TableHead className="font-medium">Type</TableHead>
                      <TableHead className="font-medium">Impressions</TableHead>
                      <TableHead className="font-medium">Clicks</TableHead>
                      <TableHead className="font-medium">ACOS</TableHead>
                      <TableHead className="font-medium">ROAS</TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeCampaigns.map((campaign) => (
                      <HoverCard key={campaign.id} openDelay={300} closeDelay={200}>
                        <HoverCardTrigger asChild>
                          <TableRow className="border-b border-border/50 group cursor-default hover:bg-muted/50 transition-colors">
                            <TableCell className="font-medium">{campaign.campaignName}</TableCell>
                            <TableCell>{campaign.type}</TableCell>
                            <TableCell>{campaign.impressions.toLocaleString()}</TableCell>
                            <TableCell>{campaign.clicks.toLocaleString()}</TableCell>
                            <TableCell>{campaign.acos}%</TableCell>
                            <TableCell>{campaign.roas}x</TableCell>
                            <TableCell>
                              <Badge variant={campaign.status === "Active" ? "default" : "secondary"} className="rounded-sm">
                                {campaign.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 p-4" side="right">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <h4 className="font-semibold">{campaign.campaignName}</h4>
                              <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                                {campaign.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>Type: <span className="font-semibold">{campaign.type}</span></div>
                              <div>Platform: <span className="font-semibold capitalize">{campaign.platform}</span></div>
                              <div>Impressions: <span className="font-semibold">{campaign.impressions.toLocaleString()}</span></div>
                              <div>Clicks: <span className="font-semibold">{campaign.clicks.toLocaleString()}</span></div>
                              <div>ACOS: <span className="font-semibold">{campaign.acos}%</span></div>
                              <div>ROAS: <span className="font-semibold">{campaign.roas}x</span></div>
                            </div>
                            <div className="pt-2">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Start: <DateDisplay dateString={campaign.startDate} /></span>
                                <span>End: <DateDisplay dateString={campaign.endDate} /></span>
                              </div>
                              <div className="mt-1 h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: "45%" }}></div>
                              </div>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Budget: ${campaign.budget}/day</span>
                              <span>Spend: ${campaign.spend.toLocaleString()}</span>
                            </div>
                            <div className="pt-1 text-xs text-muted-foreground">
                              Last updated: <DateDisplay dateString={campaign.lastUpdated} />
                            </div>
                            <div className="flex gap-2">
                              <button className="text-xs px-2 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded">
                                View Details
                              </button>
                              <button className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded">
                                Edit
                              </button>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}