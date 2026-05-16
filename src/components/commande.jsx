import { useState, useEffect } from "react";
import { 
  Box, Layers, Users, Check, ArrowRight, Pipette, SprayCan, Sparkles 
} from "lucide-react";
import { useParams } from "react-router-dom";
// ─── Composants Métier ───
import FillingSelector from "./FillingSelector";
import FrostingSelector from "./FroustingSelector";
import DecorSelector from "./DecorSelector";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MiniCake from "./cakeshape/MiniCake";
import LayerCake from "./cakeshape/LayerCake";
import DoubleCake from "./cakeshape/DoubleCake";
import RectangleCake from "./cakeshape/RectangleCake";
import CakeScene from "./Scene";
import { getLayers } from "../utils/cakeRules";
/**
 * CATALOGUE DES FORMES
 * Modifiable facilement via une API backend
 */
const PRICING = {
  sponge: {
    vanille: 0,
    chocolat: 200,
    "red velvet": 350,
    citron: 150,
  },

  frosting: {
    "#f5e6c8": 0,
    "#e89aa4": 150,
    "#f2f2f2": 100,
    "#5a3825": 200,
    "#b4a7d6": 120,
    "#8fc7a3": 120,
    "#d4a64a": 180,
  },

  decor: {
    "pouchage 1": 100,
    "Décoration de gâteau": 300,
    
  },

  fillings: {
    "mini-cake": {
      chocolat: 100,
      caramel: 120,
      lotus: 180,
      fraise: 130,
      nutella: 200,
    },

    "layer-cake": {
      chocolat: 180,
      caramel: 220,
      lotus: 300,
      fraise: 250,
      nutella: 350,
    },

    "rectangle-cake": {
      chocolat: 300,
      caramel: 350,
      lotus: 500,
      fraise: 420,
      nutella: 600,
    },

    "Double-cake": {
      chocolat: 250,
      caramel: 300,
      lotus: 420,
      fraise: 350,
      nutella: 500,
    },
  },
};
const SHAPES_CATALOG = [
  {
    id: "mini-cake",
    name: "Format Mini",
    description: "Intime et élégant",
    people: 2,
    layers: 2,
    basePrice: 1200,
    component: MiniCake,
    image: "/images/cakes/MiniCake.PNG",
    plateSize: 1.2,
    plateShape: "round",
  },
  {
    id: "layer-cake",
    name: "Layer Cake",
    description: "Classique pour célébrations",
    people: 8,
    layers: 3,
    basePrice: 2500,
    component: LayerCake,
    image: "/images/cakes/LayerCake.PNG",
    plateSize: 1.8,
    plateShape: "round",
  },
  {
    id: "rectangle-cake",
    name: "Format Rectangulaire",
    description: "Grand et spectaculaire",
    people: 15,
    layers: 3,
    basePrice: 4800,
    component: RectangleCake,
    image: "/images/cakes/RectangleCake.PNG",
    plateSize: 2.5,
    plateShape: "rect",
  },
  {
    id: "Double-cake",
    name: "Pièce Montée",
    description: "Rustique et gourmand",
    people: 20,
    layers: 6,
    basePrice: 1800,
    component: DoubleCake,
    image: "/images/cakes/DoubleCake.PNG",
    plateSize: 2.2,
    plateShape: "round",
  },
];

const STEPS = [
  { id: 1, label: "Forme", icon: <Box size={16} /> },
  { id: 2, label: "Garniture", icon: <Pipette size={16} /> },
  { id: 3, label: "Glaçage", icon: <SprayCan size={16} /> },
  { id: 4, label: "Décor", icon: <Sparkles size={16} /> },
];

// ─── SOUS-COMPOSANTS ──────────────────────────────────────────────────────────

