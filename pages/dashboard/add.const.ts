export function formatNumber(value?: number) {
  if (!value)
    return 0;
  return value.toFixed(5);
}
