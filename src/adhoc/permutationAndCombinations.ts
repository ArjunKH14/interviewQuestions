function generateAllPermutation(
  word: string,
  combinatorics: Map<string, number>
) {
  let chars: string[] = word.toLocaleLowerCase().split("");
  let combinations: string[] = [];

  function frequencyMap(word: string) {
    let frequency: Map<string, number> = new Map();

    for (let char of word) {
      frequency.set(char, frequency.has(char) ? frequency.get(char)! + 1 : 1);
    }
    return frequency;
  }

  function permuted(basicWord: string) {
    if (word.length == basicWord.length) {
      let frequency = frequencyMap(basicWord);

      let frequencyMatch = true;
      for (let [key, value] of frequency.entries()) {
        if (!combinatorics.has(key) || !(combinatorics.get(key) === value)) {
          console.log("here");
          frequencyMatch = false;
          break;
        }
      }
      if (frequencyMatch) {
        combinations.push(basicWord);
      }
      //   combinations.push(basicWord);
      return;
    }
    for (let char of chars) {
      let newWord: string = basicWord + char;
      let frequency = frequencyMap(newWord);
      permuted(newWord);
      //   if (frequency.get(char) == combinatorics.get(char))
    }
  }
  permuted("");

  return combinations;
}

console.log(
  generateAllPermutation(
    "Arjun",
    new Map<string, number>([
      ["a", 4],
      ["r", 1],
      ["j", 1],
      ["u", 0],
      ["n", 0],
    ])
  )
);
