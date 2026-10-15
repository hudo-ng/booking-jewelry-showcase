const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

// 12.5 -> "$12.50"
export function formatPrice(price: number) {
  return usd.format(price);
}

export function photoAlt(itemNames: string[]) {
  return itemNames.length > 0 ? `Wearing ${itemNames.join(", ")}` : "Jewelry photo";
}
