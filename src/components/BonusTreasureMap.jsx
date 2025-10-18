import { useState } from 'react';

export default function BonusTreasureMap() {
  const [clicks, setClicks] = useState(0);
  const [reveals, setReveals] = useState([]);

  const multipliers = [25, 60, 200];

  const reveal = () => {
    if (clicks >= 3) return;
    const prize = multipliers[Math.floor(Math.random() * multipliers.length)];
    setReveals(prev => [...prev, prize]);
    setClicks(prev => prev + 1);
  };

  return (
    <div className="bg-green-900 p-4 rounded text-center">
      <h2 className="text-xl font-bold text-yellow-300">🗺️ Mappa del Tesoro</h2>
      <p>Clicca sulla mappa per scoprire il moltiplicatore!</p>
      <button onClick={reveal} className="bg-yellow-500 px-4 py-2 rounded text-black font-bold mt-2">
        Scopri
      </button>
      <p>Clic rimasti: {3 - clicks}</p>
      <div className="flex justify-center gap-2 mt-2">
        {reveals.map((r, i) => <span key={i}>💰 x{r}</span>)}
      </div>
    </div>
  );
}
