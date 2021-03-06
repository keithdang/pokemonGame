import _ from "lodash";
export function attack2(victimHP, move, victimType) {
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
export function attack(victimHP, move, victimType, typeCollection) {
  var ratio = effectiveRatio(move.type, victimType, typeCollection);
  var remainingHealth = victimHP - move.attackPoints * ratio;
  if (remainingHealth <= 0) {
    remainingHealth = 0;
  }
  var result = { hpLeft: remainingHealth, ratio: ratio };
  return result;
}
function effectiveRatio(moveType, victimType, typeCollection) {
  var wordSearch = `${moveType}To${victimType}`;
  var found = typeCollection.find(function(element) {
    return element.type === wordSearch;
  });
  var multiplier = 1;
  if (found) {
    multiplier = found.damageMultiplier;
  }
  return multiplier;
}
export function adjustOpponentMoves(opponentMoves, victimType, typeCollection) {
  var updatedMoves = _.cloneDeep(opponentMoves);
  var bestAttack;
  var maxAttackPoints = 0;
  for (var i = 0; i < updatedMoves.length; i++) {
    updatedMoves[i].attackPoints =
      updatedMoves[i].attackPoints *
      effectiveRatio(updatedMoves[i].type, victimType, typeCollection);
    if (updatedMoves[i].attackPoints > maxAttackPoints) {
      maxAttackPoints = updatedMoves[i].attackPoints;
      bestAttack = updatedMoves[i];
    }
  }
  return bestAttack;
}
