import { BookOpen, Home, Play, Trophy, User } from "lucide-react";
import { motion } from "motion/react";
import { NavLink, useLocation } from "react-router";

export function Navigation() {
  const navItems = [
    { id: "/", label: "Home", icon: Home },
    { id: "/race", label: "Race", icon: Play },
    { id: "/leaderboard", label: "Ranks", icon: Trophy },
    { id: "/academy", label: "Learn", icon: BookOpen },
    { id: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="sticky right-0 bottom-0 left-0 z-50 border-t border-slate-700 bg-slate-900/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-2xl items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const location = useLocation();
          const isActive = location.pathname === item.id;

          return (
            <NavLink
              to={item.id}
              className="relative flex flex-col items-center gap-1 px-4 py-2 transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-green-500/20"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              <Icon
                className={`relative z-10 h-6 w-6 transition-colors ${
                  isActive ? "text-green-400" : "text-slate-400"
                }`}
              />
              <span
                className={`relative z-10 text-xs transition-colors ${
                  isActive ? "text-green-400" : "text-slate-400"
                }`}
              >
                {item.label}
              </span>
              {isActive && item.id === "race" && (
                <motion.div
                  className="absolute -top-1 -right-1 z-10 h-2 w-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
