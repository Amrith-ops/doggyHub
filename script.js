function calculate() {
    const dogAge = parseFloat(document.getElementById('dogAge').value);
    const breedSize = document.getElementById('breedSize').value;
    const region = document.getElementById('region').value;
    
    if (!dogAge || dogAge < 1) {
      alert("Please enter a valid age (1-30).");
      return;
    }
  
    const humanAge = calculateHumanAge(dogAge, breedSize);
    document.getElementById('result').innerHTML = 
      `Your ${breedSize} dog is roughly ${humanAge} years old in human years!`;
  
    // Health Risk Chart (Step 3)
    showHealthRisks(breedSize,region);
  }
  
  // Health Risks Data (Example)
  function showHealthRisks(breedSize, region) {
    const risksData = healthRisks[breedSize][region];
    const ages = risksData.map(data => data.age);
    const riskLabels = risksData.map(data => data.risks.join(", "));
  
    const ctx = document.createElement('canvas');
    ctx.id = 'healthChart';
    document.getElementById('chartContainer').innerHTML = '';
    document.getElementById('chartContainer').appendChild(ctx);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ages.map(age => `Age ${age}`),
        datasets: [{
          label: 'Health Risks',
          data: riskLabels.map((_, index) => index + 1), // Dummy data for bars
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => riskLabels[value - 1] || ''
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => riskLabels[context.dataIndex]
            }
          }
        }
      }
    });
  }

  function calculateHumanAge(dogAge, breedSize) {
    const baseAge = 16 * Math.log(dogAge) + 31;
    let multiplier = 1.0;
    if (breedSize === 'small') multiplier = 1.2;
    if (breedSize === 'large') multiplier = 0.8;
    return Math.round(baseAge * multiplier);
  }

  const healthRisks = {
    small: {
      US: [
        { age: 5, risks: ["Dental Disease (60%)", "Patellar Luxation (30%)"] },
        { age: 10, risks: ["Heart Disease (40%)", "Tracheal Collapse (20%)"] }
      ],
      Canada: [
        { age: 5, risks: ["Dental Disease (55%)", "Obesity (25%)"] },
        { age: 10, risks: ["Diabetes (35%)", "Kidney Disease (15%)"] }
      ],
      EU: [
        { age: 5, risks: ["Dental Disease (50%)", "Allergies (20%)"] },
        { age: 10, risks: ["Liver Disease (30%)", "Cataracts (10%)"] }
      ]
    },
    medium: {
      US: [
        { age: 5, risks: ["Obesity (50%)", "Hip Dysplasia (20%)"] },
        { age: 10, risks: ["Arthritis (60%)", "Cancer (15%)"] }
      ],
      Canada: [
        { age: 5, risks: ["Obesity (45%)", "Hypothyroidism (25%)"] },
        { age: 10, risks: ["Heart Disease (50%)", "Diabetes (20%)"] }
      ],
      EU: [
        { age: 5, risks: ["Obesity (40%)", "Skin Infections (15%)"] },
        { age: 10, risks: ["Arthritis (55%)", "Cancer (10%)"] }
      ]
    },
    large: {
      US: [
        { age: 5, risks: ["Arthritis (70%)", "Bloat (15%)"] },
        { age: 10, risks: ["Heart Disease (60%)", "Cancer (20%)"] }
      ],
      Canada: [
        { age: 5, risks: ["Arthritis (65%)", "Hip Dysplasia (25%)"] },
        { age: 10, risks: ["Obesity (55%)", "Diabetes (15%)"] }
      ],
      EU: [
        { age: 5, risks: ["Arthritis (60%)", "Bloat (10%)"] },
        { age: 10, risks: ["Heart Disease (50%)", "Cancer (15%)"] }
      ]
    }
  };