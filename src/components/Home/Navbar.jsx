import '../../styling/Home/Navbar.css'
import {Resume} from "../Upload/Resume.jsx"
import { useNavigate } from "react-router-dom";

export function Navbar(){
  const navigate = useNavigate();

return(
<>
<div id="header">
    <img id="interviewlogo" src="/Home/img1.png" alt="AI Interview Logo" />
    <h1 id="title">AI Interview Simulator</h1>
     <h1 id ="more">Learn More</h1>
<button id="start" onClick={() => navigate("/upload")}>
      Practice
    </button>
   
</div>
    </>
)
}