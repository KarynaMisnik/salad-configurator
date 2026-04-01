import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Configurator from "./pages/Configurator";
import Community from "./pages/Community";
import Print from "./pages/Print";

function App() {
  return (
    <>
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />

      <main>
        <Routes>
          {/* Route switch for top-level pages in the app shell. */}
          <Route path="/" element={<Configurator />} />
          <Route path="/community" element={<Community />} />
          <Route path="/print" element={<Print />} />
        </Routes>
      </main>
      
      <Footer />
      </div>
    </>
  );
}

export default App;
