import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

const CakeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
    <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1"/>
    <path d="M2 21h20"/>
    <path d="M7 8v3"/>
    <path d="M12 8v3"/>
    <path d="M17 8v3"/>
    <path d="M7 4 12 2l5 2"/>
  </svg>
);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '',
    patisserieName: '', address: '', phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-panel__logo">
          <CakeIcon />
          CakeCraft
        </div>

        <div className="auth-card">
          <h1 className="auth-card__title">
            {isLogin ? 'Bon retour !' : 'Créer un compte'}
          </h1>
          <p className="auth-card__subtitle">
            {isLogin
              ? 'Connectez-vous à votre tableau de bord'
              : 'Rejoignez la plateforme pâtisserie'}
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Prénom & Nom</label>
                    <input
                      name="name" type="text" placeholder="Marie Dupont"
                      value={formData.name} onChange={handleChange} required
                    />
                  </div>
                  <div className="form-group">
                    <label>Nom de la pâtisserie</label>
                    <input
                      name="patisserieName" type="text" placeholder="Pâtisserie El Bahia"
                      value={formData.patisserieName} onChange={handleChange} required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Adresse</label>
                    <input
                      name="address" type="text" placeholder="12 Rue Larbi, Oran"
                      value={formData.address} onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Téléphone</label>
                    <input
                      name="phone" type="tel" placeholder="05 55 55 55 55"
                      value={formData.phone} onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                name="email" type="email" placeholder="vous@exemple.com"
                value={formData.email} onChange={handleChange} required
              />
            </div>

            <div className="form-group">
              <label>Mot de passe</label>
              <input
                name="password" type="password" placeholder="••••••••"
                value={formData.password} onChange={handleChange} required minLength={6}
              />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "Créer mon compte"}
            </button>
          </form>

          <div className="auth-switch">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}{' '}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
              {isLogin ? "S'inscrire" : 'Se connecter'}
            </button>
          </div>
        </div>
      </div>

      <div className="auth-deco">
        <div className="auth-deco__content">
          <span className="auth-deco__icon">🎂</span>
          <h2 className="auth-deco__title">Gérez votre pâtisserie</h2>
          <p className="auth-deco__text">
            Suivez vos commandes, gérez votre disponibilité et développez
            votre activité avec un tableau de bord conçu pour les artisans pâtissiers.
          </p>
        </div>
      </div>
    </div>
  );
}
