import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import { getStoredUser } from "./storage";

export default function App() {
  const [sessionUser, setSessionUser] = useState(() => getStoredUser());

  useEffect(() => {
    const handleStorageChange = () => {
      setSessionUser(getStoredUser());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const syncSessionUser = () => {
    setSessionUser(getStoredUser());
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestRoute sessionUser={sessionUser} />}>
          <Route
            path="/login"
            element={<LoginPage onLogin={syncSessionUser} />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute sessionUser={sessionUser} />}>
          <Route
            element={
              <AppShell
                sessionUser={sessionUser}
                onLogout={() => setSessionUser(null)}
              />
            }
          >
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage sessionUser={sessionUser} />} />
            <Route
              path="/profile"
              element={<ProfilePage sessionUser={sessionUser} />}
            />
          </Route>
        </Route>

        <Route
          path="*"
          element={<Navigate to={sessionUser ? "/home" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

