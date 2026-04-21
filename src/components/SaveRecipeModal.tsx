import { useState } from "react";
import Modal from "./Modal";
import { saveRecipe } from "../services/api";
import { useAuthStore } from "../store/useAuthStore";
import { useIngredientStore } from "../store/useIngredientStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  bowlId: string;
};

export default function SaveRecipeModal({ isOpen, onClose, bowlId }: Props) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const token = useAuthStore((s) => s.token);
  const slots = useIngredientStore((s) => s.slots);
  const clearSelection = useIngredientStore((s) => s.clearSelection);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) return;

    const ingredientIds = Object.values(slots)
      .filter((i) => i !== null)
      .map((i: any) => i.id);

    try {
      await saveRecipe(token, {
        name,
        bowlId,
        ingredientIds,
      });

      // ✅ success feedback
      setMessage("Recipe saved!");

      // ✅ clear bowl
      clearSelection();

      // optional: close modal after delay
      setTimeout(() => {
        setMessage("");
        onClose();
      }, 1000);
    } catch (err) {
      setMessage("Failed to save recipe");
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Save Recipe</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Recipe name"
          className="border p-2 rounded"
          required
        />

        {message && <p className="text-green-600 font-bold">{message}</p>}

        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Save
        </button>
      </form>
    </Modal>
  );
}
