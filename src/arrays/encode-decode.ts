// String Encode and Decode
// Design an algorithm to encode a list of strings to a single string. The encoded string is then decoded back to the original list of strings.

// Please implement encode and decode

// Example 1:

// Input: ["neet","code","love","you"]

// Output:["neet","code","love","you"]
// Example 2:

// Input: ["we","say",":","yes"]

// Output: ["we","say",":","yes"]
// Constraints:

// 0 <= strs.length < 100
// 0 <= strs[i].length < 200
// strs[i] contains only UTF-8 characters.

class Solution {
  /**
   * @param {string[]} strs
   * @returns {string}
   */
  randomValue = Math.random();
  joinString = `$$${this.randomValue}$$`;
  encode(strs: string[]) {
    if (strs.length == 0) {
      return null;
    }
    return strs.join(this.joinString);
  }

  /**
   * @param {string} str
   * @returns {string[]}
   */
  decode(str: string) {
    if (str === null) {
      return [];
    }
    return str.split(this.joinString);
  }
}
