// You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

// Return the length of the longest substring containing the same letter you can get after performing the above operations.

// Example 1:

// Input: s = "ABAB", k = 2
// Output: 4
// Explanation: Replace the two 'A's with two 'B's or vice versa.
// Example 2:

// Input: s = "AABABBA", k = 1
// Output: 4
// Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
// The substring "BBBB" has the longest repeating letters, which is 4.
// There may exists other ways to achieve this answer too.

function characterReplacement(word: string, replace: number) {
  // frequency
  let wordDict = {};
  let mostRepeatedChar = [];
  let maxChar = 0;
  for (let value of word) {
    if (value in wordDict) {
      wordDict[value] += 1;
      if (wordDict[value] >= maxChar) {
        maxChar = wordDict[value];
      }
    } else {
      wordDict[value] = 1;
    }
  }
  console.log(maxChar);
  Object.entries(wordDict).filter((entry) => {
    let [key, value] = entry;
    if (value === maxChar) {
      console.log(key);
      mostRepeatedChar.push(key);
    }
  });

  let mostRepeatedChar1 = new Set(word.split(""));
  let longestSubs = 0;

  mostRepeatedChar.forEach((value) => {
    console.log("value---" + value);
    let start = 0,
      end = word.length - 1;

    let noOfDownSize = word.length - replace - maxChar;

    while (noOfDownSize > 0) {
      console.log(`noOfDownSize:${noOfDownSize}, start: ${start},end: ${end} `);
      if (word[end] !== value) {
        end -= 1;
        noOfDownSize -= 1;
      } else if (word[start] !== value) {
        start += 1;
        noOfDownSize -= 1;
      } else {
        let tempStart = start,
          tempEnd = end;
        while (word[tempEnd] === value && word[tempStart] === value) {
          tempEnd = tempEnd -= 1;
          tempStart = tempStart += 1;
          if (word[tempEnd] !== value) {
            end = tempEnd;
            break;
          }
          if (word[tempStart] !== value) {
            start = tempStart;
            break;
          }
        }
      }
    }
    console.log(`${end} - ${start}`);
    longestSubs = Math.max(longestSubs, end - start + 1);

    console.log(longestSubs);
    console.log(`-----------`);
  });
  //   console.log(longestSubs);
  console.log("maxChar");
  console.log(maxChar);
  return longestSubs;
}
// characterReplacement("ABAB", 2);
// characterReplacement("AABABBA", 1);
// characterReplacement("ABCDE", 1);
// characterReplacement("BAAACDBB", 2);
characterReplacement(
  "KRSCDCSONAJNHLBMDQGIFCPEKPOHQIHLTDIQGEKLRLCQNBOHNDQGHJPNDQPERNFSSSRDEQLFPCCCARFMDLHADJADAGNNSBNCJQOF",
  4
);
