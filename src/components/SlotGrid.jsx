const symbols = ['💀', '🪙', '🗺️', '⚓', '🏴‍☠️', '🔫'];

export default function SlotGrid() {
  const grid = Array.from({ length: 4 }, () =>
    Array.from({ length: 6 }, () => symbols[Math.floor(Math.random() * symbols.length)])
  );

  return (
    <div className="grid grid-rows-4 grid-cols-6 gap-2 text-3xl text-center mb-4">
      {grid.flat().map((symbol, i) => (
        <div key={i} className="bg-gray-800 p-4 rounded shadow">{symbol}</div>
      ))}
    </div>
  );
}
