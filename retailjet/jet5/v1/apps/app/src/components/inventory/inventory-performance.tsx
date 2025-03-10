import React from 'react';
import { inventoryData } from './inventory-data-table';
import EnhancedInventoryDataTable from './enhanced-inventory-data-table';

export function InventoryPerformance() {
  return (
    <div>
      <EnhancedInventoryDataTable data={inventoryData} />
    </div>
  );
}

export default InventoryPerformance; 