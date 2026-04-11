import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute({ sessionUser }) {
  return sessionUser ? <Navigate to="/home" replace /> : <Outlet />;
}

