import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Connexion.css";

import { login } from "../services/api";
import { setToken, isAuthenticated } from "../auth/auth";
import runningImage from "../assets/img/sportsee.png";

export default function Connexion() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const { token } = await login(username, password);
      setToken(token);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Identifiants invalides.");
    }
  }

  return (
    <div className="connexion">
      <div className="connexion__left">
        <div className="connexion__brand">SPORTSEE</div>

        <div className="connexion__card">
          <h1 className="connexion__title">
            Transformez <br /> vos stats en résultats
          </h1>

          <h2 className="connexion__subtitle">Se connecter</h2>

          <form onSubmit={handleSubmit}>
            <label className="connexion__label">Adresse email</label>
            <input
              className="connexion__input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className="connexion__label">Mot de passe</label>
            <input
              className="connexion__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="connexion__btn" type="submit">
              Se connecter
            </button>

            <div className="connexion__forgot">Mot de passe oublié ?</div>

            {error && <p style={{ color: "#dc2626", marginTop: 12 }}>{error}</p>}
          </form>
        </div>
      </div>

      <div className="connexion__right">
        <div
          className="connexion__bg"
          style={{ backgroundImage: `url(${runningImage})` }}
        />
        <div className="connexion__bubble">
          <strong>Analysez</strong> vos performances en un clin d’œil, <br />
          suivez vos progrès et atteignez vos objectifs.
        </div>
      </div>
    </div>
  );
}