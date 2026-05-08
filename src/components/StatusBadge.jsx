import React from 'react';

const STATUS_LABELS = {
  Received: 'Reçue',
  'In Preparation': 'En préparation',
  Ready: 'Prête',
  Delivered: 'Livrée',
  Cancelled: 'Annulée',
};

export default function StatusBadge({ status }) {
  const label = STATUS_LABELS[status] || status;
  const cls = `status-badge status-badge--${status}`;
  return <span className={cls}>{label}</span>;
}
