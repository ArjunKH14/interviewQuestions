function findMinRot(nums: number[]): number {
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] < nums[right]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return nums[left];
}

console.log(findMinRot([3, 1, 2]));
console.log(findMinRot([4, 5, 6, 7, 0, 1, 2]));
console.log(findMinRot([11, 13, 15, 17]));
