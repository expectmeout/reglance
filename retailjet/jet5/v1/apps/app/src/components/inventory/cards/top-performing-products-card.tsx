import React from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/card";
import { Badge } from "@/components/badge";
import { Progress } from "@/components/progress";
import { TrendingUp } from "lucide-react";

// Mock data for top performing products
const topProducts = [
  {
    id: 1,
    name: "Premium Bluetooth Headphones",
    sku: "BT-HEAD-001",
    salesCount: 428,
    revenue: 34240,
    salesIncrease: 15.3,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    sku: "APP-TSHIRT-102",
    salesCount: 312,
    revenue: 12480,
    salesIncrease: 8.7,
    category: "Apparel"
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    sku: "HOME-BOTTLE-233",
    salesCount: 287,
    revenue: 8610,
    salesIncrease: 12.1,
    category: "Home & Kitchen"
  }
];

export const TopPerformingProductsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Top Performing Products</CardTitle>
        <CardDescription>
          Highest revenue generators this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map(product => (
            <div key={product.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <div className="text-sm text-muted-foreground">SKU: {product.sku}</div>
                </div>
                <Badge variant="outline" className="ml-2">
                  {product.category}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 my-2">
                <div>
                  <div className="text-sm font-medium">${product.revenue.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Revenue</div>
                </div>
                <div>
                  <div className="text-sm font-medium">{product.salesCount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Units Sold</div>
                </div>
              </div>
              
              <div className="flex items-center mt-2">
                <Progress value={75} className="h-2 flex-1" />
                <div className="ml-2 flex items-center text-xs text-emerald-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {product.salesIncrease}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};