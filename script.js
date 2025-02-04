function calculate() {
    const dogAge = parseFloat(document.getElementById('dogAge').value);
    const breedSize = document.getElementById('breedSize').value;
    
    if (!dogAge || dogAge < 1) {
      alert("Please enter a valid age (1-30).");
      return;
    }
  
    const humanAge = calculateHumanAge(dogAge, breedSize);
    document.getElementById('result').innerHTML = 
      `Your ${breedSize} dog is roughly ${humanAge} years old in human years!`;
  
    // Health Risk Chart (Step 3)
    showHealthRisks(breedSize);
  }
  
  // Health Risks Data (Example)
  function showHealthRisks(breedSize) {
    const risks = {
      small: ["Dental Disease (60%)", "Patellar Luxation (30%)"],
      medium: ["Obesity (50%)", "Hip Dysplasia (20%)"],
      large: ["Arthritis (70%)", "Bloat (15%)"]
    };
  
    const chartHtml = `
      <h3>Common Health Risks:</h3>
      <ul>
        ${risks[breedSize].map(risk => `<li>${risk}</li>`).join('')}
      </ul>
    `;
    document.getElementById('healthChart').innerHTML = chartHtml;
  }

  function calculateHumanAge(dogAge, breedSize) {
    const baseAge = 16 * Math.log(dogAge) + 31;
    let multiplier = 1.0;
    if (breedSize === 'small') multiplier = 1.2;
    if (breedSize === 'large') multiplier = 0.8;
    return Math.round(baseAge * multiplier);
  }