var bot3 =function(world){
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
  if(world.isFilledWithPests&&world.pestedPlants[0]){
    return getDirection(world.player, world.pestedPlants[Math.floor(Math.random()*world.pestedPlants.length)]);
  }
  else if(world.isFilledWithWater&&world.driedPlants[0]){
    return getDirection(world.player, world.driedPlants[Math.floor(Math.random()*world.driedPlants.length)]);
  }
  else if(!world.isFilledWithPests&&!world.isFilledWithWater){
    if(Math.random()>0.5)
      return getDirection(world.player, world.water);
  else
      return getDirection(world.player, world.factory);
  }
  else{
    return {down:true};
  }
}
module.exports = bot3;