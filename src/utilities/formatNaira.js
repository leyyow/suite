export const formatNaira = (value, truncate = false) => {
  const formatter = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" });
  const currencySymbol = formatter.format(0).slice(0, 1);

  if (value >= 1000000000) {
    return `${currencySymbol}${(value / 1000000000).toFixed(2)}B`; // Billions, 2 decimal places
  } else if (value >= 1000000) {
    return `${currencySymbol}${(value / 1000000).toFixed(2)}M`; // Millions, 2 decimal places
  } else if (value >= 100000 || truncate) {
    return `${currencySymbol}${(value / 1000).toFixed(1)}K`; // Thousands (6-digit), 1 decimal place
  }
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value);
};
