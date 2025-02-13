import React, { useState, useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import './Calculator.css';

const Calculator = () => {
  const [dogAge, setDogAge] = useState('');
  const [breedSize, setBreedSize] = useState('medium');
  const chartRef = useRef(null);

  // Breed-specific formula
  const calculateHumanAge = () => {
    const baseAge = 16 * Math.log(dogAge) + 31;
    const multipliers = { small: 1.2, medium: 1.0, large: 0.8 };
    return Math.round(baseAge * multipliers[breedSize]);
  };

  // Chart rendering
  useEffect(() => {
    if (!dogAge) return;

    if (chartRef.current) chartRef.current.destroy();

    const ctx = document.getElementById('healthChart');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Dental Disease', 'Heart Risk'],
        datasets: [{
          label: 'Probability (%)',
          data: [62, 38],
          backgroundColor: ['#FF6B6B', '#4ECDC4']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }, [dogAge, breedSize]);

  return (
    <div className="calculator">
      <h1>🐶 Dog Age Calculator</h1>
      <input 
        type="number" 
        value={dogAge}
        onChange={(e) => setDogAge(e.target.value)}
        placeholder="Enter dog's age"
      />
      <select value={breedSize} onChange={(e) => setBreedSize(e.target.value)}>
        <option value="small">Small Breed</option>
        <option value="medium">Medium Breed</option>
        <option value="large">Large Breed</option>
      </select>
      {dogAge && (
        <div className="results">
          <h2>Human Age: {calculateHumanAge()}</h2>
          <div className="chart-container">
            <canvas id="healthChart"></canvas>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;