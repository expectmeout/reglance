import { Suspense } from "react";
import { InventoryDashboardWrapper } from "@/components/inventory/dashboard-wrapper";

export const metadata = {
  title: "Inventory Management",
};

export default function InventoryPage() {
  return (
    <Suspense fallback={<div>Loading inventory dashboard...</div>}>
      <InventoryDashboardWrapper />
    </Suspense>
  );
}