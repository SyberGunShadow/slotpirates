import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { signInAnonymously } from 'firebase/auth';
import SlotGrid from './components/SlotGrid';
import BonusManager from './components/BonusManager';
import StartScreen from './components/StartScreen';

export default function App() {
  const [started, setStarted] = useState(false);
  const [activeBonus, setActiveBonus] = useState(null);
  const [balance, setBalance] = useState(() => Number(localStorage.getItem('balance')) || 100);

  useEffect(() => {
    if (!started) return;
    signInAnonymously(auth)
      .then(() => console.log('Accesso anonimo riuscito'))
      .catch((err) => console.error('Errore login anonimo:', err));
  }, [started]);

  const handleBonus = (bonusType) => {
    setActiveBonus(bonusType);
    setTimeout(() => setActiveBonus(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {!started ? (
        <StartScreen onStart={() => setStarted(true)} />
      ) : (
        <>
          <h1 className="text-center text-4xl font-bold py-4 text-yellow-400">🏴‍☠️ Slot Pirates</h1>
          <SlotGrid />
          <BonusManager onTriggerBonus={handleBonus} balance={balance} setBalance={setBalance} />
          {activeBonus && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-600 px-6 py-3 rounded text-black text-xl font-bold shadow-lg animate-pulse">
              🎁 Bonus: {activeBonus}
            </div>
          )}
        </>
      )}
    </div>
  );
}
