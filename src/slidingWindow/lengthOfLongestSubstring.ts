// Given a string s, find the length of the longest
// substring
//  without repeating characters.

// Example 1:

// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
// Example 2:

// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

function lengthOfLongestSubstring(prices: string): number {
  for (let i = 0; i < prices.length; i++) {}

  let i = 0,
    j = 0;
  let longest = 0;
  let pricesDict: { [key: string]: number } = {};
  while (j < prices.length) {
    if (!(prices[j] in pricesDict && pricesDict[prices[j]] >= i)) {
      pricesDict[prices[j]] = j;
    } else {
      i = pricesDict[prices[j]] + 1;
    }
    pricesDict[prices[j]] = j;
    longest = Math.max(longest, j - i + 1);
    j++;
  }
  return longest;
}

console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));
console.log(lengthOfLongestSubstring(" "));
console.log(lengthOfLongestSubstring(""));
