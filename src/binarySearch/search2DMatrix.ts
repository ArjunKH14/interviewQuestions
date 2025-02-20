// Search a 2D Matrix

// Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
// Output: true

// Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
// Output: false

function searchMatrix(matrix: number[][], target: number): boolean {
  let columns = matrix[0].length - 1;
  let rows = matrix.length - 1;
  let left = 0,
    right = rows;

  let mid = 0;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (target < matrix[mid][0]) {
      right = mid - 1;
    } else if (target > matrix[mid][columns]) {
      left = mid + 1;
    } else {
      break;
    }

    if (!(left <= right)) {
      return false;
    }
  }
  let rowSearch = mid;

  let rowLeft = 0,
    rowRight = columns;

  while (rowLeft <= rowRight) {
    mid = Math.floor((rowLeft + rowRight) / 2);
    if (target === matrix[rowSearch][mid]) {
      return true;
    }
    if (target < matrix[rowSearch][mid]) {
      rowRight = mid - 1;
    } else if (target > matrix[rowSearch][mid]) {
      rowLeft = mid + 1;
    }
  }
  return false;
}

// let matrix = [
//     [1, 3, 5, 7],
//     [10, 11, 16, 20],
//     [23, 30, 34, 60],
//   ],
//   target = 3;
// console.log(searchMatrix(matrix, target));
let matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ],
  target = 5;
console.log(searchMatrix(matrix, target));
