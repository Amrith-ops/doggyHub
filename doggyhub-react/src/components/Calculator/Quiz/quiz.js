import React, { useState } from 'react';
import axios from 'axios';
import './Quiz.css';

const questions = [
  {
    question: "Your ideal Saturday looks like...",
    options: [
      { text: "🛋️ Netflix marathon with snacks (low energy)", value: "low", className: "option-low" },
      { text: "🚶‍♂️ Leisurely park stroll (moderate energy)", value: "moderate", className: "option-moderate" },
      { text: "🏃‍♀️ Hiking 10 miles before brunch (high energy)", value: "high", className: "option-high" }
    ]
  },
  {
    question: "How do you feel about pet hair?",
    options: [
      { text: "✨ Spotless home is non-negotiable", value: "spotless", className: "option-spotless" },
      { text: "🧹 Don't mind weekly vacuuming", value: "weekly", className: "option-weekly" },
      { text: "🐑 The fluffier the better!", value: "fluffy", className: "option-fluffy" }
    ]
  },
  {
    question: "Your social battery is...",
    options: [
      { text: "🔋 Always charged (love visitors)", value: "charged", className: "option-charged" },
      { text: "⚡ Drained after 2 hours (small circles only)", value: "drained", className: "option-drained" },
      { text: "🪫 What's socializing?", value: "hermit", className: "option-hermit" }
    ]
  },
  {
    question: "Teaching new tricks sounds...",
    options: [
      { text: "🎓 Fun bonding time!", value: "fun", className: "option-fun" },
      { text: "😩 Like homework", value: "homework", className: "option-homework" },
      { text: "🤷‍♂️ 'Sit' is enough", value: "basic", className: "option-basic" }
    ]
  },
  {
    question: "Your ideal soundscape:",
    options: [
      { text: "🔇 Library-quiet", value: "quiet", className: "option-quiet" },
      { text: "🔉 Soft background hum", value: "hum", className: "option-hum" },
      { text: "🔊 Let's get loud!", value: "loud", className: "option-loud" }
    ]
  },
  {
    question: "Would you take your pet...",
    options: [
      { text: "✈️ Around the world", value: "world", className: "option-world" },
      { text: "🚗 On weekend road trips", value: "roadTrips", className: "option-roadTrips" },
      { text: "🏡 Only to the backyard", value: "backyard", className: "option-backyard" }
    ]
  },
  {
    question: "Physical affection preference:",
    options: [
      { text: "🤗 24/7 snuggles required", value: "snuggles", className: "option-snuggles" },
      { text: "👋 Occasional pets are fine", value: "occasional", className: "option-occasional" },
      { text: "🚫 'Don't touch me' energy", value: "noTouch", className: "option-noTouch" }
    ]
  },
  {
    question: "Daily pet time you can give:",
    options: [
      { text: "🕛 <1 hour", value: "1hr", className: "option-1hr" },
      { text: "🕧 1-3 hours", value: "3hr", className: "option-3hr" },
      { text: "🕛 >3 hours", value: "3+hr", className: "option-3+hr" }
    ]
  },
  {
    question: "Monthly pet budget:",
    options: [
      { text: "💰 <₹3000", value: "3k", className: "option-3k" },
      { text: "💸 ₹3000-₹8000", value: "8k", className: "option-8k" },
      { text: "🤑 >₹8000", value: "8k+", className: "option-8k+" }
    ]
  },
  {
    question: "Which would bother you most?",
    options: [
      { text: "💩 Occasional accidents", value: "accidents", className: "option-accidents" },
      { text: "🔪 Chewed furniture", value: "furniture", className: "option-furniture" },
      { text: "🎵 3AM zoomies", value: "zoomies", className: "option-zoomies" }
    ]
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [pets, setPets] = useState([]);

  const handleChange = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // Replace with real Petfinder API key
    const PETFINDER_KEY = 'your-api-key';

    try {
      const { data } = await axios.get(
        'https://api.petfinder.com/v2/animals?type=dog&location=90210',
        { headers: { Authorization: `Bearer ${PETFINDER_KEY}` } }
      );
      setPets(data.animals);
    } catch (error) {
      console.error('Failed to fetch pets:', error);
    }
  };

  return (
    <div className="quiz-container">
      {currentQuestion < questions.length ? (
        <div className="question-slide">
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <h1>{questions[currentQuestion].question}</h1>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={option.className}
              onClick={() => handleChange(option.value)}
            >
              {option.text}
            </button>
          ))}
        </div>
      ) : (
        <div className="results">
          <h1>Your Pet Matches</h1>
          <div className="pet-grid">
            {pets.map(pet => (
              <div key={pet.id} className="pet-card">
                <img src={pet.photos[0]?.medium || 'placeholder-dog.jpg'} alt={pet.name} />
                <h3>{pet.name}</h3>
                <p>{pet.breeds.primary}</p>
                <a href={pet.url} target="_blank" rel="noopener noreferrer">Adopt Me</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;