import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Award, TrendingUp, Users, Globe } from 'lucide-react';
import { Card } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

interface LeaderboardProps {
  user: any;
}

export function Leaderboard({ user }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState('global');

  const globalLeaders = [
    { rank: 1, name: "EcoChampion92", avatar: "🚴", points: 12450, co2Saved: 145.2, streak: 45 },
    { rank: 2, name: "GreenRacer", avatar: "⚡", points: 11280, co2Saved: 132.8, streak: 38 },
    { rank: 3, name: "SustainableSam", avatar: "🚌", points: 10920, co2Saved: 128.5, streak: 42 },
    { rank: 4, name: "CleanCommuter", avatar: "🚗", points: 9850, co2Saved: 115.4, streak: 30 },
    { rank: 5, name: "CarbonCrusher", avatar: "🛴", points: 9420, co2Saved: 110.2, streak: 35 },
    { rank: 6, name: "EcoWarrior", avatar: "🚴", points: 8950, co2Saved: 105.8, streak: 28 },
    { rank: 7, name: "GreenMachine", avatar: "⚡", points: 8640, co2Saved: 102.1, streak: 31 },
    { rank: 8, name: "NatureNinja", avatar: "🌱", points: 8320, co2Saved: 98.5, streak: 25 },
  ];

  const friendsLeaders = [
    { rank: 1, name: "Sarah Chen", avatar: "🚴", points: 8450, co2Saved: 98.2, streak: 28 },
    { rank: 2, name: "Mike Johnson", avatar: "⚡", points: 7280, co2Saved: 85.3, streak: 22 },
    { rank: 3, name: user.name, avatar: "🚗", points: user.points, co2Saved: user.co2Saved, streak: user.streakDays, isCurrentUser: true },
    { rank: 4, name: "Emma Wilson", avatar: "🚌", points: 5850, co2Saved: 68.4, streak: 18 },
    { rank: 5, name: "David Lee", avatar: "🛴", points: 5420, co2Saved: 63.2, streak: 15 },
  ];

  const weeklyLeaders = [
    { rank: 1, name: "WeekendWarrior", avatar: "🚴", points: 2150, co2Saved: 25.2, trips: 12 },
    { rank: 2, name: "SpeedyGreen", avatar: "⚡", points: 1980, co2Saved: 23.1, trips: 11 },
    { rank: 3, name: "EcoExpress", avatar: "🚌", points: 1820, co2Saved: 21.5, trips: 10 },
    { rank: 4, name: user.name, avatar: "🚗", points: 1650, co2Saved: 19.2, trips: 9, isCurrentUser: true },
    { rank: 5, name: "CleanCruiser", avatar: "🛴", points: 1520, co2Saved: 17.8, trips: 8 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-slate-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-slate-400 text-lg">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
      case 2:
        return 'from-slate-500/20 to-slate-400/20 border-slate-400/30';
      case 3:
        return 'from-amber-600/20 to-orange-500/20 border-amber-500/30';
      default:
        return 'from-slate-800/50 to-slate-700/50 border-slate-700';
    }
  };

  const renderLeaderboardItem = (leader: any, index: number) => (
    <motion.div
      key={leader.rank}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={`p-4 mb-3 bg-gradient-to-r ${
        leader.isCurrentUser 
          ? 'from-green-500/20 to-emerald-500/20 border-green-500/30 ring-2 ring-green-500/50' 
          : getRankColor(leader.rank)
      }`}>
        <div className="flex items-center gap-4">
          {/* Rank */}
          <div className="w-12 flex justify-center">
            {getRankIcon(leader.rank)}
          </div>

          {/* Avatar */}
          <div className="text-3xl">{leader.avatar}</div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-white">{leader.name}</p>
              {leader.isCurrentUser && (
                <Badge className="bg-green-500/20 text-green-300 text-xs border-green-500/30">
                  You
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-slate-400">
                ⚡ {leader.points.toLocaleString()} pts
              </span>
              <span className="text-xs text-green-400">
                🌱 {leader.co2Saved.toFixed(1)} kg CO₂
              </span>
            </div>
          </div>

          {/* Streak */}
          <div className="text-right">
            <div className="text-orange-400 text-lg">🔥</div>
            <p className="text-xs text-slate-400">{leader.streak} days</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-4"
      >
        <h1 className="text-3xl text-white mb-1">Leaderboard</h1>
        <p className="text-slate-400">Compete with eco-racers worldwide</p>
      </motion.div>

      {/* Your Rank Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-white">Your Ranking</h2>
            <TrendingUp className="text-green-400 w-6 h-6" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center">
              <p className="text-3xl text-white mb-1">#47</p>
              <p className="text-xs text-slate-400">Global Rank</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 bg-slate-800 border border-slate-700">
          <TabsTrigger 
            value="global" 
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300"
          >
            <Globe className="w-4 h-4 mr-2" />
            Global
          </TabsTrigger>
         
        </TabsList>

        <TabsContent value="global" className="space-y-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-white">Top Eco-Racers</h3>
            <Badge className="bg-slate-700 text-slate-300">
              Live
            </Badge>
          </div>
          {globalLeaders.map((leader, index) => renderLeaderboardItem(leader, index))}
        </TabsContent>
      </Tabs>

      {/* Podium - Top 3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pb-6"
      >
        <h3 className="text-lg text-white mb-4">Top 3 Champions</h3>
        <div className="flex items-end justify-center gap-3">
          {/* 2nd Place */}
          <div className="flex-1 text-center">
            <div className="bg-gradient-to-br from-slate-500/20 to-slate-400/20 border-2 border-slate-400/30 rounded-t-xl p-4 h-32 flex flex-col justify-center">
              <div className="text-4xl mb-2">🥈</div>
              <p className="text-white text-sm">{globalLeaders[1].name}</p>
              <p className="text-xs text-slate-400">{globalLeaders[1].points.toLocaleString()}</p>
            </div>
            <div className="bg-slate-500/30 h-16 rounded-b-lg flex items-center justify-center">
              <span className="text-2xl text-slate-300">#2</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex-1 text-center">
            <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-2 border-yellow-500/50 rounded-t-xl p-4 h-40 flex flex-col justify-center">
              <motion.div 
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-2"
              >
                👑
              </motion.div>
              <p className="text-white">{globalLeaders[0].name}</p>
              <p className="text-xs text-yellow-300">{globalLeaders[0].points.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-500/30 h-24 rounded-b-lg flex items-center justify-center">
              <span className="text-3xl text-yellow-400">#1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex-1 text-center">
            <div className="bg-gradient-to-br from-amber-600/20 to-orange-500/20 border-2 border-amber-500/30 rounded-t-xl p-4 h-24 flex flex-col justify-center">
              <div className="text-3xl mb-2">🥉</div>
              <p className="text-white text-sm">{globalLeaders[2].name}</p>
              <p className="text-xs text-slate-400">{globalLeaders[2].points.toLocaleString()}</p>
            </div>
            <div className="bg-amber-600/30 h-12 rounded-b-lg flex items-center justify-center">
              <span className="text-xl text-amber-400">#3</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
