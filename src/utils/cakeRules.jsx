export const CAKE_RULES = {
  "mini-cake": {
    layers: 2,
  },
  "layer-cake": {
    layers: 3,
  },
  "rectangle-cake": {
    layers: 3,
  },
  "Double-cake": {
    layers: 4,
  },
};

export const getLayers = (cake) => {
  if (!cake) return 0;
  return CAKE_RULES[cake.id]?.layers ?? cake.layers ?? 0;
};