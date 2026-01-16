import { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { RaceTracker } from './components/RaceTracker';
import { Leaderboard } from './components/Leaderboard';
import { PitStopAcademy } from './components/PitStopAcademy';
import { Profile } from './components/Profile';
import { Navigation } from './components/Navigation';

type Screen = 'onboarding' | 'dashboard' | 'race' | 'leaderboard' | 'academy' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [user, setUser] = useState({
    name: '',
    avatar: '',
    points: 100,
    level: 1,
    co2Saved: 0,
    streakDays: 0,
  });

  const completeOnboarding = (userData: any) => {
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {currentScreen === 'onboarding' ? (
        <Onboarding onComplete={completeOnboarding} />
      ) : (
        <>
          <div className="pb-20">
            {currentScreen === 'dashboard' && <Dashboard user={user} onNavigate={navigateTo} />}
            {currentScreen === 'race' && <RaceTracker user={user} onNavigate={navigateTo} />}
            {currentScreen === 'leaderboard' && <Leaderboard user={user} />}
            {currentScreen === 'academy' && <PitStopAcademy user={user} />}
            {currentScreen === 'profile' && <Profile user={user} />}
          </div>
          <Navigation currentScreen={currentScreen} onNavigate={navigateTo} />
        </>
      )}
    </div>
  );
}