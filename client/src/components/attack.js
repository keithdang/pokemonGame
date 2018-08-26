export default function(victimHP, move, victimType) {
  var multiplier = 1;
  if (victimType && victimType[0] && victimType[0].damageMultiplier) {
    multiplier = victimType[0].damageMultiplier;
  }
  var remainingHealth = victimHP - move.attackPoints * multiplier;
  if (remainingHealth <= 0) {
    remainingHealth = 0;
  }
  return remainingHealth;
}
