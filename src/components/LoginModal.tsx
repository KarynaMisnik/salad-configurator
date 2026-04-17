import { FormEvent, useState } from "react";
import { Modal } from "./Modal";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder for future auth integration.
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-zinc-900">Login</h2>

        <label className="flex flex-col gap-1 text-sm text-zinc-700">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-zinc-700">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            required
          />
        </label>

        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
        >
          Sign in
        </button>
      </form>
    </Modal>
  );
}

export default LoginModal;
