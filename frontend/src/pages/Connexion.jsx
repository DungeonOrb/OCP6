import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Connexion.css";

import { login } from "../services/api";
import { setToken, isAuthenticated } from "../auth/auth";
import { Navigate } from "react-router-dom";

export default function Connexion() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("sophiemartin");
  const [password, setPassword] = useState("password123");
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
      {/* LEFT */}
      <div className="connexion__left">
        <div className="connexion__brand">
          SPORTSEE
        </div>

        <div className="connexion__card">
          <h1 className="connexion__title">
            Transformez <br /> vos stats en résultats
          </h1>

          <h2 className="connexion__subtitle">Se connecter</h2>

          <form onSubmit={handleSubmit}>
            <label className="connexion__label">Adresse email</label>
            <input
              className="connexion__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=""
            />

            <label className="connexion__label">Mot de passe</label>
            <input
              className="connexion__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />

            <button className="connexion__btn" type="submit">
              Se connecter
            </button>

            <div className="connexion__forgot">Mot de passe oublié ?</div>

            {error && <p style={{ color: "#dc2626", marginTop: 12 }}>{error}</p>}
          </form>
        </div>
      </div>

      {/* RIGHT */}
      <div className="connexion__right">
        <div
          className="connexion__bg"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1546484959-f9a5b2d7b6d2?auto=format&fit=crop&w=1400&q=80)",
          }}
        />
        <div className="connexion__bubble">
          Analysez vos performances en un clin d’œil, <br />
          suivez vos progrès et atteignez vos objectifs.
        </div>
      </div>
    </div>
  );
}