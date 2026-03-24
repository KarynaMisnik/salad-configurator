import BowlSelection from "./components/BowlSelection";
import CenterBowl from "./components/CenterBowl";
import BaseSelection from "./components/BaseSelection";
import IngredientSection from "./components/IngredientSection";
import SummaryBar from "./components/SummaryBar";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />

      <main>
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
          <BowlSelection />
          <CenterBowl />
          <BaseSelection />
          <IngredientSection />
          <SummaryBar />
        </div>
      </main>

      <Footer />
      </div>
    </>
  );
}

export default App;
