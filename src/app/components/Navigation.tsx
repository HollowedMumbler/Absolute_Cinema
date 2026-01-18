import { motion } from 'motion/react';
import { Home, Play, Trophy, BookOpen, User } from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}


export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  // Don't render navigation on login or auth screens
  if (currentScreen === 'login' || currentScreen === 'auth' || currentScreen === 'register') {
    return null;
  }

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'race', label: 'Race', icon: Play },
    { id: 'leaderboard', label: 'Ranks', icon: Trophy },
    { id: 'academy', label: 'Learn', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700 z-50">
      <div className="flex items-center justify-around max-w-2xl mx-auto px-2 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative flex flex-col items-center gap-1 px-4 py-2 transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-green-500/20 rounded-xl"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              <Icon 
                className={`w-6 h-6 relative z-10 transition-colors ${
                  isActive ? 'text-green-400' : 'text-slate-400'
                }`} 
              />
              <span 
                className={`text-xs relative z-10 transition-colors ${
                  isActive ? 'text-green-400' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
              {isActive && item.id === 'race' && (
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full z-10"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
