import "../../styling/Home/Working.css";


export function Working() {
  return (
    <>
    <section id="working">
      <h1 className="title" style={{fontSize:"3.5em",color:"#f32078", marginLeft:"50px"}}>How It Works</h1>
      <p className="subtitle">
        Get interview-ready faster with AI-powered practice, real-time feedback, and smart guidance designed to improve your confidence and performance.
      </p>

      <div className="container">

        <div className="card1">
         
          <h3 className="card1-title">1.&nbsp; &nbsp; Upload Your Resume</h3>
          <p className="card1-text">Upload your resume so AI can understand your profile.</p>
        </div>
        <div className="card2"> 
        <img className="card2-img" src="/Home/uploadresume.png" alt="Select Role" />
        </div>
      

        <div className="card1">
         
          <h3 className="card1-title">2.&nbsp; &nbsp; AI Interview</h3>
          <p className="card1-text">AI asks real interview questions based on your profile.</p>
        </div>
        <div className="card2">
          <img className="card2-img" src="/Home/interview.png" alt="AI Interview" />
        </div>

        <div className="card1">
          
          <h3 className="card1-title">3.&nbsp; &nbsp; Get Results</h3>
          <p className="card1-text">Receive score, feedback and improvement suggestions.</p>
        </div>
        <div className="card2">
          <img className="card2-img"  src="/Home/result.png" alt="Results" />
        </div>

      </div>
      </section>
     
    </>
  );
}