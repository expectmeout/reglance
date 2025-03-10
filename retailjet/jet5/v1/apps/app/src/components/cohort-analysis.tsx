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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip"

// Define types for the component
interface CohortData {
  id: string;
  label: string;
  initialUsers: number;
  retention: (number | null)[];
}

type CohortType = "retention" | "revenue";

// Sample cohort data
const cohortData: CohortData[] = [
  {
    id: "2024-01",
    label: "Jan 2024",
    initialUsers: 2854,
    retention: [100, 88.8, 79.5, 74.2, 68.2, 65.4, 59.4]
  },
  {
    id: "2024-02",
    label: "Feb 2024",
    initialUsers: 2960,
    retention: [100, 89.2, 80.6, 72.1, 65.3, 62.3, null]
  },
  {
    id: "2024-03",
    label: "Mar 2024",
    initialUsers: 3102,
    retention: [100, 90.5, 81.2, 75.8, 68.9, null, null]
  },
  {
    id: "2024-04",
    label: "Apr 2024",
    initialUsers: 2875,
    retention: [100, 88.4, 78.9, 73.2, null, null, null]
  },
  {
    id: "2024-05",
    label: "May 2024",
    initialUsers: 3245,
    retention: [100, 91.2, 82.5, null, null, null, null]
  },
  {
    id: "2024-06",
    label: "Jun 2024",
    initialUsers: 3410,
    retention: [100, 92.7, null, null, null, null, null]
  },
  {
    id: "2024-07",
    label: "Jul 2024",
    initialUsers: 3520,
    retention: [100, null, null, null, null, null, null]
  }
];

export function CohortAnalysis(): JSX.Element {
  const [cohortType, setCohortType] = useState<CohortType>("retention");
  
  // Function to determine cell color based on retention value
  const getCellColor = (value: number | null): string => {
    if (value === null) return "";
    
    if (cohortType === "retention") {
      if (value >= 90) return "bg-green-100 dark:bg-green-950";
      if (value >= 80) return "bg-green-50 dark:bg-green-900";
      if (value >= 70) return "bg-blue-50 dark:bg-blue-900";
      if (value >= 60) return "bg-blue-100 dark:bg-blue-950";
      if (value >= 50) return "bg-yellow-50 dark:bg-yellow-900";
      return "bg-red-50 dark:bg-red-900";
    } else {
      // Revenue cohort coloring would be different
      if (value >= 120) return "bg-green-100 dark:bg-green-950";
      if (value >= 100) return "bg-green-50 dark:bg-green-900";
      if (value >= 80) return "bg-blue-50 dark:bg-blue-900";
      if (value >= 60) return "bg-blue-100 dark:bg-blue-950";
      if (value >= 40) return "bg-yellow-50 dark:bg-yellow-900";
      return "bg-red-50 dark:bg-red-900";
    }
  };
  
  // Function to format cell value
  const formatCellValue = (value: number | null): string => {
    if (value === null) return "-";
    
    if (cohortType === "retention") {
      return `${value.toFixed(1)}%`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };
  
  // Switch between retention and revenue data
  const getCohortData = (): CohortData[] => {
    if (cohortType === "retention") {
      return cohortData;
    } else {
      // This would be your LTV or revenue data in a real implementation
      // Here we're just transforming the retention data to simulate revenue
      return cohortData.map(cohort => ({
        ...cohort,
        retention: cohort.retention.map(val => 
          val === null ? null : (val / 100) * (Math.random() * 50 + 100)
        )
      }));
    }
  };
  
  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Cohort Analysis</CardTitle>
            <CardDescription>
              Track customer behavior over time from first purchase
            </CardDescription>
          </div>
          <Select 
            value={cohortType} 
            onValueChange={(value: string) => setCohortType(value as CohortType)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retention">Retention</SelectItem>
              <SelectItem value="revenue">Avg. Revenue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Cohort</TableHead>
                <TableHead className="text-right">Users</TableHead>
                {Array.from({ length: 7 }, (_, i) => (
                  <TableHead key={i} className="text-center">
                    Month {i}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {getCohortData().map((cohort) => (
                <TableRow key={cohort.id}>
                  <TableCell className="font-medium">{cohort.label}</TableCell>
                  <TableCell className="text-right">{cohort.initialUsers.toLocaleString()}</TableCell>
                  {cohort.retention.map((value, index) => (
                    <TableCell 
                      key={index} 
                      className={`text-center ${getCellColor(value)}`}
                    >
                      {formatCellValue(value)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex gap-2 items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Month 0 shows the initial value (100% retention).</p>
              <p>Each column represents months since the cohort started.</p>
              <p>Higher values (greener) are better for both metrics.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>
          {cohortType === "retention" 
            ? "Shows percentage of customers who returned to make another purchase." 
            : "Shows average revenue per customer over time."
          }
        </span>
      </CardFooter>
    </Card>
  )
}

export default CohortAnalysis;