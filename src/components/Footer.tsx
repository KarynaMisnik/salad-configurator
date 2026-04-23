export default function Footer() {
  return (
    <footer className="bg-[#A2D135] text-black p-8 mt-12 w-full flex flex-wrap justify-around items-start">
      <div className="w-full sm:w-1/3 p-4">
        <p>Fresh Food Factory</p>
        <p>FRESSE</p>
      </div>

      <div className="w-full sm:w-1/3 p-4">
        <h2 className="text-lg font-bold mb-2">Contact</h2>
        <p>Phone: 123-456-7890</p>
        <p>Email: info@example.com</p>
      </div>

      <div className="w-full sm:w-1/3 p-4">
        <h2 className="text-lg font-bold mb-2">Social Media</h2>
        <p>Instagram</p>
        <p>Facebook</p>
        <p>Twitter</p>
      </div>
    </footer>
  );
}
