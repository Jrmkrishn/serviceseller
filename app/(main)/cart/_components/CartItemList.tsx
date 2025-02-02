import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Minus, Plus, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "../../_store/store";

const CartItemList = () => {
  const { cartItems, changeStep, updateQuantity, removeCartItem } = useCartStore();

  return (
    <div className="max-w-lg mx-auto w-full h-full flex flex-col gap-2">
      {cartItems.length === 0 ? (
        <p className="mx-auto text-center text-muted-foreground flex items-center gap-2">
          <span>Your cart is empty</span>
        </p>
      ) : (<>
        <ScrollArea className="h-[50vh]">
          {cartItems.map((item) => (
            <div
              className="flex items-center justify-between rounded-lg border p-4 h-32"
              key={item.service.id}
            >
              <div className="flex-1">
                <h3 className="font-medium">{item.service.name}</h3>
                <p>{item.service.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  type="button"
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant={"destructive"}
                  size={"icon"}
                  onClick={() => removeCartItem(item.service.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <Button
          type="button"
          variant={"secondary"}
          disabled={cartItems.length === 0}
          onClick={() => changeStep("customer")}
          className="w-full flex items-center transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue to Checkout
          <ChevronRight className="w-4 h-4" />
        </Button>
      </>
      )}
    </div>
  );
};

export default CartItemList;
