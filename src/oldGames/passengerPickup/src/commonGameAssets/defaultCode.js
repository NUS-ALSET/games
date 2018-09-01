export const defaultJavascriptFunctionCode = `function getPlayersCommands(world, findPathCallback){
    //continue calculating path if flag calculating is set to true
    if(world.calculatingPath){
    findPathCallback();
    return;
    }
    var player = world.player;
    var closestPassenger = false;
    if(world.path.length === 0&&!world.passenger){
    //find closest passenger if path is empty
    world.collectives.forEach(passenger => {
        if (closestPassenger === false)
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
        findPathCallback(closestPassenger, "passengerLocation");
    }
    }
    else if(world.path.length === 0&&world.passenger){
    //finding path to passenger takeof destination if passenger is picked up
    findPathCallback(world.passenger, "takeofLocation");
    }
    else if(world.path.length>0){
    //going to the next cell of current path (once bot reaches this point it will be deleted automaticly)
    var point = world.path[world.path.length-1];
    if (point.x*30 - player.x > 0) {
        var direction = 'right';
    } else if (point.x*30 - player.x < 0) {
        var direction = 'left';
    } else if (point.y*30 - player.y > 0) {
        var direction = 'down';
    } else if (point.y*30 - player.y < 0) {
        var direction = 'up';
    }
    return direction;
    }
}`;
export const defaultPythonCodeFunction=`import random
def getPlayersCommands(world,findPathCallback):
  foo = ['RIGHT', 'LEFT', 'UP','DOWN']
  result = random.choice(foo)
  print(result)
  return result`;
