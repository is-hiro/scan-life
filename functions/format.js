export const normalizeNumber = (val) => {
  if (typeof val === 'string') {
    return Number(val.replace(',', '.'))
  }
  return val
}