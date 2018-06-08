var bot2 =function(world){
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
          var closestPestedPlants = world.pestedPlants[0];
          return getDirection(world.player, closestPestedPlants);
        }
        else{
          return getDirection(world.player, world.factory);
        }
      }
      else if(world.driedPlants.length>0&&world.pestedPlants.length==0){
        if(world.isFilledWithWater){
          var closestDriedPlants = world.driedPlants[0];
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
          var closestDriedPlants = world.driedPlants[0];
          return getDirection(world.player, closestDriedPlants);
        }
        else if(world.isFilledWithPests){
          var closestPestedPlants = world.pestedPlants[0];
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
module.exports = bot2;