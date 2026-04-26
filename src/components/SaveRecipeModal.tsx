import { useState } from "react";
import Modal from "../components/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; isPublic: boolean }) => void;
};

export default function SaveRecipeModal({ isOpen, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSave({
        name,
        isPublic,
      });

      alert("Recipe saved successfully!");

      setName("");
      setIsPublic(false);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save recipe");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Save Recipe</h2>

        <input
          type="text"
          placeholder="Recipe name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Make Public
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
