"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/staff-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import columns from "../../../components/ui/columns";
import DataTable from "../../../components/ui/data-table";

const getData = async () => {
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
      "Product Code": "188092",
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
  const [discount, setDiscount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payment, setPayment] = useState("");
  
  useEffect(() => {
    getData().then(setData);
  }, []);

  const totalAmount = data.reduce((sum, item) => sum + parseFloat(item.Total), 0);
  const discountedTotal = Math.max(totalAmount - discount, 0);
  const change = Math.max(payment - discountedTotal, 0);
  const isInvalidDiscount = discount > totalAmount;
  const inputClass = isInvalidDiscount 
    ? "border-red-600 text-red-600" 
    : "border-blue-600 text-blue-600";

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen overflow-x-hidden">
        <AppSidebar />
        <div className="flex flex-col flex-grow p-8">
          <h1 className="text-2xl font-bold pt-2">Summary of Order/s</h1>

          <div className="flex gap-6 mt-4 w-full">
            
            {/* Left Section: Table & Summary */}
            <div className="flex-1 space-y-4">
              <div className="h-[50%] bg-white shadow-md p-4 rounded-xl">
                <DataTable columns={columns} data={data} />
              </div>

              <div className="bg-white shadow-lg p-6 text-center rounded-xl">
                <h2 className="text-lg text-blue-600">TOTAL AMOUNT</h2>
                <p className="text-5xl font-bold text-blue-600">
                  {new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(discountedTotal)}
                </p>

                <div className="mt-4 flex justify-center items-center gap-2">
                  <div className="flex flex-col items-start w-[40%]">
                    <label className="text-sm text-blue-600 text-[15px]">APPLY PURCHASE DISCOUNT</label>
                    <input 
                      type="number" 
                      min="0"
                      value={discount === 0 ? "" : discount}  
                      onChange={(e) => {
                        const value = e.target.value;
                        setDiscount(value === "" ? "" : parseFloat(value) || "");
                      }}
                      className={`px-2 py-1 w-full border rounded-md text-[13px] text-center focus:outline-none ${inputClass} [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                      {isInvalidDiscount && (
                        <p className="text-red-600 text-xs mt-1">Invalid discount amount</p>
                      )}
                  </div>

                  <button onClick={() => setIsModalOpen(true)} className="px-4 py-1 mt-5 bg-blue-600 text-white rounded-md text-[13px]">INPUT PAYMENT</button>{isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
                    onClick={() => setIsModalOpen(false)}>

                      <div className="bg-white p-5 rounded-lg shadow-lg w-[400px] text-center relative" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-lg text-blue-600">TOTAL AMOUNT</h2>
                        <p className="text-[45px] font-bold text-blue-600"> {new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(discountedTotal)}</p>
                        <label className="pl-9 mt-2 text-start text-[13px] block text-blue-600 mt-2">PAYMENT GIVEN</label>
                        <input 
                          type="number" 
                          value={payment}
                          onChange={(e) => setPayment(e.target.value)}
                          className="w-[80%] border rounded-md text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                        <button
                          className="mt-4 p-1 text-[13px] w-[80%] bg-blue-600 text-white rounded-md"
                          onClick={() => setIsModalOpen(false)}>ENTER PAYMENT</button>
                        <p className="pl-9 mb-5 mt-2 text-start text-[12px] font-bold text-blue-600"> CHANGE: {new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(change)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section: Add Products and Freebies */}
            <div className="w-1/4 space-y-4">
              <div className="bg-white shadow-lg p-6 rounded-xl">
                
                {/* Add Products */}
                <h2 className="text-xl text-center font-semibold text-blue-600 pb-4">Add Product to Order/s</h2>
                <form className="text-[15px] space-y-2">
                  <label className="block text-[#48505E]">Select Product</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value=""> </option>
                    <option value="XL Bass String">XL Bass String</option>
                    <option value="AD 880 NS W/ BAG">AD 880 NS W/ BAG</option>
                    <option value="Mapex Drumset">Mapex Drumset</option>
                  </select>
                  <div>
                    <label className="block text-[#48505E] text-[15px]">Select Supplier</label>
                    <select className="w-full p-2 border rounded-md">
                    <option value="" defaultValue> </option>
                      <option value="Lazer">Lazer</option>
                      <option value="Cort">Cort</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#48505E] text-[15px]">Select Brand</label>
                    <select className="w-full p-2 border rounded-md">
                    <option value="" defaultValue> </option>
                      <option value="Lazer">Lazer</option>
                      <option value="Cort">Cort</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#48505E] text-[15px]">Price</label>
                    <input type="number" min="0" className="w-full p-2 border rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-[#48505E]">Quantity</label>
                    <input type="number" min="0" className="w-full p-2 border rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-[#48505E] text-[15px]">Discount Amount</label>
                    <input type="number" min="0" className="w-full p-2 border rounded-md"/>
                  </div>
                  <button className="mt-4 px-2 py-1 w-full bg-blue-600 text-white rounded-md text-[13px]">ADD ORDER</button>
                </form>
              </div>

              {/* Freebies */}
              <div className="bg-white shadow-lg p-5 rounded-xl">
                <h2 className="text-xl text-center font-semibold text-blue-600 pb-4">Add Freebie/s</h2>
                <form className="text-[15px] space-y-2">
                  <label className="block text-[#48505E]">Select Product</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value=""> </option>
                    <option value="XL Bass String">XL Bass String</option>
                    <option value="AD 880 NS W/ BAG">AD 880 NS W/ BAG</option>
                    <option value="Mapex Drumset">Mapex Drumset</option>
                  </select>
                  <label className="text-[#48505E] text-[15px]">Quantity</label>
                  <input type="number" min="0" className="w-full p-2 border rounded-md" />
                  <button className="mt-4 px-2 py-1 w-full bg-blue-600 text-white rounded-md text-[13px]">ADD TO ORDER</button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default OrdersPage;
