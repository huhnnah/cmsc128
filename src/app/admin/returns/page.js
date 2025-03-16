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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Search, ListFilter, Download, Trash2, Ellipsis, Plus } from "lucide-react";
import { useState, useEffect } from "react";

// sample product data incl: quantity, product
const products = [
  { productCode: "188090", product: "AD W/ W Case", quantity: 2 },
  { productCode: "188091", product: "Maple Snare Drum", quantity: 1 },
  { productCode: "188092", product: "Cymbal Straight Stand", quantity: 3 },
  { productCode: "188093", product: "Alice Violin String", quantity: 0 },
  { productCode: "188094", product: "Bee Harmonica", quantity: 0 },
  { productCode: "188095", product: "Cort Acoustic Guitar", quantity: 2 },
  { productCode: "188096", product: "AD W/ W Case", quantity: 2 },
  { productCode: "188097", product: "Maple Snare Drum", quantity: 1 },
  { productCode: "188098", product: "Cymbal Straight Stand", quantity: 3 },
];

// sample transactions data incl: date, tid, total
const transactions = [
  { dateAdded: "11/12/22", transactionID: "9090", transactionType: "Sales", productCode: "188090", totalPrice: "₱15,995" },
  { dateAdded: "11/12/22", transactionID: "9091", transactionType: "Return", productCode: "188091", totalPrice: "₱4,500" },
  { dateAdded: "11/12/22", transactionID: "9092", transactionType: "Sales", productCode: "188092", totalPrice: "₱1,995" },
  { dateAdded: "11/12/22", transactionID: "9093", transactionType: "Sales", productCode: "188093", totalPrice: "₱29,995"  },
  { dateAdded: "11/12/22", transactionID: "9094", transactionType: "Sales", productCode: "188094", totalPrice: "₱125" },
  { dateAdded: "11/12/22", transactionID: "9095", transactionType: "Sales", productCode: "188095", totalPrice: "₱2,595" },
  { dateAdded: "11/12/22", transactionID: "9096", transactionType: "Return", productCode: "188096", totalPrice: "₱395" },
  { dateAdded: "11/12/22", transactionID: "9097", transactionType: "Return", productCode: "188097", totalPrice: "₱295" },
  { dateAdded: "11/12/22", transactionID: "9098", transactionType: "Return", productCode: "188098", totalPrice: "₱15,995" },
];

export default function ReturnsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [returnItems, setReturnItems] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  
  // Process and merge data from transactions and products tables
  useEffect(() => {
    // Filter transactions to only include returns
    const returnTransactions = transactions.filter(
      transaction => transaction.transactionType === "Return"
    );
    
    // Merge transaction data with product data
    const processedReturns = returnTransactions.map(transaction => {
      // Find the matching product
      const productMatch = products.find(
        product => product.productCode === transaction.productCode
      );
      
      // Create a new object with combined data
      return {
        dateAdded: transaction.dateAdded,
        transactionID: transaction.transactionID,
        transactionType: transaction.transactionType,
        productCode: transaction.productCode,
        receiptNum: `11${transaction.transactionID.slice(-4)}`, // Generate receipt number
        product: productMatch ? productMatch.product : "Unknown Product",
        quantity: productMatch ? productMatch.quantity : 0,
        totalPrice: transaction.totalPrice
      };
    });
    
    setReturnItems(processedReturns);
  }, []);
  
  // Filter returns based on search term and filter selection
  const filteredReturns = returnItems.filter(item => {
    const matchesSearch = 
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transactionID.includes(searchTerm) ||
      item.productCode.includes(searchTerm) ||
      item.receiptNum.includes(searchTerm);
    
    if (selectedFilter === "All") return matchesSearch;
    // Add additional filters here if needed
    
    return matchesSearch;
  });

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <div className="flex-1 p-4 flex flex-col w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl text-gray-600 font-bold">Processing of Returns</h1>
            </div>
            <div className="flex space-x-2">
            <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 bg-blue-400 text-white">
                    <Plus size={16} />
                    Add Product Return
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Product Return</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    {/* Completely blank dialog content */}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button className="bg-white text-blue-400">Cancel</Button>
                    </DialogClose>
                    <Button className="bg-blue-400">Add Return</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search returns..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <ListFilter size={16} className="text-gray-500" />
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40">
                  {selectedFilter}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Returns</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border flex-col overflow-auto w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                <TableHead className="w-20">Date</TableHead>
                  <TableHead className="w-24">Transaction ID</TableHead>
                  <TableHead className="w-0">Product</TableHead>
                  <TableHead className="w-16 text-center">Quantity</TableHead>
                  <TableHead className="w-0 text-center">Total</TableHead>
                  <TableHead className="w-1 text-center">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReturns.length > 0 ? (
                  filteredReturns.map((item) => (
                    <TableRow key={item.transactionID}>
                      <TableCell className="font-medium">{item.dateAdded}</TableCell>
                      <TableCell>{item.transactionID}</TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-center">{item.totalPrice}</TableCell>

                      <TableCell className="flex space-x-2"> 
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Ellipsis size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Return Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Transaction ID</p>
                                    <p>{item.transactionID}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Date</p>
                                    <p>{item.dateAdded}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Product</p>
                                    <p>{item.product}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Total</p>
                                    <p>{item.totalPrice}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between">
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                      No return records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}