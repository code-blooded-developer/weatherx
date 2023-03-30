export enum TempUnit {
  CELCIUS,
  FAHRENHEIT,
}

export function celciusToFahrenheit(c: number) {
  return Math.round(c * (9 / 5) + 32);
}

export function kmToMile(n: number) {
  return Math.round(n / 1.60934);
}
