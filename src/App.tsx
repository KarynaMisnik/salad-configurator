import React from "react";

import Header from "./components/Header";
import Footer from "./components/footer";
import BowlSelection from "./components/BowlSelection";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />

      <BowlSelection />
      
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
        

        {/* Main content goes here */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
