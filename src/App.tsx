import React from "react";

import Header from "./components/Header";
import Footer from "./components/footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Main content goes here */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
