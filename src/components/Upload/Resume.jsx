import "../../styling/Upload/Resume.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Resume() {
  const [resume, newresume] = useState("Upload");
  const navigate = useNavigate();

  async function f1(e) {
    const file = e.target.files[0];

    if (!file) return;

    newresume(file.name);

    const formData = new FormData();
    formData.append("resume", file);

    toast.dismiss();
    const uploadToast = toast.loading("Uploading Resume...");

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      toast.dismiss(uploadToast);
      toast.success("Resume uploaded successfully!");

      navigate("/analysis", { state: data });

    } catch (error) {
      console.error(error);

      toast.dismiss(uploadToast);
      toast.error("Server not running");
    }
  }

  return (
    <>
    <div id="box">
      <div id="resume-box1">
        <h1 id="resume-title">
          Upload Your Resume
        </h1>
      </div>

      <div id="line-box">
        <p id="line-box1">
          Help us get to know you better by sharing your resume
        </p>
      </div>

      <div id="box-2">

        <label htmlFor="resume-upload">
          <img
            src="/Upload/upload.png"
            alt="uploadicon"
            style={{ cursor: "pointer" }}
          />
        </label>

        <input
          type="file"
          id="resume-upload"
          onChange={f1}
          accept=".pdf"
          style={{ display: "none" }}
        />

        <p id="box21">
          Drag And Drop Your Resume
        </p>

        <label htmlFor="resume-upload">
          <div id="upload">
            {resume}
          </div>
        </label>

      </div>
 </div>    
    </>
  );
}