import {CATEGORY_MODIFIERS} from '../constants/product_data.js'

export function getProductHealthScoreWithCategory({weight, protein, fats, carbohydrates, energy_value, category}) {
  const normWeight = weight === 0 ? 100 : weight

  const norm = CATEGORY_MODIFIERS[category] || CATEGORY_MODIFIERS.other

  const proteinPer100 = protein / normWeight * 100
  const fatsPer100 = fats / normWeight * 100
  const carbsPer100 = carbohydrates / normWeight * 100
  const energyPer100 = energy_value / normWeight * 100

  let score = 50

  score += Math.min(proteinPer100, 30)
  if (fatsPer100 <= norm.maxFats) score += 10
  else score -= (fatsPer100 - norm.maxFats) * 0.5

  if (carbsPer100 <= norm.maxCarbs) score += 10
  else score -= (carbsPer100 - norm.maxCarbs) * 0.5

  if (energyPer100 <= norm.maxCalories) score += 10
  else score -= (energyPer100 - norm.maxCalories) / norm.maxCalories * 20

  return Math.round(Math.max(0, Math.min(100, score)))
}