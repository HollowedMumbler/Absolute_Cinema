import { createRoot } from "react-dom/client";
import { FirebaseAppProvider } from "reactfire";

import { firebaseConfig } from "@/firebase/config";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>,
);
