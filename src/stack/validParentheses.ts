// Valid Parentheses
// Easy
// Topics
// Companies
// Hint
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// Example 1:

// Input: s = "()"
// Output: true
// Example 2:

// Input: s = "()[]{}"
// Output: true
// Example 3:

// Input: s = "(]"
// Output: false

//"["

// Use Testcase

// Constraints:

// 1 <= s.length <= 104
// s consists of parentheses only '()[]{}'.

function isValid(word: string): boolean {
  let validParams = new Map<string, string>([
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
  ]);

  let params: string[] = [];
  if (word.length % 2 !== 0) {
    return false;
  }
  for (let ch of word) {
    if (validParams.has(ch)) {
      params.push(ch);
      continue;
    }

    let poppedValue = params.pop();

    if (poppedValue == undefined) {
      return false;
    }
    if (validParams.get(poppedValue) !== ch) {
      return false;
    }
  }
  return params.length === 0;
}

console.log(isValid("()[]{}"));
console.log(isValid("()"));
console.log(isValid("(]"));
console.log(isValid("["));
console.log(isValid("({[]})()"));
console.log(isValid("(("));
console.log(isValid("))"));
