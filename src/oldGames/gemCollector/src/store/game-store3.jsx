import React from 'react';
import { extendObservable } from 'mobx';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

class GameStore {
  constructor() {
    extendObservable(this, {
      characterPosition: [{ x: 100, y: 100 }, { x: 200, y: 200 }],
      characterState: [11, 10],
      timeStamp: [Date.now(), Date.now()],
      stonesData: [],
      timeStampData: Date.now(),
      score: [0, 0],
      mode: 'play',
      config: { speed: 1, minGems: 4, maxGems: 8, gatherToWin: 10 }
    });
  }
  
  setcharacterPosition(position, index) {
    this.characterPosition[index] = position;
  }

  createNewStones() {
    let newTimestamp = Date.now();
    if (newTimestamp - this.timeStampData >= 5000) {
      this.timeStampData = Date.now();
      if (this.stonesData.length === 0) {
        let stonesQuant = Math.floor(
          Math.random() * (this.config.maxGems - this.config.minGems + 1) + this.config.minGems,
        );
        for (let i = 0; i < stonesQuant; i++) {
          let stoneObj = { x: 0, y: 0 };
          stoneObj.x = Math.floor(Math.random() * (8 - 0 + 1) + 0) * 100;
          stoneObj.y = Math.floor(Math.random() * (4 - 0 + 1) + 0) * 100;
          this.stonesData.push(stoneObj);
        }
      }
    }
  }

  checkIfObjectInsideTheScreen(charKey, direction, mode) {
    let el = document.getElementById('character-' + charKey + '-' + mode);
    let parentEl = el.parentElement;
    el = document.getElementById('character-' + charKey + '-' + mode).childNodes[0];
    let parentOffset = parentEl.getBoundingClientRect();
    let viewportOffset = el.getBoundingClientRect();
    let top = viewportOffset.top;
    let left = viewportOffset.left;
    let right = viewportOffset.right;
    let bottom = viewportOffset.bottom;

    let parentTop = parentOffset.top;
    let parentLeft = parentOffset.left;
    let parentRight = parentOffset.right;
    let parentBottom = parentOffset.bottom;
    if (direction === 'left') return left <= parentLeft ? false : true;
    else if (direction === 'right') return right >= parentRight ? false : true;
    else if (direction === 'top') return top <= parentTop ? false : true;
    else if (direction === 'bottom') return bottom >= parentBottom ? false : true;
  }

  rect2Rect(coin, player) {
    return (
      coin.getBoundingClientRect().left <= player.getBoundingClientRect().left + player.getBoundingClientRect().width &&
      coin.getBoundingClientRect().left + coin.getBoundingClientRect().width >= player.getBoundingClientRect().left &&
      coin.getBoundingClientRect().top + coin.getBoundingClientRect().height >= player.getBoundingClientRect().top &&
      coin.getBoundingClientRect().top <= player.getBoundingClientRect().top + player.getBoundingClientRect().height
    );
  }

  removeHittenGem(gemId, playerId) {
    this.stonesData.splice(gemId, 1);
    this.score[playerId]++;
  }
}

export default new GameStore();
