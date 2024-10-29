// Given an array of strings strs, group the anagrams together. You can return the answer in any order.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:

// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// Example 2:

// Input: strs = [""]
// Output: [[""]]
// Example 3:

// Input: strs = ["a"]
// Output: [["a"]]

const groupAnagrams = (words: string[]): string[][] => {
  let storeMaps: { [key: string]: string[] } = {};

  for (const word of words) {
    const sortedWord = word.split("").sort().join("");
    if (storeMaps[sortedWord] == undefined) {
      storeMaps[sortedWord] = [word];
    } else {
      storeMaps[sortedWord]?.push(word);
    }
  }
  return Object.values(storeMaps);
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
