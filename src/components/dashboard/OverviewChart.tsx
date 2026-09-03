"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Ene", ingresos: 4000000, gastos: 2400000 },
  { name: "Feb", ingresos: 3000000, gastos: 1398000 },
  { name: "Mar", ingresos: 2000000, gastos: 4800000 },
  { name: "Abr", ingresos: 2780000, gastos: 3908000 },
  { name: "May", ingresos: 1890000, gastos: 4800000 },
  { name: "Jun", ingresos: 2390000, gastos: 3800000 },
]

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <Tooltip formatter={(value) => `$${Number(value).toLocaleString("es-CL")}`} />
        <Bar dataKey="ingresos" fill="#22c55e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="gastos" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
