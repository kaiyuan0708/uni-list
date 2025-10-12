import { BrowserRouter as Router } from "react-router";
import { Header } from "./components/Header";
import { AppRoutes } from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main className="app-container">
        <AppRoutes />
      </main>
    </Router>
  );
}

export default App;
