import React, { useState } from 'react';
import { MapPin, Star, Clock, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
const cities = [
  { id: 1, name: 'Oran', count: 5, status: 'shops', available: true },
  { id: 2, name: 'Algiers', count: null, status: 'Coming soon', available: false },
  { id: 3, name: 'Constantine', count: null, status: 'Coming soon', available: false },
  { id: 4, name: 'Annaba', count: null, status: 'Coming soon', available: false },
];

const shops = [
  { id: 1, name: 'Pâtisserie El Bahia', rating: 4.9, location: 'Centre-ville', specialty: 'Traditional & modern cakes', delivery: true },
  { id: 2, name: 'Sweet Oran Bakery', rating: 4.7, location: 'Hai Es-Seddikia', specialty: 'Wedding & celebration cakes', delivery: true },
  { id: 3, name: 'La Rose des Sables', rating: 4.8, location: 'Oran El Jadida', specialty: 'French-style pâtisserie', delivery: false },
  { id: 4, name: 'Délices du Fellaoucène', rating: 4.6, location: 'Bir El Djir', specialty: 'Custom designer cakes', delivery: true },
];

const Pastryshops = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityClick = (city) => {
    if (city.available) {
      setSelectedCity(city.name);
    } else {
      alert(`${city.name} is coming soon!`);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        {/* SECTION : SELECTION DE LA VILLE */}
        <div style={styles.header}>
          <MapPin style={styles.iconMain} />
          <h1 style={styles.title}>Select Your City</h1>
          <p style={styles.subtitle}>Find the best pastry shops near you</p>
        </div>

        <div style={styles.grid}>
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => handleCityClick(city)}
              style={{
                ...styles.card,
                cursor: city.available ? "pointer" : "not-allowed",
                opacity: city.available ? 1 : 0.7,
                borderColor:
                  selectedCity === city.name ? "#dc3545" : "#eee",
                borderWidth:
                  selectedCity === city.name ? "2px" : "1px",
              }}
            >
              <div style={styles.cardContent}>
                <h2 style={styles.cityName}>{city.name}</h2>
                <p style={styles.cityStatus}>
                  {city.count !== null
                    ? `${city.count} ${city.status}`
                    : city.status}
                </p>
              </div>
            </button>
          ))}
        </div>

        {selectedCity && (
          <div style={styles.shopSection}>
            <hr style={styles.divider} />

            <div style={styles.shopHeader}>
              <h2 style={styles.shopTitle}>
                Pastry Shops in {selectedCity}
              </h2>
            </div>

            <div style={styles.shopList}>
              {shops.map((shop) => (
                <div key={shop.id} style={styles.shopCard}>
                  <div style={styles.shopInfo}>
                    <div style={styles.shopNameRow}>
                      <h3 style={styles.shopNameText}>{shop.name}</h3>
                      <div style={styles.ratingBadge}>
                        <Star size={14} fill="#f59e0b" />
                        <span style={styles.ratingText}>
                          {shop.rating}
                        </span>
                      </div>
                    </div>

                    <p style={styles.shopSubText}>
                      {shop.location} • {shop.specialty}
                    </p>

                    {shop.delivery && (
                      <div style={styles.deliveryInfo}>
                        <Clock size={14} color="#dc3545" />
                        <span style={styles.deliveryText}>
                          Delivery available
                        </span>
                      </div>
                    )}
                  </div>

                  <button style={styles.orderButton}>
                    Order <ChevronRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}; // ✅ ICI tu fermes le composant
const styles = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fdfdfd',
    padding: '40px 20px',
  },
  header: { textAlign: 'center', marginBottom: '40px' },
  iconMain: { width: '40px', height: '40px', color: '#dc3545', marginBottom: '15px' },
  title: { fontSize: '2.2rem', fontWeight: '800', margin: '0 0 8px 0', color: '#1a1a1a' },
  subtitle: { fontSize: '1.1rem', color: '#666' },
 grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
  maxWidth: "800px",
  width: "100%",
  marginBottom: "40px",
},

card: {
  backgroundColor: "#fff",
  borderRadius: "10px", // moins arrondi = plus moderne
  padding: "18px 16px", // plus compact
  border: "1px solid #e5e5e5",
  textAlign: "left",
  transition: "all 0.2s ease",
},
  cityName: { fontSize: '1.3rem', fontWeight: 'bold', margin: '0 0 5px 0', color: '#222' },
  cityStatus: { fontSize: '0.95rem', color: '#888' },
  
  divider: { width: '100%', border: 'none', borderTop: '1px solid #eee', margin: '40px 0' },
  shopSection: { width: '100%', maxWidth: '800px', animation: 'fadeIn 0.5s ease-in' },
  shopHeader: { marginBottom: '30px' },
  shopTitle: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a' },
  shopList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  shopCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    border: '1px solid #f0f0f0',
  },
  shopNameRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' },
  shopNameText: { margin: 0, fontSize: '1.15rem', color: '#111' },
  ratingBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#fff4f4',
    padding: '2px 8px',
    borderRadius: '6px',
  },
  ratingText: { fontSize: '0.85rem', fontWeight: 'bold', color: '#333' },
  shopSubText: { margin: 0, color: '#666', fontSize: '0.95rem' },
  deliveryInfo: { display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' },
  deliveryText: { color: '#dc3545', fontSize: '0.85rem', fontWeight: '500' },
  orderButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '10px 20px',
    borderRadius: '10px',
    border: '1px solid #eee',
    backgroundColor: '#fff',
    cursor: 'pointer',
    color: '#444',
    fontWeight: '500',
  }
};

export default Pastryshops;