"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/skeleton";

// Dynamically import the dashboard component with no SSR
const InventoryDashboard = dynamic(
  () => import("./dashboard").then((mod) => mod.InventoryDashboard),
  {
    ssr: false,
    loading: () => <DashboardSkeleton />,
  }
);

export function InventoryDashboardWrapper() {
  return <InventoryDashboard />;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[250px]" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[300px] rounded-xl" />
        <Skeleton className="h-[300px] rounded-xl" />
        <Skeleton className="h-[300px] rounded-xl" />
      </div>
    </div>
  );
}