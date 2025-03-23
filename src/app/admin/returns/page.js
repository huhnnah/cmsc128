"use client";

import { AppSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, } from "@/components/ui/sidebar"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import {   Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger, } from "@/components/ui/sheet"
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Download, Trash2, Ellipsis, Plus } from "lucide-react";
import { useState, useEffect } from "react";


// sample product data incl: quantity, product, brand, category
const products = [
  { productCode: "188090", product: "AD W/ W Case", quantity: 2, brand: "Yamaha", category: "Drums" },
  { productCode: "188091", product: "Maple Snare Drum", quantity: 1, brand: "Pearl", category: "Drums" },
  { productCode: "188092", product: "Cymbal Straight Stand", quantity: 3, brand: "Zildjian", category: "Accessories" },
  { productCode: "188093", product: "Alice Violin String", quantity: 0, brand: "Alice", category: "Strings" },
  { productCode: "188094", product: "Bee Harmonica", quantity: 0, brand: "Hohner", category: "Wind Instruments" },
  { productCode: "188095", product: "Cort Acoustic Guitar", quantity: 2, brand: "Cort", category: "Guitars" },
  { productCode: "188096", product: "AD W/ W Case", quantity: 2, brand: "Yamaha", category: "Drums" },
  { productCode: "188097", product: "Maple Snare Drum", quantity: 1, brand: "Pearl", category: "Drums" },
  { productCode: "188098", product: "Cymbal Straight Stand", quantity: 3, brand: "Zildjian", category: "Accessories" },
];

// sample transactions data incl: date, tid, total, discount
const transactions = [
  { dateAdded: "11/12/22", transactionID: "9090", transactionType: "Sales", productCode: "188090", totalPrice: "₱15,995", discount: "0%" },
  { dateAdded: "11/12/22", transactionID: "9091", transactionType: "Return", productCode: "188091", totalPrice: "₱4,500", discount: "5%" },
  { dateAdded: "11/12/22", transactionID: "9092", transactionType: "Sales", productCode: "188092", totalPrice: "₱1,995", discount: "0%" },
  { dateAdded: "11/12/22", transactionID: "9093", transactionType: "Sales", productCode: "188093", totalPrice: "₱29,995", discount: "10%" },
  { dateAdded: "11/12/22", transactionID: "9094", transactionType: "Sales", productCode: "188094", totalPrice: "₱125", discount: "0%" },
  { dateAdded: "11/12/22", transactionID: "9095", transactionType: "Sales", productCode: "188095", totalPrice: "₱2,595", discount: "0%" },
  { dateAdded: "11/12/22", transactionID: "9096", transactionType: "Return", productCode: "188096", totalPrice: "₱395", discount: "0%" },
  { dateAdded: "11/12/22", transactionID: "9097", transactionType: "Return", productCode: "188097", totalPrice: "₱295", discount: "0%" },
  { dateAdded: "11/12/22", transactionID: "9098", transactionType: "Return", productCode: "188098", totalPrice: "₱15,995", discount: "15%" },
];

// sample data for deliveries with supplier information
const deliveries = [
  { dateAdded: "11/12/22", deliveryNum: "D-188090", supplier: "Lazer", productCode: "188090", totalCost: "₱15,995" },
  { dateAdded: "11/12/22", deliveryNum: "D-188091", supplier: "Lazer", productCode: "188091", totalCost: "₱4,500" },
  { dateAdded: "11/12/22", deliveryNum: "D-188092", supplier: "Lazer", productCode: "188092", totalCost: "₱1,995" },
  { dateAdded: "11/12/22", deliveryNum: "D-188093", supplier: "Mirbros", productCode: "188093", totalCost: "₱29,995" },
  { dateAdded: "11/12/22", deliveryNum: "D-188094", supplier: "Mirbros", productCode: "188094", totalCost: "₱125" },
  { dateAdded: "11/12/22", deliveryNum: "D-188095", supplier: "Mirbros", productCode: "188095", totalCost: "₱2,595" },
  { dateAdded: "11/12/22", deliveryNum: "D-188096", supplier: "Lazer", productCode: "188096", totalCost: "₱395" },
  { dateAdded: "11/12/22", deliveryNum: "D-188097", supplier: "Lazer", productCode: "188097", totalCost: "₱295" },
  { dateAdded: "11/12/22", deliveryNum: "D-188098", supplier: "Lazer", productCode: "188098", totalCost: "₱15,995" },
];



