import { useState } from 'react';

export default function BonusCannons() {
  const [shotsLeft, setShotsLeft] = useState(7);
  const [results, setResults] = useState([]);

  const shoot = (index) => {
    if (shotsLeft <= 0) return;
    const win = Math.random() < 0.5;
    setResults(prev => [...prev, win ? '💰' : '💥']);
    setShotsLeft(prev => prev - 1);
  };

  return (
    <div className="bg-red-900 p-4 rounded text-center">
      <h2 className="text-xl font-bold text-yellow-300">🚢 Bonus Cannoni</h2>
      <p>Scegli un cannone per sparare!</p>
      <div className="flex justify-center gap-4 my-2">
        {[0, 1, 2, 3].map(i => (
          <button key={i} onClick={() => shoot(i)} className="bg-gray-700 px-4 py-2 rounded">
            Cannone {i + 1}
          </button>
        ))}
      </div>
      <p>Colpi rimasti: {shotsLeft}</p>
      <div className="flex justify-center gap-2 mt-2">
        {results.map((r, i) => <span key={i}>{r}</span>)}
      </div>
    </div>
  );
}
