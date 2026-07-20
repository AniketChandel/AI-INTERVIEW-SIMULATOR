import "../styling/Upload/Analysis.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { speak } from "../utils/speak";

export function Analysis() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <h2>No data found. Please upload resume again.</h2>;
  }

  const name = state["name of candidate"];
  const resumescore = state.resumescore;
  const questions = state.questions || [];

  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const question = questions[current];

  useEffect(() => {
    if (question && question.question) {
      speak(question.question);
    }
  }, [current]);

  async function submitAnswer() {
    const allAnswers = answers.concat({
      question: question?.question,
      answer: answer
    });

    setAnswers(allAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setAnswer("");
      return;
    }

    const response = await fetch("http://localhost:5000/checktest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        resumescore,
        answers: allAnswers
      })
    });

    const result = await response.json();

    navigate("/result", {
      state: result
    });
  }

  return (
    <>
      <h1 className="heading">AI Interview</h1>

      <div className="details">
        <h2 className="score">{name}</h2>
        <h2 className="score">Resume Score: {resumescore}</h2>
      </div>

      <h3 className="question">
        Question {current + 1} of {questions.length}
      </h3>

      <p className="ques">{question?.question}</p>

      <div className="answersection">
        <h3 className="title">Your Answer</h3>

        <textarea
          className="answerbox"
          rows="6"
          cols="60"
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <br />

        <button className="submit" onClick={submitAnswer}>
          {current === questions.length - 1
            ? "Finish Interview"
            : "Next Question"}
        </button>
      </div>
    </>
  );
}