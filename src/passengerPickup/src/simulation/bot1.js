var bot1 = function(world, findPathCallback) {
	//continue calculating path if flag calculating is set to true
	var player = world.player;
	var closestPassenger = false;
	if(world.path.length == 0&&!world.passenger){
		//find closest passenger if path is empty
		world.collectives.forEach(passenger => {
			if (closestPassenger == false)
				closestPassenger = passenger;
			else if (
				Math.sqrt(
					Math.pow(player.x - closestPassenger.x, 2) +
					Math.pow(player.y - closestPassenger.y, 2)
				) >
				Math.sqrt(
					Math.pow(player.x - passenger.x, 2) + Math.pow(player.y - passenger.y, 2)
				)
			) {
				closestPassenger = passenger;
			}
		});
		if(closestPassenger){
			//finding path to the closest passenger
			findPathCallback(closestPassenger, 'passengerLocation');
		}
	}
	else if(world.path.length == 0&&world.passenger){
		//finding path to passenger takeof destination if passenger is picked up
		findPathCallback(world.passenger, 'takeofLocation');
	}
	else if(world.path.length>0){
		//going to the next cell of current path (once bot reaches this point it will be deleted automaticly)
		var point = world.path[world.path.length-1];
		if (point.x - player.x > 0) {
			var direction = { left: false, right: true, up: false, down: false };
		} else if (point.x - player.x < 0) {
			var direction = { left: true, right: false, up: false, down: false };
		} else if (point.y - player.y > 0) {
			var direction = { left: false, right: false, up: false, down: true };
		} else if (point.y - player.y < 0) {
			var direction = { left: false, right: false, up: true, down: false };
		}
		return direction;
	}
}
module.exports = bot1;