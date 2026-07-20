import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home.jsx";
import { Uploads } from "../pages/Uploads.jsx";
import { Analysis } from "../pages/Analysis.jsx";
import { Result } from "../pages/Result.jsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Uploads />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}