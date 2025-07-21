"use client"

import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export function SmokingBarChart() {
  const data = {
    labels: ["Pria", "Wanita", "Total"],
    datasets: [
      {
        data: [65, 2, 67],
        backgroundColor: ["#06b6d4", "#ef4444", "#f97316"],
        borderRadius: 8,
      },
    ],
  }

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
        max: 70,
        ticks: {
          stepSize: 10,
        },
      },
    },
  }

  return <Bar data={data} options={options} />
}

export function DeathCausePieChart() {
  const data = {
    labels: ["Stroke", "Kanker Paru-Paru", "PPOK (COPD)", "Penyakit Jantung"],
    datasets: [
      {
        data: [25, 30, 20, 25],
        backgroundColor: ["#8b5cf6", "#f59e0b", "#06b6d4", "#ef4444"],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  }

  return <Pie data={data} options={options} />
}