export default function ReturnsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customerReturns, setCustomerReturns] = useState([]);
  const [filteredSupplierReturns, setFilteredSupplierReturns] = useState([]);
  const [selectedFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("customer");
  const SHEET_LABELS = ["Add Customer Return", "Add Supplier Return"];

  // Process and merge data from transactions and products tables for customer returns
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
      
      // Find supplier information from deliveries
      const deliveryMatch = deliveries.find(
        delivery => delivery.productCode === transaction.productCode
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
        totalPrice: transaction.totalPrice,
        discount: transaction.discount,
        brand: productMatch ? productMatch.brand : "Unknown",
        category: productMatch ? productMatch.category : "Unknown",
        supplier: deliveryMatch ? deliveryMatch.supplier : "Unknown"
      };
    });
    
    setCustomerReturns(processedReturns);
    
    // Process supplier returns data
    const processedSupplierReturns = deliveries.map(returnItem => {
      // Find the matching product for additional details
      const productMatch = products.find(
        product => product.productCode === returnItem.productCode
      );
      
      return {
        ...returnItem,
        brand: productMatch ? productMatch.brand : "Unknown",
        category: productMatch ? productMatch.category : "Unknown"
      };
    });
    
    setFilteredSupplierReturns(processedSupplierReturns);
  }, []);
  
  // Filter returns based on search term and filter selection
  const filteredCustomerReturns = customerReturns.filter(item => {
    const matchesSearch = 
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transactionID.includes(searchTerm) ||
      item.productCode.includes(searchTerm) ||
      item.receiptNum.includes(searchTerm);
    
    if (selectedFilter === "All") return matchesSearch;
    // Add additional filters here if needed
    
    return matchesSearch;
  });
  
