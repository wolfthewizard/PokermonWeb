import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TablesPage from "./pages/TablesPage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<TablesPage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
