import "./StepNavigation.css";

export default function StepNavigation({ steps, currentStep, onStepClick }) {
  return (
    <div className="step-nav">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isDone = step.id < currentStep;

        return (
          <div key={step.id} className="step-wrapper">
            <button
              className={`step-btn ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
              onClick={() => onStepClick(step.id)}
            >
              {step.icon}
              <span>{step.label}</span>
            </button>

            {index < steps.length - 1 && <div className="step-line" />}
          </div>
        );
      })}
    </div>
  );
}