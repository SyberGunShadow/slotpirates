import { useState, useEffect } from 'react';
import { saveGameState, loadGameState } from '../utils/gameState';
import { getAuth } from 'firebase/auth';
const auth = getAuth();
const userId = auth.currentUser?.uid || 'guest';

export default function BonusManager({ onTriggerBonus, balance, setBalance }) {
  const userId = 'artur'; // puoi usare un ID dinamico se hai login

  const [points, setPoints] = useState(0);
  const [freeSpins, setFreeSpins] = useState(0);

  // 🔄 Carica stato da Firebase all'avvio
  useEffect(() => {
    loadGameState(userId).then((data) => {
      if (data) {
        setPoints(data.points || 0);
        setFreeSpins(data.freeSpins || 0);
        setBalance(data.balance || 100);
      }
    });
  }, []);

  // 💾 Salva stato ogni volta che cambia
  useEffect(() => {
    saveGameState(userId, { points, freeSpins, balance });
  }, [points, freeSpins, balance]);

  const playSound = (src) => new Audio(src).play();

  const maybeTriggerBonus = () => {
    const chance = Math.random();
    if (chance < 0.1) {
      playSound('/sounds/bonus.mp3');
      onTriggerBonus('freeSpins');
    } else if (chance < 0.2) {
      playSound('/sounds/bonus.mp3');
      onTriggerBonus('cannons');
    } else if (chance < 0.3) {
      playSound('/sounds/bonus.mp3');
      onTriggerBonus('treasureMap');
    }
  };

  const handleSpin = () => {
    playSound('/sounds/spin.mp3');

    if (freeSpins > 0) {
      setFreeSpins(prev => prev - 1);
      maybeTriggerBonus();
    } else {
      const gotPoint = Math.random() < 0.2;
      if (gotPoint) {
        const newPoints = points + 1;
        setPoints(newPoints);
        if (newPoints >= 10) {
          setPoints(0);
          setFreeSpins(7);
        }
      }

      const newBalance = balance - 0.50;
      setBalance(newBalance > 0 ? newBalance : 0);
    }
  };

  return (
    <div className="text-center mb-4">
      <p className="text-lg">Punti bonus: <span className="text-yellow-300">{points}</span></p>
      <p className="text-lg">Giri gratuiti: <span className="text-green-300">{freeSpins}</span></p>
      <button
        onClick={handleSpin}
        className="bg-yellow-500 hover:bg-yellow-400 px-6 py-2 rounded text-black font-bold transition"
      >
        Gira
      </button>
    </div>
  );
}
