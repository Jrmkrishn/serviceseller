"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useCartStore } from "../../_store/store"

export const description = "An interactive bar chart"

const chartConfig = {
  revenue: {
    label: "Total Revenue",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

const formatCurrency = (total: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(total);

export function Chart() {
  const { saledItems } = useCartStore();
  const totalServices = saledItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalRevenue = saledItems.reduce((sum, item) => sum + item.quantity * item.service.price, 0);

  const servicesByCategory = saledItems.reduce((acc: { [key: string]: { sales: number, revenue: number } }, item) => {
    const category = item.service.category;
    acc[category] = acc[category] || { revenue: 0 };
    acc[category].revenue += item.quantity * item.service.price;
    return acc;
  }, {});

  const chartData = Object.entries(servicesByCategory).map(([category, data]) => ({
    category,
    revenue: data.revenue,
  }));

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Services By Category</CardTitle>
          <CardDescription>
            Showing total revenue for the last 3 months
          </CardDescription>
        </div>
        <div className="flex border-b">
          <button className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Total Revenue</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {formatCurrency(totalRevenue)}
            </span>
          </button>
          <button className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Total Services</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {totalServices.toLocaleString()}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={chartData}>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="category"
                  formatter={(value) => formatCurrency(Number(value))}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
