export default function sortWithChinese<T>(
  arr: T[],
  extra: (x: T) => string,
  order: 'asc' | 'desc' = 'asc'
) {
  return arr.sort(
    (a, b) =>
      order === 'asc'
        ? extra(a).localeCompare(extra(b), 'zh-Hans-CN-kn-true', {
            sensitivity: 'accent'
          })
        : extra(a).localeCompare(extra(b), 'zh-Hans-CN-kn-true', {
            sensitivity: 'accent'
          }) === -1
          ? 1
          : -1
  );
}
