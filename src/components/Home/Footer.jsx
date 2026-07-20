import "../../styling/Home/Footer.css";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  const goToSection = (id) => {
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <div id="footer-box">
        <h1 id="head">
          Master Your Interviews and Stand out at Top Companies
        </h1>

        <div className="footer-content">
          <div className="box">
            <h2 className="footer-title">
              Explore Top Skills
            </h2>
            <ul>
              <li>Web Development</li>
              <li>Data Structures & Algorithms (DSA)</li>
              <li>Artificial Intelligence (AI)</li>
              <li>Machine Learning (ML)</li>
              <li>Frontend Development</li>
              <li>Backend Development</li>
              <li>Database Management</li>
              <li>System Design</li>
              <li>Cloud Computing</li>
              <li>Cybersecurity</li>
            </ul>
          </div>

          <div className="box">
            <h2 className="footer-title">
              Quick Links
            </h2>
            <ul>
              <li onClick={() => goToSection("home")}>Home</li>
              <li onClick={() => goToSection("features")}>Features</li>
              <li onClick={() => goToSection("working")}>Working</li>
              <li onClick={() => goToSection("faq")}>FAQ</li>
            </ul>
          </div>

          <div className="box">
            <h2 className="footer-title">
              About
            </h2>
            <ul>
              <li>AI-Powered Interviews</li>
              <li>Resume Analysis</li>
              <li>Instant Feedback</li>
              <li>Performance Reports</li>
            </ul>
          </div>
        </div>

        <hr />

        <p id="copyright">
          © 2026 AI Interview. All Rights Reserved.
        </p>
      </div>
    </>
  );
}