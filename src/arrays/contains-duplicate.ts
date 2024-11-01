// Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

// Example 1:

// Input: nums = [1,2,3,1]
// Output: true
// Example 2:

// Input: nums = [1,2,3,4]
// Output: false
// Example 3:

// Input: nums = [1,1,1,3,3,4,3,2,4,2]
// Output: true

// Constraints:

// 1 <= nums.length <= 105
// -109 <= nums[i] <= 109

const hasDuplicate = (target: number[]) => {
  const setTarget = new Set(target);

  return setTarget.size !== target.length;
};

const hasDuplicate2 = (target: number[]) => {
  const setTarget = new Set();

  for (let i = 0; i < target.length; i++) {
    if (setTarget.has(target[i])) {
      return true;
    }
    setTarget.add(target[i]);
  }

  return false;
};

console.log(hasDuplicate([1, 2, 3, 1])); // true
console.log(hasDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // true
console.log(hasDuplicate([1, 2, 3, 4])); // false
