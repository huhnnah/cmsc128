"use client";

import { useRouter } from 'next/navigation';
import { AppSidebar } from "@/components/admin-sidebar"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"
import { 
  Table, TableBody, TableHead, TableHeader, TableRow, TableCell 
} from "@/components/ui/table";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Trash2, Undo2, Filter } from "lucide-react";

// Sample product data for the batch
const productItems = [
  { productCode: "188090", supplier: "Lazer", brand: "Cort", product: "AD 890 NS W/ BAG", quantity: "2 pcs", unitPrice: "15,995", total: "31,990" },
  { productCode: "188091", supplier: "Lazer", brand: "Lazer", product: "Mapex Drumset (2 sets)", quantity: "2 sets", unitPrice: "4,995", total: "9,990" },
  { productCode: "188091", supplier: "Lazer", brand: "Lazer", product: "Mapex Drumset (2 sets)", quantity: "2 sets", unitPrice: "4,995", total: "9,990" },
];

export default function BatchDeliveriesPage() {
  const router = useRouter(); 
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <div className="flex-1 p-4 flex flex-col w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl text-gray-600 font-medium">Batching of Deliveries</h1>
            </div>
            <div>
              <Button className="bg-blue-400 text-white" onClick={() => router.push("./")}>
                <Undo2 size={16} className="mr-2" />
                <span>Return to Deliveries</span>
              </Button>
            </div>
          </div>

          {/* Filter Card */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-1/3">
                    <Label htmlFor="deliveryDate" className="mb-1 block">Filter by Date</Label>
                    <Input id="deliveryDate" type="date" />
                  </div>
                  <div className="w-1/3">
                    <Label htmlFor="deliveryNumber" className="mb-1 block">Filter by Delivery Number</Label>
                    <Input id="deliveryNumber" placeholder="DR-12345" />
                  </div>
                  <div className="flex items-end">
                    <Button className="bg-blue-500 text-white">
                      <Filter size={16} className="mr-2" />
                      Apply Filter
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main content layout */}
          <div className="flex gap-4">
            {/* Left side - Product items table */}
            <Card className="w-2/3">
              <CardHeader>
                <CardTitle>Delivery Batch Details</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {/* Product items table */}
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Code</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Total (PhP)</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.productCode}</TableCell>
                          <TableCell>{item.supplier}</TableCell>
                          <TableCell>{item.brand}</TableCell>
                          <TableCell>{item.product}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.unitPrice}</TableCell>
                          <TableCell>{item.total}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
                              <Trash2 size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-end mt-4 font-medium">
                    <p>Total: ₱51,970</p>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" className="bg-gray-400 text-white">
                    DELETE DELIVERY
                  </Button>
                  <Button className="bg-green-600 text-white">
                    SAVE DELIVERY
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Right side - Add product form */}
            <Card className="w-1/3">
              <CardHeader>
                <CardTitle>Add Product to Delivery Batch</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select>
                      <SelectTrigger id="supplier" className="mt-1">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lazer">Lazer</SelectItem>
                        <SelectItem value="mirbros">Mirbros</SelectItem>
                        <SelectItem value="yamaha">Yamaha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="product">Product</Label>
                    <Select>
                      <SelectTrigger id="product" className="mt-1">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xlbass">XL Bass String</SelectItem>
                        <SelectItem value="guitarkit">Guitar Kit</SelectItem>
                        <SelectItem value="drumset">Drum Set</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Select>
                      <SelectTrigger id="brand" className="mt-1">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cort">Cort</SelectItem>
                        <SelectItem value="lazer">Lazer</SelectItem>
                        <SelectItem value="yamaha">Yamaha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="unitPrice">Unit Price</Label>
                    <Select>
                      <SelectTrigger id="unitPrice" className="mt-1">
                        <SelectValue placeholder="Select price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000">₱1,000</SelectItem>
                        <SelectItem value="2000">₱2,000</SelectItem>
                        <SelectItem value="5000">₱5,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Select>
                      <SelectTrigger id="quantity" className="mt-1">
                        <SelectValue placeholder="Select quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full bg-blue-500 text-white">
                    ADD PRODUCT
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}