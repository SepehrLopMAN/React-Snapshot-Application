function gcd_calc(x, y) {
  if (typeof x !== "number" || typeof y !== "number") return false;
  while (y) {
    [y, x] = [x % y, y];
  }
  return x;
}
export default gcd_calc;
