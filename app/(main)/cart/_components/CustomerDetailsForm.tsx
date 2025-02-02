import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


import { UseFormReturn } from "react-hook-form";

interface State { form: UseFormReturn<{ name: string; email: string; phone: string; }, unknown, undefined> }

const CustomerDetailsForm = ({ form }: State) => {

    return (<>

        <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                    <Input placeholder="Your Phone Number" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <Button type="submit" variant={"secondary"} className="w-full flex items-center mt-4">
            Continue to Payment
        </Button>
    </>


    );
};

export default CustomerDetailsForm;
