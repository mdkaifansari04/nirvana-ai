'use client';

import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';

Chart.register(...registerables);

interface McqDonutChartProps {
   correct: number;
   total: number;
   percentage: number;
}

export function McqDonutChart({ correct, total, percentage }: McqDonutChartProps) {
   const chartRef = useRef<HTMLCanvasElement>(null);
   const chartInstance = useRef<Chart | null>(null);

   useEffect(() => {
      if (!chartRef.current) return;

      // Destroy existing chart
      if (chartInstance.current) {
         chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      // Determine color based on percentage
      let color = '#ef4444'; // red for low scores
      if (percentage >= 70) {
         color = '#10b981'; // green for high scores
      } else if (percentage >= 50) {
         color = '#f59e0b'; // amber for medium scores
      }

      chartInstance.current = new Chart(ctx, {
         type: 'doughnut',
         data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [
               {
                  data: [correct, total - correct],
                  backgroundColor: [color, 'rgba(229, 231, 235, 0.5)'],
                  borderColor: [color, 'rgba(229, 231, 235, 1)'],
                  borderWidth: 1,
                  hoverOffset: 4,
               },
            ],
         },
         options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
               legend: {
                  display: false,
               },
               tooltip: {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  titleColor: '#333',
                  bodyColor: '#666',
                  borderColor: '#ddd',
                  borderWidth: 1,
                  padding: 10,
                  displayColors: false,
               },
            },
         },
      });

      return () => {
         if (chartInstance.current) {
            chartInstance.current.destroy();
         }
      };
   }, [correct, total, percentage]);

   return (
      <div className="relative h-[180px] w-[180px]">
         <canvas ref={chartRef} />
         <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold">{percentage}%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
               {correct}/{total} correct
            </span>
         </div>
      </div>
   );
}
