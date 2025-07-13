export const formatPrice = (price: number) => {
    const formatted = new Intl.NumberFormat("es-DO", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);

    return `RD$${formatted}`;
}