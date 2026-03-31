import BowlSelection from "../components/BowlSelection";
import CenterBowl from "../components/CenterBowl";
import BaseSelection from "../components/BaseSelection";
import IngredientSection from "../components/IngredientSection";
import SummaryBar from "../components/SummaryBar";
import type { Category, Ingredient } from "../types";

const categories: Category[] = [
  { id: 1, name: "Greens", base_type_id: 1 },
  { id: 2, name: "Proteins", base_type_id: 1 },
  { id: 3, name: "Toppings", base_type_id: 1 },
  { id: 4, name: "Dressings", base_type_id: 1 },
  { id: 6, name: "Bases", base_type_id: 1 },
];

const ingredients: Ingredient[] = [
  {
    id: 101,
    name: "placeholder base 1",
    price: 1,
    image_url: "https://images.unsplash.com/photo-1622205313162-be1d5712a43b?auto=format&fit=crop&w=400&q=60",
    baracode_url: "",
    categoryId: 6,
    diets: ["V", "G"],
    weight_grams: 80,
  },
  {
    id: 102,
    name: "placeholder base 2",
    price: 1,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=60",
    baracode_url: "",
    categoryId: 6,
    diets: ["V", "G"],
    weight_grams: 70,
  },
  {
    id: 201,
    name: "Kale",
    price: 1,
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=60",
    baracode_url: "",
    categoryId: 1,
    diets: ["V", "G"],
    weight_grams: 60,
  },
  {
    id: 301,
    name: "Chicken",
    price: 3,
    image_url: "https://images.unsplash.com/photo-1604908176997-431f2f6c8b7a?auto=format&fit=crop&w=400&q=60",
    baracode_url: "",
    categoryId: 2,
    diets: [],
    weight_grams: 120,
  },
  {
    id: 401,
    name: "Tomato",
    price: 1,
    image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=60",
    baracode_url: "",
    categoryId: 3,
    diets: ["V", "G"],
    weight_grams: 40,
  },
  {
    id: 501,
    name: "Olive Oil",
    price: 1,
    image_url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=60",
    baracode_url: "",
    categoryId: 4,
    diets: ["V", "G"],
    weight_grams: 30,
  },
];

function Configurator() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
      <BowlSelection />
      <CenterBowl />
      <BaseSelection ingredients={ingredients} />
      <IngredientSection categories={categories} ingredients={ingredients} />
      <SummaryBar />
    </div>
  );
}

export default Configurator;