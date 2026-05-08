import { useNavigate } from "react-router-dom";

export default function SubscriptionStep() {
  const navigate = useNavigate();

  const selectPlan = (plan) => {
    navigate("/partner-form", {
      state: { subscription: plan },
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Choisissez votre abonnement</h2>

      <div style={{ display: "flex", gap: 20 }}>
        {["free", "simple", "premium"].map((plan) => (
          <div
            key={plan}
            onClick={() => selectPlan(plan)}
            style={{
              padding: 20,
              border: "1px solid #ddd",
              borderRadius: 12,
              cursor: "pointer",
            }}
          >
            <h3>{plan}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}