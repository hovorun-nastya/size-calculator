export const cmToInch = (cm: number, isInches: boolean) => {
  if(isInches) return cm * 0.393701
  return cm
}
export const InchToCM = (inches: number, isInches: boolean) => {
  if(isInches) return inches / 0.393701
  return inches
}
