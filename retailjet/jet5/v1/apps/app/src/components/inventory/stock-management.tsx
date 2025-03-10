"use client";

import { InventoryPerformance } from "./inventory-performance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";

export function StockManagement() {
  return (
    <div className="space-y-6">
      {/* Enhanced Inventory Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Inventory Performance Analytics</CardTitle>
          <CardDescription>
            Advanced inventory metrics with dynamic reorder points and channel analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <InventoryPerformance />
        </CardContent>
      </Card>
    </div>
  );
}

export default StockManagement;