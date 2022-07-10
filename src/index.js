import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Hello from "./pages/Hello";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="hello" element={<Hello />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// <Route path="*" element={<NoPage />} />
