function verticalWord(input: string) {
  let words = input.split(" ");
  words.sort();
  let rows = Math.ceil(words.length / 3);
  let remainingCells = words.length % 3;
  console.log("remainingCells" + remainingCells);
  let matrix = [[], [], []];
  let verticalLength = 0;
  let distribute = remainingCells > 0;
  for (let word of words) {
    if (matrix[verticalLength].length === rows - 1) {
      if (remainingCells) {
        console.log("here");
        remainingCells -= 1;
      } else if (distribute) {
        verticalLength += 1;
        verticalLength = verticalLength % 3;
      }
    }
    matrix[verticalLength].push(word);

    if (matrix[verticalLength].length === rows) {
      verticalLength += 1;
      verticalLength = verticalLength % 3;
    }
  }
  let colHighest = matrix.map((row) => {
    let highest = row.reduce(
      (acc, current) => Math.max(acc, current.length ?? 0),
      0
    );
    return highest;
  });
  console.log(matrix);
  for (let i = 0; i < rows; i++) {
    // " ".repeat(colHighest[i] - col[i].length))
    let rows = matrix
      .map((col, index) => {
        return `${col[i] ?? ""}${" ".repeat(
          colHighest[index] - (col[i]?.length ?? 0)
        )}`;
      })
      .join(" ");

    console.log(` | ${rows} |`);
  }
}

verticalWord("elephant cat caterpillar frog pie pizza");
verticalWord("a b c d e f g h i j k l m n o p q");
