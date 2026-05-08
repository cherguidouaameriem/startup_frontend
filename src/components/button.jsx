// ─────────────────────────────────────────────
// Button — reusable button component
// Props:
//   variant: "primary" | "secondary" | "outline"
//   size: "sm" | "md" | "lg"
//   onClick: fn
//   children: node
//   fullWidth: bool
// ─────────────────────────────────────────────

export default function Button({
  variant = "primary",
  size = "md",
  onClick,
  children,
  fullWidth = false,
  style = {},
  disabled = false,
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    borderRadius: 10,
    transition: "all 0.2s ease",
    width: fullWidth ? "100%" : "auto",
    opacity: disabled ? 0.6 : 1,
    letterSpacing: "0.01em",
  };

  const sizes = {
    sm: { padding: "8px 18px", fontSize: 13 },
    md: { padding: "12px 28px", fontSize: 15 },
    lg: { padding: "15px 36px", fontSize: 16 },
  };

  const variants = {
    primary: {
      background: "#e05e71",
      color: "#fff",
      boxShadow: "0 4px 14px rgba(200,25,74,0.3)",
    },
    secondary: {
      background: "#FFF0F4",
      color: "#e05e71",
      boxShadow: "none",
      border: "1.5px solid #f0c8d5",
    },
    outline: {
      background: "transparent",
      color: "#1a1a2e",
      boxShadow: "none",
      border: "1.5px solid #ddd",
    },
    white: {
      background: "#fff",
      color: "#e05e71",
      boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
    },
  };

  return (
    <button
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}