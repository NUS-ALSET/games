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
    var player = world.player;
    var closestGem = false;
    world.collectives.forEach(stone => {
      if (closestGem == false) closestGem = stone;
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
        var direction = { left: false, right: true, up: false, down: false };
      } else if (closestGem.x - player.x < 0) {
        var direction = { left: true, right: false, up: false, down: false };
      } else if (closestGem.y - player.y > 64) {
        var direction = { left: false, right: false, up: false, down: true };
      } else if (closestGem.y - player.y < 0) {
        var direction = { left: false, right: false, up: true, down: false };
      }
      return direction;
    }
  }
  getPassengerCommands(world, findPathCallback) {
    //continue calculating path if flag calculating is set to true
    if(world.calculatingPath){
      findPathCallback();
      return;
    }
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
      if (point.x*30 - player.x > 0) {
        var direction = { left: false, right: true, up: false, down: false };
      } else if (point.x*30 - player.x < 0) {
        var direction = { left: true, right: false, up: false, down: false };
      } else if (point.y*30 - player.y > 0) {
        var direction = { left: false, right: false, up: false, down: true };
      } else if (point.y*30 - player.y < 0) {
        var direction = { left: false, right: false, up: true, down: false };
      }
      return direction;
    }
  }
  findShortestPath(arr, refObjs, charId){
    var heuristic = function (a,b){
      var x = a.x - b.x;
      var y = a.y - b.y;
      var d = Math.sqrt( x*x + y*y );
      return d;
    };
    var removeFromArray = function(array,elt){
      for(var i = array.length-1; i>=0; i--){
        if(array[i] == elt){
          array.splice(i,1);
        }
      }
    };
    if(!refObjs.cellPointA){
      refObjs.cellPointA = arr[Math.floor( (refObjs.pointA.y)/30 )][Math.floor( (refObjs.pointA.x)/30 )];
      refObjs.cellPointB = arr[Math.floor( (refObjs.pointB.y)/30 )][Math.floor( (refObjs.pointB.x)/30 )];
      refObjs.openSet = [];
      refObjs.closeSet = [];
      refObjs.path = [];
      refObjs.current = refObjs.pointA;
      refObjs.openSet.push(refObjs.cellPointA);
    }
    //searching path function started here
    if(refObjs.openSet.length>0){
      console.log('finding path iteration');
      var winner = 0;
      for(var i=0; i < refObjs.openSet.length; i++){
        if(refObjs.openSet[i].f < refObjs.openSet[winner].f){
          winner = i;
        }
      }
      var current = refObjs.openSet[winner];
      if(current === refObjs.cellPointB){
        var temp = current;
        refObjs.path.push(temp);
        while(temp.previous[charId]){
          refObjs.path.push(temp.previous[charId]);
          temp = temp.previous[charId];
        }
        console.log('DONE finding path!', refObjs.path.length);
        return refObjs.path;
      }
      removeFromArray(refObjs.openSet,current);
      refObjs.closeSet.push(current);
      var neighbors = current.neighbors;
      for(var i=0; i < neighbors.length; i++){
        var neighbor = neighbors[i];
        
        if(!refObjs.closeSet.includes(neighbor) && !neighbor.wall){
          var tempG = current.g+1;
          var newPath = false;
          if(refObjs.openSet.includes(neighbor)){
            if(tempG<neighbor.g){
              neighbor.g = tempG;
              newPath = true;
            }
          }
          else{
            neighbor.g = tempG;
            newPath = true;
            refObjs.openSet.push(neighbor);
          }
          if(newPath){
            neighbor.h = heuristic(neighbor, refObjs.cellPointB);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous[charId] = current;
          }
        }
      }
    }
  }
}
export default new Utils();
