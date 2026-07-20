import data from "../../api/faq";
import "../../styling/Home/Question.css";
import { useState } from "react";

export function Question() {
  const [open, setOpen] = useState(-1);

  return (
    <>
    <section id="faq">
      <h1 id="faq-title">Frequently Asked Questions</h1>

      <div className="faq-container">
        <div className="faq-box">
          {data.map((item, index) => (
            <div key={index} className="faq-item">
              <div
                className="q1"
                onClick={() => setOpen(open === index ? -1 : index)}
              >
                {item.question}
              </div>

              {open === index && (
                <div className="a1">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </section>
    </>
  );
}