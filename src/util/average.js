export const average = (arr) =>
  Math.round(arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0));
