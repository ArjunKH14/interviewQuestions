function printDuplicate(sentence: string) {
  const words = sentence.split(/([^\w]+)/).filter(Boolean);
  console.log(words);

  let newString = "";
  let format = /^[^\w]+$/;
  let setWord = new Set();
  words.forEach((word) => {
    // if(wordformat.test)
    if (format.test(word)) {
      newString = newString.trim() + word;
    } else {
      if (!setWord.has(word)) {
        setWord.add(word);
        newString += ` ${word}`;
      } else {
        setWord.delete(word);
      }
    }
  });
  console.log(newString);
}

printDuplicate("Hello Hello, World");
printDuplicate("Code Code! Nice Code");
printDuplicate("Programmming Code Programmming!");
