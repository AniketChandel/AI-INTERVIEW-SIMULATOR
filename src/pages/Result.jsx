import "../styling/Upload/Result.css";
import { useLocation, useNavigate } from "react-router-dom";

export function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};

  const {
    name = "",
    resumescore = 0,
    totalscore = 0,
    overallfeedback = "",
    questions = [],
  } = state;

  return (
    <>
      <h1 className="heading">Interview Result</h1>

      <div className="details">
        <h2>{name}</h2>
        <h2>Resume Score: {resumescore}</h2>
      </div>

      <div className="scorebox">
        <h2>Total Interview Score</h2>
        <h1>{totalscore}/100</h1>
      </div>

   

     

      <button
        className="submit"
        onClick={() => navigate("/")}
      >
        Take Another Interview
      </button>
    </>
  );
}