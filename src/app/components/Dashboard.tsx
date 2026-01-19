import {
  BookOpen,
  Leaf,
  Play,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface DashboardProps {
  user: {
    name: string;
    points: number;
    level: number;
    co2Saved: number;
    streakDays: number;
  };
}

export function Dashboard({ user }: DashboardProps) {
  const navigate = useNavigate();

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
    <div className="relative min-h-screen space-y-6 p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-4"
      >
        <h1 className="mb-1 text-3xl text-white">
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
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 text-sm text-slate-300">Total Points</p>
              <p className="text-2xl text-white">
                {user.points.toLocaleString()}
              </p>
            </div>
            <Zap className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 text-sm text-slate-300">Level</p>
              <p className="text-2xl text-white">{user.level}</p>
            </div>
            <Trophy className="h-8 w-8 text-blue-400" />
          </div>
        </Card>

        <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 text-sm text-slate-300">CO₂ Saved</p>
              <p className="text-2xl text-white">
                {user.co2Saved.toFixed(1)} kg
              </p>
            </div>
            <Leaf className="h-8 w-8 text-emerald-400" />
          </div>
        </Card>

        <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-amber-500/20 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 text-sm text-slate-300">Streak</p>
              <p className="text-2xl text-white">{user.streakDays} days</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-400" />
          </div>
        </Card>
      </motion.div>

      {/* Daily Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-5">
          <div className="mb-4 flex items-start gap-3">
            <div className="rounded-lg bg-purple-500/20 p-2">
              <Target className="h-6 w-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-white">{dailyChallenge.title}</h3>
              <p className="text-sm text-slate-300">
                {dailyChallenge.description}
              </p>
            </div>
            <Badge className="border-purple-500/30 bg-purple-500/20 text-purple-300">
              {dailyChallenge.reward}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Progress</span>
              <span className="text-white">
                {dailyChallenge.progress}/{dailyChallenge.total}
              </span>
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
          onClick={() => navigate("/race")}
          className="w-full justify-between bg-gradient-to-r from-green-500 to-emerald-600 py-8 text-lg text-white hover:from-green-600 hover:to-emerald-700"
          size="lg"
        >
          <div className="flex items-center gap-3">
            <Play className="h-6 w-6" />
            <span>Start a Lap</span>
          </div>
          <span className="text-sm opacity-80">Track your commute</span>
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => navigate("/academy")}
            variant="outline"
            className="h-auto flex-col gap-2 border-blue-500/30 bg-blue-500/10 py-6 text-white hover:bg-blue-500/20"
          >
            <BookOpen className="h-6 w-6 text-blue-400" />
            <span>Pit Stop Academy</span>
          </Button>

          <Button
            onClick={() => navigate("/leaderboard")}
            variant="outline"
            className="h-auto flex-col gap-2 border-orange-500/30 bg-orange-500/10 py-6 text-white hover:bg-orange-500/20"
          >
            <Users className="h-6 w-6 text-orange-400" />
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
        <h2 className="text-xl text-white">Today's Stats</h2>
        <Card className="border-slate-700 bg-slate-800/50 p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-sm text-slate-400">Trips</p>
              <p className="text-2xl text-white">{todayStats.trips}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-slate-400">Distance</p>
              <p className="text-2xl text-white">{todayStats.distance} km</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-slate-400">CO₂ Saved</p>
              <p className="text-2xl text-green-400">
                {todayStats.co2Saved} kg
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-slate-400">Points Earned</p>
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
              <Card
                className={`p-4 text-center ${
                  achievement.earned
                    ? "border-yellow-500/30 bg-gradient-to-br from-yellow-500/20 to-amber-500/20"
                    : "border-slate-700 bg-slate-800/50 opacity-50"
                }`}
              >
                <div className="mb-2 text-3xl">{achievement.emoji}</div>
                <p className="text-xs text-slate-300">{achievement.name}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
