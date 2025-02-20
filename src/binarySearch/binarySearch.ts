// Binary Search
function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

console.log(search([-1, 0, 3, 5, 9, 12], 9));
console.log(search([-1, 0, 3, 5, 9, 12], 2));

// Example 1:

// Input: nums = [-1,0,3,5,9,12], target = 9
// Output: 4
// Explanation: 9 exists in nums and its index is 4
// Example 2:

// Input: nums = [-1,0,3,5,9,12], target = 2
// Output: -1
// Explanation: 2 does not exist in nums so return -1
