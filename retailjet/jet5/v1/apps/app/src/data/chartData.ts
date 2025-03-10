export const inventoryHealthData = [
  { metric: "Stock Level", value: 75 },
  { metric: "Days of Supply", value: 60 },
  { metric: "Turnover Rate", value: 85 },
  { metric: "Fill Rate", value: 92 },
  { metric: "Carrying Cost", value: 68 }
];

export const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

// Define and export chartConfig
export const chartConfig = {
  total: {
    label: "Total Stock",
    color: "hsl(var(--chart-1))",
  },
  actual: {
    label: "Current Stock",
    color: "hsl(var(--chart-3))",
  },
  optimal: {
    label: "Optimal Stock",
    color: "hsl(var(--chart-2))",
  },
  overstock: {
    label: "Overstock",
    color: "hsl(var(--chart-4))",
  },
  critical: {
    label: "Critical Stock",
    color: "hsl(var(--chart-5))",
  },
}; 