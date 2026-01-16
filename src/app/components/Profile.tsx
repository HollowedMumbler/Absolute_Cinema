import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Trophy, TrendingUp, Calendar, Settings, Share2, Award, Zap, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProfileProps {
  user: any;
}

export function Profile({ user }: ProfileProps) {
  const [activeTab, setActiveTab] = useState('stats');

  const weeklyData = [
    { day: 'Mon', points: 120, co2: 1.2 },
    { day: 'Tue', points: 150, co2: 1.8 },
    { day: 'Wed', points: 180, co2: 2.1 },
    { day: 'Thu', points: 95, co2: 0.9 },
    { day: 'Fri', points: 210, co2: 2.5 },
    { day: 'Sat', points: 160, co2: 1.9 },
    { day: 'Sun', points: 140, co2: 1.6 },
  ];

  const monthlyData = [
    { month: 'Jan', points: 2450, co2: 28.5 },
    { month: 'Feb', points: 2780, co2: 32.1 },
    { month: 'Mar', points: 3120, co2: 36.8 },
    { month: 'Apr', points: 2890, co2: 33.4 },
    { month: 'May', points: 3450, co2: 40.2 },
    { month: 'Jun', points: 3680, co2: 42.9 },
  ];

  const achievements = [
    { id: 1, name: "Rookie Racer", emoji: "🏆", desc: "Complete your first lap", earned: true, date: "Jan 10, 2026" },
    { id: 2, name: "Green Starter", emoji: "🌱", desc: "Save 10kg CO₂", earned: true, date: "Jan 11, 2026" },
    { id: 3, name: "Week Warrior", emoji: "⚡", desc: "7-day streak", earned: true, date: "Jan 12, 2026" },
    { id: 4, name: "Eco Champion", emoji: "🏅", desc: "Save 50kg CO₂", earned: false },
    { id: 5, name: "Speed Demon", emoji: "🔥", desc: "Complete 100 laps", earned: false },
    { id: 6, name: "Green Guru", emoji: "🎓", desc: "Complete all Academy courses", earned: false },
    { id: 7, name: "Social Butterfly", emoji: "👥", desc: "Add 10 friends", earned: false },
    { id: 8, name: "Century Club", emoji: "💯", desc: "Save 100kg CO₂", earned: false },
  ];

  const stats = [
    { label: "Total Trips", value: "45", icon: Target, color: "text-blue-400" },
    { label: "Total Distance", value: "287 km", icon: TrendingUp, color: "text-green-400" },
    { label: "Avg Lap Time", value: "14:32", icon: Calendar, color: "text-purple-400" },
    { label: "Best Streak", value: "12 days", icon: Zap, color: "text-orange-400" },
  ];

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-4"
      >
        <h1 className="text-3xl text-white mb-1">Profile</h1>
        <p className="text-slate-400">Track your eco-racing journey</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-slate-900/50 p-4 rounded-full text-5xl">
              ⚡🚗
            </div>
            <div className="flex-1">
              <h2 className="text-2xl text-white mb-1">{user.name}</h2>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  Level {user.level}
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Eco Racer
                </Badge>
              </div>
              <p className="text-sm text-slate-300">
                Member since January 2026
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 bg-slate-700 hover:bg-slate-600 text-white"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl text-white mb-1">{user.points}</p>
              <p className="text-xs text-slate-400">Total Points</p>
            </div>
            <div className="text-center">
              <p className="text-3xl text-green-400 mb-1">{user.co2Saved.toFixed(1)}</p>
              <p className="text-xs text-slate-400">kg CO₂ Saved</p>
            </div>
            <div className="text-center">
              <p className="text-3xl text-orange-400 mb-1">{user.streakDays}</p>
              <p className="text-xs text-slate-400">Day Streak</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-3"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-slate-800/50 border-slate-700 p-4">
              <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <p className="text-2xl text-white mb-1">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </Card>
          );
        })}
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800 border border-slate-700">
          <TabsTrigger 
            value="stats" 
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Stats
          </TabsTrigger>
          <TabsTrigger 
            value="achievements"
            className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-6 mt-6">
          {/* Weekly Chart */}
          <Card className="bg-slate-800/50 border-slate-700 p-5">
            <h3 className="text-lg text-white mb-4">This Week's Performance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="points" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorPoints)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* CO2 Chart */}
          <Card className="bg-slate-800/50 border-slate-700 p-5">
            <h3 className="text-lg text-white mb-4">CO₂ Savings Over Time</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="co2" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-2xl text-green-400 mb-1">42.9 kg</p>
              <p className="text-sm text-slate-400">Total CO₂ saved this month</p>
            </div>
          </Card>

          {/* Impact Stats */}
          <Card className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30 p-6">
            <h3 className="text-lg text-white mb-4">Your Environmental Impact</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🌳</div>
                  <div>
                    <p className="text-white">Trees Equivalent</p>
                    <p className="text-sm text-slate-400">CO₂ absorbed by trees yearly</p>
                  </div>
                </div>
                <p className="text-2xl text-green-400">2.1</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">⚡</div>
                  <div>
                    <p className="text-white">Fuel Saved</p>
                    <p className="text-sm text-slate-400">Liters of gasoline</p>
                  </div>
                </div>
                <p className="text-2xl text-blue-400">18.3</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">💰</div>
                  <div>
                    <p className="text-white">Money Saved</p>
                    <p className="text-sm text-slate-400">Estimated savings</p>
                  </div>
                </div>
                <p className="text-2xl text-yellow-400">$27</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-white">Your Badges</h3>
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              3/8 Earned
            </Badge>
          </div>

          <div className="grid gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`p-4 ${
                  achievement.earned
                    ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30'
                    : 'bg-slate-800/50 border-slate-700 opacity-60'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`text-4xl ${!achievement.earned && 'grayscale'}`}>
                      {achievement.emoji}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white mb-1">{achievement.name}</h4>
                      <p className="text-sm text-slate-400">{achievement.desc}</p>
                      {achievement.earned && achievement.date && (
                        <p className="text-xs text-green-400 mt-1">Earned: {achievement.date}</p>
                      )}
                    </div>
                    {achievement.earned && (
                      <Award className="text-yellow-400 w-6 h-6" />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Share Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pb-6"
      >
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-6"
          size="lg"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share Your Progress
        </Button>
      </motion.div>
    </div>
  );
}
