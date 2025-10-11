import { BrowserRouter as Router } from "react-router";
import { Header } from "./components/Header";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <Header />
      <main
        style={{ paddingTop: "70px", maxWidth: "1000px", margin: "0 auto" }}
      >
        <AppRoutes />
      </main>
    </Router>
  );
}

export default App;
