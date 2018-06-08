class Utils {
  rect2Rect(collective, player) {
    return (
      collective.getBoundingClientRect().left <=
        player.getBoundingClientRect().left +
          player.getBoundingClientRect().width &&
      collective.getBoundingClientRect().left +
        collective.getBoundingClientRect().width >=
        player.getBoundingClientRect().left &&
      collective.getBoundingClientRect().top +
        collective.getBoundingClientRect().height >=
        player.getBoundingClientRect().top &&
      collective.getBoundingClientRect().top <=
        player.getBoundingClientRect().top +
          player.getBoundingClientRect().height
    );
  }
  rect2parent(player, parentEl, direction) {
    var parentOffset = parentEl.getBoundingClientRect();
    var playerOffset = player.getBoundingClientRect();
    var top = playerOffset.top;
    var left = playerOffset.left;
    var right = playerOffset.right;
    var bottom = playerOffset.bottom;
    var parentTop = parentOffset.top;
    var parentLeft = parentOffset.left;
    var parentRight = parentOffset.right;
    var parentBottom = parentOffset.bottom;
    if (direction == 'left') return left <= parentLeft ? false : true;
    else if (direction == 'right') return right >= parentRight ? false : true;
    else if (direction == 'up') return top <= parentTop ? false : true;
    else if (direction == 'down') return bottom >= parentBottom ? false : true;
  }
  rundomGenerateCollectives(min, max, size, width, height) {
    var collectives = [];
    var stonesQuant = Math.floor(Math.random() * (max - min + 1) + min);
    for (var i = 0; i < stonesQuant; i++) {
      var stoneObj = { x: 0, y: 0 };
      stoneObj.x = Math.floor(Math.random() * (width / size - 0) + 0) * size;
      stoneObj.y = Math.floor(Math.random() * (height / size - 0) + 0) * size;
      stoneObj.size = size;
      collectives.push(stoneObj);
    }
  }
  getCommands(world) {
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
      if (destination.y - player.y > 0) {
        var direction = { left: false, right: false, up: false, down: true };
      } else if (destination.y - player.y < 0) {
        var direction = { left: false, right: false, up: true, down: false };
      } else if (destination.x - player.x > 0) {
        var direction = { left: false, right: true, up: false, down: false };
      } else if (destination.x - player.x < 0) {
        var direction = { left: true, right: false, up: false, down: false };
      } else {
    var direction = { left: false, right: false, up: true, down: false };
  }
      return direction;
    }
    var player = world.player;
    if(world.sickPlants.length==0){
      return { left: false, right: false, up: true, down: false };
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
  }

  
}
export default new Utils();
