import React, { useState, useEffect } from 'react';
import './Quiz.css';

const BREED_PROFILES = {
  'Golden Retriever': {
    energy: 4,
    maintenance: 3,
    sociability: 5,
    trainability: 5,
    barking: 3,
    weight: 65,
    lifespan: 10,
    traits: ['family-friendly', 'playful', 'intelligent'],
    matches: {
      energy: ['moderate', 'high'],
      sociability: ['charged', 'drained'],
      space: ['house'],
      budget: ['8k', '8k+']
    },
    image: '/images/golden_retriever.jpg'
  },
  'Shiba Inu': {
    energy: 3,
    maintenance: 2,
    sociability: 2,
    trainability: 2,
    barking: 2,
    weight: 23,
    lifespan: 12,
    traits: ['independent', 'clean', 'alert'],
    matches: {
      energy: ['low', 'moderate'],
      sociability: ['hermit', 'drained'],
      space: ['apartment'],
      budget: ['3k', '8k']
    },
    image: '/images/Japanese_Shiba_Inu.jpg'
  },
  'Bulldog': {
    energy: 2,
    maintenance: 2,
    sociability: 3,
    trainability: 2,
    barking: 2,
    weight: 50,
    lifespan: 8,
    traits: ['calm', 'friendly', 'low-energy'],
    matches: {
      energy: ['low'],
      sociability: ['drained'],
      space: ['apartment'],
      budget: ['3k', '8k']
    },
    image: '/images/Border_collie.jpg'
  },
  'Border Collie': {
    energy: 5,
    maintenance: 4,
    sociability: 4,
    trainability: 5,
    barking: 3,
    weight: 45,
    lifespan: 12,
    traits: ['intelligent', 'energetic', 'working-dog'],
    matches: {
      energy: ['high'],
      sociability: ['charged'],
      space: ['house'],
      budget: ['8k+']
    },
    image: '/images/Border_collie.jpg'
  },
  'Poodle': {
    energy: 3,
    maintenance: 4,
    sociability: 4,
    trainability: 5,
    barking: 2,
    weight: 60,
    lifespan: 12,
    traits: ['hypoallergenic', 'intelligent', 'active'],
    matches: {
      energy: ['moderate'],
      sociability: ['charged'],
      space: ['house'],
      budget: ['8k+']
    },
    image: '/images/poodle.jpg'
  }
  // Add more breeds...
};

const QUESTION_WEIGHTS = {
  energy: 0.25,
  maintenance: 0.15,
  sociability: 0.2,
  space: 0.15,
  time: 0.1,
  budget: 0.15
};

