export function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}
