import "./ShapeCard.css";
import { Users, Layers, Check } from "lucide-react";

export default function ShapeCard({ shape, isSelected, onSelect }) {
  return (
    <div
      className={`shape-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(shape)}
    >
      <div className="image-area">
        <img src={shape.image} alt={shape.name} />

        {isSelected && (
          <span className="badge">
            <Check size={12} /> Selected
          </span>
        )}
      </div>

      <div className="details">
        <div className="row">
          <h3>{shape.name}</h3>
          <span className="price">{shape.basePrice} DA</span>
        </div>

        <p>{shape.description}</p>

        <div className="tags">
          <span><Users size={12}/> {shape.people}</span>
          <span><Layers size={12}/> {shape.layers}</span>
        </div>
      </div>
    </div>
  );
}