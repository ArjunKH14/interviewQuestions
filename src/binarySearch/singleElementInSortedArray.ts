// Example 1:

// Input: nums = [1,1,2,3,3,4,4,8,8]
// Output: 2
// Example 2:

// Input: nums = [3,3,7,7,10,11,11]
// Output: 10

function singleNonDuplicate(nums: number[]): number {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    console.log(`${left} ${right} ${mid}`);
    if (left === right) {
      return nums[mid];
    }

    //Even No
    if (mid % 2 == 0) {
      if (nums[mid] !== nums[mid + 1]) {
        right = mid;
      } else left = mid + 2;
    } else {
      if (nums[mid] !== nums[mid - 1]) right = mid - 1;
      else left = mid + 1;
    }
  }
}

console.log(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8]));

console.log(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11]));
