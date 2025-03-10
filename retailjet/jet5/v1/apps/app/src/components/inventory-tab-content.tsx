"use client";

import { TabsContent } from "@/components/tabs";
import { InventoryDashboard } from "@/components/inventory/dashboard";

export default function InventoryTabContent() {
  return (
    <TabsContent value="inventory" className="space-y-4">
      <InventoryDashboard />
    </TabsContent>
  );
}