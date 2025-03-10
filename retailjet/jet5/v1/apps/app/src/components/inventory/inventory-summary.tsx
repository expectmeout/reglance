"use client";

import { AreaChartChannelLevels } from "./cards/area-chart-channel-levels";
import { BarChartDist2 } from "@/components/barchart-dist";
import { RadarChartHealth2 } from "./cards/radarchart-inventory-health";
import { WarehouseDist2 } from "./cards/warehouse-dist-piechart";
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
import { TurnoverProductChart } from "../inventory-new/turnover-by-product";
import { InventoryTurnoverChart } from "../inventory-new/inventory-turnover-chart";
import { InventoryAgeChart2 } from "../inventory-new/inventory-age-chart";
import { TooltipChart } from "../inventory-new/tooltip-chart";
import { InventoryHealthProduct } from "../inventory-new/inventory-health-product";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function InventorySummary() {
  return (
    <>
      <AreaChartChannelLevels />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <BarChartDist2 />
        <RadarChartHealth2 />
        <WarehouseDist2 />
      </div>

      <div className="space-y-4 mt-8">        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <TooltipChart />
          
          <InventoryTurnoverChart />

          <InventoryHealthProduct />
          
          <TurnoverProductChart />
        </div>


        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Restock Recommendations</CardTitle>
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
          
        </div>
      </div>
    </>
  );
} 