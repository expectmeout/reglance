"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle2,
  Download,
  Filter,
  MoreHorizontal,
  Package,
  PlusCircle,
  Trash2,
  UploadCloud,
} from "lucide-react";

import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { Input } from "@/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/alert-dialog";
import { Badge } from "@/components/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Progress } from "@/components/progress";
import { ScrollArea } from "@/components/scroll-area";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  optimalStock: number;
  reorderPoint: number;
  daysOfSupply: number;
  status: "In Stock" | "Low Stock" | "Out of Stock" | "Excess Stock";
  location: string;
  price: number;
  lastUpdated: string;
}

// Sample inventory data
export const inventoryData: InventoryItem[] = [
  {
    id: "INV001",
    name: "Ultra Comfort Pillow",
    sku: "UCP-001",
    stock: 85,
    optimalStock: 100,
    reorderPoint: 50,
    daysOfSupply: 28,
    status: "In Stock",
    location: "US-East",
    price: 29.99,
    lastUpdated: "2024-03-01"
  },
  {
    id: "2",
    name: "Premium Kitchen Knife Set",
    sku: "PKK-002",
    stock: 32,
    optimalStock: 50,
    reorderPoint: 25,
    daysOfSupply: 45,
    status: "In Stock",
    location: "US-West",
    price: 89.99,
    lastUpdated: "2024-03-02"
  },
  {
    id: "3",
    name: "Wireless Earbuds Pro",
    sku: "WEP-003",
    stock: 12,
    optimalStock: 60,
    reorderPoint: 30,
    daysOfSupply: 12,
    status: "Low Stock",
    location: "US-Central",
    price: 149.99,
    lastUpdated: "2024-03-01"
  },
  {
    id: "4",
    name: "Natural Bamboo Cutting Board",
    sku: "NBC-004",
    stock: 8,
    optimalStock: 40,
    reorderPoint: 20,
    daysOfSupply: 8,
    status: "Low Stock",
    location: "US-East",
    price: 24.99,
    lastUpdated: "2024-02-28"
  },
  {
    id: "5",
    name: "Smart LED Light Bulbs (4-Pack)",
    sku: "SLB-005",
    stock: 65,
    optimalStock: 80,
    reorderPoint: 40,
    daysOfSupply: 22,
    status: "In Stock",
    location: "US-West",
    price: 39.99,
    lastUpdated: "2024-03-03"
  },
  {
    id: "6",
    name: "Professional Hair Dryer",
    sku: "PHD-006",
    stock: 0,
    optimalStock: 30,
    reorderPoint: 15,
    daysOfSupply: 0,
    status: "Out of Stock",
    location: "US-Central",
    price: 79.99,
    lastUpdated: "2024-02-25"
  },
  {
    id: "7",
    name: "Organic Cotton Bath Towels",
    sku: "OCT-007",
    stock: 42,
    optimalStock: 60,
    reorderPoint: 30,
    daysOfSupply: 35,
    status: "In Stock",
    location: "US-East",
    price: 34.99,
    lastUpdated: "2024-03-04"
  },
  {
    id: "8",
    name: "Stainless Steel Water Bottle",
    sku: "SSB-008",
    stock: 7,
    optimalStock: 45,
    reorderPoint: 22,
    daysOfSupply: 5,
    status: "Low Stock",
    location: "US-West",
    price: 19.99,
    lastUpdated: "2024-03-02"
  }
];

// Helper function to get status badge variant
function getStatusBadge(status: string): "destructive" | "secondary" | "default" | "outline" | null | undefined {
  switch (status) {
    case "success":
      return "secondary";
    case "warning":
      return "outline";
    case "error":
      return "destructive";
    default:
      return "default";
  }
}

