var level3 =function(world){
	var getIllest = function(player, arrayOfPlants){
		var illestPlant = false;
		arrayOfPlants.forEach(plant => {
			if (illestPlant == false) illestPlant = plant;
			else if (
				plant.health<illestPlant.health
			) {
				illestPlant = plant;
			}
		});
		return illestPlant;
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
			return getDirection(world.player, {x:world.factory.x+world.config.factorySize-1,y:world.factory.y+world.config.factorySize-1});
		}
		else if(world.isFilledWithPests){
			var closestPestedPlants = getIllest(world.player, world.pestedPlants);
			return getDirection(world.player, closestPestedPlants);
		}
		else{
			return getDirection(world.player, {x:world.factory.x+world.config.factorySize-1,y:world.factory.y+world.config.factorySize-1});
		}
	}
	else if(world.driedPlants.length>0&&world.pestedPlants.length==0){
		if(world.isFilledWithWater){
			var closestDriedPlants = getIllest(world.player, world.driedPlants);
			return getDirection(world.player, closestDriedPlants);
		}
		else if(world.isFilledWithPests){
			return getDirection(world.player, {x:world.water.x+world.config.lakeSize-1,y:world.water.y+world.config.lakeSize-1});
		}
		else{
			return getDirection(world.player, {x:world.water.x+world.config.lakeSize-1,y:world.water.y+world.config.lakeSize-1});
		}
	}
	else{
		if(world.isFilledWithWater&&world.botIndex==1){
			var closestDriedPlants = getIllest(world.player, world.driedPlants);
			return getDirection(world.player, closestDriedPlants);
		}
		else if(world.isFilledWithPests&&world.botIndex==2){
			var closestPestedPlants = getIllest(world.player, world.pestedPlants);
			return getDirection(world.player, closestPestedPlants);
		}
		else if(world.isFilledWithPests&&world.botIndex==1){
			return getDirection(world.player, {x:world.water.x+world.config.lakeSize-1,y:world.water.y+world.config.lakeSize-1});
		}
		else if(world.isFilledWithWater&&world.botIndex==2){
			return getDirection(world.player, {x:world.factory.x+world.config.factorySize-1,y:world.factory.y+world.config.factorySize-1});
		}
		else{
			return getDirection(world.player, {x:world.water.x+world.config.lakeSize-1,y:world.water.y+world.config.lakeSize-1});
		}
	}
}
module.exports = level3;