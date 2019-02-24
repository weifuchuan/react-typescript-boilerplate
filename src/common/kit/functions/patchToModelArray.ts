export default function patchToModelArray<T extends { id: number }>(
  from: T[],
  to: T[]
) {
  const ids: any = {};
  for (let item of from) {
    ids[item.id] = item;
  }
  for (let item of to) {
    if (ids[item.id]) {
      Object.assign(item, ids[item.id]);
      delete ids[item.id];
    }
  }
  for (let key in ids) {
    to.push(ids[key]);
  }
}
