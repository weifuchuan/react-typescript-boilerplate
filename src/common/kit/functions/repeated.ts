export default function repeated<T>(v: T, count: number): T[] {
  const arr = new Array(count);
  for (let i = 0; i < count; i++) {
    if (typeof v === "object") {
      arr[i] = { ...v };
    } else arr[i] = v;
  }
  return arr;
}
