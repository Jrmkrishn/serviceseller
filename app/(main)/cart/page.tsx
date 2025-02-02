"use client";

import React, { useState } from "react";
import { useCartStore } from "../_store/store";
import { Customer } from "@/lib/types/service";
import { toast } from "sonner";
import CartItemList from "./_components/CartItemList";
import CustomerDetailsForm from "./_components/CustomerDetailsForm";
import PaymentMethodSelection from "./_components/PaymentMethodSelection";
import OrderSummary from "./_components/OrderSummary";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/schema";
import { Form } from "@/components/ui/form";



const Cart = () => {
  const {
    cartItems,
    handleCheckout,
    receipt,
    step,
    changeStep: setStep,
    addSaledItem,
  } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"Credit Card" | "Upi" | "Cash">("Credit Card");

  const onSubmit = async (data: Customer) => {
    if (step === "customer") {
      toast.dismiss();
      toast.success("Customer Details Saved!");
      setStep("payment");
    } else if (step === "payment" ) {      
      setLoading(true);
      toast.loading("Processing Payment...");
      setTimeout(() => {
        setLoading(false);
        toast.success("Payment Successful!");
        toast.dismiss();
        handleCheckout(data, paymentMethod);
        addSaledItem(cartItems);
        setStep("success");
      }, 2000);
    } else if (step === "success") {
      toast.dismiss();
      setStep("cart");
      toast.success("Order Completed!");
    }
  };

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: receipt?.customer?.name || "",
      email: receipt?.customer?.email || "",
      phone: receipt?.customer?.phone || "",
    },
  });

  const printReceipt = () => {
    const receiptContent = document.getElementById("receipt")?.innerHTML;
    if (!receiptContent) {
      toast.error("No receipt found!");
      return;
    }
    const printWindow = window.open("", "", "width=600,height=600");
    printWindow?.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            .receipt-container { border: 1px solid #ccc; padding: 15px; }
          </style>
        </head>
        <body>
          <div class="receipt-container">${receiptContent}</div>
        </body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.print();
  };


  return (
    <div>
      <div className="w-full mb-6 flex items-center justify-center text-center">
        <h2 className="gradient-title text-4xl font-semibold">{step === "cart" ? "Your Cart" : step === "customer" ? "Customer Details" : ""}</h2>
      </div>
      <div>
        <Form {...form}>
          <form className="mx-auto max-w-sm w-full" onSubmit={form.handleSubmit(onSubmit)}>
            {step === "cart" && <CartItemList />}
            {step === "customer" && <CustomerDetailsForm form={form} />}
            {step === "payment" && <PaymentMethodSelection loading={loading} setPaymentMethod={setPaymentMethod} paymentMethod={paymentMethod} />}
            {step === "success" && <OrderSummary receipt={receipt} printReceipt={printReceipt} />}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Cart;
