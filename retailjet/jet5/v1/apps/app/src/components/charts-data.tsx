// src/components/charts-data.tsx
'use client'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Sample data for the charts
export const revenueData = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  // ...other data
]

export const marketingData = [
  { name: 'Facebook', value: 400 },
  { name: 'Twitter', value: 300 },
  // ...other data
]

// Client components for charts would go here
export function RevenueChart() {
  // Implementation
}