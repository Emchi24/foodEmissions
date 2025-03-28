export function calcNewEmission(beefConsumption: number, emissionValue: number, foodType: string) {
  return {
    groceries: foodType,
    Emission: Number.parseFloat((beefConsumption * emissionValue).toFixed(2)),
  }
}

