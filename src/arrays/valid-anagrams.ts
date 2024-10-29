// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:

// Input: s = "anagram", t = "nagaram"
// Output: true
// Example 2:

// Input: s = "rat", t = "car"
// Output: false

// Constraints:

// 1 <= s.length, t.length <= 5 * 104
// s and t consist of lowercase English letters.

const validAnagrams = (string1: string, string2: string) => {
  if (string1.length !== string2.length) return false;

  const string1Map = new Map<string, number>();
  const string2Map = new Map<string, number>();

  Array.from(Array(string1.length).keys()).forEach((index) => {
    string1Map.set(
      string1[index],
      string1Map.has(string1[index]) ? string1Map.get(string1[index])! + 1 : 1
    );
    string2Map.set(
      string2[index],
      string2Map.has(string2[index]) ? string2Map.get(string2[index])! + 1 : 1
    );
  });
  for (const [key, value] of string1Map) {
    if (!string2Map.has(key) || string2Map.get(key) !== value) {
      return false;
    }
  }
  return true;
};

console.log(validAnagrams("rat", "cat"));
console.log(validAnagrams("anagram", "nagaram"));