/** Navigation par étapes */
function StepNavigation({ currentStep, onStepClick }) {
  return (
    <div className="step-nav-container" style={styles.stepNav}>
      {STEPS.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isDone = step.id < currentStep;
        
        return (
          <div key={step.id} style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => onStepClick(step.id)}
              style={{
                ...styles.stepBtn,
                ...(isActive ? styles.stepBtnActive : {}),
                ...(isDone ? styles.stepBtnDone : {}),
              }}
            >
              <span style={{ color: isActive || isDone ? "#C8194A" : "#9CA3AF" }}>{step.icon}</span>
              <span className="step-label" style={styles.stepLabel}>{step.label}</span>
            </button>
            {idx < STEPS.length - 1 && <div style={styles.stepConnector} />}
          </div>
        );
      })}
    </div>
  );
}

/** Carte de sélection de forme */
function ShapeCard({ shape, isSelected, onSelect }) {
  return (
    <div
      className="shape-card"
      style={{
        ...cardStyles.card,
        border: isSelected ? "2px solid #C8194A" : "1px solid #E5E7EB",
      }}
      onClick={() => onSelect(shape)}
    >
      <div style={cardStyles.imageArea}>
        <img src={shape.image} alt={shape.name} style={cardStyles.image} />
        {isSelected && (
          <span style={cardStyles.selectedBadge}>
            <Check size={12} strokeWidth={3} /> Sélectionné
          </span>
        )}
      </div>
      <div style={cardStyles.details}>
        <div style={cardStyles.nameRow}>
          <h3 style={cardStyles.name}>{shape.name}</h3>
          <span style={cardStyles.price}>{shape.basePrice} DA</span>
        </div>
        <p style={cardStyles.description}>{shape.description}</p>
        <div style={cardStyles.tags}>
          <span style={cardStyles.tag}><Users size={12} /> {shape.people} pers.</span>
          <span style={cardStyles.tag}><Layers size={12} />{shape.id === "mini-cake"
  ? 2
  : shape.id === "Double-cake"
  ? 4
  : shape.layers} étages</span>
        </div>
      </div>
    </div>
  );
}

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────────

export default function CakeBuilder() {
const { bakerId } = useParams();
const selectedPatisserie = bakerId;
  const [fillingsByLayer, setFillingsByLayer] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCake, setSelectedCake] = useState(null);
  const [flavor, setFlavor] = useState(null);
  const [frostingColor, setFrostingColor] = useState("#f5e6c8");
const [decor, setDecor] = useState({
  types: [],
  colors: {},   // 👈 AJOUT
  text: "",
});  const normalize = (str) =>
  str?.toLowerCase().trim();
  const [totalPrice, setTotalPrice] = useState(0);


useEffect(() => {
  if (!selectedCake) return;

  const layers = getLayers(selectedCake);

  setFillingsByLayer((prev) => {
    const safe = Array.isArray(prev) ? prev : [];

    return Array.from({ length: layers }, (_, i) => {
      return safe[i] ?? null;
    });
  });
}, [selectedCake]);

