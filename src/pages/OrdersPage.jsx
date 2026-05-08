import React, { useState, useEffect, useCallback } from 'react';
import { orderService } from '../services/api'; // Service API pour les commandes
import { useToast } from '../components/Toast'; // Notifications (toast)
import StatusBadge from '../components/StatusBadge'; // Badge de statut
import OrderModal from '../components/OrderModal'; // Modal de commande

// Statuts disponibles
const STATUSES = ['all', 'Received', 'In Preparation', 'Ready', 'Delivered', 'Cancelled'];

// Labels traduits en français pour l'affichage
const STATUS_LABELS = {
  all: 'Toutes',
  Received: 'Reçues',
  'In Preparation': 'En préparation',
  Ready: 'Prêtes',
  Delivered: 'Livrées',
  Cancelled: 'Annulées',
};

// Fonction pour formater une date en français
function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export default function OrdersPage() {
  const toast = useToast();

  // États principaux
  const [orders, setOrders] = useState([]); // Liste des commandes
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1, limit: 10 }); // Pagination
  const [loading, setLoading] = useState(true); // Chargement
  const [search, setSearch] = useState(''); // Recherche
  const [statusFilter, setStatusFilter] = useState('all'); // Filtre par statut
  const [showModal, setShowModal] = useState(false); // Affichage modal
  const [editOrder, setEditOrder] = useState(null); // Commande à modifier
  const [deleteConfirm, setDeleteConfirm] = useState(null); // Confirmation suppression

  // Charger les commandes depuis l'API
  const fetchOrders = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };

      // Appliquer filtre statut
      if (statusFilter !== 'all') params.status = statusFilter;

      // Appliquer recherche
      if (search.trim()) params.search = search.trim();

      const res = await orderService.getOrders(params);
      setOrders(res.data.orders);
      setPagination(res.data.pagination);
    } catch {
      toast.error('Erreur lors du chargement des commandes.');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  // Recharger avec délai (debounce)
  useEffect(() => {
    const timer = setTimeout(() => fetchOrders(1), 300);
    return () => clearTimeout(timer);
  }, [fetchOrders]);

  // Modifier une commande
  const handleEdit = (order) => {
    setEditOrder(order);
    setShowModal(true);
  };

  // Nouvelle commande
  const handleNew = () => {
    setEditOrder(null);
    setShowModal(true);
  };

  // Supprimer une commande
  const handleDelete = async (id) => {
    try {
      await orderService.deleteOrder(id);
      toast.success('Commande supprimée.');
      fetchOrders(pagination.page);
    } catch {
      toast.error('Erreur lors de la suppression.');
    } finally {
      setDeleteConfirm(null);
    }
  };

  // Changer rapidement le statut
  const handleStatusQuickChange = async (order, newStatus) => {
    try {
      await orderService.updateOrder(order._id, { status: newStatus });
      toast.success('Statut mis à jour.');
      fetchOrders(pagination.page);
    } catch {
      toast.error('Erreur lors de la mise à jour.');
    }
  };

  return (
    <>
      {/* Header */}
      <div className="orders-page-header">
        <h1>Commandes</h1>
        <button className="btn-primary" onClick={handleNew}>
          {/* Icône + */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nouvelle commande
        </button>
      </div>

      {/* Filtres */}
      <div className="filters-bar">
        <div className="search-input-wrap">
          {/* Icône recherche */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Rechercher client, gâteau..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filtre statut */}
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>

      {/* Tableau */}
      <div className="orders-table">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner" /> Chargement...
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">📋</div>
            <p>Aucune commande trouvée.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Gâteau</th>
                <th>Date</th>
                <th>Livraison</th>
                <th>Statut</th>
                <th>Prix</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  {/* Client */}
                  <td>
                    <div style={{ fontWeight: 600 }}>{order.clientName}</div>
                    {order.clientPhone && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {order.clientPhone}
                      </div>
                    )}
                  </td>

                  {/* Gâteau */}
                  <td>
                    <div>{order.cakeType}</div>
                    {order.layers > 1 && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {order.layers} étages
                      </div>
                    )}
                  </td>

                  {/* Dates */}
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{formatDate(order.deliveryDate)}</td>

                  {/* Statut */}
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusQuickChange(order, e.target.value)}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                    >
                      {['Received','In Preparation','Ready','Delivered','Cancelled'].map((s) => (
                        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                      ))}
                    </select>
                  </td>

                  {/* Prix */}
                  <td>{Number(order.price).toLocaleString()} DA</td>

                  {/* Actions */}
                  <td>
                    <div className="table-actions">
                      <button onClick={() => handleEdit(order)}>Modifier</button>
                      <button onClick={() => setDeleteConfirm(order._id)}>Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="pagination">
            <button disabled={pagination.page <= 1}
              onClick={() => fetchOrders(pagination.page - 1)}>‹</button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => fetchOrders(p)}>{p}</button>
            ))}

            <button disabled={pagination.page >= pagination.totalPages}
              onClick={() => fetchOrders(pagination.page + 1)}>›</button>
          </div>
        )}
      </div>

      {/* Modal confirmation suppression */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Supprimer ?</h2>
            <p>Cette action est irréversible.</p>
            <button onClick={() => setDeleteConfirm(null)}>Annuler</button>
            <button onClick={() => handleDelete(deleteConfirm)}>Supprimer</button>
          </div>
        </div>
      )}

      {/* Modal commande */}
      {showModal && (
        <OrderModal
          order={editOrder}
          onClose={() => { setShowModal(false); setEditOrder(null); }}
          onSaved={() => fetchOrders(pagination.page)}
        />
      )}
    </>
  );
}