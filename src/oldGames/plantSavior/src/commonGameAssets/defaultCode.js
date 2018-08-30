export const defaultJavascriptFunctionCode = `function getPlayersCommands(world){
    var getClosest = function(player, arrayOfPlants){
        var closestPlant = false;
        arrayOfPlants.forEach(plant => {
          if (closestPlant == false) closestPlant = plant;
          else if (
            Math.sqrt(
              Math.pow(player.x - closestPlant.x, 2) +
                Math.pow(player.y - closestPlant.y, 2)
            ) >
            Math.sqrt(
              Math.pow(player.x - plant.x, 2) + Math.pow(player.y - plant.y, 2)
            )
          ) {
            closestPlant = plant;
          }
        });
        return closestPlant;
      }
      var getDirection = function(player, destination){
          var direction='down'
        if (destination.y - player.y > 0) {
           direction = 'down';
        } else if (destination.y - player.y < 0) {
           direction = 'up';
        } else if (destination.x - player.x > 0) {
           direction = 'right';
        } else if (destination.x - player.x < 0) {
           direction ='left';
        } else {
           direction = 'down';
        }
        return direction;
      }
      var player = world.player;
      if(world.sickPlants.length==0){
        return 'up';
      }
      else if(world.driedPlants.length==0&&world.pestedPlants.length>0){
        if(world.isFilledWithWater){
          return getDirection(world.player, world.factory);
        }
        else if(world.isFilledWithPests){
          var closestPestedPlants = getClosest(world.player, world.pestedPlants);
          return getDirection(world.player, closestPestedPlants);
        }
        else{
          return getDirection(world.player, world.factory);
        }
      }
      else if(world.driedPlants.length>0&&world.pestedPlants.length==0){
        if(world.isFilledWithWater){
          var closestDriedPlants = getClosest(world.player, world.driedPlants);
          return getDirection(world.player, closestDriedPlants);
        }
        else if(world.isFilledWithPests){
          return getDirection(world.player, world.water);
        }
        else{
          return getDirection(world.player, world.water);
        }
      }
      else{
        if(world.isFilledWithWater){
          var closestDriedPlants = getClosest(world.player, world.driedPlants);
          return getDirection(world.player, closestDriedPlants);
        }
        else if(world.isFilledWithPests){
          var closestPestedPlants = getClosest(world.player, world.pestedPlants);
          return getDirection(world.player, closestPestedPlants);
        }
        else{
            if(Math.random()>0.5)
                return getDirection(world.player, world.water);
            else
                return getDirection(world.player, world.factory);
        }
      }
}`;
export const defaultPythonCodeFunction=`import random
def getPlayersCommands(world):
  foo = ['RIGHT', 'LEFT', 'UP','DOWN']
  result = random.choice(foo)
  print(result)
  return result`;
