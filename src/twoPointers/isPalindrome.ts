// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

// Given a string s, return true if it is a palindrome, or false otherwise.

// Example 1:

// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.
// Example 2:

// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.
// Example 3:

// Input: s = " "
// Output: true
// Explanation: s is an empty string "" after removing non-alphanumeric characters.
// Since an empty string reads the same forward and backward, it is a palindrome.

function isPalindrome(s: string) {
  s = s.replace(/[^0-9a-z]/gi, "");
  let word = s.toLowerCase();
  console.log(word);
  let i = 0,
    j = word.length - 1;
  while (i <= j) {
    if (word[i] !== word[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}
console.log(isPalindrome("A man, a plan, a canal: Panama"));


//Re Wrote on Feb 21st
function isPalindrome2(phrase: string) {

  phrase = phrase.toLowerCase();
  phrase= phrase.replace(/[^0-9a-z]/gi, "");
  console.log(phrase);

  let left = 0, right = phrase.length - 1;

  while(left<right) {
    if(phrase[left]!==phrase[right]) {
      return false;
    }
    left+=1;
    right-=1;
  }

  return true;
}
console.log(isPalindrome2("A man, a plan, a canal: Panama"));

