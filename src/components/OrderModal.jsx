import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';
import { useToast } from './Toast';

const STATUSES = ['Received', 'In Preparation', 'Ready', 'Delivered', 'Cancelled'];
const STATUS_LABELS = {
  Received: 'Reçue',
  'In Preparation': 'En préparation',
  Ready: 'Prête',
  Delivered: 'Livrée',
  Cancelled: 'Annulée',
};

const EMPTY = {
  clientName: '', clientPhone: '', cakeType: '',
  description: '', layers: 1, price: '', status: 'Received',
  deliveryDate: '', notes: '',
};

export default function OrderModal({ order, onClose, onSaved }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (order) {
      setForm({
        clientName: order.clientName || '',
        clientPhone: order.clientPhone || '',
        cakeType: order.cakeType || '',
        description: order.description || '',
        layers: order.layers || 1,
        price: order.price || '',
        status: order.status || 'Received',
        deliveryDate: order.deliveryDate
          ? new Date(order.deliveryDate).toISOString().split('T')[0]
          : '',
        notes: order.notes || '',
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price), layers: Number(form.layers) };
      if (order?._id) {
        await orderService.updateOrder(order._id, payload);
        toast.success('Commande mise à jour !');
      } else {
        await orderService.createOrder(payload);
        toast.success('Commande créée !');
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la sauvegarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">{order ? 'Modifier la commande' : 'Nouvelle commande'}</h2>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nom du client *</label>
              <input name="clientName" value={form.clientName} onChange={handleChange}
                placeholder="Alice Mercier" required />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <input name="clientPhone" value={form.clientPhone} onChange={handleChange}
                placeholder="05 55 55 55 55" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Type de gâteau *</label>
              <input name="cakeType" value={form.cakeType} onChange={handleChange}
                placeholder="Red Velvet, Tiramisu..." required />
            </div>
            <div className="form-group">
              <label>Nombre d'étages</label>
              <input name="layers" type="number" min="1" max="10"
                value={form.layers} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input name="description" value={form.description} onChange={handleChange}
              placeholder="Vanille, 2 étages, décoration fleurs..." />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Prix (DA) *</label>
              <input name="price" type="number" min="0" value={form.price}
                onChange={handleChange} placeholder="3500" required />
            </div>
            <div className="form-group">
              <label>Statut</label>
              <select name="status" value={form.status} onChange={handleChange}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Date de livraison</label>
            <input name="deliveryDate" type="date" value={form.deliveryDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Notes internes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange}
              placeholder="Allergies, instructions spéciales..." rows={3} />
          </div>

          <div className="modal__actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Sauvegarde...' : order ? 'Mettre à jour' : 'Créer la commande'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
