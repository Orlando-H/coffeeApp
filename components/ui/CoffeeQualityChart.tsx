"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 12,
      ticks: {
        stepSize: 3,
      },
    },
  },
}

const data = {
  labels: ["Aroma", "Flavor", "Acidity", "Body", "Aftertaste"],
  datasets: [
    {
      data: [8.5, 9, 7.5, 8, 8.5],
      backgroundColor: "#8B4513",
      borderRadius: 4,
    },
  ],
}

export function CoffeeQualityChart() {
  return (
    <div className="w-full h-[300px]">
      <Bar options={options} data={data} />
    </div>
  )
}

