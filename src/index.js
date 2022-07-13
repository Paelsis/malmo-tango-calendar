import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import Alert from "./pages/DialogSlide";
import AppBar from './components/AppBar'
import Image from './images/tangosweden.jpg';

const RedirectToDk = () =>  {
  window.location.replace('https://www.tango.dk');
  return null;
}
const RedirectToHbg = () =>  {
  window.location.replace('https://www.tangorama.se');
  return null;
}

export default function App() {
  return (
    <BrowserRouter> 
      <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="Calendar" element={<Calendar />} />
          <Route path="dk" element={<RedirectToDk />} />
          <Route path="hbg" element={<RedirectToHbg />} />
        </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

