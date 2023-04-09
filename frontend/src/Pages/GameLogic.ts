type InputValue = any;

export default function isPartOfSOS(
  matrix: Array<Array<InputValue>>,
  rowIndex: number,
  colIndex: number
): boolean {
  const rows = matrix.length;
  const cols = matrix[0].length;

  if (matrix[rowIndex][colIndex].value == "S") {
    // Check horizontally from right to left
    if (colIndex < cols - 2) {
      if (
        matrix[rowIndex][colIndex].value === "S" &&
        matrix[rowIndex][colIndex + 1].value === "O" &&
        matrix[rowIndex][colIndex + 2].value === "S"
      ) {
        return true;
      }
    }

    // Check horizontally from left to right
    if (colIndex >= 2) {
      if (
        matrix[rowIndex][colIndex].value === "S" &&
        matrix[rowIndex][colIndex - 1].value === "O" &&
        matrix[rowIndex][colIndex - 2].value === "S"
      ) {
        return true;
      }
    }

    // Check vertically
    if (rowIndex < rows - 2) {
      if (
        matrix[rowIndex][colIndex].value === "S" &&
        matrix[rowIndex + 1][colIndex].value === "O" &&
        matrix[rowIndex + 2][colIndex].value === "S"
      ) {
        return true;
      }
    }

    if (rowIndex >= 2) {
      if (
        matrix[rowIndex][colIndex].value === "S" &&
        matrix[rowIndex - 1][colIndex].value === "O" &&
        matrix[rowIndex - 2][colIndex].value === "S"
      ) {
        return true;
      }
    }

    // Check diagonally from left to right and top to bottom
    if (rowIndex < rows - 2 && colIndex < cols - 2) {
      if (
        matrix[rowIndex][colIndex] === "S" &&
        matrix[rowIndex + 1][colIndex + 1].value === "O" &&
        matrix[rowIndex + 2][colIndex + 2].value === "S"
      ) {
        return true;
      }
    }

    // Check diagonally from left to right and bottom to top
    if (rowIndex >= 2 && colIndex < cols - 2) {
      if (
        matrix[rowIndex][colIndex] === "S" &&
        matrix[rowIndex - 1][colIndex + 1].value === "O" &&
        matrix[rowIndex - 2][colIndex + 2].value === "S"
      ) {
        return true;
      }
    }

    // Check diagonally from right to left (bottom to top)
    if (rowIndex < rows - 2 && colIndex >= 2) {
      if (
        matrix[rowIndex][colIndex] === "S" &&
        matrix[rowIndex + 1][colIndex - 1] === "O" &&
        matrix[rowIndex + 2][colIndex - 2] === "S"
      ) {
        return true;
      }
    } else if (rowIndex >= 2 && colIndex < cols - 2) {
      // Check diagonally from right to left (top to bottom)
      if (
        matrix[rowIndex][colIndex] === "S" &&
        matrix[rowIndex - 1][colIndex + 1] === "O" &&
        matrix[rowIndex - 2][colIndex + 2] === "S"
      ) {
        return true;
      }
    }

    // Check diagonally from right to left and top to bottom
    if (rowIndex < rows - 2 && colIndex >= 2) {
      if (
        matrix[rowIndex][colIndex] === "S" &&
        matrix[rowIndex + 1][colIndex - 1].value === "O" &&
        matrix[rowIndex + 2][colIndex - 2].value === "S"
      ) {
        return true;
      }
    }

    // Check diagonally from right to left and bottom to top
    if (rowIndex >= 2 && colIndex >= 2) {
      if (
        matrix[rowIndex][colIndex].value === "S" &&
        matrix[rowIndex - 1][colIndex - 1].value === "O" &&
        matrix[rowIndex - 2][colIndex - 2].value === "S"
      ) {
        return true;
      }
    }
  } else if (matrix[rowIndex][colIndex].value == "O") {
    if (
      (rowIndex == 0 && colIndex == 0) ||
      (rowIndex == 0 && colIndex == cols - 1) ||
      (rowIndex === rows - 1 && colIndex === 0) ||
      (rowIndex === rows - 1 && colIndex === cols - 1)
    ) {
      return false;
    }

    //if first and last row => only left and right
    if (rowIndex == 0 || rowIndex == rowIndex - 1) {
      if (
        matrix[rowIndex][colIndex - 1].value == "S" &&
        matrix[rowIndex][colIndex + 1].value == "S"
      ) {
        return true;
      }
    }
    //if first and last col => top and bottom
    if (colIndex == 0 || colIndex == colIndex - 1) {
      if (
        matrix[rowIndex - 1][colIndex].value == "S" &&
        matrix[rowIndex + 1][colIndex].value == "S"
      ) {
        return true;
      }
    }

    // top and bottom
    if (
      matrix[rowIndex - 1][colIndex].value === "S" &&
      matrix[rowIndex + 1][colIndex].value === "S"
    ) {
      return true;
    }

    // left and right
    if (
      matrix[rowIndex][colIndex - 1].value === "S" &&
      matrix[rowIndex][colIndex + 1].value === "S"
    ) {
      return true;
    }
    //left to right diagonally
    if (
      matrix[rowIndex - 1][colIndex - 1].value === "S" &&
      matrix[rowIndex + 1][colIndex + 1].value == "S"
    ) {
      return true;
    }

    //right to left diagonally
    if (
      matrix[rowIndex - 1][colIndex + 1].value === "S" &&
      matrix[rowIndex + 1][colIndex - 1].value == "S"
    ) {
      return true;
    }
  }

  return false;
}

// Example usage
const matrix = [
  ["O", "O", "S", "", "O"],
  ["O", "O", "", "S", "O"],
  ["S", "O", "O", "O", "S"],
  ["O", "S", "O", "", "O"],
  ["O", "", "S", "O", "O"],
];
const rowIndex = 1;
const colIndex = 1;
const result = isPartOfSOS(matrix, rowIndex, colIndex);
console.log(result);
