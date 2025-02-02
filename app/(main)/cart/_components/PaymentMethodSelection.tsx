import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface State {
    loading: boolean;
    setPaymentMethod: (method: "Credit Card" | "Upi" | "Cash") => void;
    paymentMethod: string;
}

const PaymentMethodSelection = ({ loading, setPaymentMethod, paymentMethod }: State) => {
    return (
        <div className="max-w-lg mx-auto w-full p-6 flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold mb-3">Select Payment Method</h3>
            <div className="flex gap-3 mb-6">
                {["Credit Card", "UPI", "Cash"].map((method) => (
                    <Button
                        type="button"
                        key={method}
                        variant={paymentMethod === method ? "default" : "outline"}
                        onClick={() => setPaymentMethod(method as "Credit Card" | "Upi" | "Cash")}
                    >
                        {method}
                    </Button>
                ))}
            </div>
            <Button  type="submit" className="w-full flex items-center justify-center" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Complete Payment"}
            </Button>
        </div >
    );
};

export default PaymentMethodSelection;
