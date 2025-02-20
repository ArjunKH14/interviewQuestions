function minEatingSpeed(piles: number[], h: number): number {
  let max = 0;

  max = piles.reduce((acc, curr) => {
    return curr > acc ? curr : acc;
  }, 0);

  let leftPointer = 1,
    rightPointer = max,
    speed = 0;

  while (leftPointer <= rightPointer) {
    let trySpeed = Math.ceil((leftPointer + rightPointer) / 2);

    let hoursAcc = 0;
    for (let pile of piles) {
      hoursAcc += Math.ceil(pile / trySpeed);
      if (hoursAcc > h) break;
    }

    if (hoursAcc <= h) {
      rightPointer = trySpeed - 1;
      speed = trySpeed;
    } else if (hoursAcc > h) {
      leftPointer = trySpeed + 1;
    }
  }
  return speed;
}

let piles = [3, 6, 7, 11];
let h = 8;
console.log(minEatingSpeed(piles, h));

piles = [30, 11, 23, 4, 20];
h = 5;
console.log(minEatingSpeed(piles, h));
h = 6;
console.log(minEatingSpeed(piles, h));

piles = [4456];
h = 4455;
console.log(minEatingSpeed(piles, h));
