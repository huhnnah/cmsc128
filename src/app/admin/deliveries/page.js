
"use client";

import { AppSidebar } from "@/components/admin-sidebar"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"
import { 
  Table, TableBody, TableHead, TableHeader, TableRow, TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Search, ListFilter, Trash2, Ellipsis } from "lucide-react";
import { useState } from "react";

// sample data for deliveries
const delivery = [
  { dateAdded: "11/12/22", deliveryNum: "188090", supplier: "Lazer", totalCost: "₱15,995" },
  { dateAdded: "11/12/22", deliveryNum: "188091", supplier: "Lazer", totalCost: "₱4,500" },
  { dateAdded: "11/12/22", deliveryNum: "188092", supplier: "Lazer", totalCost: "₱1,995" },
  { dateAdded: "11/12/22", deliveryNum: "188093", supplier: "Mirbros", totalCost: "₱29,995"  },
  { dateAdded: "11/12/22", deliveryNum: "188094", supplier: "Mirbros", totalCost: "₱125" },
  { dateAdded: "11/12/22", deliveryNum: "188095", supplier: "Mirbros", totalCost: "₱2,595" },
  { dateAdded: "11/12/22", deliveryNum: "188096", supplier: "Lazer", totalCost: "₱395" },
  { dateAdded: "11/12/22", deliveryNum: "188097", supplier: "Lazer", totalCost: "₱295" },
  { dateAdded: "11/12/22", deliveryNum: "188098", supplier: "Lazer", totalCost: "₱15,995" },
];

export default function DeliveriesPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <div className="flex-1 p-4 flex flex-col w-full">
          <div className="flex items-center justify-between mb-4 bg-white p-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="relative w-80">
                <input
                  type="text"
                  placeholder="Search transaction, id, product"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-500">
                  <Search className="w-5 h-5" />
                </div>
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <ListFilter className="w-4 h-4" />
                <span>Filter</span>
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-blue-400 text-white">Add Delivery</Button>
            </div>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg flex flex-col overflow-auto w-full">
          <h1 className="text-gray-600 font-bold">Deliveries</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Delivery Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {delivery.map((d) => (
                  <TableRow key={d.deliveryNum}>
                    <TableCell>{d.dateAdded}</TableCell>
                    <TableCell>{d.deliveryNum}</TableCell>
                    <TableCell>{d.supplier}</TableCell>
                    <TableCell>{d.totalCost}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                            <Ellipsis size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl p-6">
                          <DialogHeader>
                            <DialogTitle>Delivery Details</DialogTitle>
                            <DialogClose />
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Date of Delivery</label>
                              <Input type="date" defaultValue={d.dateAdded} />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Delivery Number</label>
                              <Input value={d.deliveryNum} disabled />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <label className="text-sm font-medium">Total Cost</label>
                              <Input type="text" defaultValue={d.totalCost} />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Supplier</label>
                              <Select>
                                <SelectTrigger>{d.supplier}</SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Lazer">Lazer</SelectItem>
                                  <SelectItem value="Yamaha">Yamaha</SelectItem>
                                  <SelectItem value="Cort">Cort</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button className="bg-blue-500 text-white">Save</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
