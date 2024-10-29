// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

// Notice that the solution set must not contain duplicate triplets.

// Example 1:

// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.
// Example 2:

// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.
// Example 3:

// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.

// Constraints:

// 3 <= nums.length <= 3000
// -105 <= nums[i] <= 105

function threeSum(nums: number[]): number[][] {
  let mainTarget = 0;
  nums.sort((a, b) => {
    return a - b;
  });
  let triplets = new Set<string>();
  let tripletsList: number[][] = [];

  for (let [index, num] of nums.entries()) {
    let target = mainTarget - num;
    let twoSumMap: Map<number, number> = new Map();
    for (let j = 0; j < nums.length; j++) {
      if (j == index) {
        continue;
      }
      let acc = target - nums[j];
      if (twoSumMap.has(acc)) {
        let sorted = [acc, nums[j], num].join(",");
        let val = nums[j] > acc ? `${nums[j]},${acc}` : `${acc},${nums[j]}`;
        triplets.add(`${sorted}`);
      } else {
        twoSumMap.set(nums[j], j);
      }
    }
  }

  triplets.forEach((triplet) => {
    tripletsList.push(triplet.split(",").map((x) => Number(x)));
  });
  return tripletsList;
}
function threeSumv2(nums: number[]): number[][] {
  let mainTarget = 0;
  nums.sort((a, b) => {
    return a - b;
  });
  let triplets = new Set<string>();
  let tripletsList: number[][] = [];

  for (let [i, num] of nums.entries()) {
    let target = mainTarget - num;

    let j = i + 1;
    let k = nums.length - 1;
    while (j < k) {
      if (nums[j] + nums[k] == target) {
        triplets.add(`${nums[i]},${nums[j]},${nums[k]}`);
        j++;
      }
      if (nums[j] + nums[k] > target) {
        k--;
      } else {
        j++;
      }
    }
  }
  triplets.forEach((triplet) => {
    tripletsList.push(triplet.split(",").map((x) => Number(x)));
  });
  return tripletsList;
}

console.log(threeSumv2([-1, 0, 1, 2, -1, -4]));
