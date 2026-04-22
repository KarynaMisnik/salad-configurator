import { useState } from "react";
import { Modal } from "./Modal";
import { login } from "../services/api";
import { useAuthStore } from "../store/useAuthStore";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginToStore = useAuthStore((s) => s.login);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(""); // reset error

    try {
      const data = await login(email, password);

      // save to Zustand
      loginToStore(data.token, data.userName);

      //close modal
      onClose();
    } catch (err) {
      // show error
      setError("Invalid email or password");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-zinc-900">Login</h2>

        {/* ERROR MESSAGE */}
        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <label className="flex flex-col gap-1 text-sm text-zinc-700">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2"
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-zinc-700">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2"
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
