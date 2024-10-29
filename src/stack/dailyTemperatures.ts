// 739. Daily Temperatures
// Medium
// Topics
// Companies
// Hint
// Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

// Example 1:

// Input: temperatures = [73,74,75,71,69,72,76,73]
// Output: [1,1,4,2,1,1,0,0]
// Example 2:

// Input: temperatures = [30,40,50,60]
// Output: [1,1,1,0]
// Example 3:

// Input: temperatures = [30,60,90]
// Output: [1,1,0]

// Constraints:

// 1 <= temperatures.length <= 105
// 30 <= temperatures[i] <= 100

function dailyTemperatures(temperatures: number[]): number[] {
  let answer = [];

  let stack: number[] = [temperatures[0]];

  function tempCalc(stack: number[], comparator: number) {
    let tempAnswer = [];
    if (comparator === temperatures.length) {
      answer = answer.concat(tempAnswer.reverse());
      return;
    }
    while (stack.at(-1) < temperatures[comparator]) {
      console.log(
        `stack.at(-1) = ${stack.at(-1)} < temperatures[${comparator}]) = ${
          temperatures[comparator]
        }`
      );
      tempAnswer.push(comparator - (stack.length + answer.length) + 1);
      stack.pop();
      console.log(`tempAnswer = ${tempAnswer}`);
      answer = answer.concat(tempAnswer.reverse());
      console.log(`answer = ${answer}`);
    }
    stack.push(temperatures[comparator]);
    tempCalc(stack, comparator + 1);
  }
  tempCalc(stack, 1);
  //   for (let [open, value] of temperatures.entries()) {
  //     let answerLength = answer.length;
  //     for (
  //       let comparator = open + 1;
  //       comparator < temperatures.length;
  //       comparator++
  //     ) {
  //       if (value < temperatures[comparator]) {
  //         answer.push(comparator - open);
  //         break;
  //       }
  //     }
  //     if (answerLength == answer.length) {
  //       answer.push(0);
  //     }
  //   }
  return answer;
}

function dailyTemperatures1(temperatures: number[]): number[] {
  let answer = Array.from(Array(temperatures.length).keys()).map(() => 0);

  let stack = [];
  let remainingStack = [...stack];
  let indexToSearch: number[] = [];
  let remIndexToSearch: number[] = [];

  temperatures.forEach((temperature, index) => {
    let start = 0;
    console.log(`stack = ${stack}`);
    while (start < stack.length) {
      if (stack[start] < temperature) {
        let answerIndex = indexToSearch[start];
        answer[answerIndex] = index - answerIndex;
        remainingStack = [
          ...remainingStack.slice(0, start),
          ...remainingStack.slice(start + 1),
        ];
        remIndexToSearch = [
          ...indexToSearch.slice(0, start),
          ...indexToSearch.slice(start + 1),
        ];
      }
      start += 1;
    }
    remainingStack.push(temperature);
    stack = remainingStack;
    remIndexToSearch.push(index);
    indexToSearch = remIndexToSearch;
  });

  return answer;
}

console.log(dailyTemperatures1([73, 74, 75, 71, 69, 72, 76, 73]));

// []
