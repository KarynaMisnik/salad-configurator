import { Link } from "react-router-dom";
import { useState } from "react";
import { LoginModal } from "./LoginModal";
import logo from "../assets/fresse-logo.png";
import { useAuthStore } from "../store/useAuthStore";

// Heroicons icons library
import {
  Bars3Icon,
  UserIcon,
  BookmarkIcon,
  PrinterIcon,
} from "@heroicons/react/24/solid";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const userName = useAuthStore((s) => s.userName);
  const logout = useAuthStore((s) => s.logout);
  const login = useAuthStore((s) => s.login);

  return (
    <>
      <header className="bg-zinc-800 text-white w-full h-32 grid grid-cols-3 items-center px-8">
        <Link
          to="/"
          className="w-24 h-24  flex items-center flex justify-start mt-2"
        >
          <img
            src={logo}
            alt="Fresse logo"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain"
          />
        </Link>
        <h1 className="flex justify-center text-3xl font-black tracking-widest mt-6  ml-4 sm:ml-0">
          BOWL-LASKURI
        </h1>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex justify-end text-3xl font-bold"
        >
          <Bars3Icon className="w-6 h-6" />
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
              className="font-semibold hover:text-zinc-700 transition-colors flex"
            >
              <UserIcon className="w-6 h-6 mr-2" />
              {userName ? (
                <div className="flex items-center gap-4">
                  <span>Hello, {userName}</span>
                  <button
                    onClick={logout}
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsLoginOpen(true)}>
                  Kirjaudu sisään
                </button>
              )}
            </Link>
            <Link
              to="/community"
              className="font-semibold hover:text-zinc-700 transition-colors flex"
            >
              <BookmarkIcon className="w-6 h-6 mr-2" />
              Saved recipes
            </Link>
            <Link
              to="/print"
              className="font-semibold hover:text-zinc-700 transition-colors flex"
            >
              <PrinterIcon className="w-6 h-6 mr-2" />
              Print
            </Link>
          </div>
        )}
      </header>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default Header;
