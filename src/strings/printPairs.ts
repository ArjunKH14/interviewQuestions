function printPairs(word: string) {
  let words = word.split(" ");
  let begin = 0;
  let end = words.length - 1;

  while (begin <= end) {
    console.log(
      begin === end ? `${words[begin]}` : `${words[begin]} ${words[end]}`
    );
    begin += 1;
    end -= 1;
  }
}

printPairs("The message here secret");
printPairs("The message here is secret");
printPairs("There a message in text hidden secret is");
