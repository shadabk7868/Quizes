import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quizzes() {
  const navigate = useNavigate();

  const [allQuizes, setAllQuizes] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("allQuizes")) || {};
    const cats = Object.keys(data);

    setAllQuizes(data);
    setCategories(cats);
  }, []);

  if (categories.length === 0) {
    return <h3 className="text-center mt-5">No Quiz Available</h3>;
  }

  const currentCategory = categories[categoryIndex];
  const quizList = allQuizes[currentCategory];
  const question = quizList[questionIndex];

  const submitAnswer = () => {
    setShowAnswer(true);
    if (selected === question.correctOption) {
      setScore(prev => prev + 1);
    }
  };

  const saveScore = (cat, finalScore) => {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({
      category: cat,
      score: finalScore,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  };

  const nextQuestion = () => {
    setSelected("");
    setShowAnswer(false);

    
    if (questionIndex + 1 < quizList.length) {
      setQuestionIndex(prev => prev + 1);
    } 
    
    else {
      saveScore(currentCategory, score);

      
      if (categoryIndex + 1 < categories.length) {
        setCategoryIndex(prev => prev + 1);
        setQuestionIndex(0);
        setScore(0);
      } 
      
      else {
        navigate("/leaderboard");
      }
    }
  };

  const changeCategory = (e) => {
    const idx = categories.indexOf(e.target.value);
    setCategoryIndex(idx);
    setQuestionIndex(0);
    setScore(0);
    setSelected("");
    setShowAnswer(false);
  };

  return (
    <div className="container mt-5 ">

      {/* ✅ CATEGORY DROPDOWN – ALWAYS VISIBLE */}
      <div className="mb-4 d-flex justify-content-start align-items-center gap-2">
        <label className="fw-bold me-2">Select Category:</label>
        <select
          className="form-select  w-auto text-light bg-secondary"
          value={currentCategory}
          onChange={changeCategory}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="card shadow p-4 mb-4 bg-light">
        <h5 className="fw-bold">{question.question}</h5>

        <div className="mt-3">
          {Object.keys(question.options).map((key) => (
            <div key={key} className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="option"
                value={key}
                checked={selected === key}
                disabled={showAnswer}
                onChange={() => setSelected(key)}
                id={`option-${key}`}
              />
              <label className="form-check-label" htmlFor={`option-${key}`}>
                {question.options[key]}
              </label>
            </div>
          ))}
        </div>

        {!showAnswer ? (
          <button
            className="btn btn-primary bg-primary  mt-5  "
            disabled={!selected}
            onClick={submitAnswer}
          >
            Submit
          </button>
        ) : (
          <div className="mt-3">
            <p className="fw-bold text-success">
              Correct Answer: {question.options[question.correctOption]}
            </p>
            <button className="btn btn-success me-2" onClick={nextQuestion}>
              Next
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
}
