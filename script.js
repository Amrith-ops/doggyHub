import {fetchHealthRisks} from "./petMdHealthRiskApi.js"

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

  const ageColors = {
    '5': '#FF6B6B',
    '10': '#4ECDC4',
    '15': '#45B7D1', 
    '20': '#96CEB4'
  };
  
  function getColorForAge(age) {
    return ageColors[age] || '#3498db';
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
          label: 'Health Risk Level',
          data: risksData.map((_, index) => index + 1),
          backgroundColor: ages.map(age => getColorForAge(age)),
          borderColor: 'rgba(255,255,255,0.8)',
          borderWidth: 2,
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
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
