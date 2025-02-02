import React from "react";
import { Button } from "@/components/ui/button";
import { CartItem, Receipt } from "@/lib/types/service";

interface State {
    receipt: Receipt | null
    printReceipt: () => void
}

const OrderSummary = ({ receipt, printReceipt }: State) => {
    return (
        <div className="rounded-lg shadow-lg p-6 flex flex-col justify-center">
            <div id="receipt">
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-bold gradient-text mb-4">Thank You!</h2>
                    <p className="text-muted-foreground">Your order has been placed successfully. You will receive an email confirmation shortly.</p>
                </div>
                <div className="border-t border-b py-4 mb-4">
                    <h3 className="font-semibold mb-2">Order Summary</h3>
                    <p className="text-sm text-muted-foreground">Order ID: {receipt?.id}</p>
                    <p className="text-sm text-muted-foreground">Date: {receipt?.date?.toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">Payment Method: {receipt?.paymentMethod}</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Customer Information</h3>
                    <p className="text-sm text-muted-foreground">{receipt?.customer?.name}</p>
                    <p className="text-sm text-muted-foreground">{receipt?.customer?.email}</p>
                    <p className="text-sm text-muted-foreground">{receipt?.customer?.phone}</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Services</h3>
                    {receipt?.items.map((item: CartItem) => (
                        <div key={item.service.id} className="flex justify-between text-sm text-muted-foreground">
                            <span>{item.service.name} X {item.quantity}</span>
                            <span>{(item.service.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${receipt?.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-2">
                <Button type="button" onClick={printReceipt} variant="secondary" className="mt-5">
                    Print Receipt
                </Button>
                <Button type="submit" className="mt-5">
                    Complete Order
                </Button>
            </div>
        </div>
    );
};

export default OrderSummary;
