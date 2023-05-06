export function formatDate(input: string | number) {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateNumerical(input: string | number) {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
