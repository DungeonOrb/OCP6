import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { getToken, removeToken } from "../auth/auth";
import { getUserInfo } from "../services/api";
import "./Profile.css";

function frDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

function formatDuration(totalMinutes) {
  const m = Number(totalMinutes || 0);
  const h = Math.floor(m / 60);
  const min = m % 60;
  return { h, min };
}

export default function Profile() {
  const navigate = useNavigate();
  const token = getToken();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/connexion", { replace: true });
      return;
    }

    getUserInfo(token)
      .then(setUserInfo)
      .catch(() => {
        removeToken();
        navigate("/connexion", { replace: true });
      });
  }, [token, navigate]);

  const view = useMemo(() => {
    if (!userInfo) return null;

    const { profile, statistics } = userInfo;
    const memberSince = frDate(profile.createdAt);
    const dur = formatDuration(statistics.totalDuration);

    return {
      fullName: `${profile.firstName} ${profile.lastName}`,
      memberSince,
      avatarUrl: profile.profilePicture,

      age: profile.age,
      gender: "Femme",
      heightCm: profile.height,
      weightKg: profile.weight,

      // stats
      totalTime: `${dur.h}h ${dur.min}min`,
      calories: "25000",
      totalDistance: statistics.totalDistance,
      restDays: "9",
      totalSessions: statistics.totalSessions,
    };
  }, [userInfo]);

  if (!view) {
    return (
      <>
        <Navbar />
        <div className="profile">
          <div className="profile__container">Chargement…</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="profile">
        <div className="profile__container">
          <div className="profile__grid">
            {/* LEFT */}
            <div className="profile__left">
              <div className="card profile__userCard">
                <div className="profile__avatarWrapper">
                  <img
                    className="profile__avatar"
                    src={view.avatarUrl}
                    alt="avatar"
                  />
                </div>
                <div>
                  <h3 className="profile__name">{view.fullName}</h3>
                  <p className="profile__since">Membre depuis le {view.memberSince}</p>
                </div>
              </div>

              <div className="card">
                <h3 className="profile__sectionTitle">Votre profil</h3>
                <div className="profile__divider" />

                <div className="profile__row">
                  <span className="profile__label">Âge :</span> <span>{view.age}</span>
                </div>
                <div className="profile__row">
                  <span className="profile__label">Genre :</span> <span>{view.gender}</span>
                </div>
                <div className="profile__row">
                  <span className="profile__label">Taille :</span> <span>{view.heightCm}cm</span>
                </div>
                <div className="profile__row">
                  <span className="profile__label">Poids :</span> <span>{view.weightKg}kg</span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div className="profile__rightTitle">
                <h2>Vos statistiques</h2>
                <p>depuis le {view.memberSince}</p>
              </div>

              <div className="profile__statsGrid">
                <StatCard title="Temps total couru" value={view.totalTime} />
                <StatCard title="Calories brûlées" value={view.calories} suffix="cal" />

                <StatCard title="Distance totale parcourue" value={view.totalDistance} suffix="km" />
                <StatCard title="Nombre de jours de repos" value={view.restDays} suffix="jours" />

                <div className="statCard--half">
                  <StatCard title="Nombre de sessions" value={view.totalSessions} suffix="sessions" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({ title, value, suffix }) {
  return (
    <div className="statCard">
      <div className="statCard__title">{title}</div>
      <div className="statCard__value">
        {value}
        {suffix ? <span className="statCard__suffix">{suffix}</span> : null}
      </div>
    </div>
  );
}