export const defaultJavascriptFunctionCode = `function getPlayersCommands(world){
    const player = world.player;
    let closestGem = false;
    let direction = "";
    world.collectives.forEach(stone => {
      if (closestGem === false) closestGem = stone;
      else if (
        Math.sqrt(
          Math.pow(player.x - closestGem.x, 2) +
            Math.pow(player.y - closestGem.y, 2)
        ) >
        Math.sqrt(
          Math.pow(player.x - stone.x, 2) + Math.pow(player.y - stone.y, 2)
        )
      ) {
        closestGem = stone;
      }
    });
    if (closestGem) {
      if (closestGem.x - player.x > 64) {
        direction = "right";
      } else if (closestGem.x - player.x < 0) {
        direction = "left";
      } else if (closestGem.y - player.y > 64) {
        direction = "down";
      } else if (closestGem.y - player.y < 0) {
        direction = "up";
      }
      return direction;
    }
}`;
export const defaultPythonCodeFunction=`import random
def getPlayersCommands(world):
  print(window.JSON.stringify(world))
  foo = ['RIGHT', 'LEFT', 'UP','DOWN']
  result = random.choice(foo)
  print(result)
  return result`;
