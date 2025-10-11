import { BrowserRouter as Router } from "react-router";
import { Header } from "./components/Header";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  );
}

export default App;
