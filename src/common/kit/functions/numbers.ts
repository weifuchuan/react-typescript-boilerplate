export function keep2(n: number): number {
  if (!Number.isInteger(n)) {
    n = Number.parseFloat(new Number(n).toFixed(2));
  }
  return n;
}
