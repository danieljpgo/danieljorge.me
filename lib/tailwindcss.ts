export function cn(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}
