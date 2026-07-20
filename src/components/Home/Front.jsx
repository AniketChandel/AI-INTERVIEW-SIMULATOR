import '../../styling/Home/Front.css';
import {useNavigate} from "react-router-dom"
export function Front() {
  const navigate=useNavigate();
  return (
    <>
    <section id="home">
      <div id="front">

        <div id="front1">
          <h1>Ace Your Interviews with AI</h1>

          <p>
            Master your interviews with our AI-powered Interview Simulator.
            Practice real interview questions, receive instant feedback on
            your answers, improve your communication and technical skills,
            track your progress, and gain the confidence to land your dream job.
          </p>

          <button id="start" onClick={()=>navigate("/upload")} >Start Interview</button>
        </div>

        <div id="front2">
          <video autoPlay muted loop controls playsInline>
            <source src="/Home/video1.mp4" type="video/mp4" />
          </video>
        </div>

      </div>
      </section>
    </>
  );
}