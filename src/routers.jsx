import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import App from "./App";
import PostProfile from "./pages/PostProfile";

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<PostProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
