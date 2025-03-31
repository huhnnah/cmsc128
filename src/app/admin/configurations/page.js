"use client";

import { AppSidebar } from "@/components/admin-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, FilePen } from "lucide-react";
import { useState } from "react";

const supplierData = [
  { id: 1, name: "LAZER", code: "1" },
  { id: 2, name: "CORT", code: "2" }
];

export default function ConfigurationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchPaymentType, setSearchPaymentType] = useState("");
  const [ , setActiveTab] = useState("add-suplier");

  const filteredSuppliers = supplierData.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.code.includes(searchTerm)
  );

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <div className="flex-1 p-4 flex flex-col w-full">
          <h1 className="text-lg font-medium text-gray-600 mt-4 mb-6">Configurations</h1>

          <Tabs defaultValue="add-supplier" className="w-full mb-4" onValueChange={setActiveTab}>
            <TabsList className="w-full flex justify-start bg-white shadow-md rounded-md px-6 py-6 mb-4">
              <TabsTrigger value="add-supplier" className="data-[state=active]:text-indigo-600 hover:text-black">ADD SUPPLIER</TabsTrigger>
              <TabsTrigger value="add-brand" className="data-[state=active]:text-indigo-600 hover:text-black">ADD BRAND</TabsTrigger>
              <TabsTrigger value="add-category" className="data-[state=active]:text-indigo-600 hover:text-black">ADD CATEGORY</TabsTrigger>
              <TabsTrigger value="add-product-status" className="data-[state=active]:text-indigo-600 hover:text-black">ADD PRODUCT STATUS</TabsTrigger>
              <TabsTrigger value="add-payment-type" className="data-[state=active]:text-indigo-600 hover:text-black">  ADD TYPE OF PAYMENT</TabsTrigger>
            </TabsList>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Content */}
              <div className="w-full lg:w-2/3 flex flex-col">
                <TabsContent value="add-supplier">
                  <Card className="flex flex-col flex-grow">
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Search supplier"
                          className="pl-9 py-2 text-sm"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="overflow-x-auto max-h-[60vh]">
                        <Table>
                          <TableBody>
                            {filteredSuppliers.map((supplier) => (
                              <TableRow key={supplier.id} className="hover:bg-gray-50">
                                <TableCell className="py-2">
                                  <div className="font-medium text-sm">{supplier.name}</div>
                                  <div className="text-xs text-gray-500">Code: {supplier.code}</div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" className="h-8 w-8">
                                    <FilePen size={16} />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            {filteredSuppliers.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={2} className="text-center py-6 text-gray-500">
                                  No suppliers found
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="add-brand">
                  <Card className="flex flex-col flex-grow">
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Search brand"
                          className="pl-9 py-2 text-sm"
                          value={searchBrand}
                          onChange={(e) => setSearchBrand(e.target.value)}
                        />
                      </div>
                      <div className="text-sm text-gray-500">Brand content here...</div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="add-category">
                  <Card className="flex flex-col flex-grow">
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Search category"
                          className="pl-9 py-2 text-sm"
                          value={searchCategory}
                          onChange={(e) => setSearchCategory(e.target.value)}
                        />
                      </div>
                      <div className="text-sm text-gray-500">Category content here...</div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="add-product-status">
                  <Card className="flex flex-col flex-grow">
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Search status"
                          className="pl-9 py-2 text-sm"
                          value={searchStatus}
                          onChange={(e) => setSearchStatus(e.target.value)}
                        />
                      </div>
                      <div className="text-sm text-gray-500">Product status content here...</div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="add-payment-type">
                  <Card className="flex flex-col flex-grow">
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Search payment type"
                          className="pl-9 py-2 text-sm"
                          value={searchPaymentType}
                          onChange={(e) => setSearchPaymentType(e.target.value)}
                        />
                      </div>
                      <div className="text-sm text-gray-500">Payment type content here...</div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>

              {/* Right Content */}
              <div className="w-full lg:w-1/3 h-fit">
                <TabsContent value="add-supplier">
                  <Card>
                    <CardHeader className="pb-0">
                      <CardTitle className="text-center text-xl">Add Supplier</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 flex flex-col flex-1 justify-between-4">
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm">Supplier</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select supplier" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Lazer">Lazer</SelectItem>
                              <SelectItem value="Mirbros">Mirbros</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Code</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select code" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="188090">188090</SelectItem>
                              <SelectItem value="188091">188091</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4">ADD</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="add-brand">
                  <Card>
                    <CardHeader className="pb-0">
                      <CardTitle className="text-center text-xl">Add Brand</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm">Brand Name</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Brand-X">Brand X</SelectItem>
                              <SelectItem value="Brand-Y">Brand Y</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Code</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select code" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="188090">188090</SelectItem>
                              <SelectItem value="188091">188091</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4">ADD</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="add-category">
                  <Card>
                    <CardHeader className="pb-0">
                      <CardTitle className="text-center text-xl">Add Category</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm">Category Name</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Category-1">Category 1</SelectItem>
                              <SelectItem value="Category-2">Category 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Code</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select code" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="188090">188090</SelectItem>
                              <SelectItem value="188091">188091</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4">ADD</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="add-product-status">
                  <Card>
                    <CardHeader className="pb-0">
                      <CardTitle className="text-center text-xl">Add Product Status</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm">Product Status</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Discontinued">Discontinued</SelectItem>
                              <SelectItem value="Out-of-Stock">Out of Stock</SelectItem>
                              <SelectItem value="Low-Stock">Low Stock</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Code</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select code" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="188090">188090</SelectItem>
                              <SelectItem value="188091">188091</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4">ADD</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="add-payment-type">
                  <Card>
                    <CardHeader className="pb-0">
                      <CardTitle className="text-center text-xl">Add Type of Payment</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm">Payment Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="One-time">One time, Full</SelectItem>
                              <SelectItem value="1-month">1 month installment</SelectItem>
                              <SelectItem value="2-months">2 months installment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Code</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select code" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="188090">188090</SelectItem>
                              <SelectItem value="188091">188091</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4">ADD</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
}
