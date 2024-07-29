export const formatNumber = (value: number): string => {
    if (value >= 1_000_000_000_000) {
      return `${(value / 1_000_000_000_000).toFixed(1)} Tn`; // Trillions
    } else if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)} Bn`; // Billions
    } else if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)} Mn`; // Millions
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)} K`; // Thousands
    } else {
      return value.toString(); // Less than a thousand
    }
  };