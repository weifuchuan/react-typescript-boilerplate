export default class BitKit {
  static at(num: number, i: number) {
    return (num & (1 << i)) == 0 ? 0 : 1;
  }

  static set(num: number, i: number, bit: number) {
    if (bit == 0) {
      return num & ~(1 << i);
    } else {
      return num | (1 << i);
    }
  }
}
