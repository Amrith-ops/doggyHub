const PETMD_API = 'https://api.petmd.com/v1/conditions?species=dog&breed_size=';

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

async function fetchHealthRisks(breedSize) {
  try {
    const response = await fetch(`${PETMD_API}${breedSize}`);
    const data = await response.json();
    
    // Transform API response to our format
    return data.conditions.map(condition => ({
      age: condition.common_age,
      risks: [condition.name]
    }));
    
  } catch (error) {
    console.error('API failed, using local data');
    return healthRisks[breedSize][region]; // Fallback to our dataset
  }
}

export {fetchHealthRisks}