import { motion } from 'motion/react';
import { Trophy, Zap, Leaf, TrendingUp, Play, BookOpen, Users, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface DashboardProps {
  user: {
    name: string;
    points: number;
    level: number;
    co2Saved: number;
    streakDays: number;
  };
  onNavigate: (screen: string) => void;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const dailyChallenge = {
    title: "Eco Warrior Challenge",
    description: "Complete 3 trips using sustainable transport",
    progress: 1,
    total: 3,
    reward: "+150 points",
  };

  const recentAchievements = [
    { id: 1, name: "Rookie Racer", emoji: "🏆", earned: true },
    { id: 2, name: "Green Starter", emoji: "🌱", earned: true },
    { id: 3, name: "Speed Demon", emoji: "⚡", earned: false },
    { id: 4, name: "Eco Champion", emoji: "🏅", earned: false },
  ];

  const todayStats = {
    trips: 3,
    distance: 12.5,
    co2Saved: 2.3,
    points: 245,
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-4"
      >
        <h1 className="text-3xl text-white mb-1">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-slate-400">Ready to race today?</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-3"
      >
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-300 text-sm mb-1">Total Points</p>
              <p className="text-2xl text-white">{user.points.toLocaleString()}</p>
            </div>
            <Zap className="text-green-400 w-8 h-8" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-300 text-sm mb-1">Level</p>
              <p className="text-2xl text-white">{user.level}</p>
            </div>
            <Trophy className="text-blue-400 w-8 h-8" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-300 text-sm mb-1">CO₂ Saved</p>
              <p className="text-2xl text-white">{user.co2Saved.toFixed(1)} kg</p>
            </div>
            <Leaf className="text-emerald-400 w-8 h-8" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-orange-500/30 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-300 text-sm mb-1">Streak</p>
              <p className="text-2xl text-white">{user.streakDays} days</p>
            </div>
            <TrendingUp className="text-orange-400 w-8 h-8" />
          </div>
        </Card>
      </motion.div>

      {/* Daily Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <Target className="text-purple-400 w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-1">{dailyChallenge.title}</h3>
              <p className="text-sm text-slate-300">{dailyChallenge.description}</p>
            </div>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {dailyChallenge.reward}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Progress</span>
              <span className="text-white">{dailyChallenge.progress}/{dailyChallenge.total}</span>
            </div>
            <Progress 
              value={(dailyChallenge.progress / dailyChallenge.total) * 100} 
              className="bg-slate-700"
            />
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <h2 className="text-xl text-white">Quick Actions</h2>
        
        <Button
          onClick={() => onNavigate('race')}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-8 text-lg justify-between"
          size="lg"
        >
          <div className="flex items-center gap-3">
            <Play className="w-6 h-6" />
            <span>Start a Lap</span>
          </div>
          <span className="text-sm opacity-80">Track your commute</span>
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onNavigate('academy')}
            variant="outline"
            className="border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-white py-6 flex-col h-auto gap-2"
          >
            <BookOpen className="w-6 h-6 text-blue-400" />
            <span>Pit Stop Academy</span>
          </Button>

          <Button
            onClick={() => onNavigate('leaderboard')}
            variant="outline"
            className="border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 text-white py-6 flex-col h-auto gap-2"
          >
            <Users className="w-6 h-6 text-orange-400" />
            <span>Leaderboard</span>
          </Button>
        </div>
      </motion.div>

      {/* Today's Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <h2 className="text-xl text-white">Weekly Stats</h2>
        <Card className="bg-slate-800/50 border-slate-700 p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">Trips</p>
              <p className="text-2xl text-white">{todayStats.trips}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Distance</p>
              <p className="text-2xl text-white">{todayStats.distance} km</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">CO₂ Saved</p>
              <p className="text-2xl text-green-400">{todayStats.co2Saved} kg</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Points Earned</p>
              <p className="text-2xl text-yellow-400">{todayStats.points}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3 pb-6"
      >
        <h2 className="text-xl text-white">Achievements</h2>
        <div className="grid grid-cols-4 gap-3">
          {recentAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className={`p-4 text-center ${
                achievement.earned
                  ? 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-500/30'
                  : 'bg-slate-800/50 border-slate-700 opacity-50'
              }`}>
                <div className="text-3xl mb-2">{achievement.emoji}</div>
                <p className="text-xs text-slate-300">{achievement.name}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
