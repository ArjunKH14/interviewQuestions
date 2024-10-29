// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

// Example 1:

// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
// Example 2:

// Input: height = [4,2,0,3,2,5]
// Output: 9

// Constraints:

// n == height.length
// 1 <= n <= 2 * 104
// 0 <= height[i] <= 105

function trap(height1: number[]): number {
  const calaculate = (height: number[]) => {
    let leftPointer = 0,
      rightPointer = 0;
    let trappedWater = 0;
    let obstacles = 0;
    while (rightPointer < height.length) {
      if (leftPointer !== rightPointer) {
        if (height[leftPointer] > height[rightPointer]) {
          obstacles += height[rightPointer];
        } else {
          let overAllWater =
            Math.min(height[leftPointer], height[rightPointer]) *
            (rightPointer - leftPointer - 1);

          trappedWater += overAllWater - obstacles;
          obstacles = 0;
          leftPointer = rightPointer;
        }
      }

      if (height[leftPointer] === 0) {
        leftPointer++;
      }

      rightPointer++;
    }

    if (leftPointer < height.length - 1) {
    }
    return { trappedWater, leftPointer, rightPointer };
  };

  let {
    trappedWater: actualTrappeds,
    leftPointer,
    rightPointer,
  } = calaculate(height1);
  if (leftPointer < height1.length - 1) {
    let { trappedWater } = calaculate(height1.slice(leftPointer).reverse());
    actualTrappeds += trappedWater;
  }
  return actualTrappeds;
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
console.log(trap([4, 2, 0, 3, 2, 5]));
console.log(trap([4, 2, 3]));
console.log(trap([2, 0, 2]));
