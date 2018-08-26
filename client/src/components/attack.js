export default function(victimHP, move, victimType) {
  var remainingHealth = victimHP - move.attackPoints;
  if (remainingHealth <= 0) {
    remainingHealth = 0;
  }
  return remainingHealth;
}
