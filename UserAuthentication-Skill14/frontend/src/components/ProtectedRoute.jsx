import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ sessionUser }) {
  return sessionUser ? <Outlet /> : <Navigate to="/login" replace />;
}

