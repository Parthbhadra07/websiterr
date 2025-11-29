import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
      <AppRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
