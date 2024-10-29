// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// Example 1:

// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]
// Example 2:

// Input: n = 1
// Output: ["()"]

// Constraints:

// 1 <= n <= 8

function isValid1(word: string): boolean {
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

function generateParenthesis(maxNumber: number): string[] {
  let characters = ["(", ")"];
  let generated: string[] = [];

  function generate(generated: string[], word: string) {
    if (word.length === maxNumber * 2) {
      return;
    }
    for (let char of characters) {
      let latestWord = word + char;
      if (latestWord.length === maxNumber * 2) {
        if (isValid1(word + char)) generated.push(word + char);
      }

      generate(generated, word + char);
    }
  }

  generate(generated, "");

  return generated;
}
function generateParenthesis1(n: number): string[] {
  const result: string[] = [];
  const backtrack = (curr: string, open: number, close: number) => {
    if (curr.length === n * 2) {
      console.log(`${curr.length} = result = ${result}`);
      result.push(curr);
      return;
    }
    console.log(`curr= ${curr} `);
    if (open < n) {
      console.log(` open < ${n} = ${curr}` + "(");
      backtrack(curr + "(", open + 1, close);
    }

    if (close < open) {
      console.log(` close < open = ${curr}` + ")");
      backtrack(curr + ")", open, close + 1);
    }
  };

  backtrack("", 0, 0);
  return result;
}
console.log(generateParenthesis1(2));
