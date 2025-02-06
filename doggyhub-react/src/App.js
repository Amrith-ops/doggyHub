import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Calculator from './components/Calculator/Calculator';
import Quiz from './components/Quiz/Quiz';
import './App.css';

function App() {
  return (
      <Router>
            <nav>
                    <Link to="/">Calculator</Link>
                            <Link to="/quiz">Adoption Quiz</Link>
                                  </nav>

                                        <Routes>
                                                <Route path="/" element={<Calculator />} />
                                                        <Route path="/quiz" element={<Quiz />} />
                                                              </Routes>
                                                                  </Router>
                                                                    );
                                                                    }

                                                                    export default App;