// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
// Example 2:

// Input: nums = [1], k = 1
// Output: [1]

// Constraints:

// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104
// k is in the range [1, the number of unique elements in the array].
// It is guaranteed that the answer is unique.

const topkFrequent = (nums: number[], k: number) => {
  const numMaps: { [key: number]: number } = {};
  for (const num of nums) {
    if (numMaps[num]) {
      numMaps[num] += 1;
    } else {
      numMaps[num] = 1;
    }
  }
  const freq: number[][] = Array.from(Array(nums.length + 1).keys()).map(
    () => []
  );

  Object.entries(numMaps).forEach((prop) => {
    const [key, value] = prop;
    freq[value].push(Number(key));
  });
  console.log(freq);
  let res: number[] = [];
  for (let i = nums.length; i >= 0; i--) {
    if (res.length <= k) {
      res = res.concat(freq[i].slice(0, k - res.length));
    }
  }
  return res;

  //   return Object.entries(numMaps)
  //     .sort((a, b) => b[1] - a[1])
  //     .map((num) => num[0])
  //     .slice(0, k);
};

console.log(topkFrequent([1], 1));
