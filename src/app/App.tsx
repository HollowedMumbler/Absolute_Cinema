import { getAuth } from "firebase/auth";
import {
  enableIndexedDbPersistence,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import {
  AuthProvider,
  FirestoreProvider,
  useFirebaseApp,
  useInitFirestore,
} from "reactfire";

import { Dashboard } from "./components/Dashboard";
import { Leaderboard } from "./components/Leaderboard";
import { Navigation } from "./components/Navigation";
import { Onboarding } from "./components/Onboarding";
import { PitStopAcademy } from "./components/PitStopAcademy";
import { Profile } from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { RaceTracker } from "./components/RaceTracker";

type Screen =
  | "onboarding"
  | "dashboard"
  | "race"
  | "leaderboard"
  | "academy"
  | "profile";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [user, setUser] = useState({
    name: "KJ Bobier",
    avatar: "",
    points: 100,
    level: 1,
    co2Saved: 0,
    streakDays: 0,
  });
  const app = useFirebaseApp();

  const firestore = getFirestore(app);
  const auth = getAuth(app);

  const completeOnboarding = (userData: any) => {
    setUser(userData);
    setCurrentScreen("dashboard");
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* {currentScreen === "onboarding" ? ( */}
      {/*   <Onboarding onComplete={completeOnboarding} /> */}
      {/* ) : ( */}
      {/*   <> */}
      {/*     <div className="pb-20"> */}
      {/*       {currentScreen === "dashboard" && ( */}
      {/*         <Dashboard user={user} onNavigate={navigateTo} /> */}
      {/*       )} */}
      {/*       {currentScreen === "race" && ( */}
      {/*         <RaceTracker user={user} onNavigate={navigateTo} /> */}
      {/*       )} */}
      {/*       {currentScreen === "leaderboard" && <Leaderboard user={user} />} */}
      {/*       {currentScreen === "academy" && <PitStopAcademy user={user} />} */}
      {/*       {currentScreen === "profile" && <Profile user={user} />} */}
      {/*     </div> */}
      {/*     <Navigation currentScreen={currentScreen} onNavigate={navigateTo} /> */}
      {/*   </> */}
      {/* )} */}
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestore}>
          <BrowserRouter>
            <Routes>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard user={user} />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Navigation />
          </BrowserRouter>
        </FirestoreProvider>
      </AuthProvider>
    </div>
  );
}
