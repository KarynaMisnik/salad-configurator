import FresseLogo from "../assets/fresse-logo-white.png";
import OivaLogo from "../assets/oiva-logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#A2D135] text-white p-8 mt-12 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start ">
      <div className="sm:w-1/3 p-4 flex flex-col justify-center items-center">
        <h2 className="text-lg font-bold mb-2">FRESSE</h2>
        <img
          src={FresseLogo}
          alt="Fresse Logo"
          className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto object-contain transition-transform hover:scale-105"
        />
      </div>
      <div className="sm:w-1/3 p-4 text-white">
        <h2 className="text-lg font-bold mb-2 whitespace-nowrap">
          Ota yhteyttä
        </h2>
        <p className="text-lg mb-2 whitespace-nowrap">Phone: 123-456-7890</p>
        <p className="text-lg mb-2 whitespace-nowrap">
          Email: info@example.com
        </p>
      </div>
      <div className="sm:w-1/3 p-4 text-whit whitespace-nowrap">
        <h2 className="text-lg font-bold mb-2">Seuraa meitä</h2>
        <p>Instagram</p>
        <p>Facebook</p>
        <p>Twitter</p>
      </div>
      <div className="sm:w-1/3 p-4">
        <img
          src={OivaLogo}
          alt="Oiva Logo"
          className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto object-contain transition-transform hover:scale-105"
        />
      </div>
    </footer>
  );
}
