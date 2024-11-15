import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import AddCaptionPage from "./components/AddCaptionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/add-caption" element={<AddCaptionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
