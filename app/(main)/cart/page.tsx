"use client"
import React, { useMemo } from 'react'
import { useCartStore } from '../_store/store'
import { Customer } from '@/lib/types/service'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from '@/lib/schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronRight, Minus, Plus, X } from 'lucide-react'
import { toast } from 'sonner'

const Cart = () => {
    const { cartItems, updateQuantity, handleCheckout, removeCartItem, receipt, step, changeStep: setStep } = useCartStore()

    const total = useMemo(() =>
        cartItems.reduce((sum, item) => sum + (item.quantity * item.service.price), 0)
        , [cartItems])
    const form = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        }
    })
    const onSubmit = (data: Customer) => {
        if (step === "customer") {
            toast.success("Customer Details Saved!");
            setStep("payment");
            handleCheckout(data, "Credit Card");
        } else {
            setStep("cart");
            form.reset();
            toast.success("Order Completed!");
        }
    };


    const formattedTotal = useMemo(() =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(total),
        [total]);

    return (
        <div>
            <div className='w-full mb-6 flex items-center justify-center text-center'>
                <h2 className='text-xl font-semibold'>
                    {step === "cart" ? "Your Cart" : step === "customer" ? "Customer Details" : ""}
                </h2>
            </div>
            <Form {...form}>
                <form className='mx-auto max-w-sm w-full' onSubmit={form.handleSubmit(onSubmit)}>
                    {step === "cart" && (
                        <div className='w-full h-full flex flex-col gap-2' >
                            {
                                cartItems.map((item) => (
                                    <div className='flex items-center justify-between rounded-lg border p-4 h-32' key={item.service.id}>
                                        <div className='flex-1'>
                                            <h3 className='font-medium'>{item.service.name}</h3>
                                            <p>{item.service.price}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <Button type="button" variant={"outline"} size={"icon"} onClick={() => updateQuantity(item.service.id, item.quantity - 1)}>
                                                <Minus className='w-4 h-4' />
                                            </Button>
                                            <span className='w-8 text-center'>{item.quantity}</span>
                                            <Button type="button" variant={"outline"} size={"icon"} onClick={() => updateQuantity(item.service.id, item.quantity + 1)}>
                                                <Plus className='w-4 h-4' />
                                            </Button>
                                            <Button type="button" variant={"destructive"} size={"icon"} onClick={() => removeCartItem(item.service.id)}>
                                                <X className='w-4 h-4' />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className='mt-5 space-y-4'>
                                <div className='flex items-center justify-between border-t pt-4 text-lg font-semibold'>
                                    <span>Total</span>
                                    <span>{formattedTotal}</span>
                                </div>
                            </div>
                            <Button
                                type='button'
                                variant={"secondary"}
                                disabled={cartItems.length === 0}
                                onClick={() => {
                                    setStep("customer");
                                    toast.success("Moving to Customer Details");
                                }}
                                className='w-full flex items-center transition-colors disabled:cursor-not-allowed disabled:opacity-50'
                            >
                                Continue to Checkout
                                <ChevronRight className='w-4 h-4' />
                            </Button>

                        </div>
                    )}
                    {step == "customer" &&
                        <>
                            <FormField control={form.control} name='name' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Your Name' {...field} onChange={field.onChange} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name='email' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Your Email' {...field} onChange={field.onChange} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name='phone' render={({ field }) => (
                                <FormItem>
                                    <FormLabel >
                                        Phone Number
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder='Your Phone Number' {...field} onChange={field.onChange} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit" variant={"secondary"}
                                className='w-full flex items-center'
                            >
                                Continue to Payment
                                <ChevronRight className='w-4 h-4' />
                            </Button>
                        </>
                    }
                    {step == "payment" &&
                        <div className='rounded-lg shadow-lg p-6 flex flex-col justify-center'>

                            <div className='text-center mb-6'>
                                <h2 className='text-2xl font-bold gradient-text mb-4'>
                                    Thank You!
                                </h2>
                                <p className='text-muted-foreground'>Your order has been placed successfully. You will receive an email confirmation shortly.</p>
                            </div>
                            <div className='border-t border-b py-4 mb-4'>
                                <h3 className='font-semibold mb-2'>Order Summary</h3>
                                <p className='text-sm text-muted-foreground'>Order ID: {receipt?.id}</p>
                                <p className='text-sm text-muted-foreground'>Date: {receipt?.date?.toLocaleDateString()}</p>
                            </div>
                            <div className='mb-4'>
                                <h3 className='font-semibold mb-2'>Customer Information</h3>
                                <p className='text-sm text-muted-foreground'>{receipt?.customer?.name}</p>
                                <p className='text-sm text-muted-foreground'>{receipt?.customer?.email}</p>
                                <p className='text-sm text-muted-foreground'>{receipt?.customer?.phone}</p>
                            </div>
                            <div className='mb-4'>
                                <h3 className='font-semibold mb-2'>Services</h3>
                                {receipt?.items.map(item => (
                                    <div key={item.service.id} className='flex justify-between text-sm text-muted-foreground' >
                                        <span>{item.service.name} X {item.quantity}</span>
                                        <span >{(item.service.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className='border-t pt-4'>
                                <div className='flex justify-between font-semibold'>
                                    <span>Total</span>
                                    <span>${receipt?.total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Button type="submit" className="mx-auto mt-5">
                                Complete Order
                            </Button>
                        </div>
                    }
                </form>

            </Form>
        </div>
    )
}

export default Cart