function findRotSerch(nums: number[], target: number): number {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] > nums[right] || nums[left] > nums[mid]) {
      if (nums[mid] > nums[right])
        if (target <= nums[right] || target > nums[mid]) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      else {
        if (target >= nums[left] || target < nums[mid]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }
    } else {
      if (target >= nums[mid]) {
        left = mid + 1;
      } else right = mid - 1;
    }
  }

  return -1;
}

console.log(findRotSerch([3, 1, 2], 3));
console.log(findRotSerch([4, 5, 6, 7, 0, 1, 2], 0));
console.log(findRotSerch([11, 13, 15, 17], 11));
console.log(findRotSerch([4, 5, 6, 7, 8, 1, 2, 3], 9));
console.log(findRotSerch([5, 1, 3], 3));
console.log(findRotSerch([1, 3], 3));
