import "./ShapeSelector.css";
import StepNavigation from "./StepNavigation";
import ShapeCard from "./ShapeCard";
import { ArrowRight, Box, Pipette, CircleDot, Sparkles } from "lucide-react";

const STEPS = [
  { id: 1, label: "Shape", icon: <Box size={16} /> },
  { id: 2, label: "Filling", icon: <Pipette size={16} /> },
  { id: 3, label: "Frosting", icon: <CircleDot size={16} /> },
  { id: 4, label: "Decor", icon: <Sparkles size={16} /> },
];

export default function ShapeSelector({
  selectedShape,
  onShapeSelect,
  currentStep,
  setCurrentStep,
  shapes=[]
}) {
  return (
    <div className="selector">

      <StepNavigation
        steps={STEPS}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />

      <div className="header">
        <h2>Choose Your Cake</h2>
        <p>Select a shape to preview</p>
      </div>

      <div className="grid">
        {shapes.map((shape) => (
          <ShapeCard
            key={shape.id}
            shape={shape}
            isSelected={selectedShape?.shape === shape.id}
            onSelect={onShapeSelect}
          />
        ))}
      </div>

      <div className="footer">
        <button
          disabled={!selectedShape}
          onClick={() => setCurrentStep(2)}
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
}