import { useEffect, useState } from "react";
import { fetchProfile } from "../api";

export default function ProfilePage({ sessionUser }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadProfile() {
      setLoading(true);
      setError("");

      try {
        const profileData = await fetchProfile(sessionUser);
        if (isActive) {
          setProfile(profileData);
        }
      } catch (profileError) {
        if (isActive) {
          setError(profileError.message);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isActive = false;
    };
  }, [sessionUser]);

  if (loading) {
    return <p className="message">Loading your profile...</p>;
  }

  if (error) {
    return <p className="message error">{error}</p>;
  }

  return (
    <section className="profile-grid">
      <div className="detail-card">
        <span>Full Name</span>
        <strong>{profile?.fullName}</strong>
      </div>
      <div className="detail-card">
        <span>Email</span>
        <strong>{profile?.email}</strong>
      </div>
      <div className="detail-card">
        <span>Username</span>
        <strong>{profile?.username}</strong>
      </div>
      <div className="detail-card">
        <span>User ID</span>
        <strong>{profile?.id}</strong>
      </div>
    </section>
  );
}

