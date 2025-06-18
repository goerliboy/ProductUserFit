import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { questions } from '../data/questions';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  answers: Record<number, string>;
}

const RadarChart: React.FC<RadarChartProps> = ({ answers }) => {
  // Group questions by category and calculate average scores
  const categoryScores = Object.entries(answers).reduce((acc, [questionId, answer]) => {
    const question = questions[parseInt(questionId)];
    if (!question) return acc;
    
    const option = question.options.find(opt => opt.label === answer);
    const score = option ? option.weight : 0;
    
    if (!acc[question.category]) {
      acc[question.category] = {
        total: 0,
        count: 0
      };
    }
    
    acc[question.category].total += score;
    acc[question.category].count += 1;
    
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  // Calculate averages and prepare data
  const categories = Object.keys(categoryScores);
  const averages = categories.map(category => 
    categoryScores[category].total / categoryScores[category].count
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Category Scores',
        data: averages,
        backgroundColor: 'rgba(0, 0, 255, 0.2)', // Windows 98 blue with transparency
        borderColor: '#0000ff', // Windows 98 blue
        borderWidth: 2,
        pointBackgroundColor: '#0000ff',
        pointBorderColor: '#000000',
        pointHoverBackgroundColor: '#000000',
        pointHoverBorderColor: '#0000ff',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: '#808080', // Windows 98 gray
        },
        grid: {
          color: '#808080', // Windows 98 gray
        },
        pointLabels: {
          color: '#000000', // Black text
          font: {
            family: '"MS Sans Serif", Tahoma, Arial, sans-serif',
            size: 11,
            weight: 'normal',
          },
        },
        ticks: {
          color: '#404040', // Dark gray
          backdropColor: 'transparent',
          font: {
            family: '"MS Sans Serif", Tahoma, Arial, sans-serif',
            size: 9,
          },
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#c0c0c0',
        titleColor: '#000000',
        bodyColor: '#000000',
        borderColor: '#808080',
        borderWidth: 2,
        padding: 8,
        displayColors: false,
        titleFont: {
          family: '"MS Sans Serif", Tahoma, Arial, sans-serif',
          size: 11,
        },
        bodyFont: {
          family: '"MS Sans Serif", Tahoma, Arial, sans-serif',
          size: 11,
        },
      },
    },
  };

  return (
    <div className="w-full h-full min-h-[300px] win98-inset bg-white p-4">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;