export function InventoryDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedLocation, setSelectedLocation] = React.useState<string>("all");

  // Define unique categories and locations for filters
  const categories = Array.from(new Set(inventoryData.map(item => item.location)));
  const locations = Array.from(new Set(inventoryData.map(item => item.location)));

  // Define columns for the data table
  const columns: ColumnDef<InventoryItem>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <span className="font-medium">{row.getValue("name")}</span>
            <span className="text-xs text-muted-foreground">{row.original.location}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => <div className="font-mono text-xs">{row.getValue("sku")}</div>,
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <div className="text-right" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
        </div>
      ),
      cell: ({ row }) => {
        const stock = parseInt(row.getValue("stock"));
        const optimal = row.original.optimalStock;
        const percentage = Math.min(100, Math.round((stock / optimal) * 100));
        
        return (
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="font-medium">{stock}</span>
              <span className="text-xs text-muted-foreground">/ {optimal}</span>
            </div>
            <Progress value={percentage} className="h-1 w-16 ml-auto mt-1" />
          </div>
        );
      },
    },
    {
      accessorKey: "daysOfSupply",
      header: ({ column }) => (
        <div className="text-right" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Days Supply
          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
        </div>
      ),
      cell: ({ row }) => {
        const days = parseInt(row.getValue("daysOfSupply"));
        let icon = null;
        
        if (days <= 7) {
          icon = <ArrowDown className="h-3 w-3 text-destructive ml-1" />;
        } else if (days > 30) {
          icon = <ArrowUp className="h-3 w-3 text-success ml-1" />;
        }
        
        return (
          <div className="text-right font-medium flex items-center justify-end">
            {days} days
            {icon}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status: InventoryItem['status'] = row.getValue("status");
        return (
          <Badge variant={getStatusBadge(status)}>
            {status}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <div>{row.getValue("location")}</div>,
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <div className="text-right" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
        </div>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
 
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      cell: ({ row }) => {
        const date = new Date(row.getValue("lastUpdated"));
        return <div className="text-sm">{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
 
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(item.id)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Update Stock
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Package className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Filter the data based on category and location
  const filteredData = React.useMemo(() => {
    return inventoryData.filter(item => {
      const categoryMatch = selectedCategory === "all" || item.location === selectedCategory;
      const locationMatch = selectedLocation === "all" || item.location === selectedLocation;
      return categoryMatch && locationMatch;
    });
  }, [selectedCategory, selectedLocation]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search products..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={!table.getColumn("status")?.getFilterValue()}
                onCheckedChange={() => table.getColumn("status")?.setFilterValue(null)}
              >
                All Statuses
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={(table.getColumn("status")?.getFilterValue() as string[])?.includes("In Stock")}
                onCheckedChange={(checked) => {
                  const filterValues = table.getColumn("status")?.getFilterValue() as string[] || [];
                  if (checked) {
                    table.getColumn("status")?.setFilterValue([...filterValues, "In Stock"]);
                  } else {
                    table.getColumn("status")?.setFilterValue(
                      filterValues.filter((value) => value !== "In Stock")
                    );
                  }
                }}
              >
                In Stock
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={(table.getColumn("status")?.getFilterValue() as string[])?.includes("Low Stock")}
                onCheckedChange={(checked) => {
                  const filterValues = table.getColumn("status")?.getFilterValue() as string[] || [];
                  if (checked) {
                    table.getColumn("status")?.setFilterValue([...filterValues, "Low Stock"]);
                  } else {
                    table.getColumn("status")?.setFilterValue(
                      filterValues.filter((value) => value !== "Low Stock")
                    );
                  }
                }}
              >
                Low Stock
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={(table.getColumn("status")?.getFilterValue() as string[])?.includes("Out of Stock")}
                onCheckedChange={(checked) => {
                  const filterValues = table.getColumn("status")?.getFilterValue() as string[] || [];
                  if (checked) {
                    table.getColumn("status")?.setFilterValue([...filterValues, "Out of Stock"]);
                  } else {
                    table.getColumn("status")?.setFilterValue(
                      filterValues.filter((value) => value !== "Out of Stock")
                    );
                  }
                }}
              >
                Out of Stock
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>
      
      {Object.keys(rowSelection).length > 0 && (
        <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
          <span className="text-sm">
            {Object.keys(rowSelection).length} item(s) selected
          </span>
          <Button size="sm" variant="outline">
            <UploadCloud className="mr-2 h-4 w-4" />
            Bulk Update
          </Button>
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Selected
          </Button>
          <Button size="sm" variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
        </div>
      )}

      <div className="rounded-md border">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getFilteredRowModel().rows.length} of{" "}
          {inventoryData.length} item(s).
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected
              inventory item(s) and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                // Here we would handle the actual deletion
                console.log("Deleted items:", rowSelection);
                setRowSelection({});
                setIsDeleteDialogOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}