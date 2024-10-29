// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

// You must write an algorithm that runs in O(n) time and without using the division operation.

// Example 1:

// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]

//[1, 1, 2, 6]
//[24,12,4,1]
//[]
//[]
// Example 2:

// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]

// Constraints:

// 2 <= nums.length <= 105
// -30 <= nums[i] <= 30
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
function productExceptSelf(nums: number[]): number[] {
  const product = nums.map((val, index) => {
    console.log([...nums.slice(0, index), ...nums.slice(index + 1)]);
    const exceptArray = [
      ...nums.slice(0, index),
      ...nums.slice(index + 1),
    ].reduce((acc, x) => {
      acc = acc * x;
      return acc;
    }, 1);
    if (exceptArray == 0) return 0;
    return exceptArray;
  });
  // O(n^2)
  return product;
}

function productExceptSelf2(nums: number[]): number[] {
  let leftArray = 1,
    rightArray = 1,
    prodArray = [1];

  for (let index = 0; index < nums.length; index++) {
    // leftArray.push(leftArray[index - 1] * nums[index - 1]);
    prodArray[index] = leftArray;
    leftArray *= nums[index];
  }
  for (let index = nums.length - 1; index >= 0; index--) {
    prodArray[index] *= rightArray;
    rightArray *= nums[index];
  }

  return prodArray;
}

function productExceptSelf3(nums: number[]): number[] {
  let resultArray = [];
  let leftArray = [];
  let rightArray = [];
  nums.forEach((x) => {
    resultArray.push(1);
    leftArray.push(1);
    rightArray.push(1);
  });

  //// [1,1,1,1]

  // [1,2,3,4]
  // [1,1,2,6]    result  left

  // [1,2,3,4,1]
  // [1,2,3,4]
  // [24,12,4,1] result right

  // []
  let temp = 1;
  for (let i = 0; i < nums.length; i++) {
    leftArray[i] = temp;
    temp = temp * nums[i];
  }

  temp = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    rightArray[i] = temp;
    temp = temp * nums[i];
  }

  for (let i = 0; i < nums.length; i++) {
    resultArray[i] = leftArray[i] * rightArray[i];
  }

  return resultArray;
}

console.log(productExceptSelf2([1, 2, 3, 4]));
console.log(productExceptSelf2([-1, 1, 0, -3, 3]));