useEffect(() => {
  if (!selectedCake) return;

  let price = selectedCake.basePrice;

  // ───────── GÉNOISE ─────────
  if (flavor) {
    price += PRICING.sponge[normalize(flavor)] || 0;
  }

  // ───────── GLAÇAGE ─────────
  price += PRICING.frosting[frostingColor] || 0;

  // ───────── DÉCOR ─────────
  (decor?.types || []).forEach((d) => {
    price += PRICING.decor[d] || 0;
  });

  // ───────── GARNITURE PAR COUCHE ─────────
  const layers = getLayers(selectedCake);

const safeFillings = fillingsByLayer.slice(0, layers);

safeFillings.forEach((filling) => {
  if (!filling) return;

  const fillingPrice =
    PRICING.fillings[selectedCake.id]?.[
      normalize(filling)
    ] || 0;

  price += fillingPrice;
});

  setTotalPrice(price);

}, [
  selectedCake,
  flavor,
  frostingColor,
  decor,
  fillingsByLayer,
]);
  const handleShapeSelect = (shape) => {
    setSelectedCake({
      ...shape,
      shape: shape.id, // Mapping pour le rendu 3D
    });
  };

  return (
    <div style={styles.root}>
      <Navbar />
      <div style={styles.bgTexture} />

      <div className="main-layout" style={styles.layout}>
        
        {/* COLONNE GAUCHE : Aperçu 3D */}
        <aside className="preview-column" style={styles.leftColumn}>
          <div style={styles.previewPanel}>
            <div style={styles.modelStage}>
              {selectedCake ? (
                <div style={{ width: '100%', height: '100%' }}>
                  <CakeScene>
                    <group scale={selectedCake.plateSize || 1}>
                      {/* Rendu dynamique du composant 3D selon le catalogue */}
                      {(() => {
                        const ShapeComp = SHAPES_CATALOG.find(s => s.id === selectedCake.id)?.component;
                        return ShapeComp ? (
                          <ShapeComp 
                            key={frostingColor} 
                            frostingColor={frostingColor} 
                            decor={decor}
                            flavor={flavor} 
                            layers={getLayers(selectedCake)}
                          />
                        ) : null;
                      })()}
                    </group>
                  </CakeScene>
                </div>
              ) : (
                <div style={styles.emptyStage}>
                  <p>Sélectionnez une forme pour commencer la magie</p>
                </div>
              )}
            </div>

            <div style={styles.priceCard}>
              {selectedCake ? (
                <>
                  <div>
                    <p style={styles.priceLabel}>Prix estimé</p>
                    <p style={styles.priceValue}>{totalPrice.toLocaleString()} DA</p>
                  </div>
                  <button style={styles.orderButton}>Confirmer</button>
                </>
              ) : (
                <p style={styles.placeholderText}>Résumé de votre création...</p>
              )}
            </div>
          </div>
        </aside>

        {/* COLONNE DROITE : Sélecteurs */}
        <main className="builder-column" style={styles.rightColumn}>
          <StepNavigation currentStep={currentStep} onStepClick={setCurrentStep} />
          
          <div style={styles.stepContent}>
            {currentStep === 1 && (
              <div style={styles.selectorPanel}>
                <h2 style={styles.selectorTitle}>Choisissez la forme</h2>
                <p style={styles.selectorSubtitle}>Sélectionnez la base de votre création artisanale.</p>
                <div className="shapes-grid" style={styles.shapesGrid}>
                  {SHAPES_CATALOG.map((shape) => (
                    <ShapeCard
                      key={shape.id}
                      shape={shape}
                      isSelected={selectedCake?.id === shape.id}
                      onSelect={handleShapeSelect}
                    />
                  ))}
                </div>
                <div style={styles.selectorFooter}>
                  <button
                    style={{ ...styles.ctaButton, opacity: selectedCake ? 1 : 0.5 }}
                    disabled={!selectedCake}
                    onClick={() => setCurrentStep(2)}
                  >
                    Continuer <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

         {currentStep === 2 && (
 <FillingSelector
  layers={getLayers(selectedCake)}
  selectedSponge={flavor}
  setSelectedSponge={setFlavor}
  fillingsByLayer={fillingsByLayer}
  setFillingsByLayer={setFillingsByLayer}
  onNext={() => setCurrentStep(3)}
  onBack={() => setCurrentStep(1)}
/>
)}

            {currentStep === 3 && (
              <FrostingSelector
                selectedColor={frostingColor}
                setSelectedColor={setFrostingColor}
                onNext={() => setCurrentStep(4)}
                onBack={() => setCurrentStep(2)}
              />
            )}

         {currentStep === 4 && (
  <DecorSelector
    decor={decor}
    setDecor={setDecor}
    frostingColor={frostingColor}
    selectedCake={selectedCake}
    selectedPatisserie={selectedPatisserie}
    totalPrice={totalPrice}

    // 🔥 ADD THESE (IMPORTANT)
    flavor={flavor}
    fillingsByLayer={fillingsByLayer}

    onBack={() => setCurrentStep(3)}
  />
)}      </div>
        </main>
      </div>

      {/* STYLES RESPONSIVES ET ANIMATIONS */}
      <style>{`
        @media (max-width: 1024px) {
          .main-layout { 
            flex-direction: column !important; 
            height: auto !important;
            margin-top: 60px !important;
            padding: 12px !important;
          }
          .preview-column, .builder-column { 
            width: 100% !important; 
            min-width: unset !important;
          }
          .preview-column { height: 400px; }
          .shapes-grid { grid-template-columns: 1fr !important; }
          .step-label { display: none; }
        }

        .shape-card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .shape-card { transition: all 0.3s ease; cursor: pointer; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .step-content { animation: fadeIn 0.4s ease-out; }
      `}</style>
      <Footer />
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    width: "100%",
    minHeight: "100vh",
    background: "#F9FAFB",
    display: "flex",
    flexDirection: "column",
  },
  bgTexture: {
    position: "fixed",
    inset: 0,
    backgroundImage: `radial-gradient(circle at 10% 10%, rgba(200,25,74,0.03) 0%, transparent 40%)`,
    zIndex: 0,
    pointerEvents: "none",
  },
  layout: {
  display: "flex",
  flexWrap: "wrap",
  gap: "24px",
  maxWidth: "1400px",
  margin: "80px auto 40px",
  width: "100%",
  padding: "0 16px",
  zIndex: 1,
  alignItems: "flex-start",
},
 leftColumn: {
  flex: "1 1 420px",
  width: "100%",
  maxWidth: "600px",
  position: "sticky",
  top: "90px",
  alignSelf: "flex-start",
},
  rightColumn: {
  flex: "1 1 500px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
},
  previewPanel: {
    background: "#fff",
    borderRadius: "24px",
    border: "1px solid #E5E7EB",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  },
  modelStage: {
  minHeight: "420px",
  height: "55vh",
  maxHeight: "700px",
  background: "linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
},
  emptyStage: {
    color: "#9CA3AF",
    textAlign: "center",
    padding: "40px",
    fontSize: "14px",
  },
priceCard: {
  padding: "20px",
  borderTop: "1px solid #F3F4F6",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
},
  priceValue: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#111827",
  },
  orderButton: {
    background: "#C8194A",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
  },
 stepNav: {
  background: "#fff",
  padding: "12px",
  borderRadius: "16px",
  border: "1px solid #E5E7EB",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  overflowX: "auto",
  gap: "12px",
},
  stepBtn: {
    background: "none",
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  stepBtnActive: {
    background: "#FFF1F2",
  },
  stepLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#0c0206",
  },
  stepConnector: {
    width: "30px",
    height: "1px",
    background: "#E5E7EB",
    margin: "0 10px",
  },
  selectorPanel: {
    background: "#fff",
    borderRadius: "24px",
    padding: "32px",
    border: "1px solid #E5E7EB",
  },
 shapesGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "16px",
  marginTop: "24px",
},
  ctaButton: {
    width: "100%",
    background: "#C8194A",
    color: "#fff",
    height: "56px",
    borderRadius: "14px",
    border: "none",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    cursor: "pointer",
    marginTop: "24px",
  },
};

const cardStyles = {
  card: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  imageArea: {
    height: "130px",
    background: "#F9FAFB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    height: "100%",
    
    objectFit: "contain",
  },
  selectedBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#C8194A",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "20px",
    fontSize: "10px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  details: { padding: "16px" },
  name: { fontSize: "16px", fontWeight: "700" },
  price: { color: "#C8194A", fontWeight: "700" },
  description: { fontSize: "12px", color: "#6B7280", margin: "8px 0" },
  tags: { display: "flex", gap: "8px" },
  tag: { 
    fontSize: "10px", 
    background: "#F3F4F6", 
    padding: "4px 8px", 
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
};