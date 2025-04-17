"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface MoodChartProps {
  before: number;
  after: number;
}

export function MoodChart({ before, after }: MoodChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Before", "After"],
        datasets: [
          {
            label: "Mood Level",
            data: [before, after],
            borderColor: "oklch(0.35 0.05 54.17)",
            backgroundColor: "oklch(0.35 0.05 54.17 / 0.1)", // 10% opacity
            borderWidth: 3,
            pointBackgroundColor: "oklch(0.35 0.05 54.17)",
            pointRadius: 6,
            pointHoverRadius: 8,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            ticks: {
              stepSize: 2,
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#333",
            bodyColor: "#666",
            borderColor: "#ddd",
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              label: (context) => `Mood: ${context.parsed.y}/10`,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [before, after]);

  return (
    <div className="h-[180px] w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
