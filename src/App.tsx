import { Header } from "./components/Header";
import { AppRoutes } from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="app-container">
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
