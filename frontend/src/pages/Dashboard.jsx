import "./Dashboard.css";
import Navbar from "../components/layout/Navbar";
import { getUserInfo } from "../services/api";
import { useEffect, useMemo, useState } from "react";
import { getToken, removeToken } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { getUserActivity } from "../services/api";
import { buildDashboardData } from "../utils/dashboardTransform";
import Footer from "../components/layout/Footer";

import WeeklyDistanceChart from "../components/charts/WeeklyDistanceChart";
import BpmChart from "../components/charts/BpmChart";
import GoalDonut from "../components/charts/GoalDonut";

function frDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const token = getToken();

  const rangeStart = "2025-05-28";
  const rangeEnd = "2025-06-25";

  const [activity, setActivity] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/connexion", { replace: true });
      return;
    }

    Promise.all([getUserActivity(token, rangeStart, rangeEnd), getUserInfo(token)])
      .then(([act, info]) => {
        setActivity(act);
        setUser(info);
      })
      .catch(() => {
        removeToken();
        navigate("/connexion", { replace: true });
      });
  }, [token, navigate, rangeStart, rangeEnd]);

  const data = useMemo(() => {
    if (!activity) return null;
    return buildDashboardData(activity, rangeStart);
  }, [activity, rangeStart]);

  if (!data || !user) {
    return (
      <>
        <Navbar />
        <div className="dashboard">
          <div className="dashboard__container">Chargement…</div>
        </div>
      </>
    );
  }

  const memberSince = frDate(user.profile.createdAt);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="dashboard__container">
          {/* TOP CARD */}
          <div className="dashboard__topCard">
            <div className="dashboard__user">
              <div className="dashboard__avatar">
                <img src={user.profile.profilePicture} alt="avatar" />
              </div>
              <div>
                <p className="dashboard__name">{user.profile.firstName} {user.profile.lastName}</p>
                <p className="dashboard__since">Membre depuis le {memberSince}</p>
              </div>
            </div>

            <div className="dashboard__distanceWrap">
              <div className="dashboard__distanceLabel">Distance totale parcourue</div>

              <div className="dashboard__distanceBadge">
                <span style={{ fontSize: 22 }}>✳︎</span>
                <div className="dashboard__distanceValue">
                  {Number(user.statistics.totalDistance).toFixed(0)} km
                </div>
              </div>
            </div>
          </div>

          {/* PERFORMANCE */}
          <div className="dashboard__sectionTitle">Vos dernières performances</div>

          <div className="dashboard__grid2">
            <div className="card">
              <div className="card__top">
                <div>
                  <h3 className="card__title card__title--km">
                    {Math.ceil(data.avgKm4Weeks)}km en moyenne
                  </h3>
                  <p className="card__subtitle">Total des kilomètres 4 dernières semaines</p>
                </div>

                <div className="card__range">
                  <button className="card__rangeBtn">‹</button>
                  <span>28 mai - 25 juin</span>
                  <button className="card__rangeBtn">›</button>
                </div>
              </div>

              <WeeklyDistanceChart data={data.weeklyKm} averageKm={data.avgKm4Weeks} />
              <div className="chartLegend">
                <span className="chartLegend__dot"></span>
                Km
              </div>
            </div>

            <div className="card">
              <div className="card__top">
                <div>
                  <h3 className="card__title" style={{ color: "#FF2D17" }}>
                    {Math.round(activity.reduce((a, s) => a + s.heartRate.average, 0) / activity.length)} BPM
                  </h3>
                  <p className="card__subtitle">Fréquence cardiaque moyenne</p>
                </div>

                <div className="card__range">
                  <button className="card__rangeBtn">‹</button>
                  <span>28 mai - 04 juin</span>
                  <button className="card__rangeBtn">›</button>
                </div>
              </div>

              <BpmChart data={data.bpm} />

              <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>
                <span style={{ marginRight: 16, color: "#F7A9A3" }}>● Min</span>
                <span style={{ marginRight: 16, color: "#FF2D17" }}>● Max BPM</span>
                <span style={{ color: "#0B2BFF" }}>● Max BPM</span>
              </div>
            </div>
          </div>

          {/* THIS WEEK */}
          <div className="dashboard__weekHeader">
            <div className="dashboard__sectionTitle" style={{ margin: 0 }}>Cette semaine</div>
            <div className="dashboard__weekSub">Du 23/06/2025 au 30/06/2025</div>
          </div>

          <div className="dashboard__gridWeek">
            <div className="card dashboard__goalCard">
              <GoalDonut done={data.totals.runsDone} goal={data.totals.runsGoal} />
            </div>

            <div className="dashboard__rightStack">
              <div className="smallStat">
                <div className="smallStat__label">Durée d’activité</div>
                <div className="smallStat__value" style={{ color: "#1e1cc4" }}>
                  {data.totals.durationMinutes} <span>minutes</span>
                </div>
              </div>

              <div className="smallStat">
                <div className="smallStat__label">Distance</div>
                <div className="smallStat__value" style={{ color: "#FF2D17" }}>
                  {data.totals.distanceKm} <span>kilomètres</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  <Footer />
</>

  );
  function LegendDot({ color, label }) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: color,
            display: "inline-block",
          }}
        />
        {label}
      </span>
    );
  }
}