import { AppSidebar } from "@/components/admin-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ListFilter, Download, FilePen, Trash2 } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// Sample product data
const products = [
  { productCode: "188090", dateAdded: "11/12/22", supplier: "Lazer", brand: "Cort", category: "Guitar", product: "AD W/ W Case", quantity: 2, price: "₱15,995", sellingprice:"1", status: "Active" },
  { productCode: "188091", dateAdded: "11/12/22", supplier: "Lazer", brand: "Lazer", category: "Drum", product: "Maple Snare Drum", quantity: 1, price: "₱4,500", sellingprice:"1", status: "Active" },
  { productCode: "188092", dateAdded: "11/12/22", supplier: "Lazer", brand: "Lazer", category: "Drum", product: "Cymbal Straight Stand", quantity: 3, price: "₱2,395", sellingprice:"1", status: "Active" },
  { productCode: "188093", dateAdded: "11/12/22", supplier: "Lazer", brand: "Alice", category: "Violin String", product: "Alice Violin String", quantity: 0, price: "₱395", sellingprice:"1", status: "Discontinued" },
  { productCode: "188097", dateAdded: "11/12/22", supplier: "Lazer", brand: "Bee", category: "Harmonica", product: "Bee Harmonica", quantity: 0, price: "₱295", sellingprice:"1", status: "Out of Stock" },
  { productCode: "188098", dateAdded: "11/12/22", supplier: "Lazer", brand: "Cort", category: "Guitar", product: "Cort Acoustic Guitar", quantity: 2, price: "₱15,995", sellingprice:"1", status: "Low Stock" },
  { productCode: "188193", dateAdded: "11/12/22", supplier: "Lazer", brand: "Cort", category: "Guitar", product: "AD W/ W Case", quantity: 2, price: "₱15,995", sellingprice:"1", status: "Active" },
  { productCode: "188096", dateAdded: "11/12/22", supplier: "Lazer", brand: "Lazer", category: "Drum", product: "Maple Snare Drum", quantity: 1, price: "₱4,500", sellingprice:"1", status: "Active" },
  { productCode: "188197", dateAdded: "11/12/22", supplier: "Lazer", brand: "Lazer", category: "Drum", product: "Cymbal Straight Stand", quantity: 3, price: "₱2,395", sellingprice:"1", status: "Active" },
];

export default function ProductTable() {
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
                  placeholder="Search product, category, item code"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-500">
                  <Search className="w-5 h-5" />
                </div>
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <ListFilter className="w-4 h-4" />
                <span>Sort</span>
              </Button>
            </div>
            <div className="flex space-x-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-blue-400 text-white">Add Product</Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] h-full overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="text-blue-400 text-xl font-bold mb-4">Add New Product</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-3">
                    <Label className>Product Code</Label>
                    <Input placeholder="Enter product code" />

                    <Label>Date Added</Label>
                    <Input type="date" />

                    <Label>Supplier</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lazer">Lazer</SelectItem>
                        <SelectItem value="Cort">Cort</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label>Brand</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cort">Cort</SelectItem>
                        <SelectItem value="Lazer">Lazer</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Guitar">Guitar</SelectItem>
                        <SelectItem value="Drum">Drum</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label>Product Name</Label>
                    <Input placeholder="Enter product name" />

                    <Label>Quantity</Label>
                    <Input type="number" placeholder="Enter quantity" />

                    <Label>Price</Label>
                    <Input type="text" placeholder="Enter price" />

                    <Label>Selling Price</Label>
                    <Input type="text" placeholder="Enter selling price" />

                    <Label>Product Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        <SelectItem value="Low Stock">Low Stock</SelectItem>
                        <SelectItem value="Discontinued">Discontinued</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button className="bg-blue-400 text-white w-full mt-4">Add Product</Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-400 text-white">Update Price</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-blue-400 text-xl font-bold mb-4">Product Price Update</DialogTitle>
                  </DialogHeader>

                  {/* Input Fields */}
                  <div className="flex flex-col space-y-3">
                    <Label>Product Name</Label>
                    <Input placeholder="Enter product name" />

                    <Label>Supplier</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lazer">Lazer</SelectItem>
                        <SelectItem value="Cort">Cort</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label>Product Code</Label>
                    <Input disabled placeholder="Auto-filled" className="bg-gray-300" />

                    <Label>Price</Label>
                    <Input disabled placeholder="Auto-filled" className="bg-gray-300" />

                    <Label>Updated Price</Label>
                    <Input type="text" placeholder="Enter new price" />
                  </div>

                  <DialogFooter>
                    <Button className="bg-blue-500 text-white w-full">Update Product Price</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Download Button */}
              <Button className="bg-blue-400 text-white">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg flex flex-col overflow-auto w-full">
          <h1 className="text-gray-600 font-bold">Products</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Code</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>View/Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.productCode} className={getStatusColor(product.status)}>
                    <TableCell>{product.productCode}</TableCell>
                    <TableCell>{product.dateAdded}</TableCell>
                    <TableCell>{product.supplier}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.category}</TableCell>
                  <TableHead>{product.product}</TableHead>
                  <TableHead>{product.quantity} pcs</TableHead>
                  <TableHead>{product.price}</TableHead>
                  <TableHead>{product.sellingprice}</TableHead>
                  <TableHead className={`font-semibold ${getStatusTextColor(product.status)}`}>{product.status}</TableHead>
                  <TableHead className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                      <FilePen size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
                      <Trash2 size={16} />
                    </Button>
                  </TableHead>
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

function getStatusColor(status) {
  switch (status) {
    case "Out of Stock":
      return "bg-red-100";
    case "Low Stock":
      return "bg-yellow-100";
    case "Discontinued":
      return "bg-gray-100";
    default:
      return "";
  }
}

function getStatusTextColor(status) {
  switch (status) {
    case "Active":
      return "text-green-600";
    case "Out of Stock":
      return "text-red-600";
    case "Low Stock":
      return "text-orange-600";
    case "Discontinued":
      return "text-gray-500";
  }
}