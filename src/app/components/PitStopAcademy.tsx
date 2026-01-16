import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Award, CheckCircle2, XCircle, Lightbulb, TrendingUp, Shield, Fuel } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface PitStopAcademyProps {
  user: any;
}

export function PitStopAcademy({ user }: PitStopAcademyProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const topics = [
    {
      id: 'safety',
      title: 'Road Safety',
      icon: Shield,
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      description: 'Learn essential safety tips for eco-friendly commuting',
      progress: 65,
      lessons: 8,
      completed: 5,
    },
    {
      id: 'efficiency',
      title: 'Vehicle Efficiency',
      icon: Fuel,
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      iconColor: 'text-green-400',
      description: 'Optimize your vehicle for maximum fuel efficiency',
      progress: 40,
      lessons: 6,
      completed: 2,
    },
    {
      id: 'traffic',
      title: 'Traffic Optimization',
      icon: TrendingUp,
      color: 'from-orange-500/20 to-amber-500/20',
      borderColor: 'border-orange-500/30',
      iconColor: 'text-orange-400',
      description: 'Master traffic patterns and route optimization',
      progress: 80,
      lessons: 5,
      completed: 4,
    },
    {
      id: 'eco',
      title: 'Eco-Driving Tips',
      icon: Lightbulb,
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
      description: 'Advanced techniques for sustainable driving',
      progress: 20,
      lessons: 7,
      completed: 1,
    },
  ];

  const quizzes = [
    {
      id: 1,
      topic: 'safety',
      title: 'Lane Change Safety',
      questions: [
        {
          question: "What's the safest way to change lanes?",
          options: [
            "Signal early, check mirrors and blind spots",
            "Just check mirrors quickly",
            "Signal while changing",
            "Change lanes quickly"
          ],
          correct: 0,
          explanation: "Always signal early (3-5 seconds before), check all mirrors, and look over your shoulder to check blind spots before changing lanes."
        },
        {
          question: "What is the recommended following distance?",
          options: [
            "1 second",
            "2 seconds",
            "3-4 seconds",
            "5+ seconds"
          ],
          correct: 2,
          explanation: "Maintain a 3-4 second following distance in normal conditions. This gives you enough time to react to sudden stops."
        },
        {
          question: "When should you use your horn?",
          options: [
            "When you're angry at other drivers",
            "To warn others of danger",
            "In tunnels for fun",
            "Whenever you want"
          ],
          correct: 1,
          explanation: "Your horn should only be used to warn others of potential danger, not to express frustration."
        }
      ],
      points: 150,
    },
    {
      id: 2,
      topic: 'efficiency',
      title: 'Fuel Efficiency Basics',
      questions: [
        {
          question: "What's the most fuel-efficient speed range?",
          options: [
            "30-40 km/h",
            "50-60 km/h",
            "70-80 km/h",
            "90+ km/h"
          ],
          correct: 1,
          explanation: "Most vehicles are most fuel-efficient at speeds between 50-60 km/h. Higher speeds increase air resistance and fuel consumption."
        },
        {
          question: "How does tire pressure affect fuel efficiency?",
          options: [
            "No effect",
            "Lower pressure is better",
            "Proper pressure improves efficiency",
            "Higher pressure is always better"
          ],
          correct: 2,
          explanation: "Properly inflated tires reduce rolling resistance, improving fuel efficiency by up to 3%."
        }
      ],
      points: 100,
    }
  ];

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
    setActiveQuiz(null);
  };

  const startQuiz = (quizId: number) => {
    setActiveQuiz(quizId);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    const quiz = quizzes.find(q => q.id === activeQuiz);
    if (!quiz) return;

    const question = quiz.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
  };

  const nextQuestion = () => {
    const quiz = quizzes.find(q => q.id === activeQuiz);
    if (!quiz) return;

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz complete
      setActiveQuiz(null);
      setSelectedTopic(null);
    }
  };

  const currentQuiz = quizzes.find(q => q.id === activeQuiz);
  const currentQuizQuestion = currentQuiz?.questions[currentQuestion];

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl text-white">Pit Stop Academy</h1>
        </div>
        <p className="text-slate-400">Learn and earn rewards</p>
      </motion.div>

      {!selectedTopic && !activeQuiz && (
        <>
          {/* Learning Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-white">Learning Progress</h2>
                <Award className="text-purple-400 w-6 h-6" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl text-white mb-1">12</p>
                  <p className="text-xs text-slate-400">Lessons Done</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl text-yellow-400 mb-1">8</p>
                  <p className="text-xs text-slate-400">Badges</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl text-green-400 mb-1">750</p>
                  <p className="text-xs text-slate-400">Quiz Points</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Topics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h2 className="text-xl text-white">Learning Topics</h2>
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card 
                    className={`bg-gradient-to-r ${topic.color} ${topic.borderColor} p-5 cursor-pointer hover:scale-[1.02] transition-transform`}
                    onClick={() => handleTopicClick(topic.id)}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-slate-900/30 p-3 rounded-lg">
                        <Icon className={`w-6 h-6 ${topic.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white text-lg mb-1">{topic.title}</h3>
                        <p className="text-sm text-slate-300">{topic.description}</p>
                      </div>
                      <Badge className="bg-slate-900/30 text-slate-300">
                        {topic.completed}/{topic.lessons}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-white">{topic.progress}%</span>
                      </div>
                      <Progress value={topic.progress} className="bg-slate-700" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pb-6"
          >
            <h2 className="text-xl text-white mb-3">Recent Badges</h2>
            <div className="grid grid-cols-4 gap-3">
              {['🏆', '🎓', '⭐', '🔥', '💡', '🌟', '🎯', '✨'].map((emoji, i) => (
                <Card key={i} className="bg-slate-800/50 border-slate-700 p-4 text-center">
                  <div className="text-4xl mb-2">{emoji}</div>
                  <p className="text-xs text-slate-400">Badge {i + 1}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {selectedTopic && !activeQuiz && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <Button
            onClick={() => setSelectedTopic(null)}
            variant="outline"
            className="border-slate-600 bg-slate-700 hover:bg-slate-600 text-white mb-4"
          >
            ← Back to Topics
          </Button>

          <h2 className="text-2xl text-white mb-4">
            {topics.find(t => t.id === selectedTopic)?.title} Quizzes
          </h2>

          {quizzes
            .filter(q => q.topic === selectedTopic)
            .map((quiz, index) => (
              <Card key={quiz.id} className="bg-slate-800/50 border-slate-700 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white text-lg">{quiz.title}</h3>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    +{quiz.points} pts
                  </Badge>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  {quiz.questions.length} questions
                </p>
                <Button
                  onClick={() => startQuiz(quiz.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                >
                  Start Quiz
                </Button>
              </Card>
            ))}
        </motion.div>
      )}

      <AnimatePresence>
        {activeQuiz && currentQuizQuestion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            {/* Progress */}
            <Card className="bg-slate-800/50 border-slate-700 p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Question {currentQuestion + 1} of {currentQuiz.questions.length}</span>
                <span className="text-white">Score: {score}/{currentQuestion + (showResult ? 1 : 0)}</span>
              </div>
              <Progress 
                value={((currentQuestion + (showResult ? 1 : 0)) / currentQuiz.questions.length) * 100} 
                className="bg-slate-700"
              />
            </Card>

            {/* Question */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-xl text-white mb-6">{currentQuizQuestion.question}</h3>
              
              <div className="space-y-3">
                {currentQuizQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuizQuestion.correct;
                  const showCorrect = showResult && isCorrect;
                  const showIncorrect = showResult && isSelected && !isCorrect;

                  return (
                    <motion.button
                      key={index}
                      whileHover={!showResult ? { scale: 1.02 } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                      onClick={() => !showResult && handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        showCorrect
                          ? 'border-green-500 bg-green-500/20'
                          : showIncorrect
                          ? 'border-red-500 bg-red-500/20'
                          : isSelected
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-600 bg-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white">{option}</span>
                        {showCorrect && <CheckCircle2 className="text-green-400 w-5 h-5" />}
                        {showIncorrect && <XCircle className="text-red-400 w-5 h-5" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-lg border-2 ${
                    selectedAnswer === currentQuizQuestion.correct
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-orange-500 bg-orange-500/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb className={selectedAnswer === currentQuizQuestion.correct ? 'text-green-400' : 'text-orange-400'} />
                    <div>
                      <p className="text-white mb-2">
                        {selectedAnswer === currentQuizQuestion.correct ? '✅ Correct!' : '❌ Not quite!'}
                      </p>
                      <p className="text-sm text-slate-300">{currentQuizQuestion.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>

            {/* Actions */}
            {!showResult ? (
              <Button
                onClick={submitAnswer}
                disabled={selectedAnswer === null}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-6"
                size="lg"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={nextQuestion}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-6"
                size="lg"
              >
                {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
