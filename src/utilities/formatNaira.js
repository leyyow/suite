export const formatNaira = (value, truncate = false) => {
  if (value >= 1000000000) {
    return `NGN ${(value / 1000000000).toFixed(2)}B`; // Billions, 2 decimal places
  } else if (value >= 1000000) {
    return `NGN ${(value / 1000000).toFixed(2)}M`; // Millions, 2 decimal places
  } else if (value >= 100000 || truncate) {
    return `NGN ${(value / 1000).toFixed(1)}K`; // Thousands (6-digit), 1 decimal place
  }
  return "NGN " + new Intl.NumberFormat("en-NG").format(value); // Standard Naira format
};
