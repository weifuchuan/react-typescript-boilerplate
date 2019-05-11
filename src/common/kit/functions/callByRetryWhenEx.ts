import sleep from './sleep';

export default async function callByRetryWhenEx<R>(
  callable: () => Promise<R>,
  count: number = 3,
  duration: number = 1000 / 60
) {
  const exceptions: any[] = [];
  for (let i = 0; i < count; i++) {
    try {
      const ret = await callable();
      return ret;
    } catch (e) {
      exceptions.push(e);
      await sleep(duration);
    }
  }
  throw { exceptions };
}
