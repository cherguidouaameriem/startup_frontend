import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/api';
import { useToast } from '../components/Toast';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const toast = useToast();

  const [info, setInfo] = useState({
    name: user?.name || '',
    patisserieName: user?.patisserieName || '',
    address: user?.address || '',
    phone: user?.phone || '',
  });
  const [shopOpen, setShopOpen] = useState(user?.isShopOpen ?? true);
  const [savingInfo, setSavingInfo] = useState(false);
  const [savingShop, setSavingShop] = useState(false);

  const handleInfoChange = (e) => setInfo((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSaveInfo = async (e) => {
    e.preventDefault();
    setSavingInfo(true);
    try {
      const res = await authService.updateProfile(info);
      updateUser(res.data.user);
      toast.success('Informations mises à jour !');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la sauvegarde.');
    } finally {
      setSavingInfo(false);
    }
  };

  const handleToggleShop = async () => {
    setSavingShop(true);
    const newVal = !shopOpen;
    try {
      const res = await authService.updateProfile({ isShopOpen: newVal });
      updateUser(res.data.user);
      setShopOpen(newVal);
      toast.success(newVal ? 'Boutique marquée ouverte.' : 'Boutique marquée fermée.');
    } catch {
      toast.error('Erreur lors de la mise à jour.');
    } finally {
      setSavingShop(false);
    }
  };

  return (
    <>
      <div className="orders-page-header">
        <h1>Profil</h1>
      </div>

      <div className="profile-grid">
        {/* Informations */}
        <div className="profile-card">
          <h2>Informations de la pâtisserie</h2>
          <form className="modal-form" onSubmit={handleSaveInfo}>
            <div className="form-group">
              <label>Votre nom</label>
              <input name="name" value={info.name} onChange={handleInfoChange} placeholder="Marie Dupont" />
            </div>
            <div className="form-group">
              <label>Nom de la pâtisserie</label>
              <input name="patisserieName" value={info.patisserieName} onChange={handleInfoChange} />
            </div>
            <div className="form-group">
              <label>Adresse</label>
              <input name="address" value={info.address} onChange={handleInfoChange} placeholder="12 Rue Larbi, Oran" />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <input name="phone" value={info.phone} onChange={handleInfoChange} placeholder="05 55 55 55 55" />
            </div>
            <div className="modal__actions" style={{ justifyContent: 'flex-start' }}>
              <button type="submit" className="btn-primary" disabled={savingInfo}>
                {savingInfo ? 'Sauvegarde...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>

        {/* Status & Account */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="profile-card">
            <h2>Statut de la boutique</h2>
            <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Contrôlez si votre boutique apparaît comme ouverte ou fermée.
            </p>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1rem', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)'
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>
                  {shopOpen ? '🟢 Boutique ouverte' : '🔴 Boutique fermée'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {shopOpen ? 'Les clients peuvent passer des commandes.' : 'Les commandes sont suspendues.'}
                </div>
              </div>
              <button
                className={shopOpen ? 'btn-secondary' : 'btn-primary'}
                onClick={handleToggleShop}
                disabled={savingShop}
              >
                {savingShop ? '...' : shopOpen ? 'Fermer' : 'Ouvrir'}
              </button>
            </div>
          </div>

          <div className="profile-card">
            <h2>Compte</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user?.email}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Membre depuis</div>
                <div style={{ fontSize: '0.9rem' }}>
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
                    : '—'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
