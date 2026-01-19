import {
  Award,
  Leaf,
  MapPin,
  Play,
  Square,
  Timer,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface RaceTrackerProps {
  user: any;
}

export function RaceTracker({ user }: RaceTrackerProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isTracking) {
      const timer = setInterval(() => {
        setDuration((prev) => prev + 1);
        setDistance((prev) => prev + Math.random() * 0.05);
        setCurrentSpeed(Math.random() * 30 + 10);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTracking]);

  const startTracking = () => {
    setIsTracking(true);
    setShowResults(false);
    setDuration(0);
    setDistance(0);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const raceResults = {
    lapTime: formatTime(duration),
    distance: distance.toFixed(2),
    avgSpeed: (distance / (duration / 3600)).toFixed(1),
    co2Saved: (distance * 0.12).toFixed(2),
    pointsEarned: Math.floor(distance * 45),
    ecoBonus: 1.5,
    position: 3,
    totalRacers: 127,
  };

  return (
    <div className="min-h-screen space-y-6 p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-4"
      >
        <h1 className="mb-1 text-3xl text-white">Virtual Race Track</h1>
        <p className="text-slate-400">Track your sustainable commute</p>
      </motion.div>

      {!isTracking && !showResults && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Vehicle Selection */}
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h2 className="mb-4 text-xl text-white">Your Vehicle</h2>
            <div className="flex items-center gap-4 rounded-lg border border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4">
              <div className="text-5xl">⚡🚗</div>
              <div className="flex-1">
                <h3 className="text-lg text-white">Electric Car</h3>
                <p className="text-sm text-slate-400">Eco Factor: 80%</p>
              </div>
              <Badge className="border-green-500/30 bg-green-500/20 text-green-300">
                Ready
              </Badge>
            </div>
          </Card>

          {/* Track Info */}
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h2 className="mb-4 text-xl text-white">Today's Track</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <div className="flex-1">
                  <p className="text-white">City Center Circuit</p>
                  <p className="text-sm text-slate-400">Urban commute route</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-700/50 p-3 text-center">
                <div>
                  <p className="text-sm text-slate-400">Best Time</p>
                  <p className="text-white">12:45</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Your Record</p>
                  <p className="text-green-400">14:32</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Attempts</p>
                  <p className="text-white">8</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Power-ups */}
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h2 className="mb-4 text-xl text-white">Active Power-ups</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3 rounded-lg border border-purple-500/30 bg-purple-500/10 p-3">
                <Zap className="h-5 w-5 text-purple-400" />
                <div className="flex-1">
                  <p className="text-sm text-white">Eco Boost</p>
                  <p className="text-xs text-slate-400">
                    +50% points for green routes
                  </p>
                </div>
                <Badge className="bg-purple-500/20 text-xs text-purple-300">
                  Active
                </Badge>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <div className="flex-1">
                  <p className="text-sm text-white">Streak Multiplier</p>
                  <p className="text-xs text-slate-400">3-day streak bonus</p>
                </div>
                <Badge className="bg-blue-500/20 text-xs text-blue-300">
                  x1.5
                </Badge>
              </div>
            </div>
          </Card>

          <Button
            onClick={startTracking}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-8 text-xl text-white hover:from-green-600 hover:to-emerald-700"
            size="lg"
          >
            <Play className="mr-3 h-8 w-8" />
            Start Lap
          </Button>
        </motion.div>
      )}

      {isTracking && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Live Stats */}
          <Card className="border-green-500/30 bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-8">
            <div className="space-y-4 text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-6xl"
              >
                🏁
              </motion.div>
              <h2 className="text-2xl text-white">Tracking Active</h2>
              <p className="text-green-300">Drive safely, hands-free mode</p>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="border-slate-700 bg-slate-800/70 p-6 text-center">
              <Timer className="mx-auto mb-2 h-8 w-8 text-blue-400" />
              <p className="mb-1 text-sm text-slate-400">Duration</p>
              <p className="text-3xl text-white">{formatTime(duration)}</p>
            </Card>

            <Card className="border-slate-700 bg-slate-800/70 p-6 text-center">
              <MapPin className="mx-auto mb-2 h-8 w-8 text-green-400" />
              <p className="mb-1 text-sm text-slate-400">Distance</p>
              <p className="text-3xl text-white">{distance.toFixed(2)} km</p>
            </Card>

            <Card className="border-slate-700 bg-slate-800/70 p-6 text-center">
              <Zap className="mx-auto mb-2 h-8 w-8 text-yellow-400" />
              <p className="mb-1 text-sm text-slate-400">Speed</p>
              <p className="text-3xl text-white">
                {currentSpeed.toFixed(0)} km/h
              </p>
            </Card>

            <Card className="border-slate-700 bg-slate-800/70 p-6 text-center">
              <Leaf className="mx-auto mb-2 h-8 w-8 text-emerald-400" />
              <p className="mb-1 text-sm text-slate-400">CO₂ Saved</p>
              <p className="text-3xl text-white">
                {(distance * 0.12).toFixed(2)} kg
              </p>
            </Card>
          </div>

          {/* Voice Tips */}
          <Card className="border-blue-500/30 bg-blue-500/10 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-blue-500/20 p-2">
                <Zap className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="mb-1 text-sm text-white">🎙 Voice Tip</p>
                <p className="text-sm text-slate-300">
                  Maintain steady speed between 50-60 km/h for optimal
                  efficiency
                </p>
              </div>
            </div>
          </Card>

          <Button
            onClick={stopTracking}
            variant="outline"
            className="w-full border-red-500/30 bg-red-500/10 py-8 text-xl text-white hover:bg-red-500/20"
            size="lg"
          >
            <Square className="mr-3 h-8 w-8" />
            End Lap
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Results Header */}
            <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="mb-4 text-7xl"
              >
                🏆
              </motion.div>
              <h2 className="mb-2 text-3xl text-white">Lap Complete!</h2>
              <p className="text-yellow-300">Great job, eco-racer!</p>
            </Card>

            {/* Race Stats */}
            <Card className="border-slate-700 bg-slate-800/50 p-6">
              <h3 className="mb-4 text-xl text-white">Race Results</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <span className="text-slate-400">Lap Time</span>
                  <span className="text-2xl text-white">
                    {raceResults.lapTime}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <span className="text-slate-400">Distance</span>
                  <span className="text-xl text-white">
                    {raceResults.distance} km
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <span className="text-slate-400">Avg Speed</span>
                  <span className="text-xl text-white">
                    {raceResults.avgSpeed} km/h
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <span className="text-slate-400">CO₂ Saved</span>
                  <span className="text-xl text-green-400">
                    {raceResults.co2Saved} kg
                  </span>
                </div>
              </div>
            </Card>

            {/* Points Earned */}
            <Card className="border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl text-white">Points Earned</h3>
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Base Points</span>
                  <span className="text-white">{raceResults.pointsEarned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">
                    Eco Bonus (x{raceResults.ecoBonus})
                  </span>
                  <span className="text-green-400">
                    +{Math.floor(raceResults.pointsEarned * 0.5)}
                  </span>
                </div>
                <div className="h-px bg-slate-700"></div>
                <div className="flex justify-between text-xl">
                  <span className="text-white">Total</span>
                  <span className="text-yellow-400">
                    {Math.floor(
                      raceResults.pointsEarned * raceResults.ecoBonus,
                    )}
                  </span>
                </div>
              </div>
            </Card>

            {/* Leaderboard Position */}
            <Card className="border-slate-700 bg-slate-800/50 p-6">
              <h3 className="mb-4 text-xl text-white">Leaderboard Position</h3>
              <div className="text-center">
                <p className="mb-2 text-5xl text-orange-400">
                  #{raceResults.position}
                </p>
                <p className="text-slate-400">
                  out of {raceResults.totalRacers} racers
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  setShowResults(false);
                  setDuration(0);
                  setDistance(0);
                }}
                variant="outline"
                className="border-slate-600 bg-slate-700 py-6 text-white hover:bg-slate-600"
              >
                Race Again
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-green-500 to-emerald-600 py-6 text-white hover:from-green-600 hover:to-emerald-700"
              >
                Back to Dashboard
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
