"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/staff-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import columns from "../../../components/ui/columns";
import DataTable from "../../../components/ui/data-table";
import {
  Table as TableStaff,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/tablestaff";


const getData = async () => {
  // Fetch data
  return [
    {
      "Product Code": "188090",
      Supplier: "Lazer",
      Brand: "Cort",
      Product: "AD 880 NS W/ BAG",
      Price: "15,995",
      Quantity: "2 pcs",
      Total: "31990",
    },
    {
      "Product Code": "188091",
      Supplier: "Lazer",
      Brand: "Lazer",
      Product: "Mapex Drumset (2 sets)",
      Price: "4,995",
      Quantity: "2 sets",
      Total: "9990",
    },
    {
      "Product Code": "188091",
      Supplier: "Lazer",
      Brand: "Lazer",
      Product: "Mapex Drumset (2 sets)",
      Price: "4,995",
      Quantity: "2 sets",
      Total: "9990",
    },
  ];
};

const OrdersPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold pt-5">Summary of Order/s</h1>

        <div className="flex gap-6 mt-4">
          {/* Left Side - Table & Summary */}
          <div className="w-2/3 space-y-4">
            <div className=" h-[65%] bg-white shadow-md p-4 rounded-xl">
              <DataTable columns={columns} data={data} />
            </div>

            {/* Total Amount Card */}
            <div className="bg-white h-[32%] shadow-lg p-6 text-center rounded-xl">
              <h2 className="text-lg text-blue-600">TOTAL AMOUNT</h2>
              <p className="text-5xl font-bold text-blue-600">
                {new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(data.reduce((sum, item) => sum + parseFloat(item.Total), 0))}
              </p>
              <button className="mt-4 px-2 py-1 w-[50%] bg-blue-600 text-white rounded-md text-[13px]">INPUT PAYMENT</button>
            </div>
          </div>

          {/* Right Side - Add Product & Freebie Forms */}
          <div className="w-1/3 space-y-4">
            {/* Add Product Form */}
            <div className="bg-white shadow-lg p-6 rounded-xl">
              <h2 className="text-xl text-center font-semibold text-blue-600 pb-4">Add Product to Order/s</h2>
              <form className="space-y-2">
                {/* Product Name Dropdown */}
                <select className="w-full p-2 border rounded-md">
                  <option value="" disabled defaultValue>Select Product</option>
                  <option value="XL Bass String">XL Bass String</option>
                  <option value="AD 880 NS W/ BAG">AD 880 NS W/ BAG</option>
                  <option value="Mapex Drumset">Mapex Drumset</option>
                </select>

                {/* Supplier Dropdown */}
                <select className="w-full p-2 border rounded-md">
                  <option value="" disabled defaultValue>Select Supplier</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Cort">Cort</option>
                </select>

                {/* Brand Dropdown */}
                <select className="w-full p-2 border rounded-md">
                  <option value="" disabled defaultValue>Select Brand</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Cort">Cort</option>
                </select>

                <input type="text" placeholder="Price" className="w-full p-2 border rounded-md" />
                <input type="text" placeholder="Quantity" className="w-full p-2 border rounded-md" />
                <input type="text" placeholder="Discount Amount" className="w-full p-2 border rounded-md" />
                <button className="mt-4 px-2 py-1 w-full bg-blue-600 text-white rounded-md text-[15px]">ADD ORDER</button>
              </form>
            </div>

            {/* Add Freebie Form */}
            <div className="bg-white shadow-lg p-6 rounded-xl">
              <h2 className="text-xl text-center font-semibold text-blue-600 pb-4">Add Freebie/s</h2>
              <form className="space-y-2">
                <select className="w-full p-2 border rounded-md">
                  <option value="" disabled defaultValue>Select Product</option>
                  <option value="XL Bass String">XL Bass String</option>
                  <option value="AD 880 NS W/ BAG">AD 880 NS W/ BAG</option>
                  <option value="Mapex Drumset">Mapex Drumset</option>
                </select>

                <input type="text" placeholder="Quantity" className="w-full p-2 border rounded-md" />
                <button className="mt-4 px-2 py-1 w-full bg-blue-600 text-white rounded-md text-[15px]">ADD TO ORDER</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default OrdersPage;