const questions = [
  {
    key: 'energy',
    question: "How would you describe your typical weekend activity level?",
    options: [
      { text: "🛋️ Couch potato (low energy)", value: "low", className: "option-low" },
      { text: "🚶‍♂️ Leisurely park stroll (moderate energy)", value: "moderate", className: "option-moderate" },
      { text: "🏃‍♀️ Hiking 10 miles before brunch (high energy)", value: "high", className: "option-high" }
    ]
  },
  {
    key: 'maintenance',
    question: "How do you feel about pet grooming and maintenance?",
    options: [
      { text: "✨ Spotless home is non-negotiable (low maintenance)", value: "low", className: "option-low" },
      { text: "🧹 Don't mind weekly grooming (moderate maintenance)", value: "moderate", className: "option-moderate" },
      { text: "🐑 The fluffier the better! (high maintenance)", value: "high", className: "option-high" }
    ]
  },
  {
    key: 'sociability',
    question: "How do you feel about social interactions?",
    options: [
      { text: "🔋 Always charged (love visitors)", value: "charged", className: "option-charged" },
      { text: "⚡ Drained after 2 hours (small circles only)", value: "drained", className: "option-drained" },
      { text: "🪫 What's socializing? (prefer solitude)", value: "hermit", className: "option-hermit" }
    ]
  },
  {
    key: 'trainability',
    question: "How do you feel about teaching new tricks to your pet?",
    options: [
      { text: "🎓 Fun bonding time!", value: "fun", className: "option-fun" },
      { text: "😩 Like homework", value: "homework", className: "option-homework" },
      { text: "🤷‍♂️ 'Sit' is enough", value: "basic", className: "option-basic" }
    ]
  },
  {
    key: 'barking',
    question: "How much noise can you tolerate from your pet?",
    options: [
      { text: "🔇 Library-quiet", value: "quiet", className: "option-quiet" },
      { text: "🔉 Soft background hum", value: "hum", className: "option-hum" },
      { text: "🔊 Let's get loud!", value: "loud", className: "option-loud" }
    ]
  },
  {
    key: 'space',
    question: "What type of living space do you have?",
    options: [
      { text: "🏢 Apartment", value: "apartment", className: "option-apartment" },
      { text: "🏡 House with a yard", value: "house", className: "option-house" },
      { text: "🌲 Rural area with lots of space", value: "rural", className: "option-rural" }
    ]
  },
  {
    key: 'budget',
    question: "What is your monthly budget for pet expenses?",
    options: [
      { text: "💰 <₹3000", value: "3k", className: "option-3k" },
      { text: "💸 ₹3000-₹8000", value: "8k", className: "option-8k" },
      { text: "🤑 >₹8000", value: "8k+", className: "option-8k+" }
    ]
  }
];

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('Recommendations State Updated:', recommendations);
  }, [recommendations]);

  useEffect(() => {
    console.log('Current Step:', currentStep);
  }, [currentStep]);

  // Enhanced compatibility calculator
  const calculateCompatibility = (answers) => {
    const breedScores = {};
    
    Object.entries(BREED_PROFILES).forEach(([breed, profile]) => {
      let score = 0;
      
      // Calculate score for each relevant category
      Object.entries(QUESTION_WEIGHTS).forEach(([category, weight]) => {
        const answer = answers[category];
        if (answer && profile.matches[category]?.includes(answer)) {
          score += weight * 100;
        }
      });

      // Additional scoring factors
      if (answers.maintenance === 'low' && profile.maintenance <= 2) {
        score += 15;
      }
      
      if (answers.sociability === 'hermit' && profile.sociability <= 2) {
        score += 20;
      }

      breedScores[breed] = Math.min(100, Math.round(score));
    });

    console.log('Breed Scores:', breedScores); // Debugging statement

    return Object.entries(breedScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);
  };

  // Enhanced recommendation handler
  const handleRecommendations = (compatibleBreeds) => {
    setIsLoading(true);
    console.log('Compatible Breeds:', compatibleBreeds); // Debugging statement
    const recommendedPets = compatibleBreeds.map(([breed, score]) => {
      const profile = BREED_PROFILES[breed];
      return {
        name: breed,
        traits: profile.traits,
        compatibility: score,
        weight: profile.weight,
        lifespan: profile.lifespan,
        maintenance: profile.maintenance,
        sociability: profile.sociability,
        trainability: profile.trainability,
        barking: profile.barking,
        image: profile.image
      };
    });
    console.log('Recommended Pets:', recommendedPets); // Debugging statement
    setRecommendations(recommendedPets);
    setIsLoading(false);
  };

  const handleAnswer = (questionKey, answer) => {
    const newAnswers = { ...answers, [questionKey]: answer };
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const compatibleBreeds = calculateCompatibility(newAnswers);
      handleRecommendations(compatibleBreeds);
      setCurrentStep(currentStep + 1); // Ensure we move to the results step
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Find Your Perfect Canine Companion</h1>
        <div className="progress-tracker">
          Step {currentStep + 1} of {questions.length}
        </div>
      </div>

      {currentStep < questions.length ? (
        <div className="question-card">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(currentStep + 1) / questions.length * 100}%` }}
            />
          </div>
          
          <h2 className="question-text">
            {questions[currentStep].question}
          </h2>
          
          <div className="options-grid">
            {questions[currentStep].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${answers[questions[currentStep].key] === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(questions[currentStep].key, option.value)}
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-text">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="results-container">
          {isLoading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Fetching your perfect matches...</p>
            </div>
          ) : (
            <>
              <h2 className="results-title">Your Top Recommendations</h2>
              <div className="recommendations-grid">
                {console.log('Rendering Recommendations:', recommendations.length)}
                {recommendations.length > 0 ? (
                  recommendations.map((pet, index) => (
                    <div key={index} className="recommendation-card">
                      <div className="compatibility-badge">
                        {pet.compatibility}% Match
                      </div>
                      <div className="pet-details">
                        <img src={pet.image} alt={pet.name} className="pet-image" />
                        <h3>{pet.name}</h3>
                        <p className="breed">Weight: {pet.weight} lbs</p>
                        <p className="breed">Lifespan: {pet.lifespan} years</p>
                        <p className="breed">Maintenance: {pet.maintenance}</p>
                        <p className="breed">Sociability: {pet.sociability}</p>
                        <p className="breed">Trainability: {pet.trainability}</p>
                        <p className="breed">Barking: {pet.barking}</p>
                        <div className="pet-traits">
                          {pet.traits.map((trait, i) => (
                            <span key={i} className="trait-bubble">{trait}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No recommendations available. Please try again.</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
