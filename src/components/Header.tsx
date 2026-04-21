import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/fresse-logo.png";
import { useAuthStore } from "../store/useAuthStore";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = useAuthStore((s) => s.userName);
  const logout = useAuthStore((s) => s.logout);
  const login = useAuthStore((s) => s.login);

  return (
    <header className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4">
      <Link
        to="/"
        className="w-24 h-24  flex items-center justify-center mt-2  "
      >
        <img
          src={logo}
          alt="Fresse logo"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30 object-contain"
        />
      </Link>

      {userName ? (
        <div className="flex items-center gap-4">
          <span>Hello, {userName}</span>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={() => login("123", "TestUser")}>Login</button>
      )}

      <h1 className="text-3xl font-black tracking-widest mt-6">BOWL-LASKURI</h1>

      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="text-3xl font-bold"
      >
        ☰
      </button>

      {isMenuOpen && (
        <div
          className={`
    bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl
    px-6 py-4 flex flex-col gap-2 min-w-[200px]
    absolute right-4 top-16
    transition-all duration-300 origin-top
    ${isMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}
  `}
        >
          <Link
            to="/"
            className="font-semibold hover:text-zinc-700 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/community"
            className="font-semibold hover:text-zinc-700 transition-colors"
          >
            Saved recipes
          </Link>
          <Link
            to="/print"
            className="font-semibold hover:text-zinc-700 transition-colors"
          >
            Print
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
