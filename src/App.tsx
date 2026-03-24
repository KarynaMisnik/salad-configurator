import BowlSelection from "./components/BowlSelection";
import CenterBowl from "./components/CenterBowl";
import BaseSelection from "./components/BaseSelection";
import IngredientSection from "./components/IngredientSection";
import SummaryBar from "./components/SummaryBar";

function App() {
  return (
    <>
      <main>
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
          <BowlSelection />
          <CenterBowl />
          <BaseSelection />
          <IngredientSection />
          <SummaryBar />
        </div>
      </main>
    </>
  );
}

export default App;