useEffect(() => {
  const filtered = deliveries
    .map((item, index) => {
      const productMatch = products.find(p => p.productCode === item.productCode);
      return {
        ...item,
        returnID: `SR-${index.toString().padStart(3, "0")}`, // fake ID for display
        product: productMatch ? productMatch.product : "Unknown",
        brand: productMatch ? productMatch.brand : "Unknown",
        category: productMatch ? productMatch.category : "Unknown",
        quantity: productMatch ? productMatch.quantity : 0
      };
    })
    .filter(item =>
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productCode.includes(searchTerm) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.returnID.includes(searchTerm)
    );

  setFilteredSupplierReturns(filtered);
}, [searchTerm]);



  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <div className="flex-1 p-4 flex flex-col w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl text-gray-600 font-medium">Processing of Returns</h1>
            </div>

            {/* For Add Product Return Sheet from Customer Returns */}
            <div className="flex space-x-2">
            {activeTab === "customer" && (
                <Sheet >
                  <SheetTrigger asChild>
                    <Button variant="outline" className="bg-blue-400 text-white">Add Customer Return</Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[400px] h-full overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="text-xl mb-4">Add Product Return</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-3"> 
                    <Label>Product Name</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Product A">Product A</SelectItem>
                        <SelectItem value="Product B">Product B</SelectItem>
                      </SelectContent>
                    </Select>   
                                
                    <Label>Supplier</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lazer">Lazer</SelectItem>
                        <SelectItem value="Cort">Cort</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label>Brand</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cort">Cort</SelectItem>
                        <SelectItem value="Lazer">Lazer</SelectItem>
                        <SelectItem value="Lazer">Bee</SelectItem>
                        <SelectItem value="Lazer">Alice</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label>Quantity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label>Discount</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">none</SelectItem>
                        <SelectItem value="0">0</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label>Price/Amount</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Price1">₱15,995</SelectItem>
                        <SelectItem value="Price2">₱10</SelectItem>
                      </SelectContent>
                    </Select>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button type="submit" className="bg-blue-400 text-white w-full mt-4">Add Return</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
            )} 

            {/* For Add Product Return Sheet To Supplier Returns */}            
            {activeTab === "supplier" && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="bg-blue-400 text-white">Add Return to Supplier</Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] h-full overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="text-xl mb-4">Add Product Return</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-3">
                  <Label>Delivery Number</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Delivery 1">188090</SelectItem>
                        <SelectItem value="Delivery 2">188091</SelectItem>
                      </SelectContent>
                    </Select>               
                    <Label>Supplier</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lazer">Lazer</SelectItem>
                        <SelectItem value="Mirbros">Mirbros</SelectItem>
                      </SelectContent>
                    </Select>

                    
                    <Label>Product</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value="Product A">Product A</SelectItem>
                      <SelectItem value="Product B">Product B</SelectItem>
                      </SelectContent>
                    </Select>


                    <Label>Brand</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cort">Cort</SelectItem>
                        <SelectItem value="Lazer">Lazer</SelectItem>
                        <SelectItem value="Lazer">Bee</SelectItem>
                        <SelectItem value="Lazer">Alice</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label>Quantity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label>Total</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Price1">	₱7,995</SelectItem>
                        <SelectItem value="Price2">₱4,500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit" className="bg-blue-400 text-white w-full mt-4">Add Return</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            )}                             
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
          </div>
          
          <Tabs defaultValue="customer" className="w-full mb-4" onValueChange={setActiveTab}>
            <TabsList className="w-full flex justify-start bg-white border rounded-md px-4">
              <TabsTrigger value="customer" className="data-[state=active]:text-indigo-600 hover:text-black">RETURN FROM CUSTOMER</TabsTrigger>
              <TabsTrigger value="supplier" className="data-[state=active]:text-indigo-600 hover:text-black">RETURN TO SUPPLIER</TabsTrigger>
            </TabsList>
            
            {/* Customer Returns Tab Content */}
            <TabsContent value="customer" className="mt-4">
              <div className=" flex flex-col overflow-auto w-full">
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
                    {filteredCustomerReturns.length > 0 ? (
                      filteredCustomerReturns.map((item) => (
                        <TableRow key={item.transactionID}>
                          <TableCell>{item.dateAdded}</TableCell>
                          <TableCell>{item.transactionID}</TableCell>
                          <TableCell>{item.product}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-center">{item.totalPrice}</TableCell>

                          <TableCell className="text-center">
                          <div className="flex justify-center space-x-2"> 
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8">
                                  <Ellipsis size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl p-6">
                                <DialogHeader>
                                  <DialogTitle>Return Details</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="text-center whitespace-nowrap">Date</TableHead>
                                        <TableHead className="text-center whitespace-nowrap">Product Code</TableHead>
                                        <TableHead className="text-center whitespace-nowrap">Supplier</TableHead>
                                        <TableHead className="text-center whitespace-nowrap">Brand</TableHead>
                                        <TableHead className="text-center whitespace-nowrap">Category</TableHead>
                                        <TableHead className="text-center whitespace-nowrap">Product</TableHead>
                                        <TableHead className="text-center whitespace-nowrap">Quantity</TableHead>
                                        <TableHead className="text-center whitespace-nowrap">Discount</TableHead>
                                        <TableHead className="text-center whitespace-nowrap">Total</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell className="text-center">{item.dateAdded}</TableCell>
                                        <TableCell className="text-center">{item.productCode}</TableCell>
                                        <TableCell className="text-center">{item.supplier}</TableCell>
                                        <TableCell className="text-center">{item.brand}</TableCell>
                                        <TableCell className="text-center">{item.category}</TableCell>
                                        <TableCell className="text-center">{item.product}</TableCell>
                                        <TableCell className="text-center">{item.quantity}</TableCell>
                                        <TableCell className="text-center">{item.discount}</TableCell>
                                        <TableCell className="text-center">{item.totalPrice}</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
                              <Trash2 size={16}/>
                            </Button>
                          </div>
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
            </TabsContent>

            {/* Supplier Returns Tab Content */}
            <TabsContent value="supplier" className="mt-4">
              <div className="bg-white rounded-lg shadow-sm border flex-col overflow-auto w-full">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                    <TableHead className="w-24">Date</TableHead>
                    <TableHead className="w-32">Product Code</TableHead>
                    <TableHead className="w-32">Supplier</TableHead>
                    <TableHead className="w-40">Product</TableHead>
                    <TableHead className="w-20 text-center">Quantity</TableHead>
                    <TableHead className="w-24 text-center">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSupplierReturns.length > 0 ? (
                    filteredSupplierReturns.map((item) => (
                      <TableRow key={item.returnID}>
                        <TableCell>{item.dateAdded}</TableCell>
                        <TableCell>{item.productCode}</TableCell>
                        <TableCell>{item.supplier}</TableCell>
                        <TableCell>{item.product}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-center">{item.totalCost}</TableCell>
                        <TableCell className="w-[50px] text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 hover:text-red-600 h-6 w-6"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                          No supplier return records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
}

