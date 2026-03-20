export default function SummaryBar() {
  return (
    <section className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">
      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="text-xl text-white font-bold mb-4">Selected ingredients</h3>
        <ul className="space-y-2 text-sm">
          <li>Placeholder 1</li>
          <li>Placeholder 2</li>
          <li>Placeholder 3</li>
        </ul>
      </div>

      <aside className="flex-1 flex flex-col justify-center items-center gap-6">
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          430g
        </div>
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          $10.99
        </div>
      </aside>
    </section>
  );
}
