// Given an m x n matrix, return all elements of the matrix in spiral order.

// Example 1:

// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,3,6,9,8,7,4,5]
// Example 2:

// Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// Output: [1,2,3,4,8,12,11,10,9,5,6,7]

// Constraints:

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 10
// -100 <= matrix[i][j] <= 100

function spiralOrder(matrix: number[][]): number[] {
  let visted: number[] = []; // sprialOrder
  let backtracked = 0;
  function sprial(row: number, column: number, latestVisted: number[]) {
    backtracked += 1;
    if (
      row == matrix.length ||
      column == matrix[0].length ||
      row < 0 ||
      column < 0
    ) {
      return;
    }
    if (matrix[row][column] === -200) return;

    latestVisted.push(matrix[row][column]);
    matrix[row][column] = -200;
    column + 1 < matrix[0].length ? sprial(row, column + 1, latestVisted) : "";
    row + 1 < matrix.length ? sprial(row + 1, column, latestVisted) : "";
    column - 1 >= 0 ? sprial(row, column - 1, latestVisted) : "";

    while (row - 1 >= 0 && matrix[row - 1][column] !== -200) {
      row -= 1;
      console.log();
      latestVisted.push(matrix[row][column]);
      matrix[row][column] = -200;
    }
    sprial(row, column + 1, latestVisted);
  }
  sprial(0, 0, visted);

  return visted;
}
// console.log(
//   spiralOrder([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ])
// );
console.log(
  spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
    [21, 22, 23, 24],
  ])
);
