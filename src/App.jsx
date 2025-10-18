import SlotGrid from './components/SlotGrid';
import BonusManager from './components/BonusManager';
import BonusFreeSpins from './components/BonusFreeSpins';
import BonusCannons from './components/BonusCannons';
import BonusTreasureMap from './components/BonusTreasureMap';
import { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { useEffect } from 'react';
import { auth } from './firebase';
import { signInAnonymously } from 'firebase/auth';

useEffect(() => {
  signInAnonymously(auth)
    .then(() => console.log('Accesso anonimo riuscito'))
    .catch((error) => console.error('Errore login anonimo:', error));
}, []);

function App() {
  const [activeBonus, setActiveBonus] = useState(null);
  const [balance, setBalance] = useState(() => Number(localStorage.getItem('balance')) || 100);

  const handleBonus = (type) => setActiveBonus(type);

  const transitions = useTransition(activeBonus, {
    from: { opacity: 0, transform: 'scale(0.95)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.95)' },
    config: { tension: 220, friction: 20 },
  });

  const resetGame = () => {
    localStorage.clear();
    setActiveBonus(null);
    setBalance(100);
    window.location.reload();
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-yellow-400 text-3xl text-center mb-4">🎰 Slot Machine Pirata</h1>

      <div className="text-center mb-4">
        <p className="text-lg">Bilancio virtuale: <span className="text-green-400">€{balance.toFixed(2)}</span></p>
        <button onClick={resetGame} className="bg-red-700 px-4 py-2 rounded mt-2">🔄 Reset Gioco</button>
      </div>

      <SlotGrid />
      <BonusManager onTriggerBonus={handleBonus} balance={balance} setBalance={setBalance} />

      <div className="flex justify-center gap-4 my-4">
        <button onClick={() => setActiveBonus('freeSpins')} className="bg-blue-600 px-4 py-2 rounded">Free Spins</button>
        <button onClick={() => setActiveBonus('cannons')} className="bg-red-600 px-4 py-2 rounded">Cannoni</button>
        <button onClick={() => setActiveBonus('treasureMap')} className="bg-green-600 px-4 py-2 rounded">Mappa</button>
        <button onClick={() => setActiveBonus(null)} className="bg-gray-600 px-4 py-2 rounded">Chiudi Bonus</button>
      </div>

      <div className="relative">
        {transitions((style, item) => {
          let Component = null;
          if (item === 'freeSpins') Component = BonusFreeSpins;
          else if (item === 'cannons') Component = BonusCannons;
          else if (item === 'treasureMap') Component = BonusTreasureMap;

          return Component ? (
            <animated.div style={style} className="absolute w-full top-0 left-0">
              <Component />
            </animated.div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default App;

