
import { Link } from "react-router-dom";

export function Header() {
  
  return (
    <header className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4">
        <Link to="/" className="w-24 h-24 rounded-full border-4 border-[#A2D135] flex items-center justify-center flex-col -mt-2 bg-zinc-800 shadow-lg hover:bg-zinc-700 transition-colors">
            <span className="text-xs font-bold text-center">Fresh Food</span>
            <span className="text-xs font-bold text-center">Factory</span>
            <span className="text-lg font-black">FRESSE</span>
        </Link>
        
        <h1 className="text-3xl font-black tracking-widest mt-6">BOWL-LASKURI</h1>
        
        <div className="bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md">
              <Link to="/" className="font-semibold hover:text-zinc-700 transition-colors">
                Home
              </Link>
              <Link to="/community" className="font-semibold hover:text-zinc-700 transition-colors">
                Saved recipes
              </Link>
              <Link to="/print" className="font-semibold hover:text-zinc-700 transition-colors">
                Print
              </Link>
        </div>
    </header>
  );
}

export default Header;
