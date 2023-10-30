export const countDecimals = (value: number) => {
  if (!Number.isFinite(value)) return 0;
  let e = 1;
  let p = 0;
  while (Math.round(value * e) / e !== value) {
    e *= 10;
    p += 1;
  }
  return p;
};

const decimalOperation = (a: number, op: "-" | "+", b: number): number => {
  let newA = a;
  let newB = b;

  let result = op === "+" ? newA + newB : newA - newB;

  // Check if we have decimals
  if (newA % 1 !== 0 || newB % 1 !== 0) {
    const multiplier = 10 ** Math.max(countDecimals(a), countDecimals(b));

    // Transform the decimals to integers based on the precision
    newA = Math.round(newA * multiplier);
    newB = Math.round(newB * multiplier);

    // Perform the operation on integers values to make sure we don't get a fancy decimal value
    result = op === "+" ? newA + newB : newA - newB;

    // Transform the integer result back to decimal
    result /= multiplier;
  }

  return result;
};

export const valueOf = (v: string | number) => {
  if (typeof v === "number") return v;
  const num = parseFloat(v.toString().replace(/[^\w.-]+/g, ""));
  return !Number.isNaN(num) ? num : 0;
};

export const increment = (v: number | string, s: number) =>
  decimalOperation(valueOf(v), "+", s);

export const decrement = (v: number | string, s: number) =>
  decimalOperation(valueOf(v), "-", s);

export function round(v: number | string, t?: number) {
  let num = valueOf(v);
  const p = 10 ** (t ?? 10);
  num = Math.round(num * p) / p;
  return t ? num.toFixed(t) : v.toString();
}

export function snapToStep(value: number | string, step: number) {
  const num = valueOf(value);
  const p = countDecimals(step);
  const v = Math.round(num / step) * step;
  return round(v, p);
}